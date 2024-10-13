+++
title = "DuckDB"
+++

Datenbanken lassen sich in zwei Kategorien einteilen:

- OLTP: _Online **Transactional** Processing_ zur Verwaltung von Anwendungsdaten
- OLAP: _Online **Analytical** Processing_ zur Auswertung von Anwendungsdaten

Die meisten relationalen Datenbanken (PostgreSQL, Microsoft SQL Server, MySQL,
SQLite) sind OLTP-Datenbanken. Sie werden als persistenter Datenspeicher von
Anwendungen. Die Anwendung verändert den Zustand der Datenbank laufend in
sogenannten Transaktionen (z.B. Mutation eines Kunden-Datensatzes).

OLAP-Datenbanken dienen zur Auswertung bestehender Datensätze. Dabei steht nicht
das laufende Verändern des Datenbestandes im Vordergrund, sondern die Analyse
der darin gespeicherten Informationen (z.B. statistische Auswertungen über eine
Kundendatenbank).

Bei [DuckDB](https://duckdb.org/) handelt es sich um eine sehr schlanke und
moderne OLAP-Datenbank, die wesentlich einsteigerfreundlicher ist als
vergleichbare Lösungen (z.B. Apache Spark). DuckDB ist strenggenommen kein
Dienst, sondern ein Werkzeug. Eine der Hauptstärken von DuckDB ist das Einlesen
von Daten aus verschiedenen Quellen in verschiedenen Formaten ‒ eine Eigenschaft
die gerade im Cloud Computing sehr nützlich ist.

## Installation

Auf der im Unterricht zur Verfügung gestellten Cloud-VM ist DuckDB bereits
vorinstalliert und kann mit dem Befehl `duckdb` gestartet werden.

Für die lokale Ausführung kann der Befehl `duckdb` von der offiziellen Webseite
bezogen werden: [DuckDB
Installation](https://duckdb.org/docs/installation/index). Nach dem Entpacken
legt man die Datei am besten unter einem Pfad ab, der von der Umgebungsvariable
`PATH` referenziert wird, oder man erweitert die `PATH`-Umgebungsvariable
entsprechend.

## Übungen

In den folgenden Übungen soll DuckDB dazu verwendet werden, einen bestehenden
strukturierten Datenbestand (eine CSV-Datei bzw. mehrere JSON-Dateien) in eine
relationale Datenbank zu importieren (_Ingestion_) und dann zu analysieren.

Die erste Übung ist _geführt_, d.h. die Schritte müssen gemäss Anleitung
ausgeführt werden. Dabei ist es wichtig, die Schritte auch **nachvollziehen** zu
können. In der zweiten Übung müssen die jeweiligen Schritte angepasst auf einen
anderen Datenbestand angewendet werden.

### Übung 1 (geführt): Vorratslager

Die Datei [foodstock.csv](/files/foodstock.csv) beschreibt den Bestand eines
Lebensmittel-Vorratslagers. Die Datei kann auf der VM folgendermassen betrachtet
werden:

```bash
cat foodstock.csv
```

Starten Sie DuckDB mit dem Befehl `duckdb` und dem Parameter `foodstock-db`,
worauf der Prompt `D ` erscheinen sollte:

```bash
duckdb foodstock-db
D 
```

Der Parameter `foodstock-db` sorgt dafür, dass die eingelesenen Daten als
persistente Datenbank im entsprechenden Verzeichnis abgelegt werden.

Der `describe`-Befehl analysiert ein Datenbankobjekt (Tabelle, Ansicht) oder
eine Datenquelle (Datei, URL) und gibt aus, in welcher Struktur die Daten
vorliegen.

Geben Sie die Struktur der Datei `foodstock.csv` aus:

```sql
describe from "foodstock.csv";
```

Da das Schema bereits richtig erkannt worden ist, _könnte_ man den Datenbestand
direkt mit einem Befehl der Form `create table … as select …` einlesen. Da hier
aber eine eindeutige Identifikation fehlt, soll stattdessen die Tabelle selber
definiert werden:

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

Der erste Befehl (`create sequence …`) erzeugt eine _Sequenz_ zum automatischen
Durchnummerieren der Einträge.

Der zweite Befehl (`create table …`) definiert das Tabellenschema. Dabei wird
zusätzlich zu den bestehenden Daten ein `id`-Feld definiert, dessen Werte
automatisch von der zuvor definierten Sequenz `food_id` bezogen werden.

Die Tabelle ist nun bereit. Zur Kontrolle soll das Schema der Datei
`foodstock.csv` mit dem Schema der Tabelle `foodstock` verglichen werden.

**Aufgabe**: Halte die Ausgabe der folgenden beiden Befehle fest und beschreibe
die Unterschiede zwischen den beiden Ausgaben. Was haben diese Unterschiede zu
bedeuten?

```sql
describe from "foodstock.csv";
describe foodstock;
```

Im nächsten Schritt sollen die Werte aus der Datei `foodstock.csv` in die
Tabelle `foodstock` eingelesen werden:

```sql
insert into foodstock (name, unit, price, quantity, category, vegan) select * from "foodstock.csv";
```

Zur Kontrolle können die Daten aus der Tabelle ausgegeben werden:

```sql
select * from foodstock;
```

Diese sollte ungefähr folgendermassen aussehen:

| id |       name        | unit  | price | quantity |  category  | vegan |
|---:|-------------------|-------|------:|---------:|------------|------:|
| 1  | Gruyère           | kg    | 22.35 | 16.4     | dairy      | false |
| 2  | Steak             | kg    | 39.23 | 4.7      | meat       | false |
| 3  | Milk              | l     | 1.65  | 97.4     | dairy      | false |
| 4  | Eggplant          | kg    | 4.5   | 5.9      | vegetables | true  |
| 5  | Croissant         | piece | 1.3   | 27.0     | pastries   | false |
| 6  | Whole-Grain Bread | kg    | 4.25  | 17.0     | pastries   | true  |
| 7  | Eggs              | piece | 0.65  | 234.0    | proteins   | false |
| 8  | Olive Oil         | l     | 10.95 | 54.0     | oils       | true  |
| 9  | Coconut Oil       | l     | 7.3   | 45.0     | oils       | true  |
| 10 | Peanuts           | kg    | 8.2   | 23.0     | nuts       | true  |
| 11 | Candy Bar         | piece | 0.95  | 64.0     | candy      | false |
| 12 | Gummi Bears       | kg    | 5.95  | 19.0     | candy      | false |

### Übung 2 (selbständig): Fussball-Ligatabellen

[leagues.zip](/files/leagues.zip)
