+++
title = "Wahlprogramm 1: Go"
weight = 8
+++

Im ersten Wahlprogramm wird zunächst die Programmiersprache Go gelernt. In vier
Blöcken sollen die folgenden Bereiche der Sprache erkundet werden:

- [Go 1: Variablen, Datentypen und formatierte Ausgabe](go-1.md)
- [Go 2: Strukturen, Slices und Maps](go-2.md)
- [Go 3: Kontrollstrukturen: Verzweigungen und Schleifen](go-3.md)
- [Go 4: Funktionen definieren und aufrufen](go-4.md)

Hierzu ist folgende Arbeitsweise sinnvoll:

1. Überfliegen Sie den jeweiligen Theorieteil auf der Modulwebseite.
2. Lesen Sie die Aufgabenstellung im Repository durch.
3. Kehren Sie bei Unklarheiten zum Theorieteil auf der Modulwebseite zurück.

Zu diesen Theorieteilen gibt es eine
[Übungssammlung](https://github.com/patrickbucher/m346-go-exercises/tree/master).

Nach der Einführung in die Programmiersprache Go folgen weitere Themenblöcke:

- HTTP-Monitoring mit `meow`
- Migration der `meow`-Konfiguration vom Dateisystem auf Redis

## :card_file_box: Ergebnissicherung

In diesem Wahlprogramm wird Quellcode bearbeitet. Darum sollen die erarbeiteten
Aufgaben mit Git verwaltet werden:

1. Erstellen Sie einen Fork vom Repository (jetzt:
   [Übungssammlung](https://github.com/patrickbucher/m346-go-exercises/tree/master),
   später: _meow_).
2. Klonen Sie Ihren persönlichen Fork.
3. Erstellen Sie einen Commit mindestens nach dem Lösen einer Aufgabe.
4. Pushen Sie den Commit auf ihr öffentliches Repository.
5. Erstellen Sie zwischendurch einen Pull Request um eine Rückmeldung zu
   erhalten.

Falls dieses Vorgehen Schwierigkeiten bereitet, gibt die Lehrperson gerne
auskunft.

Am Ende des Moduls wird Ihre Arbeit anhand der bearbeiteten Repositories
bewertet. Diese Bewertung fliesst nicht in die Modulnote, aber in die Prädikate
ein.

## Warum Go?

Warum soll im Modul 346 Go als Programmierspracahe zum Einsatz kommen? Dafür
sprechen eine Menge Gründe. Go wurde als Programmiersprache **für
Serveranwendungen** konzipiert. [Cloud Native
Go](https://www.oreilly.com/library/view/cloud-native-go/9781492076322/) hebt
Merkmale von Go hervor, die es für Cloud-Anwendungen besonders geeignet macht:

1. Lesbarkeit: einfache Lesbarkeit aufgrund der wenigen (25) Schlüsselwörter und konsequenten, automatischen Formatierung des Quellcodes
2. Nebenläufigkeit: mächtige und sichere Nebenläufigkeit mittels [_Communicating Sequential Processes_](https://en.wikipedia.org/wiki/Communicating_sequential_processes) (CSP) auf Basis leichtgewichtiger _Goroutines_ und _Channels_
3. Stabilität: stabiler (und schlanker) Sprachkern mit Garantie der Kompatibilität von bestehendem Quellcode in zukünftigen Versionen
4. Kompilierung: schnelle Kompilierzeiten und plattformübergreifende Kompilierung (_Cross Compilation_) ohne Zusatzwerkzeuge
5. Sicherheit: Memorysicherheit, statische Typisierung und Garbage Collection
6. Performance: hohe Performance bei geringem Speicherbedarf
7. Standardbibliothek: umfassende Standardbibliothek, u.a. mit einem Package für HTTP-Server und -Clients
8. Skalierbarkeit: kleinste Serveranwendungen in < 20 Zeilen Code, grössere Projekte mit > 500'000 Zeilen Code (z.B. Kubernetes)
9. Lernbarkeit: in wenigen Stunden gelernt, in einigen Wochen gemeistert
10. Verbreitung: viele Libraries, gute Lernmaterialien, grosse Community, viel Support

Go ist eine relativ junge Sprache, ist aber im Cloud-Bereich schon sehr prominent vertreten, u.a. durch die folgenden Projekte:

- Container
    - Docker & Podman
    - Kubernetes & OpenShift
- Serverdienste
    - etcd
    - CoreDNS
- Observability
    - Prometheus
    - Grafana

Siehe auch die [CNCF-Landscape](https://landscape.cncf.io/). Sehr viele der dort aufgelisteten Projekte wurden in Go umgesetzt.