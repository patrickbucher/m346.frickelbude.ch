+++
title = "Strukturierte Daten"
weight = 1
+++

Strukturierte Daten liegen in einer bestimmten _Struktur_ vor, d.h. sie sind in
einer genau definierten Form abgespeichert. Beim Zugriff auf diese Daten weiss
man ganz genau, in welcher Form man sie erhalten wird.

Die Form der Daten umfasst z.B. die Felder, deren Datentypen und
Zusatzinformationen, z.B. ob ein Feld mit einem Wert versehen werden muss oder
nicht.

## Repräsentationen

Beim Programmieren kann man sich strukturierte Daten als Klassen (`class`) oder
Strukturen (`struct`) vorstellen, wo jede Eigenschaft einen Namen und einen
Datentyp hat. Klassen bzw. Strukturen können auch in eine Beziehung zueinander
gebracht werden, indem man sie _verschachtelt_ oder _referenziert_.

Mithilfe sogenannter _dokumentorientierter Datenbanken_ oder
_NoSQL-Datenbanken_, welche im [Modul
165](https://www.modulbaukasten.ch/module/165/1/de-DE) behandelt werden (z.B.
MongoDB, CouchDB, Elasticsearch) können strukturierte Daten direkt so
abgespeichert (_serialisiert_) und wieder herausgelesen (_deserialisiert_)
werden, wie man sie beim Programmieren verwendet.

