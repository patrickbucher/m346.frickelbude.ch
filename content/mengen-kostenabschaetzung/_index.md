+++
title = "Mengen- und Kostenabschätzung"
weight = 10
+++

Als freiwillige Zusatznote kann der folgende Auftrag erarbeitet und zur Benotung eingereicht werden. Es geht dabei um eine Mengen- und Kostenabschätzung im Bereich Cloud Computing.

## Ausgangslage

Die Berufsschule möchte den Lernenden virtuelle Maschinen in der Cloud zur Verfügung stellen. Im Rahmen eines Pilotprojekts ist davon zuerst das Modul 346 (Cloud-Lösungen konzipieren und realisieren) betroffen. Dieses Modul wird von allen Informatik-Lernenden eines Jahrgangs besucht.

Während eines Semesters soll den Lernenden für Übungszwecke eine Linux-VM zur Verfügung gestellt werden. Diese soll jedoch nicht permanent laufen, sondern nur während der Übungsphasen im Unterricht und auf Wunsch vor Prüfungen.

Insgesamt gibt es Übungseinheiten in zehn aufeinanderfolgenden Wochen. In den ersten sechs Einheiten werden Übungen bearbeitet, die nichts miteinander zu tun haben. Die Übungen in den letzten vier Wochen hängen jedoch miteinander zusammen, sodass während dieser Phase die VMs erhalten bleiben sollten. Laufen müssen die VMs aber nur jeweils während der Doppellektion.

## Mengenabschätzung

Berechnen Sie in einem ersten Schritt die ungefähre Anzahl an Stunden, während derer Compute- und/oder Storage-Kosten anfallen. Diese Berechnung soll möglichst gut nachvollziehbar dokumentiert werden. Falls Annahmen getroffen werden müssen, müssen diese ebenfalls dokumentiert und begründet werden.

Wichtig: Die VMs sollen nicht die ganze Zeit bestehen, sondern nur bei Bedarf erstellt und aufgestartet werden. Wird eine VM nicht mehr benötigt, kann sie heruntergefahren oder gar gelöscht werden. (Eine laufende VM erzeugt Compute- und Storage-Kosten. Eine gestoppte VM erzeugt nur Storage-Kosten. Eine gelöschte VM erzeugt gar keine Kosten.)

Zur Berechnung der VM-Laufzeit kann die Semesterplanung beigezogen werden.

Erstelle auf Basis dieser Parameter jeweils drei Schätzungen für die Storage- und Compute-Laufzeit: Eine minimale (Idealfall), eine mittlere (durchschnittlicher Fall) und eine maximale (schlimmster Fall).

## Kostenabschätzung

