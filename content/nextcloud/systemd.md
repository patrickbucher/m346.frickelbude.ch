+++
title = "Service-Management mit systemd"
weight = 2
+++

## Theorie

Beim Aufstarten eines modernen Betriebssystems passiert einiges:

1. Das BIOS bzw. UEFI wird gestartet.
    - Initialisierung der Hardware
    - Ausführung von Selbsttests
2. Der Master Boot Record (MBR) wird geladen.
    - Ermittlung des Speicherorts des Bootloaders
3. Der Bootloader startet das Betriebssystem.
    - Abgabe der Kontrolle an den Kernel
    - Laden der Treiber
4. Der Kernel startet einen _Prozessmanager_.
    - PID 1: Erster Betriebssystem-Prozess

Im Kontext vom Cloud-Computing wird es ab Schritt 4 interessant, wenn der Prozessmanager gestartet wird. Ein Prozessmanager ist eine Implementierung eines _Service-Modells_. Betriebssysteme verwenden unterschiedliche Service-Modelle:

- Windows verwendet den _Windows Services Manager_ (`services.msc`).
- Unix/Linux/BSDs verfügt bietet verschiedene Systeme:
    - SysVinit ist das traditionelle System; es ist skriptbasiert und verwendet sogenannte Runlevels.
    - OpenRC ist ein moderneres skriptbasiertes System.
    - **systemd** ist ein modernes und sehr umfassendes System mit Targets, Timers usw. Dieses System kommt bei den meisten Linux-Distributionen zum Einsatz.
- macOS verwenden launchd.

### SysVinit: die "alte Welt"

_SysVinit_ (ausgesprochen: "System Five Init") stammt von der fünften Ausgabe von Unix aus dem Jahr 1983. Es ist als einzelnes C-Programm (`/usr/bin/init`) implementiert. Der Systemstart erfolgt in sogenannten _Runlevels_:

- 0: Halt (Ausschalten)
- 1: Single User Mode (Einbenutzermodus)
- 2: Multi User Mode (Mehrbenutzermodus)
- 3: Network Mode (Netzwerkmodus)
- 4: Undefined (undefiniert), kann nach Belieben angepasst werden
- 5: Graphical Mode (grafische Benutzeroberfläche)
- 6: Reboot (Neustart)

Für jedes Runlevel werden eine Reihe von Services gestartet oder beendet. Die einzelnen Skripte werden sequenziell durch Shell-Skripte gestartet. Die Sequenz wird durch Zahlen im Dateinamen der Skripte festgelegt.

SysVinit hat einige Schwächen und Probleme:

1. Der Systemstart ist langsam, da sequenziell.
2. Runlevels sind unflexibel.
3. Shell-Skripte sind fehleranfällig und starten viele Unterprozesse.
4. Das Logging ist Sache der einzelnen Services und darum nicht einheitlich.

Diese Probleme sollen durch modernere Init-Systeme bzw. Prozessmanager gelöst werden, wie z.B. durch systemd.

### systemd: Lösungen, Vorteile und Konsequenzen

Der Prozessmanager systemd wurde entwickelt, um die genannten Probleme von SysVinit zu lösen. Diese werden durch systemd folgendermassen gelöst, was Vorteile bietet, aber auch entsprechende Konsequenzen hat:

1. Services können parallel voneinander gestartet werden.
    - Der Systemstart erfolgt wesentlich schneller.
    - Abhängigkeiten müssen beachtet und korrekt definiert werden.
2. Services können zu _Targets_ gebündelt werden.
    - Runlevels sind nicht mehr nötig.
    - Targets müssen korrekt definiert werden.
3. Services (Targets, usw.) können einheitlich konfiguriert werden.
    - Shell-Skripte sind nicht mehr nötig.
    - Eine neue Konfigurationssyntax ist nötig.
4. Das Logging wird über ein Journal gelöst.
    - Das Logging wird dadurch vereinheitlicht und komprimiert.
    - Die Log-Konfiguration ist nun global; die Log-Betrachtung benötigt
      spezielle Programme.

Die Bezeichnung "systemd" steht für "System Daemon". Hinter systemd steckt also mehr als nur ein Init-Prozess: es ist eine komplette Lösung zur Systemverwaltung.

### Service-Abhängigkeiten

