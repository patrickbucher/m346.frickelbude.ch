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

Diese sollte ungefähr folgendermassen aussehen (Ausgabe gekürzt):

| id |       name        | unit  | price | quantity |  category  | vegan |
|---:|-------------------|-------|------:|---------:|------------|------:|
| 1  | Gruyère           | kg    | 22.35 | 16.4     | dairy      | false |
| 2  | Steak             | kg    | 39.23 | 4.7      | meat       | false |
| 3  | Milk              | l     | 1.65  | 97.4     | dairy      | false |

Anhand dieses Datenbestandes sollen nun Auswertungen vorgenommen werden. Damit
die Abfragen einfach gehalten werden können, empfiehlt sich der Gebrauch
sogenannter _Sichten_ oder _Ansichten_ (engl. _Views_).

Eine View lässt sich wie eine Tabelle abfragen, ist aber nichts weiter als eine
gespeicherte Abfrage. Im Gegensatz zu einer kopierten Tabelle sind Views darum
immer aktuell: Wird die zugrundeliegende Tabelle angepasst, liefert die View
auch die aktualisierten Daten zurück.

Um den Wert des Lebensmittel-Bestandes berechnen zu können, müssen die
Preisangaben mit den Mengenangaben multipliziert werden. Hierzu soll eine View
namens `foods_worth` erstellt werden:

```sql
create view foods_worth as (
    select id, name, unit, price, quantity, (price * quantity) as worth, category, vegan
    from foodstock
);
```

Das Feld `worth` ist ein _berechnetes Feld_: das Produkt aus Preis (`price`) und
Menge (`quantity`). Bei jeder Abfrage der View wird dieser Wert neu berechnet.

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

Die Spalte `worth` beinhaltet nun den Wert des Warenbestands für jedes einzelne
Lebensmittel.

Es lassen sich nun weitere Auswertungen anstellen, z.B. der Wert pro Kategorie
aller nicht-veganen Produkte. Hierzu wird nach der Spalte `category` gruppiert
und dabei die Spalte `worth` aufsummiert:

```sql
select sum(worth) as category_worth, category
from foods_worth
where vegan = false
group by category
having category_worth > 150
order by category_worth desc;
```

- Mit `sum(worth)` wird die Spalte `worth` aufsummiert.
  gruppiert.
- Mit `where` wird eine Filter-Bedingung auf die Originaldaten angewendet.
  Konkret werden mit `where vegan = false` werden nur Produkte berücksichtigt,
  die nicht vegan sind.
- Mit `group by category` werden die Einträge nach der Spalte `category`
- Mit `having` wird eine Filter-Bedingung auf die _aggregierten_ (d.h.
  gruppierten bzw. summierten) Daten angewendet. Konkret werden mit `having
  category_worth > 150` nur Kategorien zurückgeliefert, deren Gesamtwert 150.-
  übersteigt.
- Mit `order by category_worth desc` werden die Einträge absteigend
  ("descending") nach ihrem Gesamtwert sortiert.

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

**Aufgabe**: Überlege dir mindestens eine weitere Auswertung zu diesem
Datenbestand. Beschreibe die Auswertung in eigenen Worten (was sie erreichen
soll), formuliere den SQL-Befehl und halte die Ausgabe fest.

### Übung 2 (selbständig): Fussball-Ligatabellen

TODO: siehe [leagues.zip](/files/leagues.zip)
