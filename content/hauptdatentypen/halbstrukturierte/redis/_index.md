+++
title = "Redis"
+++

## Einführung

Redis ist ein sogenannter _Key-Value-Store_, der Werte (_Values_) unter
eindeutigen Schlüsseln (_Keys_) abspeichert. Der Name "Redis" ist eine Abkürzung
für **Re**mote **Di**ctionary **S**ervie: Bei Redis handelt es sich also um
einen Dienst, den man als (entferntes) "Wörterbuch" verwenden kann. Dies soll
heissen, dass man in diesem Service Werte anhand eines Schlüssels nachschlagen
kann.

### Redis als Nachschlagewerk

Die Schlüssel müssen _eindeutig_ sein, damit man sie zum Nachschlagen von Werten
verwenden kann:

| **Schlüssel** |                           **Wert** |
|---------------|-----------------------------------:|
| `balance`     |                         `25471.93` |
| `127.0.0.1`   |                        `localhost` |
| `ipv4`        |                     `195.347.52.9` |
| `Joe Doe`     |                    `+019425287164` |
| `started`     | `2021-12-29T19:35:12.15.632+00:00` |

Es gibt verschiedene Systeme, die wie ein solches Nachschlagewerk funktionieren,
beispielsweise:

- das _Domain Name System_ (DNS) zum Nachschlagen von IP-Adressen (Values)
  anhand von Domainnamen (Keys)
- eine ARP-Tabelle zum Nachschlagen von MAC-Adressen (Values) anhand von
  IPv4-Adressen (Keys)
- ein Telefonbuch zum Nachschlagen von Telefonnummern (Values) anhand von Namen
  (Keys)
- ein Lexikon zum Nachschlagen von Bedeutungen (Values) anhand von Begriffen
  (Keys)

### Datentypen

