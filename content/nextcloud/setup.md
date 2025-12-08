+++
date = '2025-12-08T16:58:02+01:00'
title = 'Nextcloud-Setup'
weight = 4
+++

Im Modul 346 wurden u.a. schon folgende Themen behandelt:

1. **DSGVO**: Wir haben erfahren, dass die DSGVO unsere Daten schützt, uns das aber wenig bringt, wenn wir sie bei US-Firmen ablegen.
2. **S3/Minio**: Wir haben ein skalierbares Storage-Backend kennengelernt, das auch selber und _on-premise_ betrieben werden kann.
3. **Nextcloud**: Wir haben die Hintergründe vom Nextcloud-Projekt und die Problematik von OpenSource-Lizenzen angeschaut.
4. **systemd**: Wir haben die Grundlagen zur Service-Verwaltung auf modernen Linux-Systemen eingeübt.
5. **LAMP-Stack**: Wir haben einen der populärsten Software-Stacks in Betrieb genommen, auf dem sich u.a. Nextcloud betreiben lässt.

Mit diesem Wissen sind die Grundlagen dafür geschaffen, Nextcloud selber in Betrieb nehmen zu können. Dies ist das Ziel vom heutigen Block.

Voraussetzung für den folgenden Übungsblock ist ein lauffähiger LAMP-Stack (Apache, MariaDB, PHP-FPM). Wer mit dem [LAMP-Stack](/nextcloud/lamp-stack) noch nicht so weit ist, sollte diesen Teil zuerst fertig bearbeiten.

## Übungen

### Aufgabe 1: Systemkomponenten ermitteln {#aufgabe1}

