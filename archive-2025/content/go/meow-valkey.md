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

Damit eine Verbindung zu Redis aufgenommen werden kann, muss zuerst eine URL
definiert werden. Diese soll über eine Umgebungsvariable konfigurierbar sein. So ähnlich funktioniert das bereits mit der
Umgebungsvariable `CONFIG_URL` in der `probe`-Komponente; siehe
`cmd/probe/main.go` ganz oben in der `main`-Funktion.

Implementieren Sie den Zugriff auf die Umgebungsvariable `VALKEY_URL`
entsprechend in `cmd/config/main.go`.

### Verbindung zu Redis aufnehmen

Eine Verbindung zu Valkey kann folgendermassen erstellt werden:

```go
options := valkey.ClientOption{
    InitAddress: []string{"valkey.frickelcloud.ch:6379"},
    SelectDB:    0, // TODO: use your number
}
client, err := valkey.NewClient(options)
```

Die Datenbank-Nummer fÜr `SelectDB` wird im Unterricht kommuniziert. (Alle haben ihre eigene Datenbank.)

Du kannst den Code direkt in der `main`-Funktion von `cmd/config/main.go`
einfügen. Die Variable `client` vom Typ `valkey.Client` bietet nun die
bekannten [Valkey-Befehle](https://valkey.io/commands/) an, wobei das _Builder-Pattern_ zum Einsatz kommt, beispielsweise:

```go
// SET purpose=meow
if err = client.Do(ctx, client.B().Set().Key("purpose").Value("meow").Build()).Error(); err != nil {
    log.Fatalf("set purpose=meow: %v", err)
}

// GET purpose
result, err := client.Do(ctx, client.B().Get().Key("purpose").Build()).AsBytes()
if err != nil {
    log.Fatalf("get purpose: %v", err)
}
fmt.Println(string(result))
```

### Funktionssignaturen anpassen

Die Funktionen `getEndpoint`, `postEndpoint` und `getEndpoints` ‒ sowie
`deleteEndpoint`, sofern du die Zusatzaufgabe gemacht hast ‒ benötigen die
Valkey-Verbindung als zusätzlichen Parameter. Ergänze die Parameterlisten
entsprechend (Parametername: beispielsweise `vk`, Datentyp: `valkey.Client`).

Vorher (Beispiel):

```go
func getEndpoints(w http.ResponseWriter, r *http.Request)
```

Nachher (Beispiel):

```go
func getEndpoints(w http.ResponseWriter, r *http.Request, vk valkey.Client)
```

Du kannst nun innerhalb dieser Funktionen auf die Valkey-Datenbank zugreifen.

Führen im Terminal noch den Befehl `go mod tidy` aus, damit alle
Abhängigkeiten korrekt aufgelöst werden.

### Datenzugriffe implementieren

Mithilfe des `KEYS`-Befehls erhälst du eine Liste aller Schlüssel anhand eines
gegebenen Musters. In der
[Musterlösung](https://www.youtube.com/watch?v=slYrv5R6oOY&list=PLoID6wkkuS3dvY2kdg1QdkoJjhDw--2i8&index=7&t=304s)
habe ich das Präfix `endpoint:` verwendet; man kann somit alle Endpunkte
mit dem Keys-Befehl `KEYS endpoint:*` auflisten lassen. 

#### Funktion `getEndpoints` anpassen

Mithilfe der `Keys()`-Methode kann man alle Schlüssel in Erfahrung bringen, die auf ein bestimmtes Muster passen:

```go
keys, err := client.Do(ctx, client.B().Keys().Pattern("endpoints:*").Build()).AsStrSlice()
if err != nil {
    log.Fatalf("get keys for endpoints:*: %v", err)
}
fmt.Println(keys)
```

Die komplette Map zu einem Key, z.B. zu `endpoints:m346` erhält man dann folgendermassen:

```go
kvs, err := client.Do(ctx, client.B().Hgetall().Key("endpoints:m346").Build()).AsStrMap()
if err != nil {
    log.Fatalf("hget endpoints:m346: %v", err)
}
fmt.Println(kvs)
```

In allen Fällen muss der Fehler `err` angemessen behandelt werden. Den `payload`
erstellt man anschliessend anhand der Informationen aus Valkey, wobei der 
bestehende Code angepasst werden muss.

#### Weitere Funktionen

Für die weiteren Funktionen `getEndpoint` (Singular) und `postEndpoint`
(schreibender Zugriff) wird neben den bereits bekannten
Valkey-Funktionen noch `HSET` benötigt, um einen Hash zu erstellen. Als Key
kann man das Präfix `endpoint:` mit dem Identifier kombinieren.

### Änderungen testen

Teste deine Anpassungen, indem du die `config`-Komponente folgendermassen
startest:

```bash
VALKEY_URL=valkey.frickelbude.ch go run cmd/config/main.go
```

Zum Testen kannst du die `curl`-Befehle verwenden, die du im [letzten Aufgabenblock](/go/http-meow-config) umgesetzt hast.

### Code bereinigen

Wenn alles funktioniert, kannst du den bestehenden Code bereinigen, indem du 
Dateizugriffe, das Flag `-file` usw. entfernst. Testen das Programm nach den
Änderungen, damit du nicht versehentlich zu viel Code entfernst.
