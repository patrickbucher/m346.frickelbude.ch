+++
title = "SSH: Übung"
weight = 2
+++

In dieser Übung soll der Gebrauch von SSH und von SSH-Tunneln mit einer bereitgestellten Cloud-VM eingeübt werden.

## Voraussetzungen

- Die [Git Bash](https://git-scm.com/downloads) ist unter Windows installiert oder als portable Version verfügbar. (Unter macOS und Linux stehen die Befehle `ssh-keygen`, `ssh` und eine Unix-Shell bereits zur Verfügung.)
- Es wurde ein SSH-Schlüssel erzeugt und der Lehrperson abgegeben.
- Die Lehrperson stellt eine virtuelle Maschine mit hinterlegtem SSH-Schlüssel bereit.

## Aufgabe 0: Ergebnissicherung

Halten Sie für die folgenden Aufgaben jeweils folgendes fest:

1. die Antworten auf die gestellten Fragen
2. die verwendeten Befehle, bei denen man selbständig etwas ergänzen muss
3. die dabei gemachten Erkenntnisse

Die Form der Dokumentation ist frei. Sie soll der Lehrperson auf Nachfrage gezeigt werden können und fliesst in die Bewertung ein (Prädikate).

**Achtung**: Die virtuellen Maschinen werden am Ende des Unterrichts unwiederbringlich _gelöscht_! Die Befehle müssen darum _lokal_ festgehalten werden und können nicht auf dem Server nachgeschaut werden.

## Aufgabe 1: Verbindung aufnehmen

Nehmen Sie die Verbindung zu Ihrem Server auf, indem Sie den folgenden Befehl in der Bash eingeben:

    ssh user@[IP-Adresse]

Ist der zu verwendende private Schlüssel _nicht_ unter `~/.ssh/id_ed25519` oder `~/.ssh/id_rsa` abgelegt, muss der Pfad zur entsprechenden Datei mit dem Parameter `-i` explizit angegeben werden, z.B. falls der Schlüssel unter `Documents/m346/ssh-key` abgelegt ist:

    ssh -i ~/Documents/m346/ssh-key user@[IP-Adresse]

Der Benutzername lautet immer `user`. Die IP-Adresse wird im Unterricht zur Verfügung gestellt.

Beim ersten Verbindungsversuch muss durch das Eintippen von `yes` bestätigt werden, dass man dem Server auf der anderen Seite vertraut.

Mit dem Befehl `exit` oder durch Betätigung der Tastenkombination `[Ctrl]`-`[D]` gelangt man zurück auf das Terminal des lokalen Systems.

Installieren Sie nun testhalber einen Webserver, z.B. `nginx`:

    sudo apt install nginx -y

Greifen Sie nun im Browser über die IP-Adresse auf diesen Webserver zu. Es sollte die `nginx`-Startseite angezeigt werden.

## Aufgabe 2: Beispielanwendung in Betrieb nehmen

Im aktuellen Arbeitsverzeichnis (`/home/user`) sollte sich eine Datei namens `pingpong.go` befinden. Dies ist ein einfacher Server, womit die Konnektivität auf den Server als Frage-Antwort-Spiel demonstriert werden kann.

Das Programm ist in der Sprache [Go](https://go.dev/) geschrieben und kann mit dem `go`-Befehl kompiliert werden:

    go build pingpong.go

Es ist nun eine Binärdatei namens `pingpong` entstanden. Diese kann folgendermassen gestartet werden:

    ./pingpong

Nun kann vom einem Browser aus auf den Server zugegriffen werden, wozu folgende URL verwendet werden kann: `http://[IP-Adresse]:8000/ping`.

Im Browser sollte eine Meldung der folgenden Form erscheinen:

    pong back to 178.196.200.21:50974

Gleichzeitig erscheint im Terminal auf dem Server eine Logmeldung der folgenden Form:

    pinged from 178.196.200.21:50974

Hierbei können IP-Adresse und Port natürlich variieren.

Das `pingpong`-Programm kann mit `[Ctrl]`-`[C]` wieder gestoppt werden.

## Aufgabe 3: Startparameter ändern

Das `pingpong`-Programm unterstützt zwei Parameter, womit Adresse und Port angepasst werden können, auf welche das Programm lauscht. Standardmässig wird die Adresse `0.0.0.0` verwendet, wodurch Verbindungen von überall her erlaubt werden. Als Port ist `8000` vorkonfiguriert, der auf allen VMs offen sein sollte.

Starte nun die Anwendung so, dass Sie nur Verbindungen von `localhost` akzepiert. Die Parameter lassen sich folgendermassen anzeigen:

    ./pingpong -help

Funktioniert der Zugriff von aussen noch?

Stoppen Sie die Anwendung nun und starten Sie sie so, dass sie auf Port `7000` lauscht, aber wieder Verbindungen von der Adresse `0.0.0.0` akzeptiert.

Funktioniert der Zugriff von aussen (wieder) über diesen Port?

## Aufgabe 4: Local Forwarding

Stellen Sie sicher, dass die Anwendung `pingpong` läuft, aber dass sie auf Port `7000` lauscht (per Parameter angeben) und nur Verbindungen von `0.0.0.0` entgegennimmt (Standardeinstellung).

Um von aussen auf den Server zugreifen zu können, muss nun ein Local Forwarding eingerichtet werden. Öffnen Sie hierzu eine neue Shell (Bash).

Richten Sie die entsprechende Weiterleitung ein, sodass man von aussen wieder auf die Anwendung zugreifen kann. Tipp: `ssh -L` ist unter [Local
Forwarding](/ssh/intro/index.html#local-forwarding) dokumentiert.

Mit welchen Parametern muss der `pingpong`-Server nun gestartet werden?

Unter welcher Adresse ist der `pingpong`-Server nun erreichbar?

## Aufgabe 5: Programm lokal ausführen

Stoppen Sie das `pingpong`-Programm und löschen Sie es:

    rm pingpong

Unterbrechen Sie die SSH-Sitzung mit dem Port-Forwarding mit `exit` oder der Tastenkombination `[Ctrl]`-`[D]`.

Kompilieren Sie das Programm nun für Ihr lokales System mit entsprechenden `GOOS`- und `GOARCH`-Parametern, um das Zielbetriebssystem und die Zielarchitektur festzulegen. Für Windows mit AMD64-Architektur lauten die Angaben beispielsweise:

    GOOS=windows GOARCH=amd64 go build pingpong.go

Es sollte ein Programm `pingpong.exe` erstellt worden sein.

Für macOS mit ARM-CPUs sieht der Befehl folgendermassen aus:

    GOOS=darwin GOARCH=arm64 go build pingpong.go

Hierbei wird eine Datei namens `pingpong` erzeugt.

Verwenden Sie nun die zweite Bash und kopieren Sie das Programm vom Server auf den lokalen Rechner:

    scp user@[IP-Adresse]:pingpong.exe .

Bzw. auf macOS:

    scp user@[IP-Adresse]:pingpong .

Führen Sie nun das Programm lokal aus und testen Sie es.

Über welche URL kann das Programm lokal angesprochen werden?

## Aufgabe 6: Remote Forwarding

Um vom Server auf die lokale `pingpong`-Anwendung zugreifen zu können, muss ein Remote Forwarding eingerichtet werden.

Richten Sie die entsprechende Weiterleitung ein, sodass der Zugriff vom Server auf den lokalen Rechner funktioniert. Tipp: `ssh -R` ist unter [Remote Forwarding](/ssh/intro/index.html#remote-forwarding) dokumentiert.

Um den Zugriff vom Server auf den lokalen Recher zu testen, kann das Programm `curl` verwendet werden:

    curl http://[IP-Adresse]:[Port]/ping

Über welche URL kann das Programm angesprochen werden?
