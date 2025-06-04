+++
draft = true
title = "Nextcloud-Migration auf S3/Minio"
weight = 6
+++

In vergangenen Übungen haben wir Redis kennengelernt, den S3-Speicher Minio in
Betrieb genommen und als systemd-Service konfiguriert, den LAMP-Stack aufgesetzt
und dank PHP-FPM besser skalierbar gemacht – und schliesslich Nextcloud in
Betrieb genommen.

Nun sollen diese Komponenten kombiniert werden, sodass Nextcloud einerseits die
Nutzdaten auf Minio ablegt und andererseits zwecks Performanceoptimierung mit
Redis zwischenspeichert (Caching). Weiter sollen die Daten von Nextcloud –
Nutzdaten von Minio und Metadaten in MySQL – gesichert werden (Backup), damit
sie im Notfall wiederhergestellt werden können (Restore).

## Vorbereitung

Erstellen Sie ein Verzeichnis für die Datensicherung unter `/var/backup`:

```bash
sudo mkdir /var/backup
```

### Konfiguration sichern

Da Konfigurationsänderungen an Nextcloud vorgenommen werden, soll zuerst die
Konfigurationsdatei in ein entsprechendes Verzeichnis gesichert werden:

```bash
sudo mkdir /var/backup/config
sudo cp /var/www/nextcloud/config/config.php /var/backup/config/
```

Loggen Sie sich als Administrator (`admin`) und als ihren persönlichen Benutzer
unter [IP-ADRESSE](http://IP-ADRESSE) in Nextcloud ein. (Verwenden Sie ein
privates Browserfenster, damit Sie zwei Sessions gleichzeitig aktiv halten
können.)

### Logs verfolgen

Öffnen Sie zwei weitere SSH-Sessions auf Ihre VM. Dort sollen Sie mit `tail -f`
die Ausgaben zweier Logs verfolgen.

Verfolgen Sie das Fehlerlog von Apache:

```bash
sudo tail -f /var/log/apache2/error.log
```

Und verfolgen Sie das Log von Nextcloud:

```bash
sudo tail -f /var/www/nextcloud/data/nextcloud.log
```

Die Logdateien können im Fall eines Fehlers über dessen Ursache Auskunft geben.

### Konfiguration anpassen

Um die Konfiguration von Nextcloud kennenzulernen, sollen Sie folgende
Änderungen an der Datei `/var/www/nextcloud/config/config.php` vornehmen:

