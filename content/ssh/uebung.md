+++
title = "Übung"
weight = 2
+++

In dieser Übung soll der Gebrauch von SSH und von SSH-Tunneln mit einer
bereitgestellten Cloud-VM eingeübt werden.

Voraussetzungen:

- Die [Git Bash](https://git-scm.com/downloads) ist unter Windows installiert
  oder als portable Version verfügbar. (Unter macOS und Linux stehen die Befehle
  `ssh-keygen`, `ssh` und eine Unix-Shell anderweitig zur Verfügung.)
- Es wurde ein SSH-Schlüssel erzeugt und der Lehrperson abgegeben.

## Aufgabe 0: Ergebnissicherung

Halten Sie für die folgenden Aufgaben jeweils folgendes fest:

1. die Antworten auf die gestellten Fragen
2. die verwendeten Befehle, bei denen man selbständig etwas ergänzen muss
3. die dabei gemachten Erkenntnisse

Die Form der Dokumentation ist frei. Sie soll der Lehrperson auf Nachfrage
gezeigt werden können und fliesst in die Bewertung ein (Prädikate).

## Aufgabe 1: Verbindung aufnehmen

Nehmen Sie die Verbindung zu Ihrem Server auf, indem Sie den folgenden Befehl
in der Bash eingeben:

    $ ssh [Benutzername]@[IP-Adresse]

Die Parameter `[Benutzername]` (z.B. `hans.meier`, falls die sluz-Adresse
`hans_meier@sluz.ch` lautet) und `[IP-Adresse]` werden im Unterricht zur
Verfügung gestellt.

Beim ersten Verbindungsversuch muss dieser durch das Eintippen von `yes`
bestätigt werden.

Mit dem Befehl `exit` oder durch Betätigung der Tastenkombination `[Ctrl]`-`[D]`
gelangt man zurück auf das Terminal des lokalen Systems.

Installiere nun einen Webserver, z.B. `nginx`:

    $ sudo apt install nginx

Greife nun im Browser über die IP-Adresse auf diesen Webserver zu. Es sollte die
`nginx`-Startseite angezeigt werden.

## Aufgabe 2: Beispielanwendung in Betrieb nehmen

Im Verzeichnis `/share` sollte sich eine Datei namens `pingpong.go` befinden.
Dies ist ein einfacher Server, womit die Konnektivität auf den Server als
Frage-Antwort-Spiel demonstriert werden kann.

Zuerst soll die Datei ins Home-Verzeichnis kopiert werden:

    $ cp /share/pingpong.go .

Anschliessend wird das Programm kompiliert:

    $ go build pingpong.go

Es ist nun eine Binärdatei namens `pingpong` entstanden. Diese kann
folgendermassen gestartet werden:

    $ ./pingpong

Nun kann vom einem Browser aus auf den Server zugegriffen werden, wozu folgende
URL verwendet werden kann: `http://[IP-Adresse]:8000/ping`.

Es sollte eine Meldung der folgenden Form erscheinen:

    pong back to 178.196.200.21:53834

Hierbei können IP-Adresse und Port natürlich variieren.

Das `pingpong`-Programm kann mit `[Ctrl]`-`[C]` wieder gestoppt werden.

## Aufgabe 3: Startparameter ändern

Das `pingpong`-Programm unterstützt zwei Parameter, womit Adresse und Port
angepasst werden können, auf welche das Programm lauscht. Standardmässig wird
die Adresse `0.0.0.0`, wodurch Verbindungen von überall her erlaubt werden. Als
Port ist `8000` vorkonfiguriert, der auf allen VMs offen sein sollte.

Starte nun die Anwendung so, dass Sie nur Verbindungen von `localhost`
akzepiert. Tipp:

    $ ./pingpong -help

Funktioniert der Zugriff von aussen?

Stoppe die Anwendung nun und starte sie so, dass sie auf Port `7000` lauscht,
aber wieder Verbindungen von der Adresse `0.0.0.0` akzeptiert.

Funktioniert der Zugriff von aussen?

## Aufgabe 4: Local Forwarding

Stellen Sie sicher, dass die Anwendung `pingpong` läuft, aber dass sie auf Port
`7000` lauscht und nur Verbindungen von `localhost` entgegennimmt.

Um von aussen auf den Server zugreifen zu können, muss nun ein Local Forwarding
eingerichtet werden.

Richten Sie die entsprechende Weiterleitung ein, sodass man von aussen wieder
auf die Anwendung zugreifen kann. Tipp: `ssh -L` ist weiter oben dokumentiert.

## Aufgabe 5: Programm lokal ausführen

Stoppe das `pingpong`-Programm und lösche es:

    $ rm pingpong

Kompilieren Sie das Programm nun für dein lokales System, z.B. für Windows:

    $ GOOS=windows go build pingpong.go

Es sollte ein Programm `pingpong.exe` erstellt worden sein.

Für macOS mit ARM-CPUs sieht der Befehl folgendermassen aus:

    $ GOOS=darwin GOARCH=arm64 go build pingpong.go

Hierbei wird eine Datei namens `pingpong` erzeugt.

Öffnen Sie nun eine zweite Bash und kopieren Sie das Programm vom Server auf den
lokalen Rechner:

    $ scp [Benutzername]@[IP-Adresse]:pingpong.exe .

Bzw. auf macOS:

    $ scp [Benutzername]@[IP-Adresse]:pingpong .

Führe nun das Programm lokal aus und teste es.

## Aufgabe 7: Remote Forwarding

Um vom Server auf die lokale `pingpong`-Anwendung zugreifen zu können, muss ein
Remote Forwarding eingerichtet werden.

Richten Sie die entsprechende Weiterleitung ein, sodass der Zugriff vom Server
auf den lokalen Rechner funktioniert. Tipp: `ssh -R` ist weiter oben
dokumentiert.

Um den Zugriff vom Server auf den lokalen Recher zu testen, kann das Programm
`curl` verwendet werden:

    $ curl http://localhost:8000/ping
