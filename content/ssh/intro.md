+++
title = "Einführung"
weight = 1
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
Betriebssysteme anbietet. Ausserdem ist SSH der Industriestandard für den
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

Oftmals steht man vor dem Problem, dass man von ausserhalb eines Servers auf
eine bestimmte Anwendung auf diesem Server zugreifen muss, der entsprechende
Port aber nicht offen ist (von der Firewall blockiert) oder die Anwendung nur
Verbindungen von `localhost` entgegennimmt (da der Zugriff normalerweise nur von
hier aus nötig ist).

**Beispielszenario I**: Eine Anwendung läuft auf einem Server und greift auf
eine Datenbank zu. Die Datenbank läuft auf Port `5432` (PostgreSQL). Die
Datenbank lauscht auf `127.0.0.1:5432`, d.h. nimmt nur lokale Verbindungen
entgegen. (Lauschte sie auf `0.0.0.0:5432`, wären auch Verbindungen von aussen
möglich. Hierzu müsste aber die Datenbank besser geschützt werden, z.B. per
Passwort. Der Angriffsvektor wird dadurch aber grösser!)

Ein anderes ‒ wenn auch selteneres ‒ Problem ist, dass zwar der Zugriff von
einem Client auf einen Server möglich ist, man aber keine Möglichkeit hat, vom
Server her auf einen Client zuzugreifen. Einerseits verfügt der Client nicht
über eine öffentliche IP-Adresse oder eine vergleichbare öffentlich erreichbare
Adressierung (z.B. DynDNS). Andererseits dürfte der Clients hinter einer
Firewall sein, welche Zugriff von aussen (_ingress_) her nicht erlaubt.
(Ausgehende Verbindungen, _egress_, werden im geringeren Ausmass blockiert.)

**Beispielszenario II**: Eine Anwendung läuft auf einem Server und funktioniert
nicht wie gewünscht. Ein Benutzer schildert das Verhalten, doch der Entwickler
der Anwendung kann dieses auf seiner lokalen Entwicklungsumgebung aber nicht
nachvollziehen. Schön wäre es, wenn der Benutzer den Anwendungsfall auf dem
Computer des Entwicklers durchspielen könnte. Der Benutzer und der Entwickler
sind aber nicht am gleichen Ort. Der Rechner des Entwicklers ist wiederum nicht
vom Internet her zugreifbar.

In diesen beiden Szenarien schafft SSH Abhilfe, indem es einen sicheren Kanal
zwischen zwei Systemen erzeugt, über den ein Port, der geschlossen ist,
"getunnelt" werden kann. Dieses Verfahren bezeichnet man entsprechend als "SSH
Tunneling".

### Local Forwarding

Beim _Local Forwarding_ wird das Problem aus Beispielszenario I gelöst. Hierbei
möchte man Zugriff auf eine Anwendung erhalten, deren Port nicht freigegeben
ist, oder die nur Verbindungen von `localhost` entgegennimmt.

Die Lösung ist ein SSH-Tunnel, wobei ein lokaler Port auf dem Client auf einen
entfernten Port auf dem Server umgeleitet wird. Der betreffende Port muss dabei
_nicht_ offen sein, denn die Kommunikation findet über den SSH-Port `22` statt.
(Dieser muss natürlich offen sein. Doch SSH-Zugriff ist in der Regel erlaubt.)

![SSH Local Forwarding](/img/local-forwarding.png)

Möchte man vom Client her eine Weiterleitung vom lokalen Port `1234` auf den
entfernten Port `5432` erstellen, verwendet man den folgenden Befehl:

    $ ssh -L localhost:1234:server:5432 user@server

Erklärung:

- Das Flag `-L` steht für _Local_ Forwarding.
- Die Angabe `localhost:1234` ist der Port, den man lokal ansteuern möchte
  (Weiterleitung von).
- Die Angabe `server:5432` ist der Port, den man auf dem Server verwenden möchte
  (Weiterleitung zu).
- Mit `user@server` wird die SSH-Verbindung mit dem jeweiligen Benutzer auf das
  entfernte System aufgenommen.

Ist diese SSH-Sitzung offen, kann der Benutzer via `localhost:1234` auf die
Datenbank zugreifen. Die Kommunikation erfolgt verschlüsselt und wird auf
`server:5432` weitergeleitet. Wird die Verbindung geschlossen, ist auch kein
Zugriff auf die Datenbank von aussen mehr möglich.

### Remote Forwarding

Beim _Remote Forwarding_ wird das Problem aus Beispielszenario II gelöst.
Hierbei soll der Zugriff vom Server aus auf den Client umgeleitet werden.

Konkret möchte der Entwickler aus dem Beispielszenario die Anwendung lokal bei
sich laufen lassen, und die Anfragen, die vom Benutzer auf dem Server eingehen,
auf seinen Computer weiterleiten.

Die Lösung ist ein SSH-Tunnel, wobei ein entfernter Port auf dem Server auf
einen lokalen Port auf dem Client umgeleitet wird. Hierzu ist es nicht nötig,
dass der Client vom Internet aus zugreifbar ist, solange der SSH-Port `22` offen
ist.

Wichtig: Auch hier wird die Verbindung vom Client auf den Server erstellt. Die
Weiterleitung des Ports erfolgt aber in entgegengesetzter Richtung!

![SSH Remote Forwarding](/img/remote-forwarding.png)

Möchte man vom Server her eine Weiterleitung vom Port `8080`, worauf die
Anwendung läuft, auf den lokalen Port `1234`, worauf die Anwendung auf dem
Entwickler-Computer läuft, einrichten, verwendet man den folgenden Befehl:

    $ ssh -R server:8080:localhost:1234 user@server

Erklärung:

- Das Flag `-R` steht für _Remote Forwarding_.
- Die Angabe `server:8080` ist der Port, von auf den die Anfragen auf dem Server
  eingehen.
- Die Angabe `localhost:1234` ist der Port, auf den die Anfragen weitergeleitet
  werden sollen.
- Mit `user@server` wird die SSH-Verbindung mit dem jeweiligen Benutzer auf das
  entfernte System aufgenommen.

Bevor diese SSH-Sitzung mit Remote Forwarding eröffnet werden kann, muss die
Serveranwendung auf Port `8080` geschlossen werden, damit der Port frei wird.
Solange die SSH-Sitzung offen ist, werden die Anfragen, die auf dem Server unter
Port `8080` eingehen, auf den Computer des Entwicklers umgeleitet.

#### Warnung

Remote Forwarding ist eine sehr mächtige ‒ und darum auch eine sehr
_gefährliche_ Technik! Schliesslich merkt der entfernte Benutzer nicht, dass
seine Anfragen nicht mehr vom Server sondern von einem Entwickler-Computer
behandelt werden. Dies bietet dem Entwickler die Möglichkeit, den Benutzern eine
angepasste Version seiner Anwendung ausführen zu lassen, die möglicherweise
bösartige Anpassungen enthält. (Man denke an eine eBanking-Anwendung, welche
Beträge oder das Zielkonto manipuliert.)

Aus diesem Grund ist SSH Remote Forwarding oftmals deaktiviert. Auch wenn es
aktiv ist, sollte es nur nach Abspache mit dem Systemadministrator verwendet
werden.
