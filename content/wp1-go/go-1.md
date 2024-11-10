+++
title = "Go 1: Variablen, Datentypen und formatierte Ausgabe"
weight = 1
+++

Beim Programmieren in Go sind vorab einige wichtige Sachen zu berücksichtigen:

- Go ist eine stark typisierte Programmiersprache. Variablen haben einen
  bestimmen Datentyp, und können nur Werte dieses einen Typs annehmen.
- *Bezeichner* (von Variablen, Konstanten, Typen usw.) beginnen mit einem
  Buchstaben oder einem Unterstrich (Underscore, `_`), worauf weitere
  Buchstaben, Ziffern und Underscores folgen können. Es wird zwischen Gross-
  und Kleinschreibung unterschieden. Man verwendet `CamelCase` (und nicht
  `snake_case` oder `kebab-case`).
- Werden Variablen deklariert aber nirgends verwendet, kann das Programm nicht
  kompiliert werden. Damit soll sichergestellt werden, dass sich keine unnötigen
  Variablen in den Code einschleichen. Für diesen ersten Teil ist es also nötig,
  die deklarierten Variablen im Verlauf des Programms einmal zu verwenden, etwa
  indem man sie mit `fmt.Println()` ausgibt: `fmt.Println(a, b, c)`, falls man
  die Variablen `a`, `b` und `c` deklariert hat.

## Variablen

