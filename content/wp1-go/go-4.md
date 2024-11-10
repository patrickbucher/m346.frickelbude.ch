+++
title = "Go 4: Funktionen definieren und aufrufen"
weight = 4
+++

Funktionen werden in Go mit dem Schlüsselwort `func`
([Spec](https://go.dev/ref/spec#Function_declarations)) definiert.

Eine mathematische Funktion wie `y=f(x)=2x` kann in Go folgendermassen
implementiert werden:

```go
func f(x int) int {
    y := 2 * x
    return y
}
```

Die Funktion `f` nimmt einen Parameter namens `x` vom Typ `int` entgegen und
gibt einen Wert vom Typ `int` zurück.

Diese Funktion kann folgendermassen aufgerufen werden:

```go
y := f(2)
fmt.Println(y) // gibt "4" aus
```

## Funktionen ohne Parameter und ohne Rückgabewert

Die Funktion `main()` ist ein Spezialfall: Sie wird automatisch beim
Programmstart aufgerufen. Sie hat weder Parameter noch einen Rückgabewert:

```go
func main() {
    fmt.Println("Hello, World!")
}
```

Man kann auch eigene Funktionen ohne Parameter und ohne Rückgabewert definieren:

```go
func sayHello() {
    fmt.Println("Hello")
}
sayHello()
```

Ausgabe:

    Hello

## Funktionen mit Parameter und ohne Rückgabewert

Eine Funktion kann auch Parameter erwarten und keinen Rückgabewert haben:

```go
func sayHelloTo(whom string) {
	fmt.Println("Hello,", whom)
}
sayHelloTo("Alice")
```

Hier wird der Parameter `whom` vom Typ `string` erwartet, um die jeweilige
Person zu begrüssen.

Ausgabe:

    Hello, Alice

## Funktionen mit mehreren Parametern und ohne Rückgabewert

Eine Funktion kann beliebig viele Parameter erwarten. Die Parameter werden durch
Kommas voneinander getrennt:

```go
func outputCurrency(amount float32, currency rune) {
	fmt.Printf("%8.2f %c\n", amount, currency)
}
outputCurrency(2.5, '$')
outputCurrency(10.0/3.0, '€')
outputCurrency(1234.567, '¥')
```

Hier wird ein Betrag (`amount`) und ein Währungssymbol (`currency`) erwartet, um
einen Geldbetrag auf zwei Nachkommastellen formatiert auszugeben.

Ausgabe:

	    2.50 $
	    3.33 €
	 1234.57 ¥

## Funktionen mit mehreren Parametern und Rückgabewert

Die folgende Funktion ist fast identisch zur vorherigen, gibt aber den
formatierten String nicht auf die Konsole aus, sondern als String zurück. (Die
Funktion hat den Rückgabetyp `string`):

```go
func formatCurrency(amount float32, currency rune) string {
	return fmt.Sprintf("%8.2f %c", amount, currency)
}
dollars := formatCurrency(2.5, '$')
euros := formatCurrency(10.0/3.0, '€')
fmt.Println(dollars)
fmt.Println(euros)
```

Die Ausgabe mit `fmt.Println` wurde hier eigens ausprogrammiert, um die
Rückgabewerte auszugeben.

Ausgabe:

		2.50 $
		3.33 €

## Funktionen ohne Parameter mit Rückgabewert

Die folgende Funktion generiert eine Zufallszahl zwischen 1 und 6, womit das
Würfeln simuliert werden soll:

```go
func rollDice() int {
    return rand.Intn(6) + 1
}
rand.Seed(time.Now().Unix)
fmt.Println(rollDice())
fmt.Println(rollDice())
fmt.Println(rollDice())
```

Mithilfe von `rand.Seed` wird der Zufallszahlengenerator mit dem jeweils aktuellen
Timestamp (`time.Now().Unix`) initialisiert, sodass die Ausgabe zufällig und
nicht deterministisch wird:

	1
	2
	5

## Funktionen mit Parametern und mehreren Rückgabewerten

In vielen Programmiersprachen können Funktionen nur einen einzelnen Wert
zurückgeben. (Natürlich können auch Datenstrukturen bestehend aus mehreren
Werten zurückgegeben werden, aber eben nicht mehrere eigenständige Werte.)

Eine Funktion, die mehrere Werte zurückgibt, hat eine Liste von Rückgabetypen
(in runden Klammern). Die folgende Funktion dividiert den gegebenen Dividenden
(`dividend`) durch den gegebenen Divisor (`divisor`).

Bei der Division gibt es einen Sonderfall: Die Division durch 0 (bzw. durch 0.0)
ist nicht erlaubt. In diesem Fall soll auch ein Fehler (`error`,
[Spec](https://go.dev/ref/spec#Errors)) zurückgegeben werden. Bei einer
regulären Division wird ein Ergebnis und _kein_ Fehler (bzw. `nil`)
zurückgegeben:

```go
func divide(dividend, divisor float32) (float32, error) {
    if divisor == 0.0 {
        return 0.0, errors.New("divide by 0")
    }
    return dividend / divisor, nil
}
fmt.Println(divide(10.0, 3.0))
fmt.Println(divide(10.0, 0.0))
```

Fehler haben den Typ `error` und können mit der Funktion `errors.New` erzeugt
werden, indem man einen String mitgibt, der den Fehler beschreibt.

Ausgabe:

	3.3333333 <nil>
	0 divide by 0

### Fehlerbehandlung

Die Funktion `computeAverage` berechnet den Durchschnitt des gegebenen Slices
`values`. Ein Durchschnitt kann aber nur berechnet werden, wenn effektiv Werte
da sind. Bei einem leeren Slice soll darum ein `error` zurückgegeben werden:

```go
func computeAverage(values []float32) (float32, error) {
	if len(values) == 0 {
		return 0.0, fmt.Errorf("cannot compute average of %v", values)
	}
	var sum float32
	for _, value := range values {
		sum += float32(value)
	}
	return sum / float32(len(values)), nil
}
```

Hier wird der Fehler mithilfe der Funktion `fmt.Errorf` erzeugt, was analog zu
`fmt.Printf` erfolgt, aber einen Wert vom Typ `error` zurückgibt.

Wird eine Funktion aufgerufen, die möglicherweise einen Fehler zurückgibt, muss
der Aufrufer diesen behandeln. Wird kein Fehler zurückgegeben (`err == nil`),
ist kein Fehler passiert, und das Ergebnis (`average`) kann verwendet werden.
Wird hingegen ein Fehler zurückgegeben (`err == nil`), muss darauf reagiert
werden. Das Ergebnis (`average`) wird dann keinen sinnvollen Wert haben und muss
ignoriert werden:

```go
grades := makeRandomGrades() // returns 0..2 grades
average, err := computeAverage(grades)
if err != nil {
	fmt.Fprintf(os.Stderr, "compute average of %v: %v\n", grades, err)
} else {
	fmt.Printf("the average of %v is %.2f\n", grades, average)
}
```

Ausgabe:

    compute average of []: cannot compute average of []
	the average of [2.41 5.07] is 3.74

## Methoden

Handelt es sich bei Go um eine objektorientierte Programmiersprache?

> Question: **Is Go an object-oriented language?**
>
> Answer: Yes and no. Although Go has types and methods and allows an
> object-oriented style of programming, there is no type hierarchy. […]

Volle Antwort: [Go FAQ](https://go.dev/doc/faq#Is_Go_an_object-oriented_language)

Go hat keine Klassen und Vererbung, Funktionen können aber als _Methoden_
([Spec](https://go.dev/ref/spec#Method_declarations)) implementiert werden.

### Funktionen, die auf Typen arbeiten

Betrachten wir den Typ `Celsius` (ein Alias für `float32`):

```go
type Celsius float32
```

Für diesen wird eine Funktion `outputCelsius` geschrieben. Die Funktion erwartet
einen Wert vom Typ `Celsius` und gibt ihn formatiert aus:

```go
func outputCelsius(c Celsius) {
	fmt.Printf("%.2f°C\n", c)
}

var coldest Celsius = -273.15
var warm Celsius = 32.5

outputCelsius(coldest) // -273.15°C
outputCelsius(warm) // 32.50°C
```

### Funktionen als Methoden implementieren

Da die Funktion `outputCelsius` nur im Zusammenhang mit dem Typ `Celsius`
verwendet werden kann, wäre es sinnvoll, wenn man die Funktion mit dem Typ
verbinden könnte.

Go bietet diese Möglichkeit, indem Funktionen an genau einen Typen "angehängt"
werden können:

```go
type Celsius float32

func (c Celsius) Output() {
	fmt.Printf("%.2f°C\n", c)
}
```

Der Parameter `c` wird neu als _receiver argument_ dem Funktionsnamen
vorangestellt. Die Funktion kann neu folgendermassen als Methode aufgerufen
werden:

```go
var coldest Celsius = -273.15
var warm Celsius = 32.5

coldest.Output() // -273.15°C
warm.Output() // 32.50°C
```

