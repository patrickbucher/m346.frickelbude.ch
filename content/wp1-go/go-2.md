+++
title = "Go 2: Strukturen, Slices und Maps"
weight = 2
+++

Im [ersten Teil](https://code.frickelbude.ch/m346/go-1-vars-types-output) haben
wir _primitive Datentypen_ betrachtet. Im zweiten Teil geht es um
_zusammengesetzte Datentypen_ (engl. _Compound Data Types_), welche sich aus
primitiven und anderen zusammengesetzten Datentypen zusammensetzen können.

## Strukturen

Wir haben gesehen, dass `byte` bloss ein Alias für `uint8` ist, was mithilfe von
`type` folgendermassen bewerkstelligt wird:

```go
type byte uint8
```

Man kann also beliebige bestehende Datentypen nehmen und ihnen eine zusätzliche
Bezeichnung geben, beispielsweise:

```go
type degrees float32
type year int16
type sign rune
```

Mehrere Variablen gleichen oder unterschiedlichen Typs können zu sogenannten
_Strukturen_ ([Spec](https://go.dev/ref/spec#Struct_types)) zusammengefügt
werden:

```go
struct {
    [Element] [Datentyp]
    ...
}
```

Mit einer `struct` wird ein neuer Datentyp definiert. Mithilfe des
`type`-Schlüsselworts ([Spec](https://go.dev/ref/spec#Type_declarations)) kann
diesem neuen Typ eine Bezeichnung gegeben werden:

```go
type [Bezeichnung] struct {
    [Element] [Datentyp]
    ...
}
```

Eine Struktur ist _heterogen_, d.h. es können darin Variablen verschiedener
Datentypen gespeichert werden. In diesem Beispiel werden Informationen von einem
Steckbrief in einer Struktur abgelegt:

```go
type Person struct {
    FirstName    string
    LastName     string
    DayOfBirth   byte
    MonthOfBirth byte
    YearOfBirth  int16
}
```

Für die Gross- und Kleinschreibung sollen bis auf Weiteres folgende Regeln
gelten:

- Neue Datentypen wie Strukturen werden mit grossem Anfangsbuchstaben
  geschrieben, z.B.  `Person` oder `Address`.
- Elemente von Strukturen werden ebenfalls mit grossem Anfangsbuchstaben
  geschrieben, z.B. `FirstName` oder `LastName`.
- Konkrete Variablen werden mit kleinem Anfangsbuchstaben geschrieben, also
  `person` oder `address`.

Eine Struktur kann auch aus anderen Strukturen zusammengesetzt werden. So lassen
sich die Informationen eines Steckbriefs gruppieren:

```go
type FullName struct {
    FirstName string
    LastName  string
}

type BirthDate struct {
    DayOfBirth   byte
    MonthOfBirth byte
    YearOfBirth  int16
}

type Person struct {
    Name FullName
    Born BirthDate
}
```

Eine Struktur kann als Variable deklariert werden:

```go
var myName FullName
var myBirthDate BirthDate
```

Die Initialisierung der Struktur erfolgt mit folgender Syntax:

```go
var myName FullName = FullName{
    FirstName: "Patrick",
    LastName:  "Bucher",
}
var myBirthDate BirthDate = BirthDate{
    DayOfBirth:   24,
    MonthOfBirth: 6,
    YearOfBirth:  1987,
}
```

Beachten Sie, dass am Ende jeder Zeile ein Komma stehen muss! (Das hat Vorteile
beim Umsortieren der Angaben, und in der Versionskontrolle sieht man dadurch
beim Hinzufügen einer Angabe keine Änderung auf der vorherigen Zeile durch das
Hinzufügen des Kommas.)

Der Typ bei der Deklaration (links vom `=`) kann weggelassen werden:

```go
var teacher = Person{
    Name: myName,
    Born: myBirthDate,
}
```

Da die Reihenfolge der Elemente festgelegt ist, kann deren Name weggelassen
werden:

```go
var teacher = Person{
    myName,
    myBirthDate,
}
```

Lesender und schreibender Zugriff auf einzelne Elemente der Struktur ist
mithilfe des Punkt-Operators möglich:

```go
fmt.Println("Teacher's last name:", teacher.Name.LastName)

teacher.Name.FirstName = "Padraigh"
fmt.Println("Teacher's Irish name:", teacher.Name.FirstName)
```

Ausgabe:

    Teacher's last name: Bucher
    Teacher's Irish name: Padraigh

### Einbetten von Strukturen

Strukturen können aus anderen Strukturen bestehen. Beim Zugriff auf die
Unterelemente muss der Zugriff entsprechend über mehrere Schritte erfolgen, also
z.B. `teacher.Name.LastName` im vorherigen Beispiel.

Verzichtet man beim Einbetten von Unterstrukturen auf einen Namen, können die
Unterelemente direkt angesprochen werden:

```go
type Teacher struct {
    FullName
    BirthDate
    TeachesModule string
}

pbucher := Teacher{
    myName,
    myBirthDate,
    "Modul 346",
}

fmt.Println("Teacher's full name:", pbucher.FirstName, pbucher.LastName)
fmt.Printf("Teacher's birth date: %d.%d.%d\n",
    pbucher.DayOfBirth, pbucher.MonthOfBirth, pbucher.YearOfBirth)
```

Ausgabe:

    Teacher's full name: Patrick Bucher
    Teacher's birth date: 24.6.1987

### Ausgabe von Strukturen

Mit der Formatangabe `%v` kann eine Struktur direkt mit allen ihren Elementen
ausgegeben werden. Mit der Formatangabe `%q` erfolgt die Ausgabe in Go-Syntax:

```go
fmt.Printf("%v\n", pbucher)
fmt.Printf("%q\n", pbucher)
```

Ausgabe:

    {{Patrick Bucher} {24 6 1987} Modul 346}
    {{"Patrick" "Bucher"} {'\x18' '\x06' '߃'} "Modul 346"}

(Offenbar wurden die Angaben des Geburtsdatums auf der zweiten Zeile als
hexadezimale bzw. Unicode-Zeichen interpretiert. Die generische Ausgabe mit `%q`
ist zwar sehr einfach, aber nicht in jedem Fall sehr hilreich.)

## Slices

_Slices_ ([Spec](https://go.dev/ref/spec#Slice_types)) sind _homogen_, d.h. es
können darin Werte des gleichen Datentyps abgespeichert werden. Im Gegensatz zu
einer Struktur können das (theoretisch) beliebig viele Werte sein; die
verfügbare Menge an Arbeitsspeicher ist die einzige Grenze.

Strenggenommen stellen Slices nur eine Sicht auf _Arrays_
([Spec](https://go.dev/ref/spec#Array_types)) dar, welche die eigentlichen Daten
beinhalten. Für unsere Zwecke ist aber diese Unterscheidung nicht notwendig.
Darum soll hier nur von Slices die Rede sein.

Ein Slice wird wie eine Variable deklariert. Dem Typ geht aber ein eckiges
Klammernpaar voraus:

```go
var name string    // a single string
var names []string // a slice of strings
```

Bei der Initialisierung kann wiederum auf die Typangabe links vom `=` verzichtet
werden, da diese rechts davon angegeben wird:

```go
var days = []string{"Mo", "tu", "We", "Th", "Fr", "Sa"}
```

Beim `days`-Slice ging offenbar der Sonntag vergessen, der mithilfe von `append`
ans Ende des Slices angefügt werden kann:

```go
days = append(days, "Su")
```

Achtung: `append` gibt eine Referenz auf ein neues Slice zurück, weswegen der
Rückgabewert wiederum abgespeichert werden muss.

Das zweite Element `"tu"` wurde im Gegensatz zu den anderen Elementen
kleingeschrieben. Dies soll angepasst werden, indem das Element mithilfe des
0-basierenden Index überschrieben wird:

```go
days[1] = "Tu"
```

Das Slice sollte nun die abgekürzten Wochentage enthalten. Deren Anzahl kann mit
der eingebauten `len()`-Funktion ermittelt werden:

```go
fmt.Println(days)
fmt.Println(len(days))
```

Ausgabe:

    [Mo Tu We Th Fr Sa Su]
    7

Das erste Element ist an Index `0` zu finden. Für den Zugriff auf das letzte
Element kann die Länge vom Slice abzüglich eins verwendet werden:

```go
firstDay := days[0]
lastDay := days[len(days)-1]
fmt.Println("from", firstDay, "to", lastDay)
```

Ausgabe:

    from Mo to Su

### Slice-Ausschnitte und Slicing-Syntax

Mit der namensgebenden _Slicing-Syntax_ können Ausschnitte aus dem Slice
ermittelt werden. Hierzu wird die Untergrenze _inklusiv_, die Obergrenze
_exklusiv_ angegeben, sodass die Obergrenze von der Untergrenze subtrahiert die
gleich der Länge des neuen Slices ist:

```go
workdays := days[0:5]
weekend := days[5:7]
fmt.Println(workdays, len(workdays))
fmt.Println(weekend, len(weekend))
```

Ausgabe:

    [Mo Tu We Th Fr] 5
    [Sa Su] 2

### Exkurs: Länge und Kapazität (optional)

Mithilfe der eingebauten `make`-Funktion lassen sich verschiedene
Datenstrukturen erzeugen, z.B. Slices. Hierzu wird ein Typ und die initiale
Grösse des Slices angegeben:

```go
var numbers = make([]int, 0)
var moreNumbers = make([]int, 3)
```

Ein Slice hat neben einer Länge (`len()`) auch eine _Kapazität_ (`cap()`) für
weitere Elemente:

```go
fmt.Println(numbers, len(numbers), cap(numbers))
fmt.Println(moreNumbers, len(moreNumbers), cap(moreNumbers))
```

Ausgabe:

    [] 0 0
    [0 0 0] 3 3

Das erste Slice (`numbers`) enthält keine Werte und hat darum die Länge und
Kapazität 0. Das zweite Slice besteht aus drei Werten und hat darum die Länge
und Kapazität 3.

Der Unterschied zwischen Länge und Kapazität wird erst dann klar, wenn man
mithilfe der Slicing-Syntax auf einen Unterbereich zugreift:

```go
var extract = moreNumbers[0:2]
fmt.Println(extract, len(extract), cap(extract))
```

Ausgabe:

    [0 0] 2 3

Die Länge beträgt jetzt nur noch `2`, doch die Kapazität beträgt nach wie vor
`3`, weil das zugrundeliegende Slice (bzw. Array) noch einen weiteren Wert
aufnehmen kann.

## Maps

_Maps_ ([Spec](https://go.dev/ref/spec#Map_types)) speichern Informationen als
Schlüssel-Wert-Paar (_key-value pair_) ab. (In anderen Programmiersprachen
werden Maps als _Dictionary_, _Assoziatives Array_, _Hash_ oder _Table_
bezeichnet.) Sie können als Verallgemeinerung von Slices (bzw. Arrays) gesehen
werden, da man als Index nicht nur Zahlen von `0` bis `n-1` (wenn `n` die Länge
ist), sondern beliebige Werte verwenden kann.

Eine Map wird mit zwei Datentypen deklariert: Einen für den Schlüssel, und einen
für den Wert:

```go
var countryPopulation map[string]uint
var numbersSquareRoots map[int]float32
var numbersIsPrime map[int]bool
```

- `countryPopulation` verwendet `string` als Schlüssel und `uint` als Wert.
	- Das Land wird mit einem `string` bezeichnet.
	- Die Anzahl Einwohner werden mit `uint` angegeben.
- `numbersSquareRoots` verwendet `int` als Schlüssel und `float32` als Wert.
	- Es werden Ganzzahlen als Schlüssel abgespeichert.
	- Die Quadratwurzel einer ganzen Zahl muss hingegen keine ganze Zahl sein.
- `numbersIsPrime` verwendet `int` als Schlüssel und `bool` als Wert.
	- Es werden wiederum Ganzzahlen als Schlüssel abgespeichert.
	- Der `bool`-Wert gibt an, ob es sich bei einer Zahl um eine Primzahl
	  handelt.

Maps sind offenbar sehr flexibel und vielseitig. Brian Kernighan, der das
[Standardwerk über Go](https://gopl.io) mitgeschrieben hat, bezeichnet
assoziative Arrays (d.h. Maps) als eine der wichtigsten Datenstrukturen
überhaupt und [erklärt](https://www.youtube.com/watch?v=qTZJLJ3Gm6Q) diese sehr
verständlich.

### Maps erstellen

Maps können auch mithilfe von `make` und einer initialen Kapazität erstellt
werden:

```go
countryPopulation := make(map[string]uint, 0)
numbersSquareRoots := make(map[int]float32, 0)
numbersIsPrime := make(map[int]bool, 0)
```

Maps können mit Anfangswerten belegt werden, indem Schlüssel und Wert durch
einen Doppelpunkt voneinander getrennt werden:

```go
countryPopulation := map[string]uint{
	"AT": 8_917_000,
	"CH": 8_637_000,
	"DE": 83_240_000,
}
numbersSquareRoots := map[int]float32{
	1: 1.0,
	2: 1.41421356237,
	4: 2.0,
}
numbersIsPrime := map[int]bool{
	1: false,
	2: true,
	3: true,
	4: false,
}
```

### Werte einfügen, herauslesen und entfernen

Weitere Elemente können direkt unter Angabe eines Schlüssel und Wertes in ein
Dictionary eingefügt werden:

```go
countryPopulation["IT"] = 59_550_000
numbersSquareRoots[16] = 4.0
numbersIsPrime[13] = true
```

Auf bestehende Elemente kann man mit der gleichen Syntax zugreifen:

```go
fmt.Println("Swiss Population:", countryPopulation["CH"])
fmt.Println("Square Root of 16:", numbersSquareRoots[16])
fmt.Println("Is 13 Prime?", numbersIsPrime[13])
```

Ausgabe:

	Swiss Population: 8637000
	Square Root of 16: 4
	Is 13 Prime? true

Beim Zugriff mit Schlüsseln, die nicht existieren, wird der Nullwert
zurückgegeben und _kein_ Fehler geworfen:

```go
fmt.Println("French Population:", countryPopulation["FR"])
```

Ausgabe:

	French Population: 0

Weist man den Wert des Zugriffs einer Variablen zu, kann man in einer zweiten
Variablen erfahren, ob der Wert tatsächlich vorhanden war:

```go
frenchPopulation, ok := countryPopulation["FR"]
fmt.Println("Value:", frenchPopulation)
fmt.Println("Was stored in map?", ok)
```

Ausgabe:

	French Population: 0
	Value: 0
	Was stored in map? false

Mithilfe der eingebauten `delete()`-Funktion kann ein Element anhand seines
Schlüssels aus der Map entfernt werden:

```go
delete(countryPopulation, "FR")
fmt.Println(countryPopulation)
```

Ausgabe:

	map[AT:8917000 CH:8637000 DE:83240000 IT:59550000]

## Structs, Slices und Maps kombiniert

Die zusammengesetzten Datentypen `struct`, `slice` und `map` können praktisch
beliebig miteinander kombiniert werden:

- Eine Struktur kann Slices und Maps enthalten.
- Slices können aus Strukturen und Maps bestehen.
- Maps können Strukturen und Slices ablegen.

Im folgenden Beispiel (`combined/main.go`) werden folgende Datenstrukturen
verwendet:

- Eine `struct` namens `Player` bestehend aus Vor- und Nachname.
- Eine `map[byte]Player`, welche Spieler unter einer Zahl ablegt (z.B.
  Rückennummer eines Spielers).
- Ein Slice bestehend aus `map[byte]Player`-Maps, welche mehrere solche Teams
  ablegen kann.

```go
type Player struct {
    FirstName string
    LastName  string
}
type Team map[byte]Player
teamA := Team{
    1: Player{
        FirstName: "Joe",
        LastName:  "Doe",
    },
    2: Player{
        FirstName: "Jay",
        LastName:  "Day",
    },
}
teamB := Team{
    1: Player{
        FirstName: "Jim",
        LastName:  "Jam",
    },
    2: Player{
        FirstName: "Jam",
        LastName:  "Bam",
    },
}
teams := []Team{
    teamA,
    teamB,
}
fmt.Println(teams)
```

Ausgabe:

    [map[1:{Joe Doe} 2:{Jay Day}] map[1:{Jim Jam} 2:{Jam Bam}]]

Die `map[byte]Player` wird als Typ `Team` definiert, was ihre Wiederverwendung
im `teams`-Slice einfacher macht.