1. Aktivieren Sie das automatische Logout nach Ablauf der Sitzungsdauer mit der Option `auto_logout` (siehe [Auto Logout](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/config_sample_php_parameters.html#auto-logout)).
2. Reduzieren Sie die Sitzungsdauer von einem Tag auf eine Stunde mit der Option `session_lifetime` (siehe [Session Lifetime](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/config_sample_php_parameters.html#session-lifetime)).

**Kontrollfrage 1**: Wie lauten die beiden Konfigurationsangaben? Halten Sie diese fest!

Die Änderungen werden sofort beim nächsten Neuladen einer Nextcloud-Seite aktiv.
Probieren Sie das aus. Erscheint eine Fehlermeldung, hat sich wohl ein Fehler in
der Konfiguration eingeschlichen. Korrigieren Sie diesen und laden Sie die
Nextcloud-Seite erneut, bis wieder alles funktioniert.

## Redis als Cache

Bevor Nextcloud mit Redis als Cache beschleunigt wird, soll die Konfiguration
von Redis angepasst werden. Doch wie findet man heraus, in welcher Datei sich
die Redis-Einstellungen finden? Begeben wir uns auf Spurensuche!

Zuerst soll überprüft werden, ob Redis überhaupt läuft:

```bash
systemctl is-active redis.service
```

### Konfiguration sichern

Beim Start von Redis wird dessen Konfiguration als Argument angegeben. Schauen
wir also in der Service-Unit von Redis nach, wie das funktioniert. Doch in
welcher Datei ist diese Service-Unit konfiguriert? Das lässt sich mit dem Befehl
`systemctl show` herausfinden:

```bash
systemctl show redis.service
```

Dieser Befehl gibt viele Einstellungen aus. Doch welche Angabe enthält die
Unit-Datei? Tipp: Suchen Sie nach `Path` und nach der Dateiendung `.service`.

**Kontrollfrage 2**: Wie lautet der absolute Pfad zur Unit-Datei von Redis?

Betrachten Sie die Unit-Datei mit einem Texteditor oder mit dem `cat`-Befehl.
Der absolute Pfad zur Konfigurationsdatei wird in der `ExecStart`-Direktive
angegeben und hat die Endung `.conf`.

**Kontrollfrage 3**: Wie lautet der absolute Pfad zur Redis-Konfigurationsdatei?

Legen Sie eine Sicherungskopie der Redis-Konfigurationsdatei an, indem Sie sie
ins Verzeichnis `/var/backup/config/` kopieren.

### Redis umkonfigurieren

In der Redis-Konfiguration sollen die folgenden Änderungen vorgenommen werden um
Ressourcen zu sparen:

1. Die Anzahl Datenbanken soll von 16 auf 1 reduziert werden.
    - Suchen Sie selbständig nach der entsprechenden Einstellung.
    - Tipp: Suchen Sie nach der Zahl 16.
2. Die persistente Speicherung soll deaktiviert werden.
    - Das Append-Only-File (AOF) ist bereits deaktiviert (`appendonly no`).
    - Deaktivieren Sie die RDB-Speicherung, indem Sie die auskommentierte Einstellung `save ""` aktivieren.

**Kontrollfrage 4**: Wie heisst die Einstellung, mit welcher die Anzahl Datenbanken eingestellt werden kann?

Die persistierte Datenbank unter `/var/lib/redis/dump.rdb` muss gelöscht werden.

Starten Sie Redis neu, damit die Einstellungen aktiv werden:

```bash
sudo systemctl restart redis.service
```

Es soll nun überprüft werden, ob wirklich keine persistente Datenspeicherung
mehr vorgenommen wird. Hierzu sollen Sie einen Wert schreiben und ihn aus Redis
zurücklesen, beispielsweise so:

```plain
$ redis-cli set day Friday
OK
$ redis-cli get day
"Friday"
```

Ist der Wert nach einem Neustart von Redis nicht mehr da, wurde die Persistenz
erfolgreich deaktiviert:

```bash
sudo systemctl restart redis.service
redis-cli get day
```

Redis ist nun korrekt konfiguriert, um als Cache von Nextcloud eingesetzt werden zu können.

### Redis als Cache konfigurieren

Nextcloud unterstützt eine Reihe verschiedener Caching-Mechanismen und
-Backends, siehe die Dokumentation zum Thema [Memory
Caching](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/caching_configuration.html).

Damit Nextcloud auf Redis zugreifen kann, muss noch ein entsprechendes PHP-Modul
installiert werden. Suchen und installieren Sie das entsprechende Modul mit `apt
search` und `apt install`.

**Kontrollfrage 5**: Wie lautet der Name des PHP-Moduls für Redis?

Die Nextcloud-Konfigurationseinstellungen für Nextcloud sollen in einer
separaten Datei angelegt werden. (Nextcloud kombiniert die Konfigurationsdatei
`config.php` automatisch mit allen Dateien im gleichen Verzeichnis, welche die
Endung `.config.php` haben.)

Legen Sie zuerst die Datei `/var/www/nextcloud/config/redis.config.php` an und
ordnen Sie ihr den gleichen Besitzer zu, wie ihn `config.php` hat:

```bash
sudo touch /var/www/nextcloud/config/redis.config.php
sudo chown www-data:www-data /var/www/nextcloud/config/redis.config.php
```

Fügen Sie der Datei folgenden Inhalt hinzu. Ersetzen Sie dabei die Angaben
`host` und `port` durch die entsprechenden Angaben von Redis:

```php
<?php
$CONFIG = array (
	'memcache.local' => '\OC\Memcache\Redis',
	'memcache.locking' => '\OC\Memcache\Redis',
	'memcache.distributed' => '\OC\Memcache\Redis',
	'redis' => [
	     'host' => /* TODO */,
	     'port' => /* TODO */,
	     'dbindex' => 0,
	],
);
```

**Kontrollfrage 6**: Wie lauten die Angaben für `host` und `port`?

Speichern Sie die Konfiguration ab und laden Sie eine Seite in Nextcloud.
Funktioniert das nicht, prüfen Sie die Fehlermeldungen in der Logdatei von
Nextcloud und Apache und korrigieren Sie die Konfiguration entsprechend.

Kann die Nextcloud-Seite erfolgreich geladen werden, ist der Cache nun aktiv.
Redis sollte nun verschiedenste Angaben von Nextcloud zwischenspeichern, die
dann nicht mehr von der Festplatte gelesen werden müssen:

```bash
redis-cli keys '*'
```

Es sollten dutzende von Angaben ausgegeben werden.

## S3/Minio als Datenspeicher

Damit die Speichermenge von Nextcloud nicht von der Grösse einer lokalen
Partition vorgegeben ist, soll der Datenspeicher vom Verzeichnis
`/var/www/nextcloud/data` auf den S3-Speicher Minio umgestellt werden.
(Grundsätzlich liesse sich ein beliebiger S3-Speicher anbinden, egal ob in der
Cloud oder selber gehosted.)

Stellen Sie zunächst sicher, ob der Minio-Service läuft:

```bash
sudo systemctl is-active minio.service
```

Läuft der Minio-Service nicht, müssen Sie noch den [zweiten Teil der
systemd-Übungen](https://code.frickelbude.ch/m346/systemd#teil-2-selbst%C3%A4ndig-minio)
abarbeiten.

Läuft der Service, loggen Sie sich unter [IP-ADRESSE:9090](http://IP-ADRESSE:9090)
auf Minio ein.

Erstellen Sie einen Bucket namens `nextcloud`.

Loggen Sie sich nun aus Nextcloud aus – sowohl mit dem Administrator als auch
mit Ihrem persönlichen Benutzer.

### Minio als Datenspeicher konfigurieren

In der Nextcloud-Dokumentation ist die Einbindung von S3-Speichern unter [Primary Storage](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html) genauer beschrieben.

Legen Sie eine neue Nextcloud-Konfigurationsdatei namens `minio.config.php` an und setzen Sie den Benutzer `www-data` als deren Besitzer:

```bash
sudo touch /var/www/nextcloud/config/minio.config.php
sudo chown www-data:www-data /var/www/nextcloud/config/minio.config.php
```

Kopieren Sie folgendes Konfigurationsgerüst in diese Datei:

```php
<?php
$CONFIG = array (
	'objectstore' => [
		'class' => '\OC\Files\ObjectStore\S3',
		'arguments' => [
			'hostname' => /* TODO */,
			'port' => /* TODO */,
			'key' => /* TODO */,
			'secret' => /* TODO */,
			'bucket' => /* TODO */,
			'use_ssl' => /* TODO: true/false */,
			'region' => 'optional',
			'use_path_style' => true,
		],
	],
);
```

**Kontrollfrage 7**: Wie lauten die sechs fehlenden Konfigurationsangaben?

Ersetzen Sie die `/* TODO */`-Kommentare durch die korrekten Angaben vom lokal
laufenden Minio-Server. Die meisten Angaben sollten Ihnen bereits bekannt sein.
(Tipp: `key` und `secret` beziehen sich auf die Benutzerdaten von Minio.)

Speichern Sie die Konfigurationsänderungen ab und versuchen Sie sich in
Nextcloud einzuloggen. Erscheint eine Fehlermeldung, prüfen Sie die Logdatei von
Nextcloud. Versuchen Sie anhand dieser Meldungen den Konfigurationsfehler zu
korrigieren.

### Den Datenspeicher testen

Funktioniert das Login, werden Sie feststellen, dass der Benutzer nun keine
Dateien mehr hat. Das liegt daran, dass die Daten nicht vom lokalen Speicher zu
Minio migriert worden sind. Keine Sorge: Die alten Dateien sind im Verzeichnis
`/var/www/nextcloud/data/[username]/files` zu finden. (Erstetzen Sie `[username]`
durch den jeweiligen Benutzernamen.)

Laden Sie nun einige Dateien in Nextcloud hoch.

Schauen Sie auf dem [Minio-Server](http://IP-ADRESSE:9090) im _Object Browser_
(Navigation links) nach, ob der Bucket nun Daten enthält. Sind Einträge zu
sehen, hat die Umstellung des Datenspeichers auf Minio funktioniert!

**Kontrollfrage 8**: Wie heissen die Objekte im Bucket? Notieren Sie sich einen Namen!