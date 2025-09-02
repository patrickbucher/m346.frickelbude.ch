+++
draft = true
title = "Unstrukturierte Daten"
weight = 3
+++

Je stärker Daten strukturiert sind, desto mehr Annahmen kann man über deren Form
treffen. Strukturierte Daten folgen einem vorgegebenen Schema, wodurch man nicht
nur weiss, welche Felder man antreffen wird, sondern auch, welchen Datentyp und
welche zusätzlichen Einschränkungen diese Felder haben. Teilweise strukturierte
Daten im Sinne von abstrakten Datentypen geben eine gewisse Struktur vor, doch
um die Einhaltung der Datentypen und um sonstige Einschränkungen muss man sich
als Nutzer der entsprechenden Technologien selber kümmern. Bei
_unstrukturierten_ Daten hat man es mit einer Reihe von Bytes zu tun. Folglich
kann man sinnvollerweise keine Annahmen über die Struktur dieser Inhalte
treffen.

Bei der Verwaltung von unstrukturierten Daten im Kontext vom Cloud Computing
geht es nicht um die Inhalte der betreffenden Daten (seien dies nun
Word-Dokumente, Video-Dateien oder Zip-Archive) sondern darum, dass die Daten
kostengünstig, effizient und fehlerfrei verwaltet und bereitgestellt werden
können. Administriert man einen Service zur Verwaltung von unstrukturierten
Daten, geht es nicht darum, was diese Dateien beinhalten, sondern darum, den
Anwendern Zugriff auf diese Daten zu gewährleisten. Kriterien wie
Vertrauenswürdigkeit, Integrität und Verfügbarkeit sind hier besonders wichtig.
Der Inhalt der Daten ist jedoch hierfür völlig irrelevant: es kann sich auch um
verschlüsselte Daten handeln, hinter denen der verwaltende Service nichts weiter
als einen Byte-Salat erkennt.

## Speicherhierarchie

Um Daten verwalten zu können, wird ein Datenspeicher benötigt. Man unterscheidet
zwischen verschiedenen Arten von Datenspeichern, die sich u.a. nach folgenden
Kriterien einordnen lassen:

- Zugriffsgeschwindigkeit (lesend & schreibend)
    - von _langsam_ bis _schnell_
- Speicherkapazität (z.B. in Megabyte, Gigabyte, Terabyte)
    - von _klein_ bis _gross_
- Kosten (pro Speichereinheit)
    - von _günstig_ bis _teuer_

Hierbei gilt die folgende Faustregel:

- _Schneller_ Speicher ist _klein_ und _teuer_.
- _Langsamer_ Speicher ist _gross_ und _günstig_.

Nach diesen Kriterien lassen sich verschiedene Arten von Datenspeichern in eine
_Speicherheirarchie_ einordnen (Beispiele Stand 2022):

| **Speichertyp**       | **Zugriffszeit** | **Kapazität** |        **Preis** |
|-----------------------|-----------------:|--------------:|-----------------:|
| CPU-Register          |           < 1 ns |         64 kB |   > 1 CHF pro kB |
| CPU-Cache (L1, L2, …) |          5-10 ns |       8-64 MB |   > 1 CHF pro MB |
| RAM                   |         15-20 ns |     16-256 GB |   ~ 4 CHF pro GB |
| SSD                   |        25-100 µs |     0.25-4 TB | ~ 0.1 CHF pro GB |
| HDD                   |          5-10 ms |       1-20 TB |  ~ 30 CHF pro TB |
| Tape                  |         10-100 s |       1-30 TB |  ~ 10 CHF pro TB |

Aufgrund dieser Eigenschaften eignen sich verschiedene Datenspeicher für
verschiedene Einsatzgebiete:

| **Speichertyp** | **Einsatzgebiet**                                       |
|-----------------|---------------------------------------------------------|
| CPU-Register    | Daten für aktuell laufende Instruktionen                |
| CPU-Cache       | Daten für häufig verwendete Instruktionen               |
| RAM             | Daten für derzeit laufende Programme (Datenstrukturen)  |
| SSD             | Daten für häufigen Zugriff (Dokumente, Programme)       |
| HDD             | Daten für seltenen Zugriff (Datenablage, Online-Backup) |
| Tape            | Daten für Langzeitarchivierung (Offline-Backup)         |

