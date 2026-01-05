+++
date = '2026-01-05T22:16:49+01:00'
title = 'TLS: Transport Layer Security'
weight = 5
+++

_Transport Layer Security_ (TLS) bietet Verschlüsselung auf Layer 4: der Transport-Schicht. Es wird fälschlicherweise oftmals mit HTTPS gleichgesetzt. HTTPS ist ein Anwendungsprotokoll auf Layer 7, das HTTP in TLS einpackt und dadurch verschlüsseltes HTTP ermöglicht. Es lassen sich aber auch andere Protokolle per TLS verschlüsseln, so beispielsweise auch der Zugriff auf ein LDAP.

Das Thema TLS ist sehr umfassend. Einen guten Gesamtüberblick bietet [TLS Mastery](https://www.tiltedwindmillpress.com/product/tls/) von Michael W. Lucas oder die [Zusammenfassung](https://raw.githubusercontent.com/patrickbucher/docs/master/tls/tls-mastery.pdf) davon.

Oftmals ist noch die Abkürzung _Secure Socket Layer_ (SSL) zu lesen, wobei es sich jedoch um ein altes Protokoll handelt, das als unsicher gilt. Stand Januar 2026 sollte nur noch TLS 1.3 (oder neuer) verwendet verweden. Ältere TLS- (1.1, 1.2) und SSL-Versionen (2, 3) gelten als unsicher. Die Abkürzung "SSL" wird sich wohl noch lange halten, da sie auch im Projektnamen der [OpenSSL-Library](https://www.openssl.org/) sowie in deren OpenBSD-Fork [LibreSSL](https://www.libressl.org/) vorkommt. (Auch der Kommandozeilenbefehl beider Projekte heisst nach wie vor `openssl`).

Hier soll es jedoch nicht um die Details von TLS gehen, sondern darum, wie man für eine selbst gehostete Webseite ein Zertifikat ausliefert, sodass der Verkehr zwischen Browser und Webserver über HTTPS verschlüsselt wird.

## Ausgangslage

Wir gehen davon aus, dass wir einen Server mit einer öffentlich erreichbaren IPv4-Adresse und einem Domainnamen haben, z.B. `91.92.140.227` und `john-doe.frickelcloud.ch`. Auf dem Server ist Apache 2 installiert und so konfiguriert, dass unter `http://john-doe.frickelcloud.ch` eine Webseite ausgeliefert wird.

Auf dem Server befindet sich im Verzeichnis `/etc/apache2/sites-available` eine Datei namens `website.conf` mit folgendem Inhalt:

```apache
<VirtualHost *:80>
    DocumentRoot    /var/www/website
    ServerName      john-doe.frickelcloud.ch
</VirtualHost>
```

Diese ist von `/etc/apache2/sites-enabled` als symbolischer Link `website.conf` aus referenziert.

Diese reine HTTP-Konfiguration soll später durch eine HTTPS-Konfiguration ersetzt werden. Doch zuerst wird ein Zertifikat benötigt.

## Dehydrated

Das Paket `certbot` ist zwar sehr komfortabel, hat aber auch sehr viele Abhänigkeiten und übernimmt dabei Aufgaben, die ein Systemadministrator möglicherweise selber vornehmen möchte. Darum soll hier das Paket `dehydrated` zum Einsatz kommen.

**Aufgabe**: Installiere das Paket `dehydrated`.

Als nächstes soll ein Benutzer namens `acme` (für "Automated Certificate Management Environment) angelegt werden:

```bash
sudo useradd -m -d /var/acme -s /usr/bin/false acme
```

Das Home-Verzeichnis des Benutzers liegt in `/var/acme`. Er kann sich _nicht_ per Shell einloggen (`-s /usr/bin/false`).

Als nächstes soll unter `/etc/dehydrated/config` folgende Konfigurationsdatei angelegt werden, wobei die E-Mail-Adresse (siehe `TODO`) noch zu ergänzen ist:

```plain
BASEDIR="/var/acme"
DEHYDRATED_USER="acme"
DEHYDRATED_GROUP="acme"
DOMAINS_TXT="/etc/dehydrated/domains.txt"
CONTACT_EMAIL="TODO"
CHALLENGETYPE="http-01"
CA="letsencrypt-test"
CONFIG_D="/etc/dehydrated/conf.d"
WELLKNOWN="/var/www/acme"
```

**Aufgabe**: Ergänze die Kontakt-E-Mail-Adresse.

Als _Certificate Authority_ kommt die Testumgebung `letsencrypt-test` zum Einsatz, was für den Produktivbetrieb noch angepasst werden muss.

**Aufgabe**: Lege unter `/etc/dehydrated/domains.txt` eine Datei an, welche den Domainnamen der Webseite enthält, für die ein Zertifikat angefordert werden soll.

## Apache-Konfiguration

Dehydrated stellt sicher, dass die HTTP-01-Challenge automatisch abgewickelt wird. Hierzu wird ein öffentlich über den Webserver lesbares Verzeichnis benötigt.

**Aufgabe**: Lege ein Verzeichnis `/var/www/acme` an und übertrage dessen Besitz auf den Benutzer und die Gruppe `acme`.

Erstelle für dieses Verzeichnis eine zusätzliche Apache-Konfiguration unter `/etc/apache2/acme.config`:

```apache
Alias /.well-known/acme-challenge/ /var/www/acme/
<Directory "/var/www/acme/">
        Options         None
        Require         all granted
        AllowOverride   None
        ForceType       text/plain
</Directory>
```

Erɡänze die bestehende Webseitenkonfiguration um folgende Instruktion:

```apache
Include /etc/apache2/acme.config
```

Starte den Webserver anschliessend neu. Wenn dies nicht funktioniert, prüfe das systemd-Log von Apache.

## ACME-Registrierung und HTTP-01-Challenge

Überprüfe die Version von `dehydrated`:

```bash
sudo -u acme dehydrated -v
```

Dies sollte eine Versionsnummer ausgeben. Ist dies nicht der Fall, überprüfe, ob du die vorherigen Schritte alle korrekt ausgeführt hast.

Für die HTTP-01-Challenge wird ein sogenanntes _Hook-Skript_ angeboten, das folgendermassen aktiviert wird:

```bash
sudo ln -s /usr/share/doc/dehydrated/examples/hook.sh /etc/dehydrated/hook.sh
```

Wenn alles geklappt hat, kannst du folgendermassen einen ACME-Zugang einrichten:

```bash
sudo -u acme dehydrated --register --accept-terms
```

Fordere nun ein Testzertifikat über folgenden Befehl an:

```bash
sudo -u acme dehydrated --cron
```

Wenn `Challenge is valid!` und `Done!` in der Ausgabe erscheint, hat alles geklappt.

Der Eintrag `CA` kann in der Dehydrated-Konfiguration kann nun von `"letsencrypt-test"` auf `"letsencrypt"` umgestellt werden.

Anschliessend kannst du erneut ein Zertifikat anfragen.

## TLS in Apache konfigurieren

Suche nun im Verzeichnis `/var/acme/certs` nach zwei Dateien: `fullchain.pem` und `privkey.pem`. Kopiere dir deren absoluten Pfade heraus.

Erweitere deine Apache-Konfiguration um folgenden Abschnitt:

```apache
<VirtualHost *:443>
</VirtualHost>
```

Übernehme die Einstellungen `DocumentRoot` und `ServerName` von der bestehenden Konfiguration für Port 80. Ergänze die neue Konfiguration um folgende Direktiven, wobei du die absoluten Pfade von vorher verwenden musst:

```apache
SSLEngine             on
SSLCertificateFile    TODO: absoluter Pfad auf fullchain.pem
SSLCertificateKeyFile TODO: absoluter Pfad auf privkey.pem
```

Starte den Webserver anschliessend neu. Wenn alles geklappt hat, ist die Seite nun unter `https://john-doe.frickelcloud.ch` verfügbar.

## Automatisierung

Zertifikate, die von _Let's Encrypt_ ausgestellt werden, sind nur drei Monate lang gültig. Dies soll den Systemadministrator zur Automatisierung der Zertifikatsaktualisierung motivieren.

Vorgänge können mit systemd-Timer-Units oder klassisch über sogenannte _Cronjobs_ automatisch zeitlich ausgelöst werden.

Installiere `cron` und bearbeite anschliessend die Cronjobs vom `acme`-Benutzer mit dem `nano`-Texteditor:

```bash
sudo apt install -y cron
sudo -u acme EDITOR=nano crontab -e
```

Die Jobs werden über eine Tabelle mit folgenden Spalten verwaltet:

```plain
# m h dom mon dow command
```

Die Spalten haben folgende Bedeutung:

- `m`: Minute
- `h`: Stunde
- `dom`: Monatstag ("Day of Month")
- `mon`: Monat ("Month")
- `dow`: Wochentag ("Day of Week")
- `command`: auszuführender Befehl

Konfiguriere folgende Befehle, die täglich ausgeführt werden sollen. (D.h. `dom`, `mon` und `dow` können auf `*` gesetzt werden.)

| Minute | Stunde | Befehl |
|-------:|-------:|--------|
|     05 |     15 | `systemd-cat -t acme dehydrated --cron` |
|     10 |     15 | `systemd-cat -t acme dehydrated --cleanup` |
|     15 |     15 | `systemd-cat -t acme find /var/acme/archive -type f -mtime 300 -delete` |

Der erste Befehl erneuert die Zertifikate, die kurz vor dem Ablauf sind.

Der zweite Befehl archiviert alte Zertifikatsdateien.

Der dritte Befehl löscht Archivdaten, die älter als 300 Tage sind.

Speichere die Änderungen ab und verlasse `nano`. Es sollte eine Meldung erscheinen, dass die neuen Jobs installiert worden sind.

Das Befehlspräfix `systemd-cat -t acme` bewirkt, dass die Ausgabe des Befehls im sytemd-Journal landet und dort über `journalctl -t acme` betrachtet werden kann.

**Aufgabe**: Stelle die Zeiten so um, dass du die Ausführung der Befehle mit `journalctl -f -t acme` verfolgen kannst. (Achte darauf, dass die Befehle mit mindestens einer Minute zeitlichem Abstand ausgeführt werden.)
