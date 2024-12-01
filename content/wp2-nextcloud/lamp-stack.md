+++
title = "Der LAMP-Stack"
weight = 3
+++

## Theorie

Nextcloud basiert auf einer Reihe von Web-Technologien, die man als den _LAMP-Stack_ bezeichnet. Dieser besteht aus den folgenden Komponenten:

- **L**inux: das Betriebssystem
- **A**pache: ein Web-Server
- **M**ySQL: eine relationale Datenbank
- **P**HP: eine Programmiersprache

![Der traditionelle LAMP-Stack](/img/lamp-vanilla.png)

Für Windows gibt es den sogenannten _WAMP-Stack_ (mit "W" für "Windows"). Der sogenannte _XAMP-Stack_ ist eine betriebssystemneutrale Bezeichnung für den gleichen Software-Stack (mit "X" für ein beliebiges Betriebssystem).

Da Linux bloss ein Betriebssystemkern und kein komplettes Betriebssystem ist, muss das "L" in "LAMP" durch eine Distribution konkretisiert werden. In unserem Fall kommt _Debian GNU/Linux_ zum Einsatz.

Weiter hat das Debian-Projekt die relationale Datenbank MySQL durch den Fork MariaDB ersetzt. Das "M" in "LAMP" steht bei der Standardinstallation von Debian also für "MariaDB" und nicht für "MySQL".

Durch diese beiden Anpassungen ergibt sich für den angepassten LAMP-Stack folgendes Bild:

![Der LAMP-Stack basierend auf Debian GNU/Linux](/img/lamp-debian.png)

In der [Einführung](/wp2-nextcloud/intro) wurde die Problematik der OpenSource-Lizenzen behandelt. Beim LAMP-Stack kommen die folgenden Lizenzen zum Einsatz:

| **Komponente**     | **Lizenz(en)**                                              |
|--------------------|-------------------------------------------------------------|
| Linux (Kernel)     | GPLv2 (share-alike)                                         |
| Debian GNU/Linux   | diverse (GPL, LGPL, BSD-artige: permissive und share-alike) |
| Apache HTTP Server | Apache License 2.0 (permissive)                             |
| MySQL/MariaDB      | GPLv2                                                       |
| PHP                | PHP License (permissive)                                    |

**Wichtig**: Alle Komponenten können uneingeschränkt und kostenlos verwendet werden!

Im Folgenden soll kurz auf die einzelnen Komponenten des LAMP-Stacks eingegangen werden:

### Linux und Debian GNU/Linux

Linux ist ein Unix-artiges Betriebssystem, das seit 1991 von Linus Torvalds betreut wird. Das Original-Unix wurde 1969 von Ken Thompson entwickelt.

Seit 1983 arbeitet Richard Stallman an einer freien Neuimplementierung von Unix, die _GNU_ heisst ("GNU's Not Unix"). Aus dem GNU-Projekt stammt u.a. die GNU Compiler Collection (GCC) und die share-alike Lizenz GPL.

Linus Torvalds verwendete GCC um Linux zu kompilieren und stellte deswegen sein Betriebssystem unter die gleiche Lizenz, die GCC bereits verwendete: die GPL.

Debian verwendet nicht nur den Linux-Kernel, sondern auch viele Komponenten aus dem GNU-Projekt. Darum heisst die Distribution offiziell "Debian **GNU**/Linux".

### Der Apache-Webserver

Der _Apache HTTP Server_ wurde seit 1995 von Brian Behlendorf entwickelt. Seit 1999 wird er unter der Obhut der Apache Software Foundation (nebst vielen anderen Projekten) weiterentwickelt.

Der Name "Apache" ist einerseits eine Anspielung auf die Apache-Indianer, die für ihre Ausdauer bekannt waren. Andererseits stammt der Name "Apache" aus der Bezeichnung "a patchy web server": ein zusammengeflickter Web-Server.

Mittlerweile ist Apache modular aufgebaut und dadurch erweiterbar. Er kann beispielsweise PHP-Skripte über das Modul `mod_php` ausführen.

Apache war jahrelang der am weitesten verbreitete Webserver der Welt. Mittlerweile verfügt er noch über einen Marktanteil von ca. 30%.  Zum Vergleich: nginx hat einen Marktanteil von 35%, der IIS von Microsoft gerade einmal 5%.