*Variablen* ([Spec](https://go.dev/ref/spec#Variables)) werden mit dem
Schlüsselwort `var` deklariert:

```go
var [Bezeichner] [Datentyp]
```

Im Gegensatz zu vielen anderen Programmiersprachen wird zuerst der Bezeichner
und erst dann der Datentyp angegeben!

Beispiele:

```go
var result int
var caption string
var isReady bool
```

Eine neu deklarierte Variable wird mit dem _Nullwert_ (_zero value_) des
jeweiligen Datentyps initialisiert, z.B. `0` bei Ganzzahlen, `false` bei
Wahrheitswerten, oder `""` bei Zeichenketten.

Es ist auch möglich, bei der Deklaration einen Wert anzugeben:

```go
var [Bezeichner] [Datentyp] = [Wert]
```

Beispiele:

```go
var result int = 5
var caption string = "Hello"
var isReady bool = true
```

Gibt man einen Wert an, kann der Compiler den Datentyp anhand dieses Werts
festlegen. Der Datentyp kann dann auch weggelassen werden:

```go
var result = 5
var caption = "Hello"
var isReady = true
```

Die Deklaration kann mit folgender Kurzschreibweise und dem Operator `:=` weiter
vereinfacht werden:

```go
result := 5
isReady := true
caption := "Hello"
```

Es ist auch möglich, mehrere Variablen in einer Zeile zu deklarieren und zu
initialisieren:

```go
var a, b, c = 1, "Hey", false
d, e, f := 2, "Ho", true
```

### Konstanten

*Konstanten* ([Spec](https://go.dev/ref/spec#Constants)) lassen sich mit dem
Schlüsselwort `const` definieren:

```go
const [Bezeichner] [Datentyp] = [Wert]
```

Da sich Konstanten im weiteren Programmverlauf _nicht_ ändern können, muss der
Wert gleich bei der Deklaration angegeben werden. Der Datentyp ist wiederum
optional, da er vom Compiler erraten werden kann. Beispiele:

```go
const g float32 = 9.81
const pi float64 = 3.14159265359
const name = "Brandon"
```

Konstanten stehen nur für Ausdrücke zur Verfügung, die zur Kompilierzeit
ermittelt werden können.

## Datentypen

In Go stehen u.a. die folgenden (primitiven) *Datentypen*
([Spec](https://go.dev/ref/spec#Types)) zur Verfügung:

- Zahlen
    - Ganzzahlen (_integer_)
        - vorzeichenbehaftet (_signed_): `int`, `int8`, `int16`, `int32`, `int64`
        - ohne Vorzeichen (_unsigned_): `uint`, `uint8`, `uint16`, `uint32`, `uint64`
            - `byte` ist ein Alias für `uint8`
        - Die Zahl steht jeweils für die Anzahl verwendeter Bits.
        - Bei `int` und `uint` verwendet der Compiler die _native_ Anzahl Bytes
          der Architektur (z.B. 64 Bits bei `amd64`)
    - Gleitkommazahlen: `float32` und `float64`
- Wahrheitswerte (_boolean_): `bool` mit den Werten `true` und `false`
- Zeichen: `rune` (ein Unicode-Zeichen und Alias für `int32`)
- Zeichenketten: `string`

Eine `rune` wird mit dem Wert `'0'` initialisiert, ein `string` mit der leeren
Zeichenkette `""`. Ein `string` besteht aus `rune`s.

Beispiel:

```go
var rooms uint8 = 7
var amount uint64 = 10_000_000
var result int64 = 1e9

var g float32 = 9.81
var pi float64 = 3.141592653589793

var ready bool = false

var ellipsis rune = '…'
var meal string = "Smørrebrød"
var author string = "Достоевский"

fmt.Println(rooms, amount, result, g, pi, ready, ellipsis, meal, author)
```

Ausgabe:

    7 10000000 1000000000 9.81 3.141592653589793 false 8230 Smørrebrød Достоевский

- `_` kann als Tausendertrennzeichen verwendet werden.
- Die Exponentialschreibweise `1e9` bedeutet: 1 * 10^9 (eine Milliarde bzw. eine
  Eins mit neun Nullen).
- In Go können Unicode-Zeichen verwendet werden. Eine `rune` ist ein sogenannter
  _Unicode Code Point_; ein `string` besteht aus mehreren `rune`s.

## Formatierte Ausgabe

Das Package `fmt` ([Doc](https://pkg.go.dev/fmt)) stellt Funktionen zur
formatierten Ausgabe von Werten zur Verfügung. Die Funktionen mit dem Suffix `f`
(z.B. `Printf`) erwarten als erstes Argument einen Format-String; als weitere
Argumente werden die auszugebenden Ausdrücke erwartet.

Beispiel:

```go
var x byte = 129
fmt.Printf("%d %o %b\n", x, x, x)

var y int = 0xdeadbeef
fmt.Printf("%d %x %X\n", y, y, y)

var z float64 = 10.0 / 3.0
fmt.Printf("%.5f %10.5f %1.1f\n", z, z, z)

var ready bool = false
fmt.Printf("%t %v\n", ready, ready)

var ellipsis rune = '…'
fmt.Printf("%d %c %U\n", ellipsis, ellipsis, ellipsis)

var name string = "Достоевский"
fmt.Printf("%s %q %v\n", name, name, name)
```

Ausgabe:

    129 201 10000001
    3735928559 deadbeef DEADBEEF
    3.33333    3.33333 3.3
    false false
    8230 … U+2026
    Достоевский "Достоевский" Достоевский

- Ganzzahlen können dezimal (`%d`), oktal (`%o`), binär (`%b`) oder hexadezimal
  (`%x` bzw. `%X`) ausgegeben werden.
- Bei Gleitkommazahlen kann die Länge links und rechts vom Komma separat
  spezifiziert werden (`%X.Yf`).
- Booleans können mit `%t` als `true` oder `false` ausgegeben werden.
- Eine `rune` kann als dezimaler Wert, als Zeichen oder in Unicode-Notation
  (Code Point) ausgegeben werden.
- Mithilfe von `%q` kann ein Wert in Go-Syntax ausgegeben werden.
- Mit `%v` lassen sich alle Werte ausgeben.

### Standardausgabe, Standardfehler

Bei Unix-artigen Betriebssystemen erfolgt der Dateizugriff über sogenannte _File
Handles_, welche von einer Zahl repräsentiert werden. Jedes Programm, auch wenn
es keine Dateien öffnet, verfügt über die folgende File Handles:

- `0` (`os.Stdin`): Standardeingabe
- `1` (`os.Stdout`): Standardausgabe
- `2` (`os.Stderr`): Standardfehler

Funktionen im `fmt`-Modul mit dem Präfix `F` erwarten als ersten Parameter einen
File Handle:

```go
fmt.Fprintln(os.Stdout, "Hello, Output!")
fmt.Fprintln(os.Stderr, "Hello, Error!")
```

Standardausgabe und -fehler erfolgen normalerweise aufs Terminalfenster, sodass
man die Ausgaben auf diese Handles nicht ohne Weiteres unterscheiden kann:

    $ go run main.go
    Hello, Output!
    Hello, Error!

Eine Unix-Shell erlaubt jedoch die Umleitung via `>` (`stdout`) und `2>`
(`stderr`):

    $ go run main.go >out.txt
    Hello, Error!
    $ cat out.txt
    Hello, Output!

    $ go run main.go 2>err.txt
    Hello, Output!
    $ cat err.txt
    Hello, Error!

Will man beide Ausgaben in die gleiche Datei umleiten, steht der Operator `2>&1`
zur Verfügung:

    $ go run main.go >out.txt 2>&1
    $ cat out.txt
    Hello, Output!
    Hello, Error!

Dieser Mechanismus wird gebraucht, um verschiedenartige Ausgaben des gleichen
Programms an verschiedene Stellen zu schreiben. Beispielsweise soll der Anwender
die Standardausgabe direkt sehen; Fehlermeldungen sollen jedoch nur in der
Standardfehlerausgabe erscheinen.

### Ausgabe in einen String

Die Funktionen mit dem Präfix `S` schreiben den formatierten Wert nicht auf die
Standardausgabe, sondern geben einen String zurück:

```go
result := fmt.Sprintf("%.3f", 10.0/3.0)
fmt.Printf("10 divided by 3 is %s\n", result)
```

Ausgabe:

    10 divided by 3 is 3.333

## Kommentare

Kommentare beginnend mit `//` erstrecken sich bis zum Zeilenende.

Mehrzeilige Kommentare beginnen mit `/*` und enden mit `*/`.

Beispiel:

```go
var g float32 = 9.81 // approximation of the gravity constant

/* these variables are used
   for some intermediary
   computations to be used
   later in the program. */
var a, b, c int
```
