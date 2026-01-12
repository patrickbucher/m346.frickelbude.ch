+++
date = '2026-01-12T06:41:28+01:00'
title = "Nextcloud-Migration auf S3/Minio"
weight = 6
+++

In vergangenen Übungen wurde Nextcloud basierend auf dem LAMP-Stack aufgesetzt und Minio als systemd-Service konfiguriert. Nextcloud verwendet als Datenspeicher das lokale Dateisystem. Zwecks besserer Skalierbarkeit sollen die beiden Teile nun kombiniert werden, sodass Nextcloud die Nutzdaten via Minio in einem S3-Speicher verwaltet.

## Voraussetzungen

Für diese Übungen wird folgendes vorausgesetzt:

1. Minio wurde mit systemd [als Service eingerichtet](/nextcloud/systemd/#teil-2-selbständig-minio).
1. Der LAMP-Stack wurde [in Betrieb genommen](/nextcloud/lamp-stack/#übungen).
1. Nextcloud wurde [installiert](/nextcloud/setup/#übungen).

## Vorbereitung

Erstelle ein Verzeichnis für die Datensicherung unter `/var/backup`:

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

Logge dich als Administrator (`admin`) und als ihren persönlichen Benutzer
unter [IP-ADRESSE](http://IP-ADRESSE) in Nextcloud ein. (Verwende ein
privates Browserfenster, damit du zwei Sessions gleichzeitig aktiv halten
kannst.)

### Logs verfolgen

Öffnen zwei weitere SSH-Sessions auf deine VM. Dort kannst du mit `tail -f`
die Ausgaben zweier Logs verfolgen.

Verfolge das Fehlerlog von Apache:

```bash
sudo tail -f /var/log/apache2/error.log
```

Und verfolge das Log von Nextcloud:

```bash
sudo tail -f /var/www/nextcloud/data/nextcloud.log
```

Die Logdateien können im Fall eines Fehlers über dessen Ursache Auskunft geben.

### Konfiguration anpassen

Um die Konfiguration von Nextcloud kennenzulernen, sollst du folgende
Änderungen an der Datei `/var/www/nextcloud/config/config.php` vornehmen:

1. Aktiviere das automatische Logout nach Ablauf der Sitzungsdauer mit der Option `auto_logout` (siehe [Auto Logout](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/config_sample_php_parameters.html#auto-logout)).
2. Reduziere die Sitzungsdauer von einem Tag auf eine Stunde mit der Option `session_lifetime` (siehe [Session Lifetime](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/config_sample_php_parameters.html#session-lifetime)).

**Kontrollfrage 1**: Wie lauten die beiden Konfigurationsangaben? Halte diese fest!

Die Änderungen werden sofort beim nächsten Neuladen einer Nextcloud-Seite aktiv.
Probiere das aus. Erscheint eine Fehlermeldung, hat sich wohl ein Fehler in
der Konfiguration eingeschlichen. Korrigiere diesen und lade die
Nextcloud-Seite erneut, bis wieder alles funktioniert.

## S3/Minio als Datenspeicher

Damit die Speichermenge von Nextcloud nicht von der Grösse einer lokalen
Partition vorgegeben ist, soll der Datenspeicher vom Verzeichnis
`/var/www/nextcloud/data` auf den S3-Speicher Minio umgestellt werden.
(Grundsätzlich liesse sich ein beliebiger S3-Speicher anbinden, egal ob in der
Cloud oder selber gehosted.)

Stelle zunächst sicher, ob der Minio-Service läuft:

```bash
sudo systemctl is-active minio.service
```

Läuft der Service, logge dich unter [IP-ADRESSE:9090](http://IP-ADRESSE:9090) auf Minio ein. Andernfalls musst du noch einmal nachschauen, wie man [Minio als systemd-Service](/nextcloud/systemd/#teil-2-selbständig-minio) konfiguriert.

Erstelle einen Bucket namens `nextcloud`.

Logge dich nun aus Nextcloud aus – sowohl mit dem Administrator als auch
mit deinem persönlichen Benutzer.

### Minio als Datenspeicher konfigurieren

In der Nextcloud-Dokumentation ist die Einbindung von S3-Speichern unter [Primary Storage](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html) genauer beschrieben.

Lege eine neue Nextcloud-Konfigurationsdatei namens `minio.config.php` an und setze den Benutzer `www-data` als deren Besitzer:

```bash
sudo touch /var/www/nextcloud/config/minio.config.php
sudo chown www-data:www-data /var/www/nextcloud/config/minio.config.php
```

Kopiere folgendes Konfigurationsgerüst in diese Datei:

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

**Kontrollfrage 2**: Wie lauten die sechs fehlenden Konfigurationsangaben?

Ersetze die `/* TODO */`-Kommentare durch die korrekten Angaben vom lokal
laufenden Minio-Server. Die meisten Angaben sollten dir bereits bekannt sein.
(Tipp: `key` und `secret` beziehen sich auf die Benutzerdaten von Minio.)

Speichere die Konfigurationsänderungen ab und versuche dich in
Nextcloud einzuloggen. Erscheint eine Fehlermeldung, prüfe die Logdatei von
Nextcloud. Versuche anhand dieser Meldungen den Konfigurationsfehler zu
finden und zu korrigieren.

### Den Datenspeicher testen

Funktioniert das Login, wirst du feststellen, dass der Benutzer nun keine
Dateien mehr hat. Das liegt daran, dass die Daten nicht vom lokalen Speicher zu
Minio migriert worden sind. Keine Sorge: Die alten Dateien sind im Verzeichnis
`/var/www/nextcloud/data/[username]/files` zu finden. (Erstetze `[username]`
durch den jeweiligen Benutzernamen.)

Laden nun einige Dateien in Nextcloud hoch.

Schaue auf dem [Minio-Server](http://IP-ADRESSE:9090) im _Object Browser_
(Navigation links) nach, ob der Bucket nun Daten enthält. Sind Einträge zu
sehen, hat die Umstellung des Datenspeichers auf Minio funktioniert!

**Kontrollfrage 3**: Wie heissen die Objekte im Bucket? Notiere dir einen Namen!