### MySQL und MariaDB

MySQL ist ein relationales Datenbanksystem das von der schwedischen Firma MySQL AB seit 1995 entwickelt worden ist. Die Firma wurde 2008 von Sun Microsystems gekauft. 2009 wurde das Projekt MariaDB von MySQL geforked und wird seither unabhängig weiterentwickelt.

2010 hat Oracle Sun Microsystems übernommen, und damit auch MySQL. In der Folge sind einige Linux-Distributionen, u.a. Debian, von MySQL auf MariaDB umgestiegen.

### PHP

Die Programmiersprache PHP wird seit 1995 von Rasmus Lerdorf entwickelt. Die Abkürzung "PHP" ist (wie "GNU") ein sogenanntes _rekursives Akronym_ und bedeutet "PHP Hypertext Preprocessor". PHP ist also eine vorgelagerte Technologie, mit der Hypertext (sprich: HTML) ausgegeben wird.

PHP ist eine dynamisch typisierte Skriptsprache und verfügt über einen sehr einfachen Deployment-Mechanismus: Man braucht nur die Skripte in einen bestimmten Ordner auf dem Webserver zu kopieren.

PHP-Skripte können via CGI oder über ein Modul in den Webserver eingebunden werden. Wichtige PHP-Anwendungen sind: WordPress, Moodle – und Nextcloud.

#### PHP-Ausführung: CGI, FastCGI, mod_php, PHP-FPM

Es gibt verschiedene Möglichkeiten, wie ein PHP-Skript in einen Webserver eingebunden werden kann.

Die älteste ist _CGI_, das _Common Gateway Interface_. Hierbei wird jede Anfrage in einem separaten Prozess behandelt. Das Aufstarten eines Prozesses ist langsam, weswegen CGI als sehr ineffizient gilt. Die folgende Grafik veranschaulicht den Ablauf bei der Ausführung eines CGI-Skripts namens `script.php`:

![CGI (ein PHP-Prozess pro Request)](/img/cgi.png)

Man sieht, dass bei jedem Request zuerst ein PHP-Prozess gestartet werden muss, was die Beantwortung der Anfrage verzögert.

Webserver haben spezielle Module entwickelt, um PHP effizienter ausführen zu können. Hierbei wird ein Prozess wiederverwendet. Bei Apache kommt hierzu das Modul `mod_php` zum Einsatz, was standardmässig aktiv ist. Dadurch laufen der Apache Webserver und das PHP-Skript mit den gleichen Berechtigungen, was als unsicher gilt.

FastCGI ist ein Mechanismus, um Serverprozesse nicht für jede Anfrage neu starten zu müssen, sondern einen lang laufenden CGI-Prozess mit der Bearbeitung von Anfragen zu beauftragen. Dadurch wird der Overhead reduziert, der Request wird schneller bearbeitet, und der Server benötigt weniger Ressourcen.

PHP-FPM, der _FastCGI Process Manager for PHP_ ist eine Implementierung von FastCGI für PHP. Die Generierung einer Seite wird dadurch konsequent von deren Auslieferung getrennt. Da der PHP- und der Webserver-Prozess nun in verschiedenen Prozessen mit unterschiedlichen Berechtigungen laufen, gilt diese Variante als sicherer.

Die folgende Grafik veranschaulicht, wie ein PHP-Prozess zur Bearbeitung mehrerer Anfragen wiederverwendet wird:

![FastCGI (lang laufender PHP-Prozess für mehrere Requests)](/img/fastcgi.png)

Da der Start des PHP-Prozesses vorgelagert ist, können Anfragen schneller bearbeitet werden. Eine PHP-Anwendung wie Nextcloud läuft damit deutlich schneller und benötigt weniger Ressourcen.

PHP-FPM kann auch mehrere Prozesse in einem sogenannten _Prozess-Pool_ vorhalten, womit Anfragen auch parallel bearbeitet werden können. Dadurch können in der gleichen Zeit mehrere Benutzer bedient werden.

Mit Debian und PHP-**F**PM wird der _LAMP-Stack_ zum _DAMPF_-Stack.

### Links zum LAMP-Stack

Die folgenden Links führen zu weiterführenden Informationen über den _DAMPF_-Stack.

- [LAMP (Wikipedia)](https://de.wikipedia.org/wiki/LAMP_%28Softwarepaket%29)
- [Debian GNU/Linux](https://www.debian.org/)
- [Apache HTTP Server](https://httpd.apache.org/)
- [MySQL](https://www.mysql.com/)
- [MariaDB](https://mariadb.org/)
- [PHP](https://www.php.net/)
- [PHP-FPM](https://www.php.net/manual/en/install.fpm.php)

## Übungen

In den folgenden Aufgaben soll der LAMP-Stack basierend auf Debian GNU/Linux 12 (_Bookworm_) in Betrieb genommen werden, was die Grundlage für den Betrieb von Nextcloud bildet.

Für diese Aufgaben wird Ihnen eine virtuelle Maschine (Debian 12 "Bookworm") zur Verfügung gestellt.

### :briefcase: :desktop_computer: Aufgabe 1: Apache HTTP Server

Installieren Sie den Apache HTTP Server:

```bash
sudo apt install -y apache2
```

Dieser sollte nach der Installation bereits gestartet sein, was Sie folgendermassen überprüfen können:

```bash
systemctl is-active apache2.service
```

:briefcase: :desktop_computer: Halten Sie die Ausgabe vom obenstehenden Befehl als Screenshot fest.

Sollte _nicht_ die Ausgabe `active` erscheinen, starten Sie den Server manuell:

```bash
sudo systemctl start apache2.service
```

:briefcase: :desktop_computer: Öffnen Sie im Browser die URL [http://IP-ADRESSE](http://IP-ADRSSE), wobei Sie `IP-ADRESSE` durch die IP-Adresse Ihrer VM ersetzen. Es sollte eine Debian-Beispielseite angezeigt werden. Machen Sie einen Screenshot von Ihrem Browser.

#### Statische Beispielseite

Webseiten werden gemäss Konvention im Verzeichnis `/var/www` verwaltet.  Erstellen Sie ein neues Unterverzeichnis namens `modulbaukasten`:

```bash
sudo mkdir /var/www/modulbaukasten
```

Erstellen Sie eine Datei namens `index.html` mit folgendem Inhalt:

```html
<!DOCTYPE html>
<html lang="de">
    <head>
        <title>Modulbaukasten</title>
    </head>
    <body>
        <h1>Modulbaukasten</h1>
    </body>
</html>
```

Verschieben Sie die Datei nun mit dem `mv`-Befehl ins zuvor erstellte Verzeichnis:

Damit die Seite erreichbar wird, muss eine neuer _virtueller Host_ konfiguriert werden. Erstellen Sie hierzu eine Datei namens `modulbaukasten.conf` mit folgendem Inhalt:

```apache
<VirtualHost *:80>
    DocumentRoot    /var/www/modulbaukasten
    ServerName      localhost
</VirtualHost>
```

Verschieben Sie die Datei anschliessend zum Apache-Verzeichnis der _verfügbaren
Seiten_ `/etc/apache2/sites-available`:

:briefcase: :desktop_computer: **Kontrollfrage 1**: Was beinhalten die beiden Unterverzeichnisse `sites-available/` und `sites-enabled/` im Apache-Konfigurationsverzeichnis `/etc/apache2`? Tipp: Verwenden Sie den Befehl `ls -l`. Halten Sie die Ausgabe in Ihrer Dokumentation fest.

Die Debian-Beispielseite soll nun _deaktiviert_; die neu konfigurierte
Modulbaukasten-Seite _aktiviert_ werden:

```bash
sudo a2dissite 000-default.conf
sudo a2ensite modulbaukasten.conf
```

:briefcase: :desktop_computer: **Kontrollfrage 2**: Was beinhalten `sites-available/` und `sites-enabled/` _jetzt_? Halten Sie die Ausgabe von `ls -l` erneut in Ihrer Dokumentation fest.

Veranlassen Sie Apache nun via systemd zum Neuladen der Konfiguration (siehe Ausgabe der letzten beiden Befehle).

Die neue Beispielseite kann unter [http://IP-ADRESSE](http://IP-ADRESSE) betrachtet werden.

:briefcase: :desktop_computer: Halten Sie einen Screenshot des Browsers mit angezeigter Seite fest.

## Aufgabe 2: MariaDB

Der Modulbaukasten soll von einer statischen in eine dynamische Webseite
umgewandelt werden. Die veränderbaren Daten sollen dazu in einer Datenbank
abgelegt werden. Hierzu soll MariaDB zum Einsatz kommen.

Installieren Sie den MariaDB-Server mithilfe des `apt install`-Befehls. Tipp: Mit `apt search SUCHBEGRIFF` findet man den Namen des zu installierenden Pakets.

Die Standardinstallation lässt sich zur Verbesserung der Sicherheit _härten_,
wozu MariaDB einen Assistenten bietet, den Sie ausführen sollen:

```bash
sudo mariadb-secure-installation
```

:briefcase: Befolgen Sie die Anweisungen auf dem Bildschirm und halten Sie die
Fragen und Ihre Antworten darauf (mit einer kurzen Begründung) unter
**Kontrollfrage 3** fest.

Öffnen Sie nun eine interaktive `mariadb`-Sitzung:

```bash
sudo mariadb
```

Erstellen Sie einen neuen Benutzer mit dem Namen `moderator` und dem Passwort
`topsecret`:

```sql
CREATE USER moderator@localhost IDENTIFIED BY 'topsecret';
```

:briefcase: **Kontrollfrage 4**: Wozu dient wohl das Suffix `@localhost` hinter
dem Benutzernamen?

Erstellen Sie eine Datenbank namens `modulbaukasten`:

```sql
CREATE DATABASE modulbaukasten CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';
```

(Die Datenbank unterstützt den Unicode-Zeichensatz mithilfe der Kodierung UTF-8.)

Vergeben Sie dem Benutzer `moderator` alle Rechte für die Datenbank
`modulbaukasten`, forcieren Sie ein Neuladen der Berechtigungen und verlassen
Sie die MariaDB-Sitzung wieder:

```sql
GRANT ALL PRIVILEGES ON modulbaukasten.* TO moderator@localhost;
FLUSH PRIVILEGES;
EXIT
```

### Datenbanktabelle erstellen und befüllen

Für den Modulbaukasten soll eine Tabelle namens `modules` erstellt werden. Diese
Tabelle soll sogleich mit einigen Beispieldaten gefüllt werden.

Erstellen Sie eine Datei `modules.sql` mit folgendem Inhalt:

```sql
CREATE TABLE modules (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NULL
);

INSERT INTO modules (number, name, comment) VALUES
    (346, "Cloud-Lösungen konzipieren und relaisieren", "neue BiVo");
INSERT INTO modules (number, name, comment) VALUES
    (426, "Software mit agilen Methoden entwickeln", "alte BiVo");
INSERT INTO modules (number, name, comment) VALUES
    (114, "Codierungs-, Kompressions- und Verschlüsselungsverfahren einsetzen", "uralte BiVo");
INSERT INTO modules (number, name, comment) VALUES
    (450, "Applikationen testen", "Überschneidungen zu M426");
```

Fügen Sie dem Skript drei weitere `INSERT`-Befehle mit bereits absolvierten
Modulen hinzu, wobei Sie die `comment`-Spalte für Ihre persönliche
Vergangenheitsbewältigung missbrauchen dürfen. (Der offizielle
[Modulbaukasten](https://www.modulbaukasten.ch/) kann dabei hilfreich sein.)

Führen Sie das Skript nun folgendermassen aus:

```bash
mariadb --database=modulbaukasten --user=moderator --password=topsecret <modules.sql
```

**Falls es beim Einfügen der Werte zu einem Fehler gekommen ist**, löschen Sie
am besten die Tabelle:

```bash
echo 'DROP TABLE modules;' | mariadb -D modulbaukasten -u moderator -ptopsecret
```

(Die Parameter `--database`, `--user` und `--password` haben die Kurzvarianten
`-D`, `-u` und `-p`. Beachten Sie, dass zwischen dem Parameter `-p` und dem
Passwort _kein_ Leerzeichen steht.)

Korrigieren Sie Ihr Skript und versuchen Sie es erneut auszuführen, bis alle
Werte erfolgreich eingefügt werden konnten.

:briefcase: Halten Sie die Datei `modules.sql` in Iher Dokumentation fest.

Sie können sich die Tabelle folgendermassen ausgeben lassen:

```bash
echo 'SELECT * FROM modules;' | mariadb -D modulbaukasten -u moderator -ptopsecret -t
```

:briefcase: **Kontrollfrage 5**: Das Passwort `topsecret` ist in den obigen
Befehlen direkt mit dem Parameter `--password` bzw. `-p` mitgegeben worden. Ist
das eine gute Idee? Warum (nicht)?

## Aufgabe 3: PHP

Um die Informationen aus der Datenbank auf eine Webseite ausgeben zu können wird
PHP mit einem Zusatzpaket für den Datenbankzugriff benötigt:

```bash
sudo apt install -y php8.2 php-mysql
```

Der PHP-Interpreter kann sogleich mit einem Einzeiler getestet werden:

```bash
php -r 'echo("PHP Version " . phpversion() . " läuft.\n");'
```

:briefcase: **Kontrollfrage 6**: Welche Version von PHP wurde installiert
(dreistellige Versionsnummer)?

Die statische Seite unter `/var/www/modulbaukasten/index.html` soll zu einer
dynamischen PHP-Seite umgewandelt werden. Hierzu muss zuerst deren Dateiendung
angepasst werden:

```bash
sudo mv /var/www/modulbaukasten/index.html /var/www/modulbaukasten/index.php
```

Anschliessend soll sie mit einem Texteditor (wie z.B. `nano`) angepasst werden:

```bash
sudo nano /var/www/modulbaukasten/index.php
```

Fügen Sie der Datei folgenden Inhalt unterhalb vom `<h1>`-Element hinzu:

```php
<?php
    echo("<p>" . "PHP Version " . phpversion() . " läuft.</p>");
?>
```

Unter [http://IP-ADRESSE](http://IP-ADRESSE) sollte nun auch die Version von PHP
ausgegeben werden.

:briefcase: :desktop_computer: Halten Sie einen Screenshot vom Browser fest, in dem die Versionsnummer von PHP zu sehen ist.

Erstellen Sie eine weitere Seite namens `info.php` mit folgendem Inhalt:

```php
<?php
    phpinfo();
?>
```

Verschieben Sie die Datei ins selbe Verzeichnis wie `index.php`:

```bash
sudo mv info.php /var/www/modulbaukasten/
```

Rufen Sie nun die Seite unter [http://IP-ADRESSE/info.php](http://IP-ADRESSE/info.php) auf.

:briefcase: :desktop_computer: **Kontrollfrage 7**: Die Seite zeigt u.a. an, welche
_Server API_ im Einsatz ist. Welcher Wert wird in der rechten Spalte zu _Server
API_ angezeigt?

## Aufgabe 4: PHP-FPM

Bei einer Standardinstallation von Apache unter Debian wird PHP mit dem Modul
`mod_php` ausgeführt. Um die Ausführung von PHP per FastCGI besser skalierbar zu
machen, muss PHP-FPM mit einem entsprechenden Apache-Modul installiert werden:

```bash
sudo apt install -y php8.2-fpm libapache2-mod-fcgid
```

Beim ersten Paket handelt es sich um den PHP-FPM-Service, welcher die
PHP-Prozesse verwaltet. Das zweite Paket ist ein Apache-Modul, welches die
Ausführung von PHP-Code an PHP-FPM delegiert.

:briefcase: :desktop_computer: **Kontrollfrage 8**: Was beinhalten die beiden
Unterverzeichnisse `mods-enabled/` und `conf-enabled/` im
Apache-Konfigurationsverzeichnis `/etc/apache2`?

Zuerst soll `mod_php` deaktiviert werden:

```bash
sudo a2dismod php8.2
```

Anschliessend sollen die Konfiguration für PHP-FPM sowie das Modul für FastCGI
aktiviert werden:

```bash
sudo a2enconf php8.2-fpm
sudo a2enmod proxy_fcgi
```

:briefcase: :desktop_computer: **Kontrollfrage 9**: Was beinhalten die beiden
Unterverzeichnisse `mods-enabled/` und `conf-enabled/` im
Apache-Konfigurationsverzeichnis `/etc/apache2` _jetzt_?

Veranlassen Sie Apache zum Neuladen der Konfiguration, wie bereits weiter oben beim Konfigurieren der Modulbaukasten-Webseite.

Rufen Sie erneut die Seite unter [http://IP-ADRESSE/info.php](http://IP-ADRESSE/info.php) auf.

:briefcase: :desktop_computer: **Kontrollfrage 10**: Welcher Wert wird nun in
der rechten Spalte zu _Server API_ angezeigt? Halten Sie das als Screenshot fest.

Damit PHP-FPM auch ressourcenintensivere Anwendungen (wie z.B. Nextcloud)
ausführen kann, soll die Oberlimite für den Arbeitsspeicher, der von einem
PHP-Skript belegt werden darf, erhöht werden.

Diese Einstellung befindet sich in der Datei `/etc/php/8.2/fpm/php.ini`. Suchen
Sie nach der Einstellung `memory_limit`, die standardmässig auf `128M` (128
Megabyte) gesetzt sein sollte. Erhöhen Sie diese Angabe auf `256M` (256
Megabyte).

Speichern Sie die Änderungen ab und starten Sie den Service `php8.2-fpm` neu.

Rufen Sie erneut die Seite unter [http://IP-ADRESSE/info.php](http://IP-ADRESSE/info.php) auf.

:briefcase: :desktop_computer: **Kontrollfrage 11**: Welcher Wert wird nun in
der rechten Spalte zu `memory_limit` angezeigt? Halten Sie das als Screenshot fest.

## Aufgabe 5: Dynamische PHP-Seite

Da nun der ganze LAMP-Stack mit PHP-FPM in Betrieb ist, sollen die Module aus
der Datenbank nun dynamisch als Webseite dargestellt werden. Erstellen Sie
hierzu eine Datei namens `modules.php` mit folgendem Inhalt:

```php
<!DOCTYPE html>
<html lang="de">
    <head>
        <title>Modulbaukasten</title>
    </head>
    <body>
        <h1>Modulbaukasten</h1>
        <ol>
        <?php
            try {
                $db = new PDO("mysql:host=localhost;dbname=modulbaukasten", "moderator", "topsecret");
                foreach ($db->query("SELECT * FROM modules;") as $m) {
                    $id = $m['id'];
                    $number = $m['number'];
                    $description = $m['description'];
                    $comment = $m['comment'];
                    echo("<li value=\"{$id}\">");
                    echo("Modul {$number}: {$description} ({$comment})");
                    echo("</li>");
                }
            } catch (PDOException $e) {
                die($e);
            }
        ?>
        </ol>
    </body>
</html>
```

:briefcase: **Kontrollfrage 12**: Ist es sinnvoll, Benutzername und Passwort in
einer PHP-Datei zu hinterlegen? Warum (nicht)?

Verschieben Sie dieses PHP-Skript ins selbe Verzeichnis wie zuvor `info.php`:

```bash
sudo mv modules.php /var/www/modulbaukasten/
```

Rufen Sie die Seite unter [http://IP-ADRESSE/modules.php](http://IP-ADRESSE/modules.php) auf.

:briefcase: :desktop_computer: Erstellen Sie einen Screenshot der ausgegebenen Seite.

### Zusatzübung: Anpassung der Ausgabe

Der Modulbaukasten wird als geordnete Liste (HTML-Tags `<ol>` und `<li>`)
ausgegeben. Passen Sie die Datei `modules.php` so an, dass die Module
tabellarisch mit einer Titelzeile ausgegeben werden. Verwenden Sie hierzu die
HTML-Tags `<table>` (Tabelle), `<tr>` (Tabellenzeile), `<th>` (Titelzelle) und
`<td>` (normale Zelle).

Testen Sie die angepasste Ausgabe unter
[http://IP-ADRESSE/modules.php](http://IP-ADRESSE/modules.php) bis Sie mit der
Darstellung zufrieden sind.

:briefcase: :desktop_computer: Fügen Sie die angepasste Datei `modules.php` und
einen Screenshot der Ausgabe Ihrer Dokumentation hinzu.
