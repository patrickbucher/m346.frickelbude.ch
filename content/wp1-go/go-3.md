+++
title = "Go 3: Kontrollstrukturen: Verzweigungen und Schleifen"
weight = 3
+++

Programme bestehen aus Daten und Logik. Im
[ersten](https://code.frickelbude.ch/m346/go-1-vars-types-output) und
[zweiten](https://code.frickelbude.ch/m346/go-2-structs-slices-maps) Teil haben
wir primitive und zusammengesetzte Datentypen kennengelernt. In diesem Teil
wollen wir diese Daten mithilfe von Verzweigungen und Schleifen verarbeiten.

Go kennt nur relativ wenige Schlüsselwörter
([Spec](https://go.dev/ref/spec#Keywords)), 25 um genau zu sein. In diesem Teil
werden Sie zehn davon kennenlernen, nämlich (in alphabetischer Reihenfolge)
`break`, `case`, `continue`, `default`, `else`, `fallthrough`, `for`, `if`,
`range`, und `switch` ‒ `goto` lassen wir weg. Dementsprechend ist dieser
Kursteil auch anhand dieser Schlüsselwörter organisiert.

## Verzweigungen (_Branching_) 

Go kennt zwei Arten der Verzwegungen: `if`/`else` und `switch`/`case`. Die
Funktionsweise ist vergleichbar mit den entsprechenden Konstrukten aus anderen
Programmiersprachen, jedoch gibt es auch einige wichtige Unterschiede.

### `if`/`else`

Ein bedingter Codeblock kann mit `if`
([Spec](https://go.dev/ref/spec#If_statements)) umgesetzt werden, wobei die
Bedingung _nicht_ in Klammern stehen muss:

```go
maxPoints := 100.0
scored := 75.0
ratio := scored / maxPoints

if ratio > 0.8 {
	fmt.Println("a ratio of", ratio, "is excellent")
}
if ratio > 0.6 {
	fmt.Println("a ratio of", ratio, "is good")
}
```

Es wird immer ein Codeblock benötigt, der auf der gleichen Zeile wie die
Bedingung anfangen muss.

Ausgabe:

```
a ratio of 0.75 is good
```

Alternativbedingungen können mit `else` formuliert werden. Mehrere
Alternativbedingungen lassen sich mittels `else if` definieren:

```go
if ratio > 0.8 {
	fmt.Println("a ratio of", ratio, "is excellent")
} else if ratio > 0.6 {
	fmt.Println("a ratio of", ratio, "is good")
} else if ratio > 0.4 {
	fmt.Println("a ratio of", ratio, "is acceptable")
} else {
	fmt.Println("a ratio of", ratio, "is poor")
}
```

### `switch`/`case`

Oftmals wird dieselbe Variable in allen Bedingungen mit einem konstanten Wert
verglichen:

```go
if grade == 6 {
	fmt.Println("very good")
} else if grade == 5 {
	fmt.Println("good")
} else if grade == 4 {
	fmt.Println("sufficient")
} else if grade == 3 {
	fmt.Println("insufficient")
} else if grade == 2 {
	fmt.Println("bad")
} else if grade == 1 {
	fmt.Println("very bad")
}
```

In diesem Fall ist ein `switch`/`case`-Konstrukt
([Spec](https://go.dev/ref/spec#Switch_statements)) besser lesbar:

```go
switch grade {
case 6:
	fmt.Println("very good")
case 5:
	fmt.Println("good")
case 4:
	fmt.Println("sufficient")
case 3:
	fmt.Println("insufficient")
case 2:
	fmt.Println("bad")
case 1:
	fmt.Println("very bad")
}
```

Im Gegensatz zu anderen Programmiersprachen aus der C-Sprachfamilie ist _kein_
`break` nötig um einen Arm zu terminieren! (Das Gegenteilige Verhalten kann
jedoch mit `fallthrough` erreicht werden; siehe weiter unten.)

#### `default`

Beim `if`/`else`-Konstrukt fängt der `else`-Block alle Fälle ab, auf die keine
der vorhergehenden `if`- oder `else if`-Bedingungen gepasst hat. Beim
`switch`/`case`-Konstrukt gibt es hierfür den `default`-Block:

```go
switch grade {
case 6:
	fmt.Println("very good")
case 5:
	fmt.Println("good")
case 4:
	fmt.Println("sufficient")
case 3:
	fmt.Println("insufficient")
case 2:
	fmt.Println("bad")
case 1:
	fmt.Println("very bad")
default:
	fmt.Println("unknown grade")
}
```

#### `fallthrough`

Soll nach zutreffender Bedingung nicht nur der aktuelle Block ausgeführt werden,
sondern auch der nächste Block, kann dies mit `fallthrough`
([Spec](https://go.dev/ref/spec#Fallthrough_statements)) erreicht werden:

```go
switch grade {
case 6:
	fallthrough
case 5:
	fallthrough
case 4:
	fmt.Println("passed the exam")
case 3:
	fallthrough
case 2:
	fallthrough
case 1:
	fmt.Println("failed the exam")
default:
	fmt.Println("unknown result")
}
```

Für die Werte `4`, `5` und `6` von `grade` gilt die Prüfung als bestanden, für
die Werte `1`, `2` und `3` als nicht bestanden.

## Schleifen (_Loops_)

Go kennt nur eine einzige Art der Schleife: `for`
([Spec](https://go.dev/ref/spec#For_statements)). Diese kann aber auf
verschiedene Arten verwendet werden, um vergleichbare Konstrukte in anderen
Sprachen (`while`, `foreach`) emulieren zu können.

### `for`

Die `for`-Schleife folgt der Syntax:

```
for initializer; condition; end statement {
	repeated block
}
```

Beispielsweise:

```go
for i := 0; i < 10; i++ {
	fmt.Printf("%d ", i)
}
fmt.Println()
```

Ausgabe:

```
0 1 2 3 4 5 6 7 8 9
```

Eine entsprechende `while`-Schleife liesse sich folgendermassen formulieren,
wobei `initializer` und `end statement` entsprechend vor die Schleife oder in
den Schleifenblock verschoben werden:

```go
j := 0
for j < 10 {
	fmt.Printf("%d ", j)
	j++
}
fmt.Println()
```

#### `continue`

Soll der Schleifenblock unterbrochen und die Ausführung bei der nächsten
Iteration fortgesetzt werden, kann dies mit `continue`
([Spec](https://go.dev/ref/spec#Continue_statements)) erreicht werden:

```go
for x := 0; x < 10; x++ {
	if x%2 == 0 {
		continue
	}
	fmt.Printf("%d ", x)
}
fmt.Println()
```

Ausgabe (nur ungerade Zahlen):

```
1 3 5 7 9
```

#### `break`

Soll die Schleife (vorzeitig) beendet werden, kann hierzu `break`
([Spec](https://go.dev/ref/spec#Break_statements)) verwendet werden:

```go
sum, maxSum := 0, 15
for y := 0; y < 10; y++ {
	sum += y
	fmt.Printf("%d", y)
	if sum >= maxSum {
		break
	} else {
		fmt.Print(" + ")
	}
}
fmt.Println(" >=", maxSum)
```

Ausgabe:

```
0 + 1 + 2 + 3 + 4 + 5 >= 15
```

### `range`

Schleifen werden oftmals verwendet um über Slices zu iterieren:

```go
fibs := []int{1, 1, 2, 3, 5, 8}
for i := 0; i < len(fibs); i++ {
	value := fibs[i]
	fmt.Printf("%d: %d\n", i, value)
}
```

Hier wird die Indexvariable `i` verwendet, um die Indizes von 0 bis zur Länge
(exklusiv) des Slices `fibs` hochzuzählen. Mithilfe der Indexvariable wird der
Wert ermittelt; anschliessend werden Index und Wert zusammen ausgegeben:

```
0: 1
1: 1
2: 2
3: 3
4: 5
5: 8
```

Solche Konstrukte werden sehr häufig gebraucht und können darum mit `range`
abgekürzt werden:

```go
for i, value := range fibs {
	fmt.Printf("%d: %d\n", i, value)
}
```

Mit `range` werden Index und Wert _paarweise_ zurückgegeben. Man kann aber den
Wert auch ignorieren und nur den Index (`i`) zuweisen:

```go
for i := range fibs {
	value := fibs[i]
	fmt.Printf("%d: %d\n", i, value)
}
```

Ist der Index nicht von Interesse, kann man ihm der Pseudo-Variablen `_`
zuweisen, um ihn zu ignorieren:

```go
for _, value := range fibs {
	fmt.Printf("%d ", value)
}
fmt.Println()
```

Ausgabe:

```
1 1 2 3 5 8
```

Bei einer `map`, wo die Indizes beliebig sind, erfolgt die Iteration ebenfalls
mittels `range`:

```go
zipCodes := map[int]string{
	1200: "Geneva",
	3000: "Bern",
	6000: "Lucerne",
	7000: "Chur",
	8000: "Zurich",
}
for zipCode, town := range zipCodes {
	fmt.Printf("%d %s\n", zipCode, town)
}
```

Ausgabe:

```
8000 Zurich
1200 Geneva
3000 Bern
6000 Lucerne
7000 Chur
```

Wert und Schlüssel können gleichermassen (`zipCode := range zipCodes` bzw. `_,
town := range zipCodes`) ignoriert werden, wenn sie nicht von Interesse sind.
