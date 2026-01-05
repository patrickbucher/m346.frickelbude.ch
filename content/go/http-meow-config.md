+++
date = '2026-01-05T07:21:25+01:00'
title = "meow: Konfiguration per REST API"
weight = 5
+++

## HTTP mit curl

Das Hypertext Transfer Protocol [HTTP](https://de.wikipedia.org/wiki/Hypertext_Transfer_Protocol) ist eines der wichtigsten Protokolle auf der [Anwendungsebene](https://de.wikipedia.org/wiki/OSI-Modell#Schicht_7_%E2%80%93_Anwendungsschicht_(Application_Layer)). Das Präfix `http://` (bzw. die mit [TLS](https://de.wikipedia.org/wiki/Transport_Layer_Security) verschlüsselte Variante `https://` ) von Webseiten-URLs dürfte von der Browser-Adresszeile bekannt sein. HTTP(S) wird jedoch nicht nur in Browsern verwendet, sondern beispielsweise auch für Anwendungsschnittstellen zwischen Frontend und Backend  einer Web-Anwendung (via [REST](https://de.wikipedia.org/wiki/Representational_State_Transfer)-API oder per [GraphQL](https://de.wikipedia.org/wiki/GraphQL)), oder aber zum klonen von Git-Repositories.

Eine übersichtliche, englischsprachige [Einführung in HTTP](https://www.freecodecamp.org/news/http-and-everything-you-need-to-know-about-it/) findest du auf FreeCodeCamp.org.

### Einführung das curl-Kommandozeilenwerkzeug

Das Werkzeug [`curl`](https://curl.se/) erlaubt den Zugriff auf HTTP-Ressourcen über die Kommandozeile. Der `curl`-Befehl steht über die Git Bash zur Verfügung. Das [offizielle Tutorial](https://curl.se/docs/manual.html) und die [Manpage](https://curl.se/docs/manpage.html) erklären den Gebrauch von `curl`.

Im Folgenden sollen die wichtigsten Handgriffe eingeübt werden, damit anschliessend die Konfiguration von [meow](https://github.com/patrickbucher/meow) per HTTP durchgeführt werden kann.

#### GET-Anfragen

Die folgenden Beispiele verwenden die API von [REST Countries](https://restcountries.com/).

Eine HTTP-Ressource kann mit dem `curl`-Befehl per `GET`-Methode anhand ihrer URL geladen werden:

    $ curl -X GET https://restcountries.com/v3.1/name/germany?fields=name
    [{"name":{"common":"Germany","official":"Federal Republic of Germany","nativeName":{"deu":{"official":"Bundesrepublik Deutschland","common":"Deutschland"}}}}]

In diesem Fall kommt ein JSON-Dokument zurück, welches den Namen des Landes _Deutschland_ in verschiedenen Sprachen ausgibt.

Mit dem Parameter `-X` kann die HTTP-Methode bestimmt werden. Da standardmässig `GET` verwendet wird, kann die Angabe im obigen Beispiel auch weggelassen werden:

    $ curl https://restcountries.com/v3.1/name/germany?fields=name
    [{"name":{"common":"Germany","official":"Federal Republic of Germany","nativeName":{"deu":{"official":"Bundesrepublik Deutschland","common":"Deutschland"}}}}]

Das Ergebnis kann via Umleitung (mit dem `>`-Operator) als Datei abgespeichert uns später mit dem `cat`-Befehl wieder ausgegeben werden:

    $ curl https://restcountries.com/v3.1/name/germany?fields=name > germany.json
    $ cat germany.json
    [{"name":{"common":"Germany","official":"Federal Republic of Germany","nativeName":{"deu":{"official":"Bundesrepublik Deutschland","common":"Deutschland"}}}}]

Mit `GET`-Anfragen werden Informationen heruntergeladen, aber nicht auf dem Server modifiziert.

#### POST-Anfragen

Für `POST`-Anfragen wird als Beispiel [RESTFUL API](https://restful-api.dev/) verwendet.

Will man eine serverseitige Ressource erstellen oder bearbeiten, verwendet man die Methode `POST`. Dies kann explizit mit dem Parameter `-X` angegeben werden:

    $ curl -X POST https://api.restful-api.dev/objects
    {"error":"400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all."}

Eine solche Anfrage ist jedoch nur dann sinnvoll, wenn eine zu erstellende Ressource mitgegeben wird.

Der obige Endpoint (`POST https://api.restful-api.dev/objects`) speichert eine mitgegebene JSON-Datenstruktur ab und ordnet ihr eine Identifikation zu, womit das Objekt später wieder heruntergeladen werden kann. Die JSON-Datenstruktur (mit dem entsprechenden `Content-Type`-Header) wird mit dem `-d`-Parameter angegeben.

In diesem Beispiel soll ein Objekt für einen Kaffee erstellt werden:

    $ curl -X POST -H 'Content-Type: application/json' -d '{"name": "Coffee", "data": { "type": "Espresso", "size": "grande"}}' https://api.restful-api.dev/objects
    {"id":"ff8081818cb48d30018cf50b505449e9","name":"Coffee","createdAt":"2024-01-10T20:23:28.596+00:00","data":{"type":"Espresso","size":"grande"}}

- Der Parameter `-X` (kurz für `--request`) gibt an, dass eine `POST`-Anfrage ausgeführt wird.
- Der Parameter `-H` (kurz für `--header`) definiert einen Request-Header. Hier wurden zwei davon definiert:
    1. `Content-Type: text/plain` gibt an, dass hier Klartext mitgegeben wird.
    2. `accept: text/html` gibt an, dass man als Antwort ein HTML-Dokument erwartet.
- Der Parameter `-d` gibt (kurz für `--data`) gibt die Nutzdaten (den sogenannten _Request Body_) mit.
    - Hier handelt es sich um ein kleines JSON-Dokument, welches das zu erstellende Objekt spezifiziert.

Das Beispiel soll erweitert werden, indem ein weiteres JSON-Objekt mitgegeben wird (`meal.json`):

```json
{
    "name": "Lunch",
    "data": {
        "starter": "Caesar's Salad",
        "main": "Cheesburger with Fries",
        "dessert": "Mousse au Chocolat",
        "vegan": false,
        "calories": 1325
    }
}
```

Möchte man dem `POST`-Request die Datei mitgeben, kann man wiederum den `-d`-Parameter verwenden. Dem Dateinamen (`meal.json`) muss aber ein `@`-Zeichen vorangestellt werden (`@meal.json`):

    $ curl -X POST -H 'Content-Type: application/json' -d @meal.json https://api.restful-api.dev/objects
    {"id":"ff8081818cb48d30018cf52d18a749f9","name":"Lunch","createdAt":"2024-01-10T21:00:22.567+00:00","data":{"starter":"Caesar's Salad","main":"Cheesburger with Fries","dessert":"Mousse au Chocolat","vegan":false,"calories":1325}}

Die Ausgabe kann wiederum mit `>` in eine Datei umgeleitet werden:

    $ curl -X POST -H 'Content-Type: application/json' -d @meal.json https://api.restful-api.dev/objects >response.json

Dies sollte genügen, um die nachfolgenden Übungen lösen zu können! Wenn dir `curl` Mühe bereitet, kannst du auch [Postman](https://www.postman.com/) verwenden. (Der Vorteil von `curl` ist, dass man den Befehl in Skripten zur Automatisierung verwenden kann.)

## Übungen zu HTTP und `curl`: `meow`-Konfiguration

Mit den folgenden Übungen soll das Verständnis von HTTP und der Gebrauch von `curl` eingeübt werden.

Dazu werden zuerst zwei Komponenten des Monitoring-Systems `meow` in Betrieb genommen. Anschliessend werden verschiedene Endpoints mithilfe der `config`-Komponente via HTTP konfiguriert.

Die `config`-Komponente wird optional (Zusatzaufgabe) erweitert, sodass man auch Endpoints, die man nicht mehr monitoren möchte, löschen kann.

### Repository forken und klonen

1. Gehe auf das [meow-Repository](https://github.com/patrickbucher/meow).
2. Erstelle einen Fork von diesem Repository.
3. Klone anschliessend diesen Fork.
4. Öffne das geklonte `meow`-Verzeichnis in deiner Entwicklungsumgebung.

Das Projekt enthält u.a. folgende Ordner und Dateien:

- `cmd/canary/main.go`: Ein einfacher HTTP-Server fürs lokale Testen.
- `cmd/config/main.go`: Der Konfigurationsserver, der die zu monitorenden Endpoints verwaltet.
- `cmd/probe/main.go`: Der Daemon, der die _Liveness Probe_ der Endpoints durchführt und das Ergegbnis dieser Überprüfungen loggt.
- `endpoint.go`: Enthält die `Endpoint`-Datenstruktur sowie verschiedene Hilfsfunktionen dazu.
- `endpoint.json`: Enthält einen beispielhaften JSON-Payload, um einen Endpoint zu konfigurieren.
- `logfile.go`: Eine einfache Implementierung für die Logdatei.
- `meow.go`: Enthält Definitionen für verschiedene Emojis, die zum Loggen verwendet werden können.
- `README.md`: Informationen zum Projekt.
- `sample.cfg.csv`: Eine Beispieldatenbank für Endpoints im [CSV-Format](https://de.wikipedia.org/wiki/CSV_(Dateiformat)).

Du kannst die Dateien gelegentlich öffnen und überfliegen. Einiges der Inhalte sollte dir schon bekannt vorkommen (die meisten Go-Sprachkonstrukte). Andere Sachen dürften eher neu für dich sein (die Verwendung des HTTP-Pakets).

### Canary-Komponente verwenden

Ein sogenannter Canary-Endpunkt erlaubt es dem Client zu prüfen, ob ein Server verfügbar ist, ohne dabei Nutzdaten abzufragen oder zu modifizieren. Canary-Endpunkte werden speziell fürs Monitoring bereitgestellt.

In der Datei `cmd/canary/main.go` ist ein minimalistischer HTTP-Server definiert, der _nur_ einen Canary-Endpoint anbietet.

**Aufgabe 1**: Starte den Canary-Server folgendermassen:

    $ go run cmd/canary/main.go

Der Server läuft standardmässig auf Port 9000.

Versuche nun per `curl` auf den Endpunkt `/canary` dieses Servers zuzugreifen.

Speichere den Befehl mit dem Ergebnis in der Datei `get-canary.sh` ab und füge diese Datei diesem Git-Repository hinzu.

### Config-Komponente in Betrieb nehmen

Betrachte die Datei `sample.cfg.csv`. Diese definiert die folgenden drei Endpunkte:

1. `go-dev`: https://go.dev/doc/
2. `libvirt`: https://libvirt.org/
3. `m346`: https://m346.frickelbude.ch/

**Aufgabe 2**: Kopiere diese Datei `sample.cfg.csv` nach `config.csv` im `meow`-Repository.

Betrachte nun die Datei `endpoint.go`, genauer den Datentyp `Endpoint`. Diese Struktur definiert sechs Felder, die auch in der CSV-Datei (`config.csv`) mit konkreten Werten angegeben sind.

**Aufgabe 3**: Betrachte die CSV-Datei `config.csv` und überlege dir, welcher Wert zu welchem Feld in der Struktur `Endpoint` passt. Definiere nun einen eigenen Endpoint in der Datei `config.csv`. Nimm diese Datei ins Repository auf.

Du kannst den `config`-Server nun folgendermassen starten:

    $ go run cmd/config/main.go -file config.csv

### Interaktion mit dem Config-Server per HTTP-Schnittstelle und `curl`

Der `config`-Server läuft nun (auf `localhost:8000`). Er unterstützt die folgenden Endpunkte:

- `GET /endpoints`: gibt eine Liste sämtlicher konfigurierter Endpoints zurück
- `GET /endpoints/[identifier]`: gibt einen Endpoint anhand seines Identifiers zurück
- `POST /endpoints/[identifier]`: erstellt oder überschreibt einen Endpoint in der Konfiguration

**Aufgabe 4**: Mache mit `curl` einen `GET`-Request auf `/endpoints`. Leite die Ausgabe nach `all-endpoints.json` um. Dokumentiere deinen Befehl in der Datei `get-endpoints.sh`. Füge beide Dateien deinem Repository hinzu.

**Aufgabe 5**: Mache mit `curl` einen `GET`-Request auf einen spezifischen Endpoint anhand dessen Identifiers. Leite die Ausgabe nach `endpoint-[identifier].json` um, wobei du den Platzhalter `[identifier]` durch deinen spezifischen Identifier ersetzt. Dokumentiere deinen Befehl in der Datei `get-endpoint-[identifier].sh`. Füge beide Dateien deinem Repository hinzu.

**Aufgabe 6**: Kopiere die Datei `endpoint.json` nach `new-endpoint.json`. Öffne nun `new-endpoint.json` in einem Texteditor. Ersetze alle Werte in dieser Datei durch diejenigen, die du vorher bei Aufgabe 3 als vierte Zeile ergänzt hast. Mache nun mit `curl` eine `POST`-Anfrage an den `config`-Server. Dieser sollte den neuen Endpunkt nun in seine Datenbank (siehe `config.csv`) aufgenommen haben. Dokumentiere deinen Befehl in der Datei `post-endpoint-[identifier].sh`. Füge diese Datei und `new-endpoint.json` deinem Repository hinzu.

### Zusatzaufgabe: Ergänzung des Config-Servers um DELETE-Endpunkt

Der `config`-Server (Datei `cmd/config/main.go`) enthält in der `main()`-Funktion einen `TODO`-Kommentar. Der `/endpoints/[identifier]`-Endpunkt soll neu auch die `DELETE`-Methode unterstützen, damit man per `curl -X DELETE` auch Endpoints aus der Konfiguration heraus löschen kann, die man nicht länger monitoren möchte.

**Aufgabe Z1**: Lies den Code der Funktion `postEndpoint` weiter unten in der Datei und versuchen ihn zu verstehen. Einen Teil dieses Codes kannst du für die Implementierung der `DELETE`-Methode übernehmen.

**Aufgabe Z2**: Ergänze nun das `switch`/`case`-Statement beim `TODO`-Kommentar um einen weiteren Fall (`http.MethodDelete`). Hier soll die Funktion `deleteEndpoint()` aufgerufen werden. Implementiere diese Funktion und teste diese mit `curl`. (Du musst den Server dabei nach jeder Änderung neu starten.)

**Aufgabe Z3**: Erstelle anschliessend einen Pull Request vom `meow`-Repository!
