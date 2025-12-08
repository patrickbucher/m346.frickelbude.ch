+++
title = "Prüfung 3: Nextcloud"
weight = 4
+++

## Einführung, Lizenzen und Setup

- Sie können Vorteile von Nextcloud gegenüber SaaS-Angeboten wie _Microsoft 365_ oder _Google Workspace_ benennen.
- Sie verstehen das Prinzip des _Copyrights_ und das darauf basierende Prinzip des _Copylefts_.
- Sie können die beiden Arten von Open-Source-Lizenzen _permissive_ und _share-alike_/_Copyleft_ voneinander unterscheiden und verstehen deren Vor- und Nachteile aus Entwickler- und Betreibersicht.
- Sie verstehen das Problem des _ASP-Schlupflochs_ und wissen wie Nextcloud es dank seiner Lizenz (AGPL) löst.
- Sie kennen Vorteile der AGPL gegenüber anderen Lizenzmodellen im Cloud-Geschäft.

Die folgenden beiden Lernziele werden im weiteren Modulverlauf erarbeitet:

- Sie wissen, warum man vom Internet heruntergeladene Softwareartefakte auf ihre Integrität und Herkunft überprüft und welche Werkzeuge hierfür eingesetzt werden.
- Sie können fehlende PHP-Module mit `apt` finden (`search`) und installieren (`install`).

### Unterlagen

- [Einführung: Nextcloud und Open-Source-Lizenzen](/nextcloud/intro/)
- [Nextcloud-Setup](/nextcloud/setup/)

## Service-Management mit systemd

- Sie können die vier Hauptschritte, in denen ein System gestartet wird, voneinander abgrenzen und erklären, welche Komponenten in den einzelnen Vorgänge involviert sind.
- Sie können Vorteile von Services gegenüber dem manuellen Aufstarten von Programmen benennen.
- Sie können die wichtigsten Merkmale eines Service-Modells erklären.
- Sie können die Funktionsweise von _SysVinit_ basierend auf _Runlevels_ erklären und können Probleme von diesem Ansatz nennen.
- Sie können erklären, wie _systemd_ die Probleme von SysVinit löst und erklären, welche Vorteile und Konsequenzen das hat.
- Sie können Abhängigkeiten von Services in einem gerichteten Graph erkennen und deren Startreihenfolge in Phasen einteilen (sequenzielles und paralleles Aufstarten).
- Sie können mithilfe von `systemctl` Services starten, stoppen, aktivieren, deaktivieren und deren Zustand abfragen.
- Sie können mithilfe von `journalctl` Logmeldungen des ganzen Systems sowie von einzelnen Services anzeigen lassen.
- Sie können eine gegebene Service-Unit-Datei analysieren und kennen die Bedeutung der Abschnitte `[Unit]`, `[Service]`, `[Install]` sowie den Direktiven `Description`, `Documentation`, `After`, `ExecStart`, `Restart`, `User`, `Group` und `WantedBy`.

### Unterlagen

- [Service-Management mit systemd](/nextcloud/systemd/)

## LAMP-Stack

- Sie können die Komponenten des LAMP-Stacks bzw. des konkretisierten _DAMPF_-Stacks benennen.
- Sie können die Vor- und Nachteile von PHP-FPM gegenüber CGI benennen und nachvollziehen.
- Sie kennen den Unterschied zwischen verfügbaren und aktivierten Seiten und Modulen von Apache 2 und wissen, wie man solche aktivieren bzw. deaktivieren kann.
- Sie können erklären, wann es sinnvoll ist einen MySQL/MariaDB-Benutzer mit dem Suffix `@localhost` zu definieren.

## Unterlagen

- [Der LAMP-Stack](/nextcloud/lamp-stack/)