Redis ist ein Datenspeicher für _teilweise strukturierte Daten_, d.h. die darin
gespeicherten Daten folgen keinem strengen Schema wie bei relationalen
Datenbanken, aber weisen gewisse Strukturen auf. Es werden u.a. die folgenden
[Datentypen](https://redis.io/docs/latest/develop/data-types/) unterstützt,
welche entprechende Gegenstücke in Programmiersprachen haben:

| **Programmiersprachen**    | **Redis**                                                          |
|----------------------------|--------------------------------------------------------------------|
| Primitive Datentypen       | [String](https://redis.io/docs/latest/develop/data-types/#strings) |
| Zeichenketten              | [String](https://redis.io/docs/latest/develop/data-types/#strings) |
| Arrays, Listen             | [List](https://redis.io/docs/latest/develop/data-types/#lists)     |
| Maps, Dictionaries, Hashes | [Hash](https://redis.io/docs/latest/develop/data-types/#hashes)    |
| Mengen                     | [Set](https://redis.io/docs/latest/develop/data-types/#sets)       |

Redis ist also ein Datenspeicher für _Datenstrukturen_ und funktioniert selber
wie eine grosse Map.

### Datenspeicherung

Redis kann Daten auf verschiedene Arten speichern:

- Das **RDB**-Format ("Redis Database") speichert die Datenbank als _Zustand_ in
  einer Datei ab. Dieses Format ist sehr kompakt, schnell im Zugriff und kann
  sehr einfach gesichert werden (Backup). Änderungen werden nicht in Echtzeit
  geschrieben, sondern nur periodisch, wodurch Datenverlust auftreten kann.
- Das **AOF**-Format ("Append only File") speichert die Datenbank als
  _Transaktionslog_ in einer Datei ab. Dabei wird jede einzelne Operation
  abgespeichert, sodass es nachvollziehbar ist, was mit der Datenbank passiert
  ist. Dieses Format bietet Nachvollziehbarkeit und Sicherheit, benötigt aber
  viel Platz und ist langsam, da der aktuelle Zustand anhand der abgespeicherten
  Transaktionen berechnet werden muss.

Es ist auch möglich, beide Formate zu aktivieren. Dadurch hat man die Vorteile
beider Formate, benötigt aber auch mehr Speicherplatz und opfert etwas
Performance.

Möchte man Redis als schnellen Zwischenspeicher (Cache) einsetzen, ist es auch
möglich, keines der beiden Formate zu verwenden.

Standardmässig ist Redis so konfiguriert, dass es das RDB-Format verwendet. Bei
der Auswahl der Speicherart kann man sich folgendes überlegen:

- Möchte man den aktuellen Zustand kennen, sollte man das RDB-Format verwenden.
- Möchte man wissen, wie es zum aktuellen Zustand gekommen ist, sollte man das
  AOF-Format verwenden.
- Möchte man beides wissen, sollte man das RDB- _und_ das AOF-Format verwenden.
- Möchte man Redis nur als Cache ohne Persistenz einsetzen, kann man Redis ohne
  RDB/AOF betreiben.

### Verwendung: Beispielsession

```plain
$ redis-cli
127.0.0.1:6379> PING
PONG
127.0.0.1:6379> SET name John
OK
127.0.0.1:6379> KEYS *
1) "name"
127.0.0.1:6379> GET name
"John"
127.0.0.1:6379> DEL name
(integer) 1
127.0.0.1:6379> EXISTS name
(integer) 0
```

### Befehlstruktur

Redis kennt über 400 [Befehle](https://redis.io/commands/).

- Das Präfix richtet sich nach der Datenstruktur, auf welcher der Befehl operiert:
    - List: `L` bzw. `R` für Operationen am linken bzw. rechten Listenende
    - Sets: `S`
    - Hashes: `H`
    - Sorted Sets: `Z`
- Die Befehle haben keine, einen oder mehrere (teils optionale) Parameter:
    - `FLUSHALL`: keine Parameter
    - `GET key`: ein Parameter
    - `SET key value`: zwei Parameter

### Einige Befehle

- [`PING`](https://redis.io/commands/ping/): Verbindung testen (gibt `PONG` aus,
  wenn Verbindung steht)
- `HELP`: Hilfe ausgeben, z.B. zu einem Befehl
    - `HELP PING`
- [`AUTH`](https://redis.io/commands/auth/): Interaktive Authentifizierung mit Passwort
- [`FLUSHALL`](https://redis.io/commands/flushall/): Löscht **alle** Einträge
- [`KEYS`](https://redis.io/commands/flushall/): Schlüssel gemäss Muster anzeigen
    - `KEYS *`: listet alle Schlüssel auf
- [`EXISTS`](https://redis.io/commands/exists/): Prüft, ob ein Schlüssel existiert
- [`TYPE`](https://redis.io/commands/exists/): Gibt den Datentyp des Werts von
  einem Schlüssel aus
- [`SAVE`](https://redis.io/commands/save/): Persistente Speicherung forcieren

### Befehle für einfache Werte

- [`SET`](https://redis.io/commands/set/): Ein Schlüssel/Wert-Paar definieren
    - [`MSET`](https://redis.io/commands/mset/): Mehrere Schlüssel/Wert-Paare
      gleichzeitig definieren
- [`GET`](https://redis.io/commands/get/): Wert anhand eines Schlüssels auslesen
- [`DEL`](https://redis.io/commands/del/): Eintrag entfernen
- [`RENAME`](https://redis.io/commands/rename/): Schlüssel umbenennen

### Strukturierte Schlüsselnamen

Schlüsselnamen können gemäss einer Konvention strukturiert werden:

```plain
SET lucerne.name Luzern
SET lucerne.population 81592

SET employee:1234:name Dilbert
SET employee:1234:position Engineer
```

Schlüssel zum gleichen "Feld" auslesen:

```plain
GET employee:*:name
```

Schlüssel zum gleichen "Datensatz" auslesen:

```plain
GET employee:1234:*
```

### Befehle für Hashes

Ein **Hash** speichert Schlüssel/Wert-Paare ab und ist mit einer `map` oder
`struct` in Go vergleichbar, erlaubt aber keine Verschachtelung.

- [`HSET`](https://redis.io/commands/hset/): Definiert einen Hash mit
  Schlüssel/Wert-Paaren
- [`HGET`](https://redis.io/commands/hget/): Gibt ein Feld zu einem Hash
  aus
- [`HGETALL`](https://redis.io/commands/HGETALL/): Gibt alle Feldnamen und
  -Werte zu einem Hash aus
- [`HKEYS`](https://redis.io/commands/hkeys/): Gibt die Feldnamen zu einem
  Hash aus
- [`HVALS`](https://redis.io/commands/hvals/): Gibt die Werte zu einem Hash
  aus
- [`HDEL`](https://redis.io/commands/hdel/): Löscht ein Feld von einem Hash
  (aber nicht den Hash selber)
- [`HSETNX`](https://redis.io/commands/hsetnx/): Setzt ein Feld von einem Hash,
  sofern es noch nicht definiert ist

Die Struktur von einem zusammengesetzten Objekt muss nicht über den Namen
codiert werden.

#### Beispiel: Hashes für Mitarbeiterverwaltung

```plain
HSET employee.dilbert
    id 715
    name Dilbert
    position Engineer
    salary 125000
    hired 1992

HGET employee.dilbert position
"Engineer"

KEYS employee.*
1) "employee.dilbert"
```

### Ausgabe von CSV und JSON

```bash
$ redis-cli --csv HGETALL employee.dilbert
```

```csv
"id","715","name","Dilbert","position","Engineer","salary","125000","hired","1992"
```

```bash
$ redis-cli --json HGETALL employee.dilbert
```

```json
{
  "id": "715",
  "name": "Dilbert",
  "position": "Engineer",
  "salary": "125000",
  "hired": "1992"
}
```

## Übungen

TODO

## Links

- [Webseite](https://redis.io/)
- [Cloud-Angebot](https://redis.io/try-free/)
- [Datentypen](https://redis.io/docs/latest/develop/data-types/)
- [Befehlsreferenz](https://redis.io/docs/latest/commands/)
- [Kommandozeile](https://redis.io/docs/latest/develop/connect/cli/)
- [Sprachanbindungen](https://redis.io/docs/latest/develop/connect/clients/)
