+++
title = "DuckDB"
+++

Datenbanken lassen sich in zwei Kategorien einteilen:

- OLTP: _Online **Transactional** Processing_ zur Verwaltung von Anwendungsdaten
- OLAP: _Online **Analytical** Processing_ zur Auswertung von Anwendungsdaten

Die meisten relationalen Datenbanken (PostgreSQL, Microsoft SQL Server, MySQL, SQLite) sind OLTP-Datenbanken. Sie werden als persistenter Datenspeicher von Anwendungen eingesetzt. Die Anwendung verändert den Zustand der Datenbank laufend in sogenannten Transaktionen (z.B. Mutation eines Kunden-Datensatzes).

OLAP-Datenbanken dienen zur Auswertung bestehender Datensätze. Dabei steht nicht das laufende Verändern des Datenbestandes im Vordergrund, sondern die Analyse der darin gespeicherten Informationen (z.B. statistische Auswertungen über eine Kundendatenbank).

Bei [DuckDB](https://duckdb.org/) handelt es sich um eine sehr schlanke und moderne OLAP-Datenbank, die wesentlich einsteigerfreundlicher ist als vergleichbare Lösungen (z.B. Apache Spark). DuckDB ist strenggenommen kein Dienst, sondern ein Werkzeug. Eine der Hauptstärken von DuckDB ist das Einlesen von Daten aus verschiedenen Quellen in verschiedenen Formaten ‒ eine Eigenschaft die gerade im Cloud Computing sehr nützlich ist.

Die umfassende [Dokumentation](https://duckdb.org/docs/) enthält viele nützliche Informationen, z.B. zum [SQL-Dialekt](https://duckdb.org/docs/sql/introduction) von DuckDB. Mit [MotherDuck](https://motherduck.com/) steht ein Cloud-Angebot für DuckDB zur Verfügung.

## Installation

Auf der im Unterricht zur Verfügung gestellten Cloud-VM ist DuckDB bereits vorinstalliert und kann mit dem Befehl `duckdb` gestartet werden.

Für die lokale Ausführung kann der Befehl `duckdb` von der offiziellen Webseite bezogen werden: [DuckDB Installation](https://duckdb.org/docs/installation/index). Nach dem Entpacken legt man die Datei am besten unter einem Pfad ab, der von der Umgebungsvariable `PATH` referenziert wird, oder man erweitert die `PATH`-Umgebungsvariable entsprechend.

## Übungen

In den folgenden Übungen soll DuckDB dazu verwendet werden, einen bestehenden strukturierten Datenbestand (eine CSV-Datei bzw. mehrere JSON-Dateien) in eine relationale Datenbank zu importieren (_Ingestion_) und dann zu analysieren.

Die erste Übung ist _geführt_, d.h. die Schritte müssen gemäss Anleitung ausgeführt werden. Dabei ist es wichtig, die Schritte auch **nachvollziehen** zu können. In der zweiten Übung müssen die jeweiligen Schritte angepasst auf einen anderen Datenbestand angewendet werden.

### Übung 1 (geführt): Vorratslager

Die Datei [foodstock.csv](/files/foodstock.csv) beschreibt den Bestand eines Lebensmittel-Vorratslagers. Die Datei ist auf der VM bereits abgelegt und kann folgendermassen betrachtet werden:

```bash
cat foodstock.csv
```

Starte DuckDB mit dem Befehl `duckdb` und dem Parameter `foodstock-db`, worauf der Prompt `D ` erscheinen sollte:

```bash
duckdb foodstock-db
D 
```

Der Parameter `foodstock-db` sorgt dafür, dass die eingelesenen Daten als persistente Datenbank im entsprechenden Verzeichnis abgelegt werden.

Der `describe`-Befehl analysiert ein Datenbankobjekt (Tabelle, Ansicht) oder eine Datenquelle (Datei, URL) und gibt aus, in welcher Struktur die Daten vorliegen.

Gib die Struktur der Datei `foodstock.csv` aus:

```sql
describe from "foodstock.csv";
```

Da das Schema bereits richtig erkannt worden ist, _könnte_ man den Datenbestand direkt mit einem Befehl der Form `create table … as select …` einlesen. Da hier aber eine eindeutige Identifikation fehlt, soll stattdessen die Tabelle selber definiert werden:

```sql
create sequence food_id;
create table foodstock (
    id integer primary key default(nextval('food_id')),
    name varchar(100) not null,
    unit varchar(10) not null,
    price double not null,
    quantity double not null,
    category varchar(20),
    vegan boolean not null default(false)
);
```

Der erste Befehl (`create sequence …`) erzeugt eine _Sequenz_ zum automatischen Durchnummerieren der Einträge.

Der zweite Befehl (`create table …`) definiert das Tabellenschema. Dabei wird zusätzlich zu den bestehenden Daten ein `id`-Feld definiert, dessen Werte automatisch von der zuvor definierten Sequenz `food_id` bezogen werden.

Die Tabelle ist nun bereit. Zur Kontrolle soll das Schema der Datei `foodstock.csv` mit dem Schema der Tabelle `foodstock` verglichen werden.

**Aufgabe**: Halte die Ausgabe der folgenden beiden Befehle fest und beschreibe die Unterschiede zwischen den beiden Ausgaben. Was haben diese Unterschiede zu bedeuten?

```sql
describe from "foodstock.csv";
describe foodstock;
```

Im nächsten Schritt sollen die Werte aus der Datei `foodstock.csv` in die Tabelle `foodstock` eingelesen werden:

```sql
insert into foodstock (name, unit, price, quantity, category, vegan) select * from "foodstock.csv";
```

Zur Kontrolle können die Daten aus der Tabelle ausgegeben werden:

```sql
select * from foodstock;
```

Diese sollte ungefähr folgendermassen aussehen (Ausgabe gekürzt):

| id |       name        | unit  | price | quantity |  category  | vegan |
|---:|-------------------|-------|------:|---------:|------------|------:|
| 1  | Gruyère           | kg    | 22.35 | 16.4     | dairy      | false |
| 2  | Steak             | kg    | 39.23 | 4.7      | meat       | false |
| 3  | Milk              | l     | 1.65  | 97.4     | dairy      | false |

Anhand dieses Datenbestandes sollen nun Auswertungen vorgenommen werden. Damit die Abfragen einfach gehalten werden können, empfiehlt sich der Gebrauch sogenannter _Sichten_ oder _Ansichten_ (engl. _Views_).

Eine View lässt sich wie eine Tabelle abfragen, ist aber nichts weiter als eine gespeicherte Abfrage. Im Gegensatz zu einer kopierten Tabelle sind Views darum immer aktuell: Wird die zugrundeliegende Tabelle angepasst, liefert die View auch die aktualisierten Daten zurück.

Um den Wert des Lebensmittel-Bestandes berechnen zu können, müssen die Preisangaben mit den Mengenangaben multipliziert werden. Hierzu soll eine View namens `foods_worth` erstellt werden:

```sql
create view foods_worth as (
    select id, name, unit, price, quantity, (price * quantity) as worth, category, vegan
    from foodstock
);
```

Das Feld `worth` ist ein _berechnetes Feld_: das Produkt aus Preis (`price`) und Menge (`quantity`). Bei jeder Abfrage der View wird dieser Wert neu berechnet.

Diese View kann nun wie eine Tabelle abgefragt werden:

```sql
select * from foods_worth;
```

Das Ergebnis sollte ungefähr folgendermassen aussehen (Ausgabe gekürzt):

| id |       name        | unit  | price | quantity |       worth        |  category  | vegan |
|---:|-------------------|-------|------:|---------:|-------------------:|------------|------:|
| 1  | Gruyère           | kg    | 22.35 | 16.4     | 366.53999999999996 | dairy      | false |
| 2  | Steak             | kg    | 39.23 | 4.7      | 184.381            | meat       | false |
| 3  | Milk              | l     | 1.65  | 97.4     | 160.71             | dairy      | false |

Die Spalte `worth` beinhaltet nun den Wert des Warenbestands für jedes einzelne Lebensmittel.

Es lassen sich nun weitere Auswertungen anstellen, z.B. der Wert pro Kategorie aller nicht-veganen Produkte. Hierzu wird nach der Spalte `category` gruppiert und dabei die Spalte `worth` aufsummiert:

```sql
select sum(worth) as category_worth, category
from foods_worth
where vegan = false
group by category
having category_worth > 150
order by category_worth desc;
```

- Mit `sum(worth)` wird die Spalte `worth` aufsummiert.
- Mit `where` wird eine Filter-Bedingung auf die Originaldaten angewendet.  Konkret werden mit `where vegan = false` werden nur Produkte berücksichtigt, die nicht vegan sind.
- Mit `group by category` werden die Einträge nach der Spalte `category` gruppiert.
- Mit `having` wird eine Filter-Bedingung auf die _aggregierten_ (d.h.  gruppierten bzw. summierten) Daten angewendet. Konkret werden mit `having category_worth > 150` nur Kategorien zurückgeliefert, deren Gesamtwert 150.- übersteigt.
- Mit `order by category_worth desc` werden die Einträge absteigend ("descending") nach ihrem Gesamtwert sortiert.

Ausgabe:

| category_worth | category |
|---------------:|----------|
| 527.25         | dairy    |
| 184.381        | meat     |
| 173.85         | candy    |
| 152.1          | proteins |

Schliesslich kann der Gesamtwert des Vorratslagers berechnet werden:

```sql
select sum(worth) as total from foods_worth;
```

Ausgabe:

|       total        |
|-------------------:|
| 2279.8810000000003 |

**Aufgabe**: Überlege dir mindestens eine weitere Auswertung zu diesem Datenbestand. Beschreibe die Auswertung in eigenen Worten (was sie erreichen soll), formuliere den SQL-Befehl und halte die Ausgabe fest.

DuckDB kann mit dem Befehl `.exit` oder durch Betätigung der Tastenkombination `[Ctrl]`-`[D]` verlassen werden.

### Übung 2 (selbständig): Fussball-Ligatabellen

Das Archiv [leagues.zip](/files/leagues.zip) beinhaltet fiktive Spielergebnisse verschiedener europäischer Fussball-Liegen. Es kann folgendermassen entpackt werden:

```bash
unzip leagues.zip
```

Die Struktur des daraus resultierenden Verzeichnises `leagues` kann mit dem Befehl `tree` betrachtet werden:

```bash
tree leagues
```

Das Verzeichnis enthält ein Unterverzeichnis pro Liga (`bundesliga`, `la-liga` usw.). Jedes Unterverzeichnis enthält eine Reihe von JSON-Dateien; eine pro Spieltag (`day01.json`, `day02.json` usw.).

Die Dateien sehen folgendermassen aus (z.B. `bundesliga/day01.json`, Auszug):

```json
[
  {
    "homeTeam": "Bayern München",
    "awayTeam": "FSV Mainz 05",
    "homeGoals": 2,
    "awayGoals": 3
  },
  {
    "homeTeam": "RB Leipzig",
    "awayTeam": "Werder Bremen",
    "homeGoals": 1,
    "awayGoals": 2
  },
  …
]
```

Jede Datei enthält eine Reihe von Spielen mit einer Heim- und einer Auswärtsmannschaft sowie deren erzielten Toren. Der obenstehende Auszug bezeichnet folgende Spielergebnisse:

- Bayern München 2:3 FSV Mainz 05
- RB Leipzig 1:2 Werder Bremen

Aus diesen Speilergebnissen soll eine Ligatabelle berechnet werden. Bei der Bundesliga sieht diese folgendermassen aus:

|  # | team                |  m |  p |  w |  t |  d | g+ | g- |  g= |
|---:|---------------------|---:|---:|---:|---:|---:|---:|---:|----:|
|  1 | SC Freiburg         | 34 | 62 | 18 |  8 |  8 | 55 | 34 |  21 |
|  2 | Borussia Dortmund   | 34 | 59 | 18 |  5 | 11 | 50 | 36 |  14 |
|  3 | Eintracht Frankfurt | 34 | 57 | 16 |  9 |  9 | 57 | 52 |   5 |
|  4 | FSV Mainz 05        | 34 | 55 | 14 | 13 |  7 | 45 | 28 |  17 |
|  5 | Holsten Kiel        | 34 | 55 | 15 | 10 |  9 | 43 | 39 |   4 |
|  6 | 1. FC Heidenheim    | 34 | 50 | 13 | 11 | 10 | 41 | 29 |  12 |
|  7 | Union Berlin        | 34 | 50 | 13 | 11 | 10 | 29 | 22 |   7 |
|  8 | Bayern München      | 34 | 49 | 14 |  7 | 13 | 57 | 49 |   8 |
|  9 | VfB Stuttgart       | 34 | 47 | 13 |  8 | 13 | 45 | 42 |   3 |
| 10 | RB Leipzig          | 34 | 45 | 12 |  9 | 13 | 44 | 45 |  -1 |
| 11 | Bayer Leverkusen    | 34 | 44 | 10 | 14 | 10 | 39 | 31 |   8 |
| 12 | Mönchengladbach     | 34 | 43 | 10 | 13 | 11 | 27 | 33 |  -6 |
| 13 | FC St. Pauli        | 34 | 43 | 11 | 10 | 13 | 31 | 37 |  -6 |
| 14 | Werder Bremen       | 34 | 40 | 11 |  7 | 16 | 44 | 52 |  -8 |
| 15 | Augsburg            | 34 | 39 |  9 | 12 | 13 | 30 | 44 | -14 |
| 16 | VfL Wolfsburg       | 34 | 34 |  9 |  7 | 18 | 38 | 53 | -15 |
| 17 | TSG Hoffenheim      | 34 | 34 | 10 |  4 | 20 | 27 | 51 | -24 |
| 18 | VfL Bochum          | 34 | 27 |  5 | 12 | 17 | 15 | 40 | -25 |

Die Spalten haben folgende Bedeutung:

- `#`: Rang (absteigend sortiert nach Punkten und Tordifferenz)
- `team`: Mannschaft
- `m`: Anzahl Spiele ("matches")
- `p`: Anzahl Punkte (3 pro Sieg, 1 pro Unentschieden, 0 pro Niederlage)
- `w`: Anzahl Siege ("wins")
- `t`: Anzahl Unentschieden ("ties")
- `d`: Anzahl Niederlagen ("defeats")
- `g+`: Anzahl erzielter Tore
- `g-`: Anzahl kassierter Tore
- `g=`: Tordifferenz (erzielte minus kassierte Tore)

Zuerst soll DuckDB mit einer neuen Datenbank gestartet werden:

```bash
duckdb leagues-db
```

Das Schema der JSON-Dateien kann folgendermassen beschrieben werden:

```sql
describe from "leagues/bundesliga/day*.json";
```

**Aufgabe**: Erstelle eine Sequenz namens `bundesliga_match_id` und eine Tabelle namens `bundesliga_matches`. Neben den vier Informationen aus den JSON-Dateien soll eine automatisch nummerierte ID aus der Sequenz `bundesliga_match_id` vergeben werden. Halte die Befehle fest! Lies anschliessend die Daten der Bundesliga ein (`insert into … from "leagues/bundesliga/day*.json`).

Tipp: Schaue bei Unklarheiten oben bei [Übung 1](#übung-1-geführt-vorratslager) nach.

Die Tabelle sollte ungefähr folgendermassen aussehen (Auszug von `select * from bundesliga_matches;`):

| id |      homeTeam       |    awayTeam     | homeGoals | awayGoals |
|---:|---------------------|-----------------|----------:|----------:|
| 1  | Bayern München      | FSV Mainz 05    | 2         | 3         |
| 2  | RB Leipzig          | Werder Bremen   | 1         | 2         |
| 3  | Eintracht Frankfurt | VfL Wolfsburg   | 0         | 2         |
| 4  | SC Freiburg         | Augsburg        | 0         | 0         |
| 5  | Bayer Leverkusen    | Mönchengladbach | 0         | 0         |

Um die Spielergebnisse pro Mannschaft auswerten zu können, müssen diese Einträge auseinandergenommen werden, sodass für jedes Spiel zwei Einträge entstehen.  Hierzu soll eine View namens `bundesliga_per_team` erstellt werden:

```sql
create view bundesliga_per_team as (
    select id as gameId, homeTeam as team, homeGoals as goals_scored,
    awayGoals as goals_conceded from bundesliga_matches
    union
    select id as gameId, awayTeam as team, awayGoals as goals_scored,
    homeGoals as goals_conceded from bundesliga_matches
);
```

Die View sollte ungefähr folgendermassen aussehen (Auszug von `select * from bundesliga_per_team;`):

| gameId |        team         | goals_scored | goals_conceded |
|-------:|---------------------|-------------:|---------------:|
| 58     | 1. FC Heidenheim    | 1            | 0              |
| 27     | FC St. Pauli        | 4            | 2              |
| 74     | FSV Mainz 05        | 4            | 1              |
| 79     | FC St. Pauli        | 1            | 2              |
| 83     | Werder Bremen       | 1            | 4              |

**Aufgabe**: Erstelle anhand dieser Informationen eine neue View namens `bundesliga_result_day`, welche für jeden Eintrag die folgenden Informationen als berechnete Felder enthält:

- Tordifferenz: `goals_scored` - `goals_conceded`
- Anzahl Punkte: 3 für einen Sieg, 1 für ein Unentschieden, 0 für eine Niederlage
    - siehe [`CASE`-Statement](https://duckdb.org/docs/sql/expressions/case.html)
- Anzahl Siege: 1 falls es sich um einen Sieg handelt, 0 andernfalls
- Anzahl Unentschieden: 1 falls es sich um ein Unentschieden handelt, 0 andernfalls
- Anzahl Niederlagen: 1 falls es sich um eine Niederlage handelt, 0 andernfalls

Halte den dazu verwendeten Befehl fest.

Die View sollte ungefähr folgendermassen aussehen (Auszug von `select * from bundesliga_result_day;`):

|       team        | goals_scored | goals_conceded | goals_diff | points | wins | ties | defeats |
|-------------------|-------------:|---------------:|-----------:|-------:|-----:|-----:|--------:|
| RB Leipzig        | 1            | 2              | -1         | 0      | 0    | 0    | 1       |
| VfB Stuttgart     | 0            | 0              | 0          | 1      | 0    | 1    | 0       |
| SC Freiburg       | 0            | 0              | 0          | 1      | 0    | 1    | 0       |
| Borussia Dortmund | 1            | 0              | 1          | 3      | 1    | 0    | 0       |
| Werder Bremen     | 0            | 2              | -2         | 0      | 0    | 0    | 1       |

Die Einträge dieser View entsprechen nun einer Mini-Tabelle pro Spieltag und Mannschaft. Nun sollen die Einträge pro Mannschaft aggregiert werden, indem man die Summe aller Felder berechnet und sie nach der Spalte `team` gruppiert.

**Aufgabe**: Erstelle eine View `bundesliga_table`, in welcher die Daten aus der View `bundesliga_result_day` wie beschrieben aggregiert werden. Die View sollte nach Punkten und Tordifferenz absteigend sortiert sein. Halte den dazu verwendeten Befehl fest.

Die Tabelle sollte ungefähr folgendermassen aussehen (Auszug aus `select * from bundesliga_table;`):

| team                |  m |  p |  w |  t |  d | g+ | g- | g= |
|---------------------|---:|---:|---:|---:|---:|---:|---:|---:|
| SC Freiburg         | 34 | 62 | 18 |  8 |  8 | 55 | 34 | 21 |
| Borussia Dortmund   | 34 | 59 | 18 |  5 | 11 | 50 | 36 | 14 |
| Eintracht Frankfurt | 34 | 57 | 16 |  9 |  9 | 57 | 52 |  5 |
| FSV Mainz 05        | 34 | 55 | 14 | 13 |  7 | 45 | 28 | 17 |
| Holsten Kiel        | 34 | 55 | 15 | 10 |  9 | 43 | 39 |  4 |

Der Rang muss noch separat berechnet werden, was mit folgendem Befehl bewerkstelligt werden kann:

```sql
select row_number() over() as '#', * from bundesliga_table;
```

Das Vorgehen kann mit einer weiteren Liga und anhand der festgehaltenen Befehle wiederholt werden.
