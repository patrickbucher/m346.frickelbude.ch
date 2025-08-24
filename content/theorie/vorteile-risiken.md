+++
title = "Vorteile & Risiken"
+++

Cloud Computing bietet zahlreiche Vorteile gegenüber intern bereitgestellter IT-Ressourcen, bringt aber auch einige Risiken mit sich.

## Vorteil: Geringer Initialaufwand

In der frühen Phasen eines Unternehmens ist der Aufbau eigener Server-Kapazitäten oft zu kapital- und personalintensiv. Start-ups können sich das zeitlich und finanziell nicht leisten und greifen deshalb eher zu einer Public Cloud. Cloud Computing ist oft der pragmatischste Ansatz um digitale Lösungen möglichst schnell bereitstellen zu können. 

Cloud Computing erlaubt das Auslagern IT-basierter Wertschöpfung an externe Dienstleister. Beim Outsourcing gilt der Grundsatz: _Do what you can do best, outsource the rest._ Firmen, deren Kerngeschäft nicht das Bereitstellen von Informatik-Ressourcen ist, sollten vom Auslagern dieser Aufgaben profitieren.

### Risiko: Informatik als Kerngeschäft

Früher haben viele Unternehmen ihre IT outgesourced, da diese nicht zu ihrem Kerngeschäft gehörte (z.B. Banken, Versicherungen). In der Zwischenzeit ist die Abhängigkeit von der IT in vielen Branchen und Unternehmen so gross geworden, dass man auf IT-Wissen angewiesen ist und nicht darum herumkommt, eigene IT-Abteilungen zu unterhalten.

Je länger ein Unternehmen damit zuwartet, eigene IT-Kompetenz aufzubauen, desto mehr gerät es in Rückstand.

## Vorteil: Unabhängigkeit von der internen IT

Dank SaaS können Anwendungen ohne das dazu notwendige IT-Wissen in Betrieb genommen und verwendet werden; es muss keine eigene Plattform betrieben werden. Der komplette Lebenszyklus einer externen Anwendung (Evaluation, Beschaffung, Verwendung, Ausserbetriebnahme) kann an der internen Informatik-Abteilung vorbei laufen.

Dank Cloud-Angeboten können Fachabteilungen unabhängig der zentralen Firmen-IT einfach, schnell und kostengünstig eigene Anwendungen und eigene Infrastruktur verwenden.

### Risiko: Vendor Lock-In

Je höher man das Service-Modell wählt (SaaS > PaaS > IaaS > Legacy In-House IT), desto mehr nimmt die Gefahr eines Vendor-Lock-Ins (Abhängigkeit von einem einzelnen Anbieter) zu. Erhöht der Anbieter seine Preise oder stellt dieser die Geschäftstätigkeit ein, entstehen Mehrkosten bzw. muss teilweise schnell auf eine Ersatzlösung hingearbeitet werden. Ob man vollumfänglich an seine angefallenen Daten herankommt, ist nicht immer gewährleistet.

### Risiko: Ungeklärte Zuständigkeiten

Auch kann die interne Informatik-Abteilung bei Problemen mit SaaS-Lösungen, die ohne deren Beteiligung eingeführt worden sind, nicht zur Hilfe herangezogen werden.

Interne Standards, Richtlinien und die Sicherheit können verletzt werden, wenn die Einführung von Cloud-Lösungen nicht in Absprache mit der internen Informatik-Abteilung erfolgt.

## Vorteil: Kosten

Cloud-Native-Anwendungen sind speziell auf die Skalierbarkeit optimiert und können helfen, Kosten zu sparen. Der Fokus ist auf horizontaler (mehr/weniger Dinge) statt auf vertikaler (schwächere/stärkere Dinge) Skalierung.

Dank dem _Pay-as-you-go_-Kostenmodell werden nur Ressourcen abgerechnet, die tatsächlich verwendet werden. Die Kosten können der Lastkurve optimal folgen bzw. sich ihr "anschmiegen".

