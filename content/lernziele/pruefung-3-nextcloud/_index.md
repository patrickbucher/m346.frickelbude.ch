+++
title = "Prüfung 3 (Nextcloud): Lernziele"
weight = 4
+++

## Einführung, Lizenzen und Setup

- Sie können Vorteile von Nextcloud gegenüber SaaS-Angeboten wie _Microsoft 365_
  oder _Google Workspace_ benennen.
- Sie verstehen das Prinzip des _Copyrights_ und das darauf basierende Prinzip
  des _Copylefts_.
- Sie können die beiden Arten von Open-Source-Lizenzen _permissive_ und
  _share-alike_/_Copyleft_ voneinander unterscheiden und verstehen deren Vor-
  und Nachteile aus Entwickler- und Betreibersicht.
- Sie verstehen das Problem des _ASP-Schlupflochs_ und wissen wie Nextcloud es
  dank seiner Lizenz (AGPL) löst.
- Sie kennen Vorteile der AGPL gegenüber anderen Lizenzmodellen im
  Cloud-Geschäft.
- Sie wissen, warum man vom Internet heruntergeladene Softwareartefakte auf
  ihre Integrität und Herkunft überprüft und welche Werkzeuge hierfür eingesetzt
  werden.
- Sie können fehlende PHP-Module mit `apt` finden (`search`) und installieren
  (`install`).

## systemd

- Sie wissen, in welchen vier Hauptschritten ein System gestartet wird und
  welche Komponenten in die einzelnen Vorgänge involviert sind.
- Sie können Vorteile von Services gegenüber dem manuellen Aufstarten von
  Programmen benennen.
- Sie können die wichtigsten Merkmale eines Service-Modells benennen.
- Sie verstehen die Funktionsweise von _SysVinit_ basierend auf _Runlevels_ und
  können Probleme von diesem Ansatz nennen.
- Sie wissen, wie _systemd_ die Probleme von SysVinit löst und was das für
  Vorteile und Konsequenzen hat.
- Sie können Abhängigkeiten von Services in einem gerichteten Graph erkennen und
  deren Startreihenfolge in Phasen einteilen (sequenzielles und paralleles
  Aufstarten).
- Sie können mithilfe von `systemctl` Services starten, stoppen, aktivieren,
  deaktivieren und deren Zustand abfragen.
- Sie können mithilfe von `journalctl` Logmeldungen des ganzen Systems sowie von
  einzelnen Services anzeigen lassen.
- Sie können eine gegebene Service-Unit-Datei analysieren und kennen die
  Bedeutung der Abschnitte `[Unit]`, `[Service]`, `[Install]` sowie den
  Direktiven `Description`, `Documentation`, `After`, `ExecStart`, `Restart`,
  `User`, `Group` und `WantedBy`.

## LAMP-Stack

- Sie können die Komponenten des LAMP-Stacks bzw. des konkretisierten
  _DAMPF_-Stacks benennen.
- Sie können die Vor- und Nachteile von PHP-FPM gegenüber CGI benennen und
  nachvollziehen.
- Sie kennen den Unterschied zwischen verfügbaren und aktivierten Seiten und
  Modulen von Apache 2 und wissen, wie man solche aktivieren bzw. deaktivieren
  kann.
- Sie können erklären, wann es sinnvoll ist einen MySQL/MariaDB-Benutzer mit dem
  Suffix `@localhost` zu definieren.

## Unterlagen

- [Wahlprogramm 2: Nextcloud](/wp2-nextcloud)