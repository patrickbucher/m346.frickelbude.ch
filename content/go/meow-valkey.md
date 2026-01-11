+++
date = '2026-01-11T17:40:09+01:00'
title = "meow: Migration auf Valkey"
weight = 6
+++

Das Monitoring-System [`meow`](https://github.com/patrickbucher/meow) erlaubt es, eigens konfigurierte Endpunkte mit einer _Liveness Probe_ zu monitoren.  Grundsätzlich ist `meow` als verteiltes System konzipiert, verfügt über eine HTTP-Schnittstelle und liesse sich so nicht nur auf einer virtuellen Maschine (IaaS) sondern auch als _Cloud Function_ (PaaS) ausführen.

Einige Aspekte von `meow` stehen dem aber im Wege: So wird die Konfiguration über das Dateisystem in einer CSV-Datei verwaltet. Eine elegantere Lösung wäre es beispielsweise, die Konfiguration in Redis zu verwalten.

Die Voraussetzung für den folgenden Arbeitsauftrag ist, dass du mit Valkey  
arbeiten kannst sowie [meow](https://github.com/patrickbucher/meow) in Betrieb
genommen und konfiguriert hast. Hierzu gibt es folgende Hilfestellungen:

- Die [Übungen zu HTTP und `curl`: `meow`-Konfiguration](/go/http-meow-config/), die du hoffentlich bereits lösen konntest.
- Die [YouTube-Playlist zu `meow`](https://www.youtube.com/playlist?list=PLoID6wkkuS3c70NzN2LyoxAanVHBUImvB), welche die [Inbetriebnahme](https://www.youtube.com/watch?v=TlCSoLCK8RY&list=PLoID6wkkuS3c70NzN2LyoxAanVHBUImvB&index=1), [Konfiguration](https://www.youtube.com/watch?v=9HMnfyw_EUk&list=PLoID6wkkuS3c70NzN2LyoxAanVHBUImvB&index=2) und [Erweiterung](https://www.youtube.com/watch?v=FNRlwp_bTF8&list=PLoID6wkkuS3c70NzN2LyoxAanVHBUImvB&index=3)
  des Monitoring-Systems demonstriert.

Arbeiten auf deinem persönlichen Fork vom [`meow`-Repository](https://github.com/patrickbucher/meow). Sichere deinen Code regelmässig im persönlichen Repository. Für eine Rückmeldung zu deinem Code kannst du einen Pull Request einreichen.

## Endpunkt-Konfiguration mit Valkey

Als Repetition können Sie noch einmal die
[Redis-Playlist](https://www.youtube.com/playlist?list=PLoID6wkkuS3dvY2kdg1QdkoJjhDw--2i8) (Valkey ist ein Fork von Redis, aber genau gleich zu bedienen.) betrachten, insbesondere das Video zu den [Endpunkten als Hashes](https://www.youtube.com/watch?v=slYrv5R6oOY&list=PLoID6wkkuS3dvY2kdg1QdkoJjhDw--2i8&index=7).

### Client-Library installieren

Wenn du die Endpunkte in Valkey konfiguriert hast, soll als nächstes der
Zugriff auf die Valkey-Datenbank vom Go-Code aus bewerkstelligt werden. Valkey bietet die Library [valkey-go](https://github.com/valkey-io/valkey-go) für den Zugriff von Go aus an. Diese kann im `meow`-Arbeitsverzeichnis in einem Terminal folgendermassen installiert werden:

```bash
go get github.com/valkey-io/valkey-go
```

### Valkey-URL konfigurierbar machen

TODO

Damit eine Verbindung zu Redis aufgenommen werden kann, muss zuerst eine URL
definiert werden. Lokal lautet diese jeweils `localhost:6379`. In einer
produktiven Umgebung soll die URL jedoch konfigurierbar sein, etwa über eine
Umgebungsvariable. (So ähnlich funktioniert das bereits mit der
Umgebungsvariable `CONFIG_URL` in der `probe`-Komponente; siehe
`probeCmd/probe.go` ganz oben in der `main`-Funktion.) 

Implementieren Sie den Zugriff auf die Umgebungsvariable `REDIS_URL`
entsprechend in `configCmd/config.go`.

### Verbindung zu Redis aufnehmen

Eine Verbindung zu Redis kann folgendermassen erstellt werden:

```go
rdb := redis.NewClient(&redis.Options{
    Addr:     [Redis URL from environment variable],
    Password: "", // no password set
    DB:       0,  // use default DB
})
```

Sie können den Code direkt in der `main`-Funktion von `configCmd/config.go`
einfügen. Die Variable `rdb` vom Typ `*redis.Client` bietet Ihnen nun die
bekannten [Redis-Befehle](https://redis.io/commands/) als Methoden an,
beispielsweise:

```go
rdb.Set("key", "value", 0) // 0 as expiration value (never expires)
value := rdb.Get("key")
fmt.Println(value) // prints "value"
```

### Funktionssignaturen anpassen

Die Funktionen `getEndpoint`, `postEndpoint` und `getEndpoints` ‒ sowie
`deleteEndpoint`, sofern Sie die Zusatzaufgabe gemacht haben ‒ benötigen die
Redis-Verbindung als zusätzlichen Parameter. Ergänzen Sie die Parameterlisten
entsprechend (Parametername: beispielsweise `rdb`, Datentyp: `*redis.Client`).

Vorher (Beispiel):

```go
func getEndpoints(w http.ResponseWriter, r *http.Request)
```

Nachher (Beispiel):

```go
func getEndpoints(w http.ResponseWriter, r *http.Request, rdb *redis.Client)
```

Sie können nun innerhalb dieser Funktionen auf die Redis-Datenbank zugreifen.

Führen Sie im Terminal noch den Befehl `go mod tidy` aus, damit alle
Abhängigkeiten korrekt aufgelöst werden.

### Datenzugriffe implementieren

Mithilfe des `KEYS`-Befehls erhalten Sie eine Liste aller Schlüssel anhand eines
gegebenen Musters. In der
[Musterlösung](https://www.youtube.com/watch?v=slYrv5R6oOY&list=PLoID6wkkuS3dvY2kdg1QdkoJjhDw--2i8&index=7&t=304s)
habe ich das Präfix `endpoint:` verwendet; Sie können sich somit alle Endpunkte
mit dem Redis-Befehl `KEYS endpoint:*` auflisten lassen. 

#### Funktion `getEndpoints` anpassen

Im Go-Code können Sie hierzu die Methode `rdb.Keys` verwenden
(`getEndpoints`-Funktion):

```go
keys, err := rdb.Keys("endpoint:*").Result()
if err != nil {
    log.Printf("fetch keys by pattern endpoint:*: %v", err)
    w.WriteHeader(http.StatusInternalServerError)
}
for _, key := range keys {
    fmt.Println(key) // TODO: replace with calls to rdb.HGet
}
```

In der unteren Schleife können Sie nun mittels `rdb.HGet` auf die einzelnen
Felder zugreifen, beispielsweise:

```go
identifier, err := rdb.HGet(key, "identifier").Result()
```

Wobei `identifier` der gesuchte Wert und `err` ein möglicherweise auftretender
Fehler ist.

Alternativ können Sie sich mittels `rdb.HGetAll` eine Map zurückgeben lassen.
(`H` steht bekanntlich als Präfix für "Hash", was nichts anderes als eine Map
ist.):

```go
fields, err := rdb.HGetAll(key).Result()
```

In beiden Fällen müssen Sie den Fehler `err` angemessen behandeln. Den `payload`
erstellen Sie anschliessend anhand der Informationen aus Redis, wobei Sie den
bestehenden Code anpassen müssen.

#### Weitere Funktionen

Für die weiteren Funktionen `getEndpoint` (Singular) und `postEndpoint`
(schreibender Zugriff) benötigen Sie neben den bereits bekannten
Redis-Funktionen noch `HSET`, um einen Hash zu erstellen (`rdb.HSet`). Als Key
können Sie das Präfix `endpoint:` mit dem Identifier kombinieren.

### Änderungen testen

Testen Sie Ihre Anpassungen, indem Sie die `config`-Komponente folgendermassen
starten:

```bash
REDIS_URL=localhost:6379 go run configCmd/config.go
```

Falls Sie die kostenlose Redis-Instanz aus der Cloud verwenden, müssen Sie die
URL entsprechend anpassen.

Zum Testen können Sie die `curl`-Befehle verwenden, die Sie im [entsprechenden
Aufgabenblock](https://code.frickelbude.ch/m346/meow-http-curl) umgesetzt haben
bzw. dem [entsprechenden
Video](https://www.youtube.com/watch?v=9HMnfyw_EUk&t=711s) entnehmen können.

### Code bereinigen

Wenn alles funktioniert, können Sie den bestehenden Code bereinigen, indem Sie
Dateizugriffe, das Flag `-file` usw. entfernen. Testen Sie das Programm nach den
Änderungen, damit Sie nicht versehentlich zu viel Code entfernen.