Die Services werden bei systemd nicht mehr in einer vorgegebenen Reihenfolge gestartet, sondern anhand deren Abhängigkeiten von anderen Services. Das folgende Bild zeigt ein fiktives System, das aus mehrern Services besteht:

![Ein Service mit Abhängigkeiten (Pfeil: "benötigt")](/img/service-dependencies.png)

Ein Pfeil von einem Service zu einem anderen Service drückt eine Abhängigkeit aus. Z.B. ist der Service `Web Server` vom Service `Storage` abhängig. Dadurch kann `Web Server` erst dann aufgestartet werden, wenn `Storage` gestartet ist. Soll der Service `Web Application` gestartet werden, müssen nicht nur die direkten Abhängigkeiten (`Mailing`, `Caching` usw.), sondern auch die _transitiven_ Abhängigkeiten (z.B. `Database` und `Storage`) zuerst aufgelöst und gestartet werden.

Überlegen Sie sich zuerst folgende Fragen und schauen Sie sich anschliessend die Antwort an:

> Manche Services können gleichzeitig, andere müssen nacheinander gestartet werden. In welchen Phasen können welche Services gestartet werden?

{{% expand title="Antwort" %}}
| Phase | Services                     |
|------:|------------------------------|
|     1 | Storage, Caching             |
|     2 | Web Server, Backup, Database |
|     3 | Cleanup Tasks, Mailing       |
|     4 | Web Application              |

Zur Lösung der Aufgabe kann man folgendemassen vorgehen:

1. Man ermittelt alle Services, die nur eingehende aber keine ausgehende Pfeile haben. Diese Services können gestartet werden.
2. Man verfolgt die eingehenden Pfeile zurück zu den abhängigen Services.
    1. Hat der abhängige Service nur ausgehende Pfeile auf bereits gestartete Services, kann er in der nächsten Phase gestartet werden.
    2. Hat der abhängige Service noch ausgehende Pfeile auf Services, die noch nicht gestartet worden sind, muss man den Start dieser Services abwarten.
3. Man wiederhole dieses Vorgehen bis alle Services gestartet sind.
{{% /expand %}}

Es gibt noch weitere Möglichkeiten, wie Services abhängig von anderen Vorgängen gestartet werden können:

- Ein _Target_ aktiviert verschiedene Services.
    - `network.target`: Netzerk starten (DHCP, DNS, SSH, WiFi)
    - `multi-user.target`: Anwendungen starten (DB-Server, Web-Server)
    - `graphical.target`: Desktop starten (Login-Manager, X Server)
- Ein Service soll _ereignisgesteuert_ gestartet werden.
    - _socket activation_: bei Verbindungseingang (erste Verwendung)
    - _path activation_: bei Bearbeitung einer Datei
    - _timer activation_: zeitlich festgelegt (z.B. stündlich, um Mitternacht)

### systemd: Aufbau und Komponenten

Zum Verständnis von systemd sollte man folgende Konzepte und Werkzeuge kennen:

- **PID 1** ist der erste Prozess, der durch das Betriebssystem gestartet wird. Bei systemd verweist das traditionelle Init-Programm `/usr/bin/init` auf die systemd-Implementierung `/usr/lib/systemd/systemd`.
- Eine **Unit**: ein konfigurierbares "Ding", z.B. ein Service oder ein Target.
- Die zwei wichtigsten Programme aus Anwendersicht sind `systemctl` zum Verwalten von Services und `journalctl` zum Verwalten von Log-Meldungen.
- Dazu gibt es viele **Hilfsprogramme** wie `systemd-analyze` zur Analyse des Startvorgangs oder `systemd-cat`, welches die Standardausgabe ins Journal weiterleitet (Logging).
- Weiter verfügt systemd über viele **Zusatzkomponenten** wie `resolvd` (ein DNS-Resolver) oder `systemd-boot` (ein Bootloader).

### Unit-Dateien

Eine Unit-Datei, die einen Service konfiguriert, sieht etwa folgendermassen aus:

```ini
[Unit]
Description=ping-pong server: you ping it, it pongs you
Documentation=https://github.com/patrickbucher/pingpong
After=network.target

[Service]
ExecStart=/usr/local/bin/pingpong
Type=simple
Restart=always

[Install]
WantedBy=multi-user.target
```

