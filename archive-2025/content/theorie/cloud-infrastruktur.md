+++
title = "Cloud-Infrastruktur"
weight = 5
+++

Die grossen Cloud-Anbieter (Amazon Web Services, Microsoft Azure und Google Cloud Platform) organisieren ihre Rechenzentren in sogenannte _Regionen_ und _Zonen_.

## :eu: :us: Regionen

Eine Region ist ein geografischer Ort, der über eine Reihe von Rechenzentren verfügt. Regionen sind logisch und physisch voneinander getrennt und geografisch voneinander entfernt.

Regionen erfüllen folgende Zwecke:

1. **Nähe zum Kunden**: Daten können höchstens mit Lichtgeschwindigkeit reisen.  Je weiter ein Kunde von einem Rechenzentrum entfernt ist, desto mehr Latenzzeit muss er bei der Interaktion mit dem Cloud-Angebot in Kauf nehmen.  Von daher ist es sinnvoll, die Ressourcen in einer Region bereitzustellen, die sich in der geografischen Nähe zum Zielmarkt befindet.
2. **Ausfallsicherheit**: Katastrophen können nicht verhindert werden, aber man kann sich darauf vorbereiten. Einzelne Regionen sind geografisch so weit voneinander entfernt, dass ein Katastrophenereignis in der einen Region die andere Region nicht direkt beeinflussen sollte. Ereignet sich beispielsweise in Kalifornien ein grösseres Erdbeben, ist mit Ausfällen in der Region _US West_ (Westküste) zu rechnen. Die Rechenzentren in der Region _US East_ (Ostküste) sollten aber davon nicht direkt betroffen sein.

Beispiele für Regionen sind die US-Westküste in Nordamerika oder die britischen Inseln in Europa, wobei die einzelnen Cloud-Anbieter die Regionen unterschiedlich aufteilen und bezeichnen.

![Amazon Global Infrastructure (Quelle: AWS)](/img/amazon-global-infrastructure.png)

## :european_castle: :japanese_castle: Zonen

Zonen oder _Verfügbarkeitszonen_ sind geografische Orte _innerhalb_ einer Region. Pro Region gibt es eine oder mehrere Zonen, welche als einzelne Rechenzentren betrieben werden.

Zonen erfüllen folgende Zwecke:

1. **Isolation**: Da die einzelnen Rechenzentren voneinander getrennt sind, können sich Fehler nicht von einer Zone in eine andere Zone ausbreiten.
1. **Redundanz**: Da sich die einzelnen Zonen innerhalb einer Region geografisch relativ nahe zueinander befinden, kann der Markt einer Region von verschiedenen Zonen aus bedient werden. Bei der Wahl einer Zone spielt die geografische Nähe dabei nur eine untergeordnete Rolle. So kann es sich lohnen, Ressourcen in mehreren Zonen innerhalb der gleichen Region redundant bereitzustellen. So kann die Kundschaft im Falle eines lokalen Ereignisses (z.B. bei einem Brand im Rechenzentrum) oder bei grösseren Wartungen innerhalb der einen Zone (durch den Cloud-Anbieter oder durch den Cloud-Kunden) einfach von der anderen Zone bedient werden.

Beispiele für Zonen bei AWS sind `eu-central-1` (Europa), `us-east-1` und `ca-central-1` (Nordamerika).

## :house: :hut: Edge-Standorte und Virtual Private Cloud

Für besondere Anforderungen (geografische Nähe zu einer Börse beim Hochfrequenzhandel, Datenhaltung auf dem Firmengelände) bieten Cloud-Anbieter sogenannte _Edge-Standorte_ oder _Outpost_ an. Dabei stellt der Cloud-Anbieter dem Kunden Hardware zur Verfügung, die auf seinem Firmengelände platziert wird (_on premise_). Um Wartung und Betrieb der Infrastruktur kümmert sich jedoch der Cloud-Anbieter.

Durch dieses Setup kann der Kunde einerseits Nutzen vom reichhaltigen Cloud-Angebot der grossen Hyperscaler (Azure, AWS, Google Cloud) machen, seinen eigenen Kunden aber weiterhin versichern, dass die Datenverarbeitung _on premise_ stattfindet, und dass die Daten beim Kunden verbleiben.

Diese Edge-Standorte bzw. Outposts können mit dem Angebot der jeweiligen Public Cloud aus verschiedenen Regionen/Zonen kombiniert werden, sodass der Kunde eine Hybrid Cloud verwendet. Bei einer _Virtual Private Cloud_ werden die physisch entfernt voneinander angebotenen Services logisch so kombiniert, dass sie sich netzwerktechnisch in der gleichen Sicherheitszone befinden.

![Virtual Private Cloud (Quelle: AWS)](/img/amazon-region-zone.png)