Je höher das Peak-to-Average-Verhältnis `p/a` (Spitzenlast zu Durchschnittslast) ist, desto eher lohnt sich der Einsatz von Cloud-Ressourcen. Absteigend nach Sparpotenzial eignen sich folgende Arten von Workloads besonders für die Cloud:

1. einmalige/seltene Workflows
2. zufällige/periodische Workflows
3. kontinuierlich steigende/sinkende Workflows
4. statische Workflows

### Risiko: Keine Kostenkontrolle

Die automatische Skalierung von Cloud-Ressourcen kann problematisch sein, wenn durch Unachtsamkeit, Missbrauch oder Angriffe plötzlich ein Vielfaches der tatsächlich notwendigen Ressourcen verwendet wird. Die Rechnung skaliert mit, und da viele Cloud-Anbieter gewaltige Mengen freier Ressourcen vorhalten, kann ein unbemerkter und unkontrollierter Lastanstieg zu sehr hohen Kosten führen.

## Vorteil: Skalierung

Ressourcen können nach zwei Stellschrauben eingeteilt werden:

- feingranularere Zuteilung (vertikale Stellschraube)
    - z.B. mehr oder weniger CPUs, Memory, Storage
    - Container erlauben (dank z.B. cgroups) das Aufteilen von CPUs
- zeitlich kürzere Zuteilung (horizontale Stellschraube)
    - z.B. bei Inaktivität herunterfahren, bei Bedarf hochfahren
    - FaaS erlaubt das komplette Herunterskalieren

### Risiko: Ineffizienz

Durch die automatische Skalierung kann man länger mit einer ineffizienten Anwendung leben. Der Druck, nicht performante Anwendungen durch internen Arbeitseinsatz effizienter auszugestalten, nimmt ab ‒ die Rechnung für die ineffizient genutzten Ressourcen steigt hingegen weiter an.

## Vorteil: Weniger Wissen nötig

Je mehr Informatikmittel intern bereit gestellt werden, desto grösser ist das dazu notwendige Fachwissen. Dieser Überblick zeigt, welches Wissen zum Betrieb verschiedener Informatikmittel nötig ist, wenn man diese selber betreibt (_Legacy IT_) oder auf verschiedenen Ebenen in die Cloud auslagert:

| Was wird selber gemacht? |      Legacy IT     |        IaaS        |        PaaS        | SaaS |
|--------------------------|:------------------:|:------------------:|:------------------:|:----:|
| Applikationen            | :white_check_mark: | :white_check_mark: | :white_check_mark: |  :x: |
| Sicherheit               | :white_check_mark: | :white_check_mark: |         :x:        |  :x: |
| Datenbanken              | :white_check_mark: | :white_check_mark: |         :x:        |  :x: |
| Betriebssysteme          | :white_check_mark: | :white_check_mark: |         :x:        |  :x: |
| Virtualisierung          | :white_check_mark: |         :x:        |         :x:        |  :x: |
| Server                   | :white_check_mark: |         :x:        |         :x:        |  :x: |
| Speicher (Storage)       | :white_check_mark: |         :x:        |         :x:        |  :x: |
| Netzwerk                 | :white_check_mark: |         :x:        |         :x:        |  :x: |
| Rechenzentrum            | :white_check_mark: |         :x:        |         :x:        |  :x: |

### Risiko: Wissen geht verloren

Wer kaum noch Informatikmittel selber bereitstellt, verliert auch das notwendige Fachwissen dazu. Eine Informatik-Abteilung kann schnell verkleinert oder aufgelöst werden, der Wiederaufbau der entsprechenden Teams und des dazugehörigen Wissens kann aber Jahre in Anspruch nehmen.

## Fragen

1. Welche der aufgezeigten Vorteile und Risiken sind für Ihren Lehrbetrieb relevant?
2. Ist in Ihrem Lehrbetrieb bereits eines der erwähnten Risiken eingetroffen?
3. Kennen Sie noch weitere Vorteile und Risiken?