+++
title = "SSH: Secure Shell"
weight = 2
+++

## Problem

Oft ist man im Arbeitsalltag vor das Problem gestellt, dass man eine
Kommunikation zwischen zwei entfernten Computern ermöglichen soll. Mögliche
Szenarien hierfür sind…

- die Fernwartung eines Servers,
- der Zugriff auf zentral abgelegte Ressourcen oder
- eine Peer-to-Peer-Dateiübertragung.

## Desktop- und Server-Umgebungen 

Für die Fernwartung eines Desktop-Computers gibt es Lösungen wie das _Remote
Desktop Protocol_ unter Windows oder _TeamViewer_ für verschiedene
Betriebssysteme.

Da Desktop-Umgebungen sehr ressourcenintensiv sind, wird auf Server-Systemen
oftmals keine grafische Benutzeroberfläche installiert. Der Server, auf dem
diese Webseite gehosted ist, verfügt beispielsweise über folgende (virtuelle)
Hardware-Ressourcen:

- 512 MB Arbeitsspeicher
- 1 CPU mit 2198 MHz
- 10 GB Festplattenspeicher

Das sind Hardware-Spezifikationen, wie sie ungefähr vor 20 Jahren bei
Desktop-Computern verbreitet waren, genügen aber heutzutage noch völlig, um
kleinere Web-Anwendungen mit relativ wenig Zugriffen auszuführen. Und je weniger
Ressourcen verbraucht werden, desto weniger Kosten entstehen, wenn das System
über einen Cloud-Anbieter bezogen wird (IaaS).

Ist keine Desktop-Umgebung verfügbar, stehen Lösungen wie _Windows Remote
Management_ (WinRM) oder die _Secure Shell_ (SSH) zur Verfügung. In diesem Modul
soll SSH im Vordergrund stehen, weil dies eine weit verbreitete, sehr erprobte,
sichere und zuverlässige Lösung ist, die Clients für alle gängigen
Betriebssysteme anbietet. Ausserde ist SSH der Industriestandard für den
Fernzugriff auf Linux-Systeme, die in diesem Modul zum Einsatz kommen.

## Telnet

Eine ältere Lösung zum Fernzugriff auf andere Systeme ist _Telnet_. Damit lässt
sich eine textorientierte Verbindung zu beispielsweise einem Webserver
aufnehmen, indem man eine Adresse und einen Port angibt:

    $ telnet ADDRESS PORT

Ist eine Verbindung aufgenommen, kann man interaktiv mit diesem System
kommunizieren. Spricht man beispielsweise einen Webserver auf Port 80 an, kann
man diesem HTTP-Anfragen schicken (sofern er noch Inhalt unter diesem Port
ausliefert):

    $ telnet www.website.com 80
    GET /index.html HTTP/1.1

    <!DOCTYPE html>
    <html>
        <head>
            <title>Some Website</title>
    …

Da Telnet unverschlüsselt kommuniziert, sollte es heutzutage nur noch als
Port-Scanner eingesetzt werden. (Ist der angegebene Port geschlossen, wird erst
gar keine Sitzung aufgebaut.)

## Hintergrund und Funktionsweise

SSH ist ein Protokoll, wofür es mehrere Implementierungen gibt. Die
Referenzimplementierung ist [OpenSSH](https://www.openssh.com) und wird im
Rahmen des Unix-artigen Betriebssystems [OpenBSD](https://www.openbsd.org/)
weiterentwickelt, welches sehr hohen Wert auf Sicherheit legt. OpenSSH ist im
Lieferumgang der Git Bash enthalten.

SSH arbeitet mit asymmetrischer Kryptographie. Sowohl der Server als auch der
Client verfügen über ein Schlüsselpaar, wobei der private Schlüssel gut zu
schützen ist und der öffentliche Schlüssel auf andere Systeme verteilt werden
darf. (Aus Effizienzgründen wird beim erfolgreichen Verbindungsaufbau ein
symmetrischer Schlüssel generiert, womit dann der Datenverkehr für die laufende
Sitzung verschlüsselt wird.)

SSH arbeitet nach dem Client-Server-Prinzip: Auf einem Server, der per SSH
zugänglich ist, muss der SSH-Daemon `sshd` laufen.  Clients verwenden das
interaktive Client-Programm `ssh` ‒ zumindest für interaktive Sitzungen oder
einzelne auf dem Server auszuführende Befehle. Es gibt weitere Client-Programme
wie z.B. `scp` oder `sftp` zum sicheren Kopieren von Daten zwischen entfernten
Systemen.

## Bedienung

Ein SSH-Schlüsselpaar kann mit dem Programm `ssh-keygen` erstellt werden:

    $ ssh-keygen -t ed25519 -C vorname_nachname@sluz.ch

Eine interaktive Sitzung mit einem Server kann folgendermassen gestartet werden:

    $ ssh user@server

Haben der lokale Benutzer und derjenige auf dem Server den gleichen Namen, kann
der Benutzername auch weggelassen werden:

    $ ssh server

Beim Verbindungsaufbau muss man das Passwort vom Benutzer eingeben. Dem kann man
Abhilfe schaffen, indem man seinen öffentlichen SSH-Schlüssel auf das entfernte
System kopiert:

    $ ssh-copy-id user@server

Es ist auch möglich, keine interaktive Sitzung zu eröffnen, sondern nur einen
einzigen Befehl auf dem entfernten System auszuführen:

    $ ssh server 'sudo apt install htop'

Mit diesem Befehl wird auf einem Debian-artigen Linux-Server das Programm `htop`
installiert.

Weiter können Daten mit `scp` verschlüsselt übertragen werden:

    $ scp ~/script.py server:bin/
    $ scp server:/backup/db.sql ~/backup.sql

Der erste Befehl kopiert die Datei `script.py` aus dem lokalen Home-Verzeichnis
ins `bin`-Unterverzeichnis vom Home-Verzeichnis des Benutzers auf dem Server.

Der zweite Befehl kopiert die Datei `/backup/db.sql` vom Server ins lokale
Home-Verzeichnis unter den Namen `backup.sql`.

## SSH-Tunnel

TODO: Einführung

### Local Forwarding

TODO: Beschreibung

![SSH Local Forwarding](/img/local-forwarding.png)

### Remote Forwarding

TODO: Beschreibung

![SSH Remote Forwarding](/img/remote-forwarding.png)
