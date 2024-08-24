+++
title = "DSGVO & Cloud Computing"
+++

Datenschutz war bereits das Thema im [Modul
231](https://www.modulbaukasten.ch/module/231/1/de-DE?title=Datenschutz-und-Datensicherheit-anwenden).
Neben den Grundlagen zum Datenschutz und zur Datensicherheit wurden auch
konkrete Datenschutzgesetze wie das Schweizer DSG und die europäische DSGVO
betrachtet.

Im Modul 346 soll der Datenschutz noch einmal im Kontext des Cloud Computings
betrachtet werden. Da dieser Kontext ein internationaler ist, tritt dabei unsere
nationale Gesetzgebung in den Hintergrund und die DSGVO in den Vordergrund.

Falls Sie mehr zum Thema erfahren wollen, stehen die folgenden Unterlagen zur
Verfügung:

- Thorsten Hennrich: Cloud Computing nach der Datenschutz-Grundverordnung
    - [Video (YouTube)](https://www.youtube.com/watch?v=8lz2lwo9vT4)
    - [Buchzusammenfassung (PDF)](https://raw.githubusercontent.com/patrickbucher/books/master/hennrich_cloud-computing-dsgvo.pdf)
    - [Buch](https://dpunkt.de/produkt/cloud-computing-nach-der-datenschutz-grundverordnung/)

An dieser Stelle werden nur die wichtigsten Konzepte wiedergebeben, siehe auch
[Lernziele](http://localhost:1313/lernziele/pruefung-1/#datenschutz---sicherheit).

**Wichtig**: Diese Webseite enthält keine belastbaren rechtlichen Ratschläge!
Bei Fragen zum Datenschutz wenden Sie sich an den _Datenschutzbeauftragten_
Ihres Lehrbetriebs.

## Einstieg

Die _Datenschutz-Grundverordnung_ (DSGVO) bzw. _General Data Protection
Regulation_ (GDPR) ist eine EU-weite Datenschutzregelung, die am 25. Mai 2018 in
Kraft getreten ist. Sie soll den Schutz _personenbezogener_ Daten gewährleisten
und Europa gleichzeitig "Cloud-freundlich" machen. Der
[Gesetzestext](https://dsgvo-gesetz.de/) kann online nachgelesen werden.

Frühere Datenschutz-Gesetzgebungen standen mit dem Cloud Computing im Konflikt.
Schliesslich werden Daten in der Cloud _grenzübergreifend_ verarbeitet, während
der Datenschutz _länderspezifisch_ geregelt war. Mit der DSGVO soll das folgende
Problem gelöst werden:

> Wie lassen sich personenbezogene Daten datenschutzkonform in der Cloud
> verarbeiten?

## Datenschutz (zur Wiederholung)

- **Ziel**
    - Die Freiheit _natürlicher_ Personen, selbst über den Umgang mit ihren
      _personenbezogenen_ Daten entscheiden zu können, soll bewahrt werden.
    - Dadurch soll das Recht auf _informationelle Selbstbestimmung_ geschützt
      werden.
- **Gegenstand**
    - Personenbezogene Daten sind Informationen, die sich auf eine Person
      beziehen und diese _identifizierbar_ machen.
    - Unter der _Verarbeitung_ von Daten versteht man deren Speicherung,
      Übermittlung, Nutzung und Löschung.
- **Grundsatz**
    - Es gilt das _Verbot mit Erlaubnisvorbehalt_: Die Datenverarbeitung ist
      verboten, wenn sie nicht explizit durch einen _Erlaubnistatbestand_
      erlaubt ist.

Bei der Datenverarbeitung sind folgende Grundsätze zu beachten:

### Grundsätze der Datenverarbeitung

1. **Rechtmässigkeit**: Eine Datenverarbeitung darf nur erfolgen, wenn die
   Einwilligung des Betroffenen besteht (Erlaubnistatbestand).
2. **Treu und Glauben**: Die betroffene Person muss über die Datenverarbeitung
   informiert werden.
3. **Transparenz**: Der Zweck der Datenverarbeitung muss für die betroffene
   Person nachvollziehbar sein.
4. **Zweckbindung**: Die Daten dürfen nur für einen festgelegten Zweck
   verarbeitet werden.
5. **Datenminimierung**: Es dürfen nur die zum jeweiligen Zweck nötigen Daten
   verarbeitet werden (Prinzip der Verhältnismässigkeit).
6. **Richtigkeit**: Daten müssen aktuell gehalten werden; alte Daten müssen
   berichtigt oder gelöscht werden.
7. **Speicherbegrenzung**: Daten dürfen nur so lange aufbewahrt werden, wie dies
   zum jeweiligen Zweck nötig ist.
8. **Integrität und Vertraulichkeit**: Eine angemessene Datensicherheit muss
   gewährleistet werden.
9. **Rechenschaftspflicht**: Die Datenverarbeitung muss dokumentiert werden,
   damit die Einhaltung des Datenschutzes gegenüber Aufsichtsbehörden
   nachgewiesen werden kann.

## Akteure

Für die DSGVO sind u.a. die folgenden Akteure relevant:

- Die **betroffene Person** (_Data Subject_) ist eine natürliche Person, die über
  schützenswerte personenbezogene Daten verfügt.
    - Ein Lernender an einer Berufsschule ist eine betroffene Person, da sie im
      Kontext dieser Schule über schützenswerte Daten verfügt (z.B.
      Kontaktinformationen, Absenzen, Noten).
- Ein **Verantwortlicher** (_Controller_) ist eine natürliche oder juristische
  Person, die über Zweck und Mittel einer Datenverarbeitung entscheidet.
    - Der Betreiber einer Schulverwaltungssoftware ist ein Verantwortlicher und
      entscheidet über Zweck und Mittel dieser Datenverarbeitung (z.B.
      warum und wie die Daten von Lernenden abgelegt werden sollen).
- Ein **Auftragsverarbeiter** (_Processor_) ist Dienstleister, der
  personenbezogene Daten im Auftrag eines Verantwortlichen übernimmt.
    - Microsoft ist ein Dienstleister im Auftrag der Berufsschule und
      verarbeitet z.B. mit _Teams_ die personenbezogenen Daten der Lehrpersonen
      und Lernenden als Auftragsverarbeiter.
- **Dritte** (_Third Party_) sind Aussenstehende, die nicht in die Verarbeitung
  eingebunden sind.
    - Die Reinigungskräfte an der Berufsschule sind Dritte und sollten somit
      keinen Zugriff auf die persönlichen Daten der Lernenden und Lehrpersonen
      haben.
- Ein **Empfänger** (_Recipient_) ist jeder, dem personenbezogene Daten
  offengelegt werden.
    - Ein Webseitenbesucher ist ein Empfänger der dort abrufbaren
      personenbezogenen Daten.
- Ein **Datenschutzbeauftragter** (_Data Protection Officer_) ist der
  Ansprechpartner für Datenschutzfragen innerhalb einer Organisation.
    - Eine Organisation ab einer bestimmten Grösse bzw. in einer bestimmten
      Branche muss einen Datenschutzbeauftragten ernennen.
- Die **Aufsichtsbehörde** (_Supervisory Authority_) ist eine staatliche Stelle,
  welche die Einhaltung der DSGVO überwacht und durchsetzt
    - In der Schweiz ist dies der [Eidgenössische Datenschutz- und
      Öffentlichkeitsbeauftragte
      (EDÖB)](https://www.edoeb.admin.ch/edoeb/de/home.html).

## Anwendbarkeit der DSGVO

TODO: 9

## Erlaubnistatbestände

TODO: 10

## Auftragsverarbeitung

TODO: 11

## Grenzübergreifende Datenübermittlung

TODO: 12, 13

## Rechte

TODO: 15

## Datenschutzbeauftragter

TODO: 16

## Datenschutzverletzungen ("Datenpanne")

TODO: 17, 18

## Haftung & Strafen

TODO: 19