Machen Sie sich mit dem [Nextcloud Admin Manual](https://docs.nextcloud.com/server/latest/admin_manual/contents.html) vertraut. Suchen Sie darin nach verschiedenen **Systemkomponenten**, die zum Einsatz von Nextcloud verwendet werden können. Halten Sie in der untenstehenden Tabelle **drei bis sechs** dieser Systemkomponenten fest, indem Sie untenstehende Tabelle ausfüllen mit den folgenden Angaben ausfüllen:

1. Name/Bezeichnung: Wie heisst die Komponente?
2. Rolle/Zweck: Was ist die Aufgabe der jeweiligen Komponente?
3. Alternativen: Welche Alternativen sind für die jeweiligen Komponente erwähnt?
4. Webseite: Unter welcher URL ist die offizielle Webseite der jeweiligen Komponente zu finden?

| # | Name/Bezeichnung | Rolle/Zweck | Alternativen | Webseite |
|--:|------------------|-------------|--------------|----------|
| 1 |                  |             |              |          |
| 2 |                  |             |              |          |
| 3 |                  |             |              |          |
| 4 |                  |             |              |          |
| 5 |                  |             |              |          |
| 6 |                  |             |              |          |

:briefcase: Halten Sie die ausgefüllte Tabelle in Ihrer Dokumentation fest.

### Aufgabe 2: Systemarchitektur bestimmen {#aufgabe2}

Erstellen Sie einen grafischen Überblick über die Systemarchitektur von Nextcloud. Verwenden Sie hierzu die Systemkomponenten, die Sie in der vorherigen Aufgabe ermittelt haben.

Verwenden Sie für die Systemkomponenten sinnvolle Grafiken (Knoten). Verbinden Sie die Systemkomponenten, die direkt miteinander interagieren, mit Kanten (Linien bzw. Pfeilen). Beschriften Sie sowohl die Knoten (Name der Komponente) als auch die Kanten (Zusatzinformationen wie Protokolle, Portnummern usw.)

Verwenden Sie für das Diagramm eine Software wie Microsoft Visio oder [draw.io](https://app.diagrams.net/). Die Auswahl der Software ist frei, das Diagramm soll aber als eine PNG-Grafik exportiert in die Dokumentation aufgenommen werden.

:briefcase: Halten Sie die Grafik in Ihrer Dokumentation fest.

### Aufgabe 3: Apache-Seite konfigurieren {#aufgabe3}

Erstellen Sie eine neue Apache-Konfiguration (Virtual Host) für Nextcloud in der Datei `nextcloud.conf` mit untenstehendem Inhalt:

```apache 
<VirtualHost *:80>
    DocumentRoot /todo
    ServerName localhost
    <Directory /todo>
        Require all granted
        AllowOverride All
        Options FollowSymLinks MultiViews
        <IfModule mod_dav.c>
            Dav off
        </IfModule>
    </Directory>
</VirtualHost>
```

Ersetzen Sie bei den Direktiven `DocumentRoot` und `<Directory>` den Pfad `/todo` durch einen Pfad innerhalb des `/var/www`-Verzeichnisses.

Verschieben Sie die Konfigurationsdatei `nextcloud.conf` anschliessend in das `sites-available/`-Verzeichnis von Apache.

:desktop_computer: Listen Sie die Dateien im Verzeichnis `/etc/apache2/sites-available` mit dem `ls`-Befehl auf. Speichern Sie einen Screenshot davon in Ihrer Dokumentation ab.

### Aufgabe 4: Datenbank erstellen {#aufgabe4}

Erstellen Sie eine MariaDB-Datenbank namens `nextcloud`. Erstellen Sie einen Benutzer für diese Datenbank, der sich nur lokal anmelden kann. Erteilen Sie diesem Benutzer alle Berechtigungen für die neue Datenbank.

:briefcase: **Kontrollfrage**: Welche Befehle waren nötig, um die Datenbank mitsamt Benutzer und entsprechenden Berechtigungen zu erstellen? Halten Sie diese Befehle in Ihrer Dokumentation fest!

:desktop_computer: Halten Sie zusätzlich einen Screenshot von dieser MariaDB-Sitzung in Ihrer Dokumentation fest!

### Aufgabe 5: Nextcloud installieren {#aufgabe5}

Besuchen Sie die [Download-Seite](https://download.nextcloud.com/) vom Nextcloud-Projekt. Die folgenden Dateien müssen mit dem Befehl `wget` auf der VM heruntergeladen werden. Hierzu kann man sich die entsprechenden Download-Links in die Zwischenablage kopieren und dann ins Terminal einfügen:

```bash
wget URL-ZUR-DATEI
```

Laden Sie den Server-Release der Version 32.0.2 als Tarball (Endung: `.tar.bz2`) herunter. Laden Sie sich ausserdem die GPG-Signatur (Endung: `.asc`) und die SHA-512-Prüfsumme zur entsprechenden Datei (Endung: `.sha512`) herunter. Anhand letzterer beiden Dateien soll verifiziert werden, dass das Archiv tatsächlich von den Nextcloud-Entwicklern stammt und nicht manipuliert worden ist!

:briefcase: **Kontrollfrage**: Wie lauten die vollständigen URLs zum Herunterladen dieser drei Dateien? Halten Sie diese URLs in der Dokumentation fest!

#### Download-Quelle und -Integrität überprüfen

:desktop_computer: Halten Sie die folgende Shell-Session mit einem Screenshot in ihrer Dokumentation fest!

Installieren Sie das Paket `gpg` mit dem `apt`-Befehl. Laden Sie anschliessend den [GPG-Schlüssel](https://nextcloud.com/nextcloud.asc) des Nextcloud-Projekts herunter. Importieren Sie diesen:

```bash
gpg --import nextcloud.asc
```

Alternativ kann der Schlüssel von einem sogenannten _Keyserver_ bezogen werden:

```bash
gpg --keyserver keys.openpgp.org --recv-keys 28806A878AE423A28372792ED75899B9A724937A
```

Überprüfen Sie als nächstes, ob die Signatur (`.asc`-Datei) für das Release-Archiv (`.tar.bz2`-Datei) wirklich von Nextcloud stammt:

```bash
gpg --verify nextcloud-32.0.2.tar.bz2.asc nextcloud-32.0.2.tar.bz2
```

Wenn in der Ausgabe `Good signature` zu lesen ist, dürfte das Release-Archiv mit hoher Wahrscheinlichkeit vom Nextcloud-Projekt signiert worden sein. Wenn hingegen `BAD signature` zu lesen ist, wurde das Release-Archiv manipuliert und sollte sofort gelöscht werden!

Prüfen Sie zusätzlich die Integrität der Datei anhand der SHA-512-Prüfsumme:

```bash
sha512sum -c nextcloud-30.0.2.tar.bz2.sha512
```

Es sollte die folgende Ausgabe erscheinen:

```plain
nextcloud-30.0.2.tar.bz2: OK
```

(Die Integritätsprüfung ist zwar schon durch die obenstehende Zertifikatsprüfung erfolgt, es sollen aber beide Mechanismen kennengelernt werden.)

#### Archiv entpacken

Entpacken Sie nun das Release-Archiv:

```bash
tar xf nextcloud-32.0.2.tar.bz2
```

Das Archiv wurde ins Verzeichnis `nextcloud/` entpackt. Verschieben Sie dieses nun in das `/var/www`-Verzeichnis. Achten Sie darauf, dass der absolute Pfad vom neuen `nextcluod/`-Verzeichnis so lautet, wie er in [Aufgabe 3](#aufgabe3) in der Apache-Konfiguration angegeben worden ist (`nextcloud.conf`).

Ändern Sie den Besitzer des Verzeichnisses so, dass es dem Benutzer `www-data` von Apache gehört:

```bash
sudo chown -R www-data:www-data [TODO: Pfad zum Nextcloud-Verzeichnis]
```

#### Seite aktivieren

Aktivieren Sie nun die neu erstellte Seite mithilfe des `a2ensite`-Befehls oder indem Sie manuell einen entsprechenden symbolischen Link vom `sites-available/`- zum `sites-enabled/`-Verzeichnis erstellen.

Deaktivieren Sie die Modulbaukasten-Webseite von der letzten Übung wiederum mithilfe des `a2dissite`-Befehls oder indem Sie den entsprechenden symbolischen Link löschen.

Laden Sie die Konfiguration von Apache anschliessend mit dem entsprechenden systemd-Befehl neu.

:briefcase: **Kontrollfrage**: Welche Befehle haben Sie eingegeben um die neue Seite zu aktivieren, die alte zu deaktivieren und um die Konfiguration von Apache neu zu laden? Halten Sie diese fest!

:desktop_computer: Halten Sie die Shell-Sitzung mit den ausgeführten Befehlen als Screenshot in Ihrer Dokumentation fest.

### Aufgabe 6: Fehlende Module installieren {#aufgabe6}

Rufen Sie nun die Seite [http://IP-ADRESSE](http://IP-ADRESSE) in Ihrem Browser auf. Wenn Sie alles richtig gemacht haben, sollte nun die folgende Fehlerseite erscheinen:

![Nextcloud-Fehlerseite: fehlende Module](/img/nextcloud-error.png)

Die Fehlerseite weist Sie auf fehlende PHP-Module hin.

Suchen Sie nun mithilfe des Befehls `apt search` nach den Paketen, welche die entsprechenden PHP-Module bereitstellen, beispielsweise so:

```bash
apt search zip | grep php
```

(Mithilfe von `grep php` werden nur die Pakete angezeigt, die PHP-Module bezeichnen.)

Installieren Sie nun das gefundene PHP-Modul mithilfe des Befehls `apt install`, beispielsweise so:

```bash
sudo apt install php-zip
```

Tipp: Die Paketnamen von PHP-Modulen beginnen jeweils mit dem Präfix `php-` bzw. `php8.4-`.

Laden Sie die Seite [http://IP-ADRESSE](http://IP-ADRESSE) anschliessend neu um zu prüfen, ob nun ein Problem weniger vorhanden ist.

Tipp: Können Sie zu einer Fehlermeldung kein passendes PHP-Modul finden, fahren Sie einfach mit dem nächsten fort. (Ein installiertes Modul kann mehrere Probleme auf einen Schlag lösen.)

:briefcase: **Kontrollfrage**: Welche PHP-Module mussten Sie noch installieren? Halten Sie alle Modulnamen in einer Liste in Ihrer Dokumentation fest!

Wenn alle nötigen PHP-Module installiert sind, sollten Sie folgenden Bildschirm zu sehen bekommen:

![Nextcloud-Installationsseite: Bereit zum Einrichten](/img/nextcloud-setup.png)

### Aufgabe 7: Nextcloud konfigurieren {#aufgabe7}

Befüllen Sie das Formular mit den folgenden Angaben:

- Username: `admin`
- Password: `mostsecret`
- Data Folder: `/var/www/nextcloud/data` [belassen, wie es ist]
- Database user: [siehe [Aufgabe 4](#aufgabe4)]
- Database password: [siehe [Aufgabe 4](#aufgabe4)]
- Database name: [siehe [Aufgabe 4](#aufgabe4)]
- Database host: [siehe [Aufgabe 4](#aufgabe4)]

Betätigen Sie nun die Schaltfläche _Install_.

Wenn alles funktioniert hat, sollten Sie auf dem nächsten Bildschirm _Recommended apps_ installieren können. Überspringen Sie das, indem Sie die Schaltfläche _Skip_ betätigen.

**Gratulation: Sie haben Nextcloud erfolgreich in Betrieb genommen!**

### Aufgabe 8: Benutzer konfigurieren {#aufgabe8}

Machen Sie sich nun mit der Oberfläche von Nextcloud vertraut.

Erstellen Sie eine neue Benutzergruppe namens _users_ und einen Benutzer mit Ihrem Vor- und Nachnamen als Benutzernamen (z.B. _ruedi-meier_ oder _therese-ottiger_). Der neue Benutzer soll zur Gruppe _users_ gehören, selber keine Gruppe administrieren können und den _admin_-Benutzer als Manager eingetragen haben.

:desktop_computer: Erstellen Sie einen Screenshot von der Benutzerübersicht und halten Sie diesen in Ihrer Dokumentation fest!

Loggen Sie sich als Administrator aus und mit dem neuen Benutzer ein.

### Aufgabe 9: Dateien hochladen {#aufgabe9}

Löschen Sie die vorgegebenen Dokumente in Ihrer Datei-Ansicht (_Files_).

Erstellen Sie nun eine Ordnerstruktur fürs aktuelle Semester (z.B. `Modul346`, `Modul114`) und laden Sie einige Dokumente in die entsprechenden Ordner.

Diese Dateien werden wir im nächsten Unterrichtsblock für das Backup und Restore benötigen!

:desktop_computer: Erstellen Sie einen Screenshot von einem der Verzeichnisse, sodass der Inhalt des Ordners zu sehen ist.
