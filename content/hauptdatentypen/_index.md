+++
archetype = "chapter"
title = "Hauptdatentypen"
weight = 7
+++

Im Modul 346 unterscheiden wir zwischen drei Formen, in denen Daten vorliegen
können:

1. **strukturierte** Daten
2. **halbstrukturierte** Daten
3. **unstrukturierte** Daten

# Strukturierte Daten

- Die Daten sind in einer genau definierten Form abgespeichert.
- Beim Zugriff auf die Daten weiss man, in welcher Form man sie erhalten
  will.
- Die Form umfasst z.B. die Felder, deren Datentypen und
  Zusatzinformationen, z.B. ob ein Feld mit einem Wert versehen werden muss
  oder nicht.
- Beispiel: Ein Klasse (`class`) oder eine Struktur (`struct`) beim
  Programmieren oder eine Tabelle in einer relationalen Datenbank.
- Strukturierte Datenbanken können als relationale Datenbanken vorliegen.
  Für die Tabellen einer solchen Datenbank wird ein sogenanntes _Schema_
  definiert. Dieses legt fest, wie viele Felder es in dieser Tabelle gibt,
  wie diese Felder heissen, was für einen Datentyp diese Felder haben
  (Zeichenkette, Zahl, Datumsangabe usw.). Weiter können Einschränkungen
  (_Constraints_) festgelegt werden, z.B. ob für ein Feld zwingend ein Wert
  angegeben werden muss, ob die Werte in einer Spalte eindeutig sind, ob es
  Standardwerte gibt usw.

Beispiel (JSON):

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

Schema-Definition (SQL DDL, DuckDB):

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

Daten-Definition (SQL DML, DuckDB):

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

Daten-Abfrage (SQL DQL, DuckDB):

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

Ausgabe:

| Vorname | Nachname |    Organisation     |        Rolle         | Pensum | Dienstjahre |
|---------|----------|---------------------|----------------------|-------:|------------:|
| Alice   | Bobson   | UBS                 | Key Account Manager  | 80.0   | 15          |
| Alice   | Bobson   | IMD Business School | Teacher              | 20.0   | 4           |
| Patrick | Bucher   | BBZW                | Teacher              | 50.0   | 3           |
| Patrick | Bucher   | Composed GmbH       | Full Stack Developer | 50.0   | 1           |

# Halbstrukturierte Daten

- Die Daten weisen eine Struktur auf, müssen sich aber nur unterschiedlich
  stark nach dieser Form richten.
- Beim Zugriff auf die Daten weiss man, dass gewisse Sachen auf die Daten
  zutreffen, hat aber gewisse Unsicherheiten.
- Beispiel: Eine JSON- oder XML-Datei oder eine NoSQL-Datenbank wie MongoDB,
  welche sogenannte Dokumente abspeichert, oder ein Key-Value-Store wie
  Redis, der abstrakte Datenstrukturen wie Listen, Maps oder Strings
  abspeichert.

# Unstrukturierte Daten

- Die Daten können zwar über eine bestimmte Struktur verfügen, der
  Speichermechanismus ignoriert diese aber.
- Beim Zugriff auf die Daten weiss man nur, dass man Daten erhält, aber
  nicht, in welcher Form diese vorliegen.
- Beispiel: Die verschiedenen Dateien in einem Dateisystem, die ein
  bestimmtes Dateiformat haben können (z.B. plain text, MP4-Video,
  JPEG-Bild, Word-Dokument) oder aber nur eine Reihe von Bytes sind (z.B.
  verschlüsselte und/oder komprimierte Dateien). Solche Daten werden in
  einem Dateisystem oder per S3 abgelegt.
