+++
draft = true
title = "Prüfung 2: Lernziele"
weight = 2
+++

## Cloud-Migration und Cloud-Infrastruktur

1. Sie können die sieben _Migrationsstrategien_ ("7R") der Cloud-Migration
   aufzählen, erklären, gegeneinander abgrenzen und anhand ihrer Vor- und
   Nachteile für ein Beispielszenario eine Strategie vorschlagen und begründen.
2. Sie können die Zwecke der Aufteilung der Cloud-Infrastruktur in _Regionen_
   und _Zonen_ aufzählen und erklären.
3. Sie können den Begriff _Edge-Standort_/_Outpost_ und den Zusammenschluss
   davon zu einer Hybrid Cloud als _Virtual Private Network_ erklären.

### Unterlagen

- [Cloud-Migration](/theorie/cloud-migration/)
- [Cloud-Infrastruktur](/theorie/cloud-infrastruktur/)

## SSH & SSH-Tunnel

1. Sie können die Anwendungsszenarien für SSH benennen, es gegenüber anderen
   Lösungen (RDP, WinRM, Telnet) abgrenzen und erklären welche Art von
   Kryptographie (symmetrisch, asymmetrisch) SSH verwendet.
2. Sie können per SSH eine Verbindung zu einem entfernten System aufnehmen,
   Dateien zwischen zwei Systemen hin und her kopieren und die dazu nötigen
   Parameter erklären.
3. Sie können die Konzepte _Local Forwarding_ und _Remote Forwarding_ anhand von
   Beispielszenarien erklären sowie Nutzen und Gefahren der beiden Verfahren
   benennen.

### Unterlagen

- [Einführung](/ssh/intro/)
- [Übung](/ssh/uebung/)

## Hauptdatentypen

1. Sie können strukturierte, teilweise strukturierte und unstrukturierte Daten anhand
   von gegebenen Beispieldaten unterscheiden und diese Unterscheidung begründen.

### Strukturierte Daten

1. Sie können die Eigenschaften strukturierter Daten benennen (Felder,
   Datentypen, Zusatzinformationen) und diese zur Einordnung gegebener
   Beispieldaten heranziehen.
2. Sie können verschiedene Repräsentationen strukturierter Daten voneinander
   unterscheiden (Datenstrukturen, verschachtelte Dokumente, relationale
   Datenbanken) und Transformationen von Beispieldaten erläutern (z.B.
   Verschachtelung durch Fremdschlüssel ersetzen).
3. Sie können zwischen SQL- und NoSQL-Datenbanken sowie zwischen OLTP- und
   OLAP-Datenbanken unterscheiden, deren Einsatzzwecke benennen und die
   Technologie DuckDB anhand dieser Begriffe einordnen.

#### Unterlagen

- [Hauptdatentypen](/hauptdatentypen)
- [Strukturierte Daten](/hauptdatentypen/strukturierte)
- [DuckDB](/hauptdatentypen/strukturierte/duckdb)

### Teilweise Strukturierte Daten

1. Sie können den Aufbau der abstrakten Datentypen Array, Liste, Menge und Map
   beschreiben und Unterschiede im Zugriffsverhalten zwischen Array und Liste
   nachvollziehen.
2. Sie können in Redis bei gegebener Befehlsdokumentation mit den Datentypen
   String, List, Hash und Set interaktiv arbeiten und hierzu die Schlüssel nach
   einer sinnvollen Konvention strukturieren.
3. Sie können die Persistenz-Formate von Redis (RDB, AOF, keine) voneinander
   unterscheiden, ihre Vor- und Nachteile sowie Einsatzzwecke benennen.

#### Unterlagen

- [Teilweise strukturierte Daten](/hauptdatentypen/teilweise-strukturierte)
- [Redis](/hauptdatentypen/teilweise-strukturierte/redis)

### Unstrukturierte Daten

1. Sie können verschiedene Datenspeicher anhand der Kriterien
   Zugriffsgeschwindigkeit, Speicherkapazität und Kosten pro
   Speichereinheit richtig in der Speicherhierarchie einordnen.
2. Sie können die Organisation von S3 in Buckets und Objects vom Dateisystem
   abgrenzen und verstehen den Zusammenhang zwischen S3-Speicherklassen und der
   Speicherhierarchie.
3. Sie können bei gegebener Befehlsdokumentation mit dem Minio-Server `minio`,
   dem Minio Client `mc` sowie den Hilfsprogrammen `s3cmd` und `s3fs` (FUSE)
   arbeiten sowie den Zweck, die Funktionsweise und die Rolle der einzelnen
   Programme im Kontext eines S3-Speichers voneinander unterscheiden.
   
#### Unterlagen

- [unstrukturierte Daten](/hauptdatentypen/unstrukturierte)
- [Minio](/hauptdatentypen/unstrukturierte/minio)