Hierbei handelt es sich um eine INI-Datei, die aus den drei Bereichen `Unit`, `Service` und `Install` besteht. Die einzelnen _Direktiven_ haben die folgende Bedeutung:

- `Unit`: Allgemeine Informationen zur Unit, unabhängig von der Art (z.B. Service, Target usw.)
    - `Description`: Eine textuelle Beschreibung der Unit.
    - `Documentation`: Verweis auf die Dokumentation zur Unit.
    - `After`: Abhängigkeit des Services.
- `Service`: Spezifische Unit-spezifische Informationen zur Service-Unit.
    - `ExecStart`: Verweis auf das zu startende Programm.
    - `Type`: Art des Services.
    - `Restart`: Unter welchen Umständen der Service automatisch neugestartet werden soll.
- `Install`: Definition zur Installation der Unit.
    - `WantedBy`: Bei welchem Ereignis die Unit aktiviert werden soll.

Es gibt u.a. folgende Arten von Units:

- **Service**: Hintergrunddienste
- **Target**: Gruppierung von Services
- **Socket**: Kommunikation zwischen und Aktivierung von Services
- **Mount**: Einhängen von Dateisystemen
- **Timer**: zeitlich ausgelöste Vorgänge
- **Path**: Aktivierung von Vorgängen aufgrund von Dateiänderungen
- **Slice**: cgroups, z.B. für Container

### Weiterführende Links

- [systemd.io](https://systemd.io/): Offizielle Webseite
- [Manual Pages](https://www.freedesktop.org/software/systemd/man/latest/): Offizielle Dokumentation
- [Rethinking PID 1](https://0pointer.de/blog/projects/systemd.html): Blog-Eintrag zur Motivation von systemd
- [systemd sucks](http://suckless.org/sucks/systemd/): Kritik an systemd

## Übungen

Bisher wurden im Modul 346 alle Serverdienste manuell gestartet (und beendet).
Betriebssysteme bieten jedoch Service-Modelle an, womit sich solche Dienste
komfortabel verwalten lassen. Im Linux-Umfeld hat sich dabei
[systemd](https://systemd.io/) durchgesetzt.

In den folgenden Übungen werden verschiedene Server-Anwendungen mithilfe von
systemd konfiguriert und verwaltet, wozu das Werkzeug `systemctl` zum Einsatz
kommt. Logdaten werden mit dem Werkzeug `journalctl` betrachtet.

### Teil 1 (geführt): Ping-Pong-Server

Der Ping-Pong-Server, den wir bereits bei den SSH-Übungen kennengelernt haben,
kann dazu verwendet werden, die Konnektivität zwischen verschiedenen Systemen zu
testen.

Dieser Server wurde bisher immer manuell gestartet. Neu soll er als Service
automatisch gestartet (und bei Ausfällen: automatisch neugestartet) werden.

#### Aufgabe 1: Ping-Pong-Server vorbereiten

Der Ping-Pong-Server steht als Datei [`pingpong.go`](/files/pingpong.go) zur Verfügung und kann auf dem Server folgendermassen heruntergeladen werden:

    wget https://m346.frickelbude.ch/files/pingpong.go

Kompilieren Sie das ausführbare Programm:

    go build pingpong.go

Neu befindet sich die ausführbare Datei `pingpong` im Verzeichnis. Starten Sie den Server:

    ./pingpong

Rufen Sie im Browser die URL [IP-ADRESSE:8000/ping](http://IP-ADRESSE:8000/ping)
auf, wobei Sie `IP-ADRESSE` durch die IP-Adresse Ihrer VM ersetzen müssen. Sie
sollten ungefähr folgende Ausgabe erhalten (die Portnummer kann abweichen):

    pong back to 127.0.0.1:57494

Im Terminal können Sie nun den Ping-Pong-Server mit der Tastenkombination
`[Ctrl]-[C]` wieder stoppen.

Verschieben Sie das ausführbare `pingpong`-Programm an einen anderen Ort, damit
es auch für andere Benutzer des Systems verfügbar wird:

    sudo mv pingpong /usr/local/bin/

#### Aufgabe 2: Ping-Pong-Service konfigurieren

Damit der Ping-Pong-Server mit systemd verwaltet werden kann, muss eine
sogenannte _Service-Unit_ eingerichtet werden. Öffnen Sie einen Texteditor und
erstellen Sie eine Datei, welche Sie mit folgendem Inhalt unter
`/home/user/pingpong.service` abspeichern:

```ini
[Unit]
Description=ping-pong server: you ping it, it pongs you
Documentation=https://github.com/patrickbucher/pingpong
After=network.target

[Service]
ExecStart=/usr/local/bin/pingpong
Type=simple
Restart=always

[Install]
WantedBy=multi-user.target
```

Verschieben Sie diese Datei nun ins Verzeichnis `/etc/systemd/system/`:

    sudo mv pingpong.service /etc/systemd/system/

Laden Sie die angepasste systemd-Konfiguration neu:

    sudo systemctl daemon-reload

##### Erläuterungen zum Service-Unit-File

Hierzu einige allgemeine Erklärungen zu den einzelnen Abschnitten und _Direktiven_:

- `[Unit]`: allgemeine Informationen zum Service
    - `Description`: eine kurze Beschreibung des Services
    - `Documentation`: ein Verweis auf eine Manpage oder auf eine Webseite mit Dokumentation
    - `After`: Abhängigkeiten zu anderen Services
- `[Service]`: Konfiguration des Services
    - `ExecStart`: der Befehl zum Starten des Services
    - `Type`: die Art der Service-Ausführung
- `[Install]`: Informationen zur Installation des Services
    - `WantedBy`: an welchem Punkt des Systemstarts der Servie ausgeführt werden soll

Wichtig sind bei diesem Beispiel die folgenden Direktiven:

- `After=network.target`: Der Service wird erst ausgeführt, wenn das Netzwerk bereit ist.
- `ExecStart=/usr/local/bin/pingpong`: Der Service wird durch die Ausführung dieser Datei gestartet.
- `WantedBy=multi-user.target`: Der Service soll automatisch gestartet werden,
wenn das System beim Hochfahren in den Mehrbenutzermodus wechselt.

#### Aufgabe 3: Ping-Pong-Service starten, beenden und neustarten

Der Ping-Pong-Service kann nun folgendermassen gestartet werden:

    sudo systemctl start pingpong.service

Ermitteln Sie den Zustand des Services mit folgendem Befehl:

    systemctl status pingpong.service

Die Ausgabe sollte auf der dritten Zeile folgende Angabe enthalten:

    Active: active (running) since ...

Ist dies _nicht_ der Fall, kontrollieren Sie noch einmal alle Schritte der
ersten beiden Aufgaben und starten Sie den Service erneut wie oben beschrieben
mit `systemctl start`.

Hat alles funktioniert, rufen Sie testhalber erneut im Browser die Seite
[IP-ADRESSE:8000/ping](http://IP-ADRESSE:8000/ping) auf.

Stoppen Sie den Service nun wieder:

    sudo systemctl stop pingpong.service

Starten Sie den Service automatisch beim Systemstart, indem Sie folgenden Befehl ausführen:

    sudo systemctl enable --now pingpong.service

(Mit dem `--now`-Flag wird der Service sofort gestartet.)

Testen Sie den Service erneut im Browser. Starten Sie ihn anschliessend mit folgendem Befehl neu:

    sudo systemctl restart pingpong.service

Beim nächsten Aufruf im Browser sollte sich nun in der Antwort die Portnummer geändert haben.

#### Aufgabe 4: Logdaten vom Ping-Pong-Service einsehen

Da der Ping-Pong-Server nicht mehr manuell über das Terminal gestartet wird,
können wir dessen Logmeldungen nicht mehr auf dem Bildschirm sehen. Diese
Meldungen werden stattdessen ins sogenannte _Journal_ geschrieben.

Um zu sehen, was auf dem System gerade alles läuft, kann das Journal fortlaufend ausgegeben werden:

    sudo journalctl -f

Öffnen Sie ein zweites Terminal und starten Sie dort den Ping-Pong-Service neu:

    sudo systemctl restart pingpong.service

In der Journal-Ausgabe sollten Sie nun entsprechende Meldungen über den Neustart des Ping-Pong-Servers sehen.

Stoppen Sie die fortlaufende Anzeige des Journals mit mit `[Ctrl]-[C]`.

Starten Sie dafür die fortlaufende Anzeige der Meldungen, die den
Ping-Pong-Server betreffen.

Starten Sie nun den Ping-Pong-Service in einem anderen Terminal neu und rufen
Sie die URL [IP-ADRESSE:8000/ping](http://IP-ADRESSE:8000/ping) einige Male auf.

Unterbrechen Sie die fortlaufende Ausgabe des Journals wieder mit `[Ctrl]-[C]`.

#### Aufgabe 5: Startparameter vom Server-Prozess anpassen

Der Ping-Pong-Server unterstützt zwei Flags:

    $ pingpong -help
    Usage of pingpong:
    -addr string
            web server host/ip (default "0.0.0.0")
    -port uint
            web server port (default 8000)

- Das `-addr`-Flag ist standardmässig auf `0.0.0.0` eingestellt, wodurch
  Verbindungen von überall her zugelassen werden.
- Das `-port`-Flag ist standardmässig auf `8000` eingestellt.

Möchte man dem Ping-Pong-Server beispielsweise einen Proxy vorschalten, können
diese beiden Flags nützlich sein:

- `-addr 127.0.0.1`: Es sollen nur noch Verbindungen von `localhost`
  entgegengenommen werden, damit man von aussen nicht um den Proxy herumkommt.
  (Mit dem Cloud-VM-Setup ist diese Einstellung aber nicht sinnvoll.)
- `-port 8001`: Der Service soll unter Port `8001` laufen, da der Port `8000`
  neu vom Proxy besetzt wird.

Öffnen Sie die Unit-Datei `/etc/systemd/system/pingpong.service` mit einem Texteditor (hier: mit `nano`):

    sudo nano /etc/systemd/system/pingpong.service

Passen Sie nun die `ExecStart`-Direktive folgendermassen an:

    ExecStart=/usr/local/bin/pingpong -addr 0.0.0.0 -port 8001

Speichern Sie die Datei mit `[Ctrl]-[O]` und `[Enter]` ab. Schliessen Sie den editor mit `[Ctrl]-[X]`.

Laden Sie nun die angepasste systemd-Konfiguration neu:

    sudo systemctl daemon-reload

Starten Sie den Ping-Pong-Service neu:

    sudo systemctl restart pingpong.service

Rufen Sie im Browser die URL [IP-ADRESSE:8001/ping](http://IP-ADRESSE:8001/ping)
auf, um zu testen, ob der Server wirklich unter dem neuen Port `8001` läuft.

#### Aufgabe 6: Privilegien des Ping-Pong-Services einschränken

Führen Sie den folgenden Befehl aus:

    ps -e -o pid,user,args | grep pingpong

Erläuterungen:

- Mit `ps` werden laufende Prozesse angezeigt.
    - Mit `-e` ("everything") werden alle Prozesse angezeigt.
    - Mit `-o` ("output) werden die auszugebenden Spalten festgelegt.
        - `pid` steht für die Prozess-ID.
        - `user` steht für den ausführenden Benutzer des Prozesses.
        - `args` steht für die Befehlszeile, mit welcher der Prozess gestartet worden ist.
- Mit `grep` wird die Ausgabe nach dem Wort `pingpong` gefiltert.

Sie sollten ungefähr folgende Ausgabe sehen, wobei die erste Spalte (`pid`) variieren kann:

       6384 root     /usr/local/bin/pingpong -addr 127.0.0.1 -port 8001
       6515 user     grep pingpong

Der Prozess hat die PID `6384` und wird durch den Benutzer `root` ausgeführt.
(Die zweite Zeile steht für den `grep`-Befehl, womit die Filterung der Ausgabe
stattfindet.)

Die Ausführung durch `root` ist problematisch, da der Prozess nun mit
Administratoren-Rechten läuft. (Im Falle einer Sicherheitslücke im
Ping-Pong-Server könnte ein Angreifer Administratoren-Rechte erhalten.)

Erstellen Sie einen neuen Benutzer namens `pingpong`:

    sudo useradd -M -U pingpong

- Mit `-M` wird _kein_ Home-Verzeichnis für den neuen Benutzer erstellt.
- Mit `-U` wird gleich eine Benutzergruppe für den neuen Benutzer erstellt.

Damit der Ping-Pong-Service mit dem entsprechenden Benutzer ausgeführt wird, muss die Service-Unit entsprechend angepasst werden.

Öffnen Sie die Unit-Datei `/etc/systemd/system/pingpong.service`:

    sudo nano /etc/systemd/system/pingpong.service

Erweitern Sie den `[Service]`-Abschnitt um die folgenden beiden Direktiven:

    User=pingpong
    Group=pingpong

Speichern (`[Ctrl]-[O] [Enter]`) und schliessen (`[Ctrl]-[X]`) Sie den Texteditor.

Laden Sie die systemd-Konfiguration neu:

    sudo systemctl daemon-reload

Starten Sie nun den Ping-Pong-Service neu:

    sudo systemctl restart pingpong.service

Überprüfen Sie noch einmal, mit welchem Benutzer der Service nun ausgeführt wird:

    ps -e -o pid,user,args | grep pingpong

Die Ausgabe sollte ungefähr folgendermassen aussehen:

       6649 pingpong /usr/local/bin/pingpong -addr 127.0.0.1 -port 8001
       6704 user     grep pingpong

### Teil 2 (selbständig): Minio

Mit [Minio](/hauptdatentypen/unstrukturierte/minio) haben Sie bereits
gearbeitet. Dabei haben Sie den Minio-Server manuell ausgeführt und (teils
versehentlich) wieder mit `[Ctrl]-[C]` gestoppt.

Neu soll Minio als Service ausgeführt und beim Start des Betriebssystems
automatisch mitgestartet werden. 

#### Aufgabe 7: Minio vorbereiten

Die beiden ausführbaren Dateien `minio` und `mc` sollten bereits auf dem System vorhanden sein. Laden Sie diese Programme andernfalls mit `wget` herunter. Die Download-Links erhalten Sie auf der [offiziellen Download-Seite](https://min.io/open-source/download?platform=linux) (MinIO Server und MinIO Client für Linux) und verschieben Sie diese ausführbaren Dateien nach `/usr/local/bin`.

Erstellen Sie anschliessend einen eigenen Benutzer für Minio:

    sudo useradd -m -d /home/minio -U -s /usr/bin/bash minio

(Dieses mal wir mit `-m -d /home/minio` ein Home-Verzeichnis für den neuen
Benutzer angelegt. Mit `-s /usr/bin/bash` wird die Bash als Login-Shell
gesetzt.)

Erstellen Sie weiter ein Minio-Datenverzeichnis:

    sudo -u minio mkdir /home/minio/minio-data

(Mit `sudo -u minio` wird der Befehl mit dem Benutzer `minio` ausgeführt, sodass
das neu erstellte Verzeichnis gleich ihm gehört.)

Starten Sie eine neue Shell-Sitzung mit dem Benutzer `minio`:

    sudo su - minio

Starten Sie nun Minio ein letztes Mal manuell, indem Sie die folgenden Befehle auf der Shell eingeben:

    export MINIO_ROOT_USER=minio
    export MINIO_ROOT_PASSWORD=topsecret
    minio server --console-address ':9090' ~/minio-data

Überprüfen Sie im Browser unter der URL [IP-ADRESSE:9090](http://IP-ADRESSE:9090)
ob Minio wirklich läuft.

Wechseln Sie zurück ins Terminal und stoppen Sie Minio wieder mit `[Ctrl]-[C]`.

Verlassen Sie die Terminal-Sitzung des Benutzes `minio` mit dem `exit`-Befehl,
sodass Sie wieder folgende Eingabeaufforderung sehen:

    user@VORNAME-NACHNAME:~$

#### :briefcase: Aufgabe 8: Minio-Service konfigurieren und ausführen

Kopieren Sie sich die `pingpong.service`-Unit-Datei als `minio.service` ins Home-Verzeichnis:

    cp /etc/systemd/system/pingpong.service ~/minio.service

Öffnen Sie die Datei nun in einem Texteditor Ihrer Wahl.

Passen Sie die folgenden Direktiven an:

- Abschnitt `[Unit]`
    - `Description`: Beschreiben Sie in eigenen Worten, was Minio macht.
    - `Documentation`: Fügen Sie einen Link auf die Minio-Dokumentation ein.
- Abschnitt `[Service]`
    - `ExecStart`: Verwenden Sie die Befehlszeile von Aufgabe 7.
    - `User` und `Group`: Tragen Sie den richtigen Benutzer bzw. die richtige Benutzergruppe ein.

Fügen Sie dem `[Service]`-Abschnitt weitere Direktiven hinzu:

- `WorkingDirectory`: Verwenden Sie das Home-Verzeichnis des ausführenden Benutzers.
- `Enviromment`: Setzen Sie die nötigen Umgebungsvariablen. (Tipp: Verwenden Sie
  pro Umgebungsvariable eine eigene `Environment`-Direktive.)

Verschieben Sie die Datei nun ins systemd-Konfigurationsverzeichnis:

    sudo mv ~/minio.service /etc/systemd/system/

Laden Sie die systemd-Konfiguration neu und starten Sie den Minio-Service:

    sudo systemctl daemon-reload
    sudo systemctl start minio.service

Überprüfen Sie im Browser und mit `systemd status` ob Minio wirklich läuft.

Ist dies _nicht_ der Fall, überprüfen und korrigieren Sie das Service-Unit-File.

Läuft Minio, aktivieren Sie den Service für den nächsten Systemstart:

    sudo systemctl enable minio.service

**Halten Sie folgendes in Ihrer Dokumentation fest:**

1. Die Unit-Datei `/etc/systemd/system/minio.service` als `minio-service.ini`.
2. Die Ausgabe von `systemctl status minio.service` als `minio-status.txt`.
3. Die Journal-Ausgabe von `sudo journalctl -u minio.service` als `minio-logs.txt`.

Die Ausgabe eines Befehls (z.B. `journalctl -f`) kann folgendermassen in einer Datei (z.B. `output.txt`) festgehalten werden:

    journalctl -f > output.txt

#### Aufgabe 9: Umgebungsvariablen auslagern

Legen Sie mit dem Benutzer `minio` die Datei `/home/minio/environment` an:

    sudo -u minio touch /home/minio/environment

Ersetzen Sie die `Environment`-Direktiven aus der Unit-Datei
`/etc/systemd/system/minio.service` durch eine einzige
`EnvironmentFile`-Direktive und definieren Sie die Umgebungsvariablen
stattdessen in folgender Form in `/home/minio/environment`:

    Variable1=Wert1
    Variable2=Wert2

Schränken Sie die Zugriffsrechte dieser Datei auf den Benutzer `minio` (und auf
die Benutzer seiner Gruppe) ein:

    sudo -u minio chmod 640 /home/minio/environment

Laden Sie die systemd-Konfiguration und starten Sie den Minio-Service neu.

Dadurch werden Benutzernamen und Passwort nicht mehr in der Systemkonfiguration
sondern im Home-Verzeichnis des jeweiligen Benutzers abgelegt, was eine höhere
Sicherheit bietet. (Unit-Dateien in `/etc/systemd/system` können alle Benutzer
einsehen.)

#### :briefcase: Aufgabe 10: Mount-Unit für Minio-Service

Mit systemd können sogenannte _Mount-Units_ definiert werden. Mit einem Mount
wird ein Speichergerät an einer bestimmte Stelle im Dateisystem eingehängt,
z.B. die Partition `/dev/sda2` ins Verzeichnis `/var`. Wird ein Mount als Unit
definiert, kann das Einhängen direkt beim Systemstart erfolgen.

Mit der `After`-Direktive kann angegeben werden, dass ein Service erst dann
gestartet werden soll, wenn eine andere Unit bereit ist. Dies kann eine
Service-Unit oder auch eine Mount-Unit sein.

Überlegen Sie sich, wie man die `After`-Direktive mit einer Mount-Unit
sinnvollerweise für eine grössere Minio-Installation verwenden könnte. **Halten
Sie Ihre Antwort in Ihrer persönlichen Dokumentation fest.**

### systemd-Dokumentation

Weiterführende Hilfe zu den Befehlen und Konzepten erhalten Sie in den
[Manpages](https://www.freedesktop.org/software/systemd/man/latest/):

- [`man systemd`](https://www.freedesktop.org/software/systemd/man/latest/systemd.html#): Überblick über systemd
- [`man systemctl`](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html#): Services kontrollieren
- [`man journalctl`](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html#): Logdaten einsehen
- [`man systemd.service`](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#): Service-Einheiten konfigurieren
- [`man systemd.mount`](https://www.freedesktop.org/software/systemd/man/latest/systemd.mount.html#): Mount-Einheiten konfigurieren
