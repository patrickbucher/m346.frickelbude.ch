+++
title = "Valkey"
+++

## Einführung

[Valkey](https://valkey.io/) ist ein sogenannter _Key-Value-Store_, der Werte (_Values_) unter eindeutigen Schlüsseln (_Keys_) abspeichert. Valkey ist ein Fork von Redis, was eine Abkürzung für **Re**mote **Di**ctionary **S**ervice ist: Es handelt sich also um einen Dienst, den man als (entferntes) "Wörterbuch" verwenden kann. Dies soll heissen, dass man in diesem Service Werte anhand eines Schlüssels ablegen und nachschlagen kann. Redis ist somit als eine grosse Map zu verstehen.

### Valkey als Nachschlagewerk

In Valkey müssen die Schlüssel _eindeutig_ sein, damit man sie zum Nachschlagen von Werten verwenden kann. Werte dürfen hingegen mehrmals die gleichen vorkommen. Hierzu einige Beispiele:

| **Schlüssel** |                           **Wert** |
|---------------|-----------------------------------:|
| `balance`     |                         `25471.93` |
| `127.0.0.1`   |                        `localhost` |
| `ipv4`        |                     `195.347.52.9` |
| `Joe Doe`     |                    `+019425287164` |
| `started`     | `2021-12-29T19:35:12.15.632+00:00` |

Es gibt verschiedene Systeme, die wie ein solches Nachschlagewerk funktionieren, beispielsweise:

- das _Domain Name System_ (DNS) zum Nachschlagen von IP-Adressen (Values) anhand von Domainnamen (Keys)
- eine ARP-Tabelle zum Nachschlagen von MAC-Adressen (Values) anhand von IPv4-Adressen (Keys)
- ein Telefonbuch zum Nachschlagen von Telefonnummern (Values) anhand von Namen (Keys)
- ein Lexikon zum Nachschlagen von Bedeutungen (Values) anhand von Begriffen (Keys)
- ein Dateisystem zum Ablegen von Dateien (Values) unter bestimmten Pfaden (Keys)

### Datentypen

Valkey ist ein Datenspeicher für _abstrakte Datentypen_, d.h. die darin gespeicherten Daten folgen keinem strengen Schema wie bei relationalen Datenbanken, aber weisen gewisse Strukturen auf. Es werden u.a. die folgenden [Datentypen](https://valkey.io/topics/data-types/) unterstützt, welche entprechende Gegenstücke in Programmiersprachen haben:

| **Programmiersprachen**    | **Valkey**                                  |
|----------------------------|---------------------------------------------|
| Primitive Datentypen       | [String](https://valkey.io/topics/strings/) |
| Zeichenketten              | [String](https://valkey.io/topics/strings/) |
| Arrays, Listen             | [List](https://valkey.io/topics/lists/)     |
| Maps, Dictionaries, Hashes | [Hash](https://valkey.io/topics/hashes/)    |
| Mengen                     | [Set](https://valkey.io/topics/sets/)       |

Valkey ist also ein Datenspeicher für _Datenstrukturen_ und funktioniert selber wie eine grosse Map mit (eindeutigen) Schlüsseln und dazu zugeordneten Werten.

### Persistente Datenspeicherung 

Valkey kann Daten auf verschiedene Arten speichern:

- Das **RDB**-Format ("Valkey Database") speichert die Datenbank als _Zustand_ in einer Datei ab. Dieses Format ist sehr kompakt, schnell im Zugriff und eignet sich sehr gut für Datensicherungen (Backups). Änderungen werden nicht in Echtzeit geschrieben, sondern nur periodisch, wodurch Datenverluste auftreten können.
    - Analogie: Das aktuelle Saldo eines Bankkontos, wovon man aber nicht weiss, welche Zahlungsein- und -ausgänge zu diesem Saldo geführt haben.
- Das **AOF**-Format ("Append-only File") speichert die Datenbank als _Transaktionslog_ in einer Datei ab. Dabei wird jede einzelne Operation abgespeichert, sodass es nachvollziehbar ist, was mit der Datenbank passiert ist. Dieses Format bietet Nachvollziehbarkeit und Sicherheit, benötigt aber viel Platz und ist langsam, da der aktuelle Zustand anhand der abgespeicherten Transaktionen berechnet werden muss.
    - Analogie: Die Zahlungsein- und -ausgänge eines Bankkontos, die aufsummiert werden müssen, damit man das Saldo zu einem bestimmten Zeitpunkt herausfinden kann.

Es ist auch möglich, beide Formate zu aktivieren. Dadurch hat man die Vorteile beider Formate, benötigt aber auch mehr Speicherplatz und opfert zusätzlich Performance, da einerseits jede Transaktion (AOF) und andererseits der aktuelle Zustand periodisch (RDB) gesichert werden muss.

Möchte man Valkey als schnellen Zwischenspeicher (Cache) einsetzen, ist es auch möglich, keines der beiden Formate zu verwenden. Wird Valkey neu gestartet, sind die Daten unwiderruflich verloren. (In solchen Einsatzszenarien lassen sich aber die Daten einfach neu berechnen.)

Standardmässig ist Valkey so konfiguriert, dass es das RDB-Format verwendet. Bei der Auswahl der Speicherart kann man sich folgendes überlegen:

- Möchte man den aktuellen Zustand kennen, sollte man das RDB-Format verwenden.
- Möchte man wissen, wie es zum aktuellen Zustand gekommen ist, sollte man das AOF-Format verwenden.
- Möchte man beides wissen, sollte man das RDB- _und_ das AOF-Format verwenden.
- Möchte man Valkey nur als Cache ohne Persistenz einsetzen, kann man Valkey ohne RDB/AOF betreiben.

Der Abschnitt [Persistenz](https://valkey.io/topics/persistence/) der Valkey-Dokumentation enthält weiterführende Informationen zu diesen Formaten, deren Vor- und Nachteilen sowie zur Konfiguration.

### Verwendung: Beispielsession

Der Valkey-Server kann über verschiedene [Sprachanbindungen](https://valkey.io/clients/) aus einer Programmiersprache heraus angesprochen werden. Für den interaktiven Gebrauch steht das Kommandozeilenwerkzeug `valkey-cli` zur Verfügung. Eine solche Session kann folgendermassen aussehen:

```plain
$ valkey-cli
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

- Die Session wird mit dem Befehl `valkey-cli` geöffnet.
- Mit `PING` wird geprüft, ob die Verbindung zum Server funktioniert. (Es kommt `PONG` zurück.)
- Mit `SET` wird ein Eintrag (key: `name`, value: `John`) geschrieben.
- Mit `KEYS *` werden alle vorhandenen Schlüssel aufgelistet (aktuell nur `name`).
- Mit `DEL` wird der Schlüssel `name` gelöscht.
- Mit `EXISTS` kann man das Vorhandensein eines Schlüssels überprüfen (`0` heisst "negativ", d.h. der Schlüssel `name` existiert nicht (mehr)).

### Befehlstruktur

Valkey kennt über 400 [Befehle](https://valkey.io/commands/). Diese muss man nicht auswendig kennen. Es ist aber hilfreich, sich mit folgenden Regeln durch die Befehlsstruktur orientieren zu können:

- Befehle haben ein _Präfix_. Dieses richtet sich nach der Datenstruktur, auf welcher der Befehl operiert:
    - List: `L` bzw. `R` für Operationen am linken bzw. rechten Listenende
    - Sets: `S`
    - Hashes: `H`
    - Sorted Sets: `Z`
- Die Befehle haben keine, einen oder mehrere (teils optionale) Parameter:
    - `FLUSHALL`: keine Parameter
    - `GET key`: ein Parameter
    - `SET key value`: zwei Parameter
    - `HGET key field1 value1 [field2 value2 …]`: beliebig viele Parameter

### Grundlegende Befehle

Die folgenden Befehle werden im interaktiven Umgang mit Valkey sehr häufig
verwendet. Ihren Gebrauch sollte man beherrschen:

- [`PING`](https://valkey.io/commands/ping/): Verbindung testen (gibt `PONG` aus, wenn die Verbindung steht)
- `HELP`: Hilfe ausgeben, z.B. zu einem Befehl
    - Beispiel: `HELP PING`
- [`AUTH`](https://valkey.io/commands/auth/): Interaktive Authentifizierung mit Passwort
- [`FLUSHALL`](https://valkey.io/commands/flushall/): Löscht **alle** Einträge
- [`KEYS`](https://valkey.io/commands/flushall/): Schlüssel gemäss Muster anzeigen
    - `KEYS *`: listet alle Schlüssel auf
- [`EXISTS`](https://valkey.io/commands/exists/): Prüft, ob ein Schlüssel existiert
- [`TYPE`](https://valkey.io/commands/exists/): Gibt den Datentyp des Werts von
  einem Schlüssel aus
- [`SAVE`](https://valkey.io/commands/save/): Persistente Speicherung forcieren

#### Befehle für einfache Werte

Der einfachste Einsatz von Valkey ist das Verwalten einfacher Werte, d.h.
von Schlüssel-Wert-Paaren.

- [`SET`](https://valkey.io/commands/set/): Ein Schlüssel/Wert-Paar definieren
    - [`MSET`](https://valkey.io/commands/mset/): Mehrere Schlüssel/Wert-Paare gleichzeitig definieren
- [`GET`](https://valkey.io/commands/get/): Wert anhand eines Schlüssels auslesen
- [`DEL`](https://valkey.io/commands/del/): Eintrag entfernen
- [`RENAME`](https://valkey.io/commands/rename/): Schlüssel umbenennen

#### Strukturierte Schlüsselnamen

Schlüsselnamen können gemäss einer selbst gewählten Konvention strukturiert werden. Hierbei werden Teile des Schlüssels durch einem Punkt oder durch einen Doppelpunkt voneinander getrennt. (Diese Zeichen haben keine besonderen Bedeutungen, sondern dienen einfach zur optischen Strukturierung der Schlüssel.)

Beispiele:

```plain
SET lucerne.name Luzern
SET lucerne.population 81592

SET employee:1234:name Dilbert
SET employee:1234:position Engineer
```

Mithilfe der `*`-Wildcard können verschiedene Schlüssel anhand eines Musters ausgelesen werden, z.B. die Namen aller Angestellter:

```plain
KEYS employee:*:name
```

Möchte man alle Schlüssel zu einem bestimmten Angestellten in Erfahrung bringen, kann man die `*`-Wildcard an der entsprechenden Stelle verwenden:

```plain
KEYS employee:1234:*
```

#### Befehle für Hashes

Ein Hash speichert Schlüssel/Wert-Paare ab und ist mit dem Map- bzw.  Hash-Datentyp verschiedener Programmiersprachen vergleichbar, erlaubt aber keine Verschachtelung. (Alle Schlüssel und Werte sind Strings.)

Die wichtigsten Befehle für Hashes sind:

- [`HSET`](https://valkey.io/commands/hset/): Definiert einen Hash mit Schlüssel/Wert-Paaren
- [`HGET`](https://valkey.io/commands/hget/): Gibt ein Feld zu einem Hash aus
- [`HGETALL`](https://valkey.io/commands/HGETALL/): Gibt alle Feldnamen und -Werte zu einem Hash aus
- [`HKEYS`](https://valkey.io/commands/hkeys/): Gibt die Feldnamen zu einem Hash aus
- [`HVALS`](https://valkey.io/commands/hvals/): Gibt die Werte zu einem Hash aus
- [`HDEL`](https://valkey.io/commands/hdel/): Löscht ein Feld von einem Hash (aber nicht den Hash selber)
- [`HSETNX`](https://valkey.io/commands/hsetnx/): Setzt ein Feld von einem Hash, sofern es noch nicht definiert ist

Die Struktur von einem zusammengesetzten Objekt muss nicht über den Namen codiert werden, sondern kann über einen Hash gelöst werden:

```plain
HSET employee.dilbert id 715 name Dilbert position Engineer salary 125000 hired 1992

HGET employee.dilbert position
"Engineer"

KEYS employee.*
1) "employee.dilbert"
```

Hashes kennen kein Schema, wie es bei Tabellen relationaler Datenbanken zum Einsatz kommt. Man kann sich also nicht darauf verlassen, dass ein Hash bestimmte Felder enthält!

### Export im CSV- und JSON-Format

Valkey erlaubt den Export von Daten ins CSV-Format:

```bash
$ valkey-cli --csv HGETALL employee.dilbert
```

Ausgabe:

```csv
"id","715","name","Dilbert","position","Engineer","salary","125000","hired","1992"
```

Ab Valkey-Version 7, die auf den VMs vorinstalliert ist, lassen sich auch JSON-Datenstrukturen in Valkey verwalten und daraus exportieren:

```bash
$ valkey-cli --json HGETALL employee.dilbert
```

Ausgabe:

```json
{
  "id": "715",
  "name": "Dilbert",
  "position": "Engineer",
  "salary": "125000",
  "hired": "1992"
}
```

Über diese Austauschformate liessen sich die teilweise strukturierten Daten aus Valkey als strukturierte Daten in [DuckDB](/hauptdatentypen/strukturierte/duckdb) einlesen und dort analysieren.

## Übungen

Dokumentieren Sie Ihre eingegebenen Befehle und deren Ausgaben! Verwenden Sie das Präfix `> ` für Befehlszeilen, um diese von den Ausgaben unterscheidbar zu machen.

### Übung 0: Mit Valkey verbinden

Bei dieser Übung brauchen Sie nichts zu dokumentieren.

Verbinden Sie sich mittels `valkey-cli` mit der Datenbank:

```plain
$ valkey-cli
127.0.0.1:6379>
```

Es sollte nun die Eingabeaufforderung `127.0.0.1:6379>` erscheinen.

Setzen Sie den Befehl `PING` ab, der `PONG` zurückgeben sollte:

```plain
127.0.0.1:6379> PING
PONG
```

Hilfe zu einem Befehl bekommen Sie mit dem `HELP`-Befehl:

```plain
> HELP PING

  PING [message]
  summary: Ping the server
  …
```

Mit `[Ctrl]-[D]` oder `[Ctrl]-[C]` können Sie die Sitzung beenden.

Achten Sie bei der Eingabe eines Befehls darauf, ob die Valkey-Eingabeaufforderung (`> `) oder die System-Shell (`$ `) aktiv ist!

### Übung 1: Steckbrief abspeichern

Verwenden Sie den [`SET`](https://valkey.io/commands/set/)-Befehl, um Ihren persönlichen Steckbrief abzuspeichern. Speichern Sie die folgenden Angaben ab:

- Vorname
- Nachname
- Alter (in ganzen Jahren)
- Wohnort
- Lieblingsessen

Überlegen Sie sich vorher eine geeignete Namensstruktur für die Schlüssel.

Verwenden Sie anschliessend den [`MSET`](https://valkey.io/commands/mset/)-Befehl, um den persönlichen Steckbrief einer weiteren Person, die sie kennen, in einem einzigen Befehl abzuspeichern.

Erhöhen Sie anschliessend mit dem [`INCR`](https://valkey.io/commands/incr/)-Befehl Ihr Alter beider Personen um ein Jahr.

Verwenden Sie den [`KEYS`](https://valkey.io/commands/keys/)-Befehl, um alle Schlüssel anzuzeigen. Geben Sie anschliessend alle Werte mithilfe des [`GET`](https://valkey.io/commands/get/)-Befehls aus.

### Übung 2: TODO-Liste

Erstellen Sie eine TODO-Liste mithilfe des [`LPUSH`](https://valkey.io/commands/lpush/)-Befehls. Definieren Sie mindestens drei Aufgaben, die Sie erledigen müssen. (Falls die Aufgaben Leerzeichen enthalten, umschliessen Sie den Text mit Anführungs- und Schlusszeichen (`"…"`).

Geben Sie nun die komplette Liste mithilfe des [`LRANGE`](https://valkey.io/commands/lrange/)-Befehls aus. (Tipp: Der Index ist 0-basierend, und -1 bezeichnet das letzte Listenelement.)

Angenommen, Sie hätten nun eine dieser TODO-Aufgaben erledigt: Entfernen Sie das Element mithilfe des [`LREM`](https://valkey.io/commands/lrange/)-Befehls aus der Liste. Erstellen Sie nun eine zweite Liste mit erledigten Aufgaben, und fügen Sie die erledigte Aufgabe dieser neuen Liste hinzu.

Verschieben Sie eine weitere erledigte Aufgabe mit dem [`RPOPLPUSH`](https://valkey.io/commands/rpoplpush/)-Befehl von der einen in die andere Liste. Geben Sie anschliessend beide Listen noch einmal aus.

### Übung 3: Mengenoperationen

Erstellen Sie ein Set (d.h. eine Menge) mithilfe des [`SADD`](https://valkey.io/commands/sadd/)-Befehls mit dem Namen `mammals` (Säugetiere) und den folgenden Einträgen:

- Mensch
- Fledermaus
- Pferd
- Gorilla
- Meerschweinchen
- Kuh

Erstellen Sie nun ein weiteres Set mit dem Namen `fourlegged` (Vierbeiner) und den folgenden Einträgen:

- Pferd
- Krokodil
- Meerschweinchen
- Kuh
- Eidechse 
- Leguan

Verwenden Sie nun die Befehle [`SINTER`](https://valkey.io/commands/sinter/), [`SUNION`](https://valkey.io/commands/sunion/) und [`SDIFF`](https://valkey.io/commands/sdiff/), um die folgenden Mengen zu erstellen:

1. Säugetiere, die nicht vier Beine haben
2. Vierbeiner, die keine Säugetiere sind
3. Vierbeinige Säugetiere
4. Tiere, die vier Beine haben und/oder Säugetiere sind

### Übung 4: Endpunkte als Hashes abspeichern

Betrachten Sie die Datei [config.csv](/files/config.csv), die bereits auf der VM vorhanden sein sollte.

```csv
m346,https://m346.frickelbude.ch/,GET,200,5m0s,3
duckdb,https://duckdb.org/,GET,200,2m30s,3
valkey,https://libvirt.org/,GET,200,1m0s,5
```

Diese enthält folgende Spalten:

- Name (z.B. `m346`)
- URL (z.B. `https://m346.frickelbude.ch/`)
- HTTP-Methode (z.B. `GET`)
- HTTP-Status (z.B. `200`)
- Frequenz (z.B. `2m30s`)
- Versuche (z.B. `3`)

Hierbei handelt es sich um die Konfiguration zu einem Monitoring-System, womit eine URL periodisch mithilfe von HTTP auf ihre Erreichbarkeit überprüft wird.

Erstellen Sie pro Zeile der Datei `config.csv` einen Hash, der alle Angaben aus dieser Datei enthält. Verwenden Sie hierzu den [`HSET`](https://valkey.io/commands/hset/)-Befehl. Verwenden Sie Schlüssel der Form `endpoint:[identifier]`, also z.B. `endpoint:m346`.

Stoppen Sie nun die Valkey-Sitzung mit `[Ctrl]-[D]`. Exportieren Sie nun alle Ihre Endpoints als JSON-Dateien (`endpoint-[identifier].json`), indem Sie den Valkey-Client mit dem Parameter `--json` und dem Aufruf des [`HGETALL`](https://valkey.io/commands/hgetall/) kombinieren:

    $ valkey-cli --json HGETALL endpoint:… > endpoint-[identifier].json

### Zusatzübung A: Weitere Befehle kennenlernen

Recherchieren Sie selbständig zu den folgenden [Valkey-Befehlen](https://valkey.io/commands/) und überlegen Sie sich, wozu diese sinnvoll sein könnten. (Die Befehle sind in Gruppen aufgelistet, weil sie zusammenarbeiten.) Machen Sie konkrete Anwendungsbeispiele und dokumentieren Sie diese.

1. `SELECT`, `MOVE`, `FLUSHDB`
2. `EXPIRE`, `EXPIREAT`, `SETEX`, `TTL`, `PERSIST`
3. `MULTI`, `EXEC`, `DISCARD`
4. `BRPOP`, `BLPOP`, `LPUSH`, `RPUSH`

### Zusatzübung B: Passwort vergeben

Finden Sie heraus, wie man in der Konfigurationsdatei `/etc/valkey/valkey.conf`
ein Passwort definiert. Bearbeiten Sie die Datei dazu mit einem Texteditor wie
z.B. `nano`:

```plain
sudo nano /etc/valkey/valkey.conf
```

Tipp: Suchen Sie nach der Einstellung `requirepass`!

Setzen Sie ein Passwort, und starten Sie Valkey neu:

```plain
sudo systemctl restart valkey.service
```

Anschliessend funktioniert Valkey nicht mehr ohne Authentifizierung:

```plain
$ valkey-cli
127.0.0.1:6379> PING
(error) NOAUTH Authentication required.
```

Finden Sie drei Wege um sich zu authentifizieren:

1. mit einem interaktiven Valkey-Befehl
2. mit einem Kommandozeilenparameter
3. mit einer Umgebungsvariable

Testen Sie die Authentifizierung jeweils mit dem `PING`-Befehl.

Tipp: Verwenden Sie `valkey-cli --help` für Hilfestellungen.

Dokumentieren Sie alle Schritte.