Finden Sie nun zwei verschiedene Cloud-Anbieter, die Linux-VMs anbieten und dabei zwischen Compute- und Storage-Kosten unterscheiden, sodass gestoppte VMs weniger Kosten als laufende VMs verursachen. Mindestens einer der beiden Anbieter darf nicht dem [CLOUD-Act](/theorie/dsgvo/#der-cloud-act) unterstehen. Stellen Sie die beiden Anbieter kurz vor. 

Prüfen Sie verschiedene Arten bzw. Grössen von VMs und wählen Sie drei aus, die für das Modulprogramm passend sein könnten. (Nicht über- noch unterdimensioniert.) Begründen Sie die Auswahl.

Berechnen Sie anschliessend anhand der Mengenabschätzung (drei Fälle) die Kosten für das ganze Semester bei beiden Anbietern pro Art/Grösse der VM. Das Ergebnis sollte für Storage- und Compute-Kosten je eine 3x3-Matrix pro Anbieter sein. Die beiden Matrizen (Storage- & Compute-Kosten) sind anschliessend aufzusummieren und in einer 3x3-Kostenmatrix wiederzugeben.

Das Ergebnis sind zwei 3x3-Matrizen mit Kosten (eine pro Anbieter).

Formulieren Sie anschliessend zu dieser Berechnung eine Empfehlung, welcher Anbieter berücksichtigt werden soll. (Ziehen Sie hierzu weitere relevante Kriterien hinzu, etwa das Vorhandensein einer API, Datenschutz, Kostenkontrolle, geografische Distanz, Vielfalt des Angebots usw.)

## Abgabe

Reichen Sie ein Dokument ein, welches die gewünschten Ergebnisse enthält und den ganzen Berechnungsweg dokumentiert, wie es zu diesem Ergebnis gekommen ist. Wichtig: Es muss sich bei der Abgabe um ein fertiges Dokument handeln, welches nicht mehr weiter bearbeitet werden kann, z.B. im Word- oder PDF-Format. (Links auf OneNote-Notizbücher, Webseiten usw. sind _nicht_ erlaubt.)

Das erarbeitete Dokument ist per E-Mail an [patrick.bucher@sluz.ch](mailto:patrick.bucher@sluz.ch) mit dem Betreff _Abgabe Mengen- und Kostenabschätzung_ bis am **Montag, 6. Januar 2025 um 10.00 Uhr** einzureichen. Eine verspätete Abgabe ergibt einen Notenabzug. Kann der Abgabetermin nicht eingehalten werden, ist _vor_ dem Abgabetermin per E-Mail Kontakt aufzunehmen.

## Plagiate

Der Auftrag ist als Einzelarbeit selbständig und ohne AI-Werkzeuge zu erstellen. Plagiate werden mit der Note 1 bewertet sowie der Fachbereichsleitung und dem Lehrbetrieb gemeldet.

## Bewertungsraster

Die Arbeit wird nach den folgenden Aspekten bewertet:

1. Mengenabschätzung (Anzahl Stunden)
    - Die Mengenabschätzung ist fehlerhaft oder nicht nachvollziehbar. (0 Punkte)
    - Die Mengenabschätzung ist realistisch. (1 Punkt)
    - Die Mengenabschätzung ist realistisch und nachvollziehbar. (2 Punkte)
2. Anbieter
    - Die Anbieter werden nicht vorgestellt. (0 Punkte)
    - Die Anbieter werden kurz vorgestellt. (1 Punkt)
    - Die Anbieter werden kurz vorgestellt und deren Preismodell verlinkt. (2 Punkte)
3. Wahl der VMs (Art und Grösse)
    - Die Auswahl der VMs wird nicht begründet. (0 Punkte)
    - Die Auswahl der VMs wird nachvollziehbar begründet. (1 Punkte)
    - Die Auswahl der VMs wird anhand des Modulprogramms begründet. (2 Punkte)
4. Kostenberechnung
    - Die Kostenberechnung ist fehlerhaft. (0 Punkte)
    - Die Kostenberechnung ist korrekt. (1 Punkt)
    - Die Kostenberechnung ist korrekt und nachvollziehbar. (2 Punkte)
5. Empfehlung
    - Es wird keine Empfehlung für einen Anbieter abgegeben. (0 Punkte)
    - Es wird eine Empfehlung für einen Anbieter anhand des Preises abgegeben. (1 Punkt)
    - Es wird eine Empfehlung für einen Anbieter anhand des Preises und weiterer relevanter Kriterien abgegeben. (2 Punkte)
5. Darstellung und Gliederung
    - Das Dokument ist nicht zweckdienlich dargestellt/gegliedert. (0 Punkte)
    - Das Dokument ist zweckdienlich dargestellt/gegliedert. (1 Punkt)
    - Das Dokument ist zweckdienlich und optisch ansprechend dargestellt/gegliedert. (2 Punkt)
6. Zusatzpunkt: interaktiver Preisrechner für Grundparameter
    - Es wird kein zusätzlicher Preisrechner abgegeben. (0 Punkte)
    - Es wird ein interaktiver Preisrechner (z.B. Excel-Arbeitsmappe) abgegeben. (1 Punkt)

Die Punktebewertung kann auch mit halben Punkten weiter ausdifferenziert werden.

Es sind maximal 11 Punkte zu erreichen, wobei für 10 erreichte Punkte die Note 6 erteilt wird. (Die Note wird anhand der Formel `[erreichte Punkte]/10*5+1` errechnet.)

Die Note zählt _voll_, d.h. hat eine Gewichtung von 1.

## Verpflichtung

Wer die Arbeit auf sich nehmen möchte, um eine weitere Note zu erhalten, verpflichtet sich per E-Mail an [patrick.bucher@sluz.ch](mailto:patrick.bucher@sluz.ch) mit dem Betreff _Verpflichtung Mengen- und Kostenabschätzung_ bis am **Montag, 23. Dezember 2024 um 10 Uhr** zur Abgabe der Arbeit. Hierzu ist folgende Vorlage zu verwenden:

> Ich, VORNAME NACHNAME (KLASSE) verpflichte mich hiermit, den freiwilligen
> Auftrag zur Mengen- und Kostenabschätzung auf gemäss den Bedingungen (Abgabe,
> Plagiate, Bewertungsraster) auf der Modulwebseite
> https://m346.frickelbude.ch/mengen-kostenabschaetzung/ auszuführen und
> pünktlich abzugeben. Ich bin der Konsequenzen bewusst, die bei einer
> Verletzung der genannten Bedingungen zum Tragen kommen und bestätige hiermit,
> dass ich diese akzeptieren werde.

Verspätet eingegangene Verpflichtungen können nicht berücksichtigt werden.