Ein oft genannter Vorteil vom Cloud Computing besteht darin, dass man sich
_nicht_ um die Hardware zu kümmern brauche. Doch auch Cloud-Speicherplatz gibt
es in verschiedenen _Speicherklassen_, deren Parameter (Zugriffsgeschwindigkeit,
Grösse, Preis pro Speichereinheit) davon abhängen, welcher Speichertyp zum
Einsatz kommt.

## S3: Simple Storage Service

![Amazon Simple Storage Service (S3)](/img/amazon-s3-logo.png)

Amazons [Simple Storage Service](https://aws.amazon.com/de/s3/_) (kurz: S3) ist
seit Frühling 2006 verfügbar und damit eines der ältesten Cloud-Angebote. Kann
man ein lokales Dateisystem als eine Zuordnung von absoluten Dateipfaden zu
Dateien verstehen, verwendet S3 URLs zur Identifikation und zum Zugriff (lesend,
schreibend) von _Objekten_. Objekte sind dabei als unstrukturierte Daten bzw.
als reine BLOBs (_Binary Large Object_) zu verstehen.

Im Gegensatz zu einem Dateisystem ist die Hierarchie von S3 flach:

- Ein _Bucket_ ("Eimer") entspricht einem Ordner, kann aber nur Objekte und
  keine anderen Buckets beinhalten.
- Ein _Object_ ("Objekt") entspricht einer Datei und kann bis zu 5 Terabyte
  gross sein.

Zwar können Buckets auch Ordner aufnehmen, diese gelten jedoch als Objekte und
nicht als "Untereimer".

Grobe Zugriffsberechtigungen können auf Stufe Bucket vergeben werden. Weiter ist
es möglich, Buckets wie einen normalen Dateiordner in ein Dateisystem
einzuhängen. Das Konzept nennt sich _FUSE_ (Filesystem in Userspace) und wird im
Rahmen der Übungen betrachtet.

### S3-Speicherklassen

Wie sich auf der Hardware-Ebene verschiedene Arten von Speicher in eine
Speicherhierarchie einordnen lassen, verfügt auch S3 über sogenannte
_Speicherklassen_:

| **Speicherklasse**         | **Zweck**                                             |
|----------------------------|-------------------------------------------------------|
| Standard                   | Häufig verwendete Daten                               |
| Standard-IA                | Selten verwendete Daten (IA: Infrequent Access)       |
| Intelligent-Tiering        | Automatische Ablage in kosteneffizienter Klasse       |
| One Zone-IA                | Selten verwendete Daten in einer bestimmten _Zone_    |
| Outposts                   | Ausserhalb von Amazon-Infrastruktur gehosted          |
| Glacier Instant Retrieval  | Seltene, aber schnelle Zugriffe                       |
| Glacier Flexible Retrieval | Seltene, unterschiedlich schnelle Zugriffe (3 Stufen) |
| Glacier Deep Archive       | Seltene, langsame (dafür günstige) Zugriffe           |

Dabei ist es denkbar, dass die schnelleren Speicherklassen für häufigere
Zugriffe mit SSDs, die langsameren Speicherklassen für seltenere Zugriffe mit
HDDs oder externen Speichermedien auf der Amazon-Infrastruktur umgesetzt werden.

Es ist möglich, die Datenspeicherung auf bestimmte
[Regionen](/theorie/cloud-infrastruktur/#eu-us-regionen) und
[Zonen](/theorie/cloud-infrastruktur/#european_castle-japanese_castle-zonen)
einzuschränken. Die Kosten können dabei variieren.

Aufgrund der Einfachheit von S3 haben praktisch alle Cloud-Anbieter einen zu S3
kompatiblen Service im Angebot.  In der Regel heissen diese Service auch "S3".
Manche Anbieter bezeichnen ihre S3-Implementierung einfach als "Storage".
Ausserdem gilt S3-Speicherplatz als extrem günstig. Es gibt auch verschiedene
S3-Implementierungen, die als Open-Source-Software zur Verfügung stehen, wie
z.B. [Minio](https://min.io/), das im Rahmen dieses Moduls zum Einsatz kommt.
Neben virtuellen Maschinen stellen S3-kompatible Services somit ein sehr
geringes Risiko dar was das _Vendor Lock-In_ betrifft.