Strukturierte Daten können auch als relationale Datenbanken mit der
Programmiersprache SQL verwaltet werden (z.B. PostgreSQL, Microsoft SQL Server,
MySQL, SQLite). Relationale Datenbanken und SQL sind Gegenstand der Module
[100](https://www.modulbaukasten.ch/module/100/3/de-DE),
[104](https://www.modulbaukasten.ch/module/104/3/de-DE),
[105](https://www.modulbaukasten.ch/module/105/3/de-DE) und
[106](https://www.modulbaukasten.ch/module/106/1/de-DE). Für die Tabellen einer
solchen Datenbank wird ein sogenanntes _Schema_ definiert. Dieses legt fest, wie
viele Felder es in einer Tabelle gibt, wie diese Felder heissen, was für einen
Datentyp diese Felder haben (Zeichenkette, Zahl, Datumsangabe usw.). Weiter
können Einschränkungen (_Constraints_) festgelegt werden, z.B. ob für ein Feld
zwingend ein Wert angegeben werden muss, ob die Werte in einer Spalte eindeutig
sein müssen, ob es Standardwerte gibt usw.

Beim Entwickeln einer Datenbankanwendung ist es die Aufgabe des Programmierers
zwischen den beiden Darstellungsweisen (Klassen/Strukturen in der Anwendung,
Relationen in der Datenbank) zu übersetzten. Bei dokumentorientierten bzw.
NoSQL-Datenbanken ist dieser Vorgang je nach gewählter Struktur mehr oder
weniger einfach und performant. Relationale Datenbanken sind in vielen Fällen
performanter und flexibler, doch muss die Form beim Herauslesen bzw.
Herunterschreiben der Daten transformiert werden. (Relationale Datenbanken sind
auf referenzierte und nicht auf verschachtelte Objekte ausgelegt.) Oftmals
kommen hierzu sogenannte _objekt-relationale Mapper_ (ORM) zum Einsatz.

## Beispiel: Anstellungen verwalten

In einer Personaldatenbank sollen Personen mit ihren Anstellungen verwaltet
werden. Dabei gibt es zwei _Entitäten_ mit den folgenden _Merkmalen_:

- Personal (`personnel`)
    - Vorname (`first_name`)
    - Nachname (`last_name`)
    - Geburtsdatum (`birthday`)
- Anstellung (`employment`)
    - Institution (`institution`)
    - Rolle (`role`)
    - Pensum (`workload`)
    - Eintrittsdatum (`since`)
    - Aktiv (`active`)

Jede Person verfügt über keine, eine oder mehrere Anstellungen. Eine Anstellung
gehört immer zu genau einer Person. Zwischen Person und Anstellung besteht eine
Eltern-Kind bzw. eine 1:n-Beziehung.

Es sollen in diesem Beispiel zwei Personen mit je zwei Anstellungen verwaltet
werden:

1. Patrick Bucher (24.06.1987)
    - 50% als Lehrer im BBZW
    - 50% als Full Stack Developer bei Composed GmbH
2. Alice Bobson (12.03.1971)
    - 80% als Key Account Manager bei der UBS
    - 20% als Lehrer bei der IMD Business School

### Datenstruktur beim Programmieren

Die beiden Entitäten könnten folgendermassen als Klassen modelliert werden
(Pseudocode):

```csharp
class Personnel
{
    String first_name;
    String last_name;
    Date birth_date;
    List<Employment> employments;
}

class Employment
{
    String institution;
    String role;
    Float workload;
    Date since;
    Boolean active;
}
```

Die Beziehung zwischen Anstellung (`Employment`) und Person (`Personnel`) wird
über eine Liste von Anstellungen (`List<Employment>`) als Eigenschaft der Person
modelliert.

### Zugriff via REST-Schnittstelle

Eine Software, die Zugriff auf diese Daten bietet, kann dem Benutzer die Daten
über eine REST-Schnittstelle beispielsweise im JSON-Format liefern:

```json
[
  {
    "id": 1,
    "first_name": "Patrick",
    "last_name": "Bucher",
    "birthday": "1987-06-24",
    "employments": [
      {
        "institution": "BBZW",
        "role": "Teacher",
        "workload": 0.5,
        "since": "2021-08-01",
        "active": true
      },
      {
        "institution": "Composed GmbH",
        "role": "Full Stack Developer",
        "workload": 0.5,
        "since": "2023-02-14",
        "active": true
      }
    ]
  },
  {
    "id": 2,
    "first_name": "Alice",
    "last_name": "Bobson",
    "birthday": "1971-03-12",
    "employments": [
      {
        "institution": "UBS",
        "role": "Key Account Manager",
        "workload": 0.8,
        "since": "2009-03-01",
        "active": true
      },
      {
        "institution": "IMD Business School",
        "role": "Teacher",
        "workload": 0.2,
        "since": "2020-07-01",
        "active": true
      }
    ]
  }
]
```

Hierbei liegen Personal und Anstellungen verschachtelt vor ‒ wie es auch mit den
beiden Klassen modelliert worden ist. Diese Repräsentation der Daten könnte auch
direkt in einer Dokument- bzw. NoSQL-Datenbank abgelegt werden.

### Relationale Datenbank

Möchte man diese Daten in einer relationalen Datenbank verwalten, muss zuerst
ein _Schema_ mithilfe von SQL (genauer: Data Definition Language, DDL) definiert
werden:

```sql
create sequence personnel_id;
create table personnel (
    id integer primary key default(nextval('personnel_id')),
    first_name varchar(100),
    last_name varchar(100),
    birthday date
);

create sequence employment_id;
create table employment (
    id integer primary key default(nextval('employment_id')),
    personnel_id integer,
    institution varchar(100),
    role varchar(100),
    workload float,
    active boolean,
    since date,
    foreign key (personnel_id) references personnel (id)
);
```

Die Beziehung zwischen Anstellung (`employment`) und Personal (`personnel`) wird
im Gegensatz zu den Klassen nicht über eine Verschachtelung ("eine Person hat
eine Liste von Anstellungen") sondern über eine Referenzierung ("jede Anstellung
verweist auf eine Person") mittels Fremdschlüssel gelöst. Zum Zweck der
Eindeutigkeit werden die Entitäten um künstliche `id`-Attribute ergänzt, die
mithilfe einer Sequenz automatisch durchnummeriert werden.

Die konkreten Daten können mit SQL (genauer: Data Manipulation Language, DML) in
die Datenbank eingefügt werden:

```sql
insert into personnel (first_name, last_name, birthday) values
('Patrick', 'Bucher', '1987-06-24'),
('Alice', 'Bobson', '1971-03-12');

insert into employment (personnel_id, institution, role, workload, since, active) values
(1, 'BBZW', 'Teacher', 0.5, '2021-08-01', true),
(1, 'Composed GmbH', 'Full Stack Developer', 0.5, '2023-02-14', true),
(2, 'UBS', 'Key Account Manager', 0.8, '2009-03-01', true),
(2, 'IMD Business School', 'Teacher', 0.2, '2020-07-01', true);
```

Fügt man die Anstellungen ein, muss die generierte ID der zuzuordnenden Person
bereits bekannt sein!

Der Vorteil an relationalen Datenbanken ist, dass die Daten mithilfe von SQL
(genauer: Data Query Language, DQL) sehr effizient und flexibel abgefragt werden
können. Möchte man beispielsweise eine Auswertung darüber, welche Personen schon
am längsten in einer bestimmten Anstellung tätig sind, lässt sich das mit
folgender Abfrage bewerkstelligen:

```sql
select
    personnel.first_name as Vorname,
    personnel.last_name as Nachname,
    employment.institution as Organisation,
    employment.role as Rolle,
    (employment.workload * 100) as Pensum,
    date_diff('year', employment.since, now()) as Dienstjahre
from employment
inner join personnel on (employment.personnel_id = personnel.id)
order by Dienstjahre desc;
```

- Mithilfe von `select` kann eine Reihe von Merkmalen aufgelistet werden, die
  angezeigt werden sollen. Dabei lassen sich auch Berechnungen anstellen, z.B.
  die Differenz vom Eintrittsdatum (`since`) zum aktuellen Tagesdatum (`now()`)
  zur Berechnung der Dienstjahre.
- Mithilfe von `inner join` wird die Beziehung von Anstellung (`employment`) auf
  das Personal (`personnel`) anhand der entsprechenden ID aufgelöst
  (`employment.personnel_id = personnel.id`).
- Mithilfe von `order by` wird die Ausgabe absteigend nach den Dienstjahren
  sortiert.

Das Ergebnis sieht dann folgendermassen aus:

| Vorname | Nachname |    Organisation     |        Rolle         | Pensum | Dienstjahre |
|---------|----------|---------------------|----------------------|-------:|------------:|
| Alice   | Bobson   | UBS                 | Key Account Manager  | 80.0   | 15          |
| Alice   | Bobson   | IMD Business School | Teacher              | 20.0   | 4           |
| Patrick | Bucher   | BBZW                | Teacher              | 50.0   | 3           |
| Patrick | Bucher   | Composed GmbH       | Full Stack Developer | 50.0   | 1           |

Solche einfachen Auswertungen können direkt beim Auslesen der Daten angestellt
und müssen nicht noch zuerst ausprogrammiert werden.
