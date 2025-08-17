+++
draft = true
title = "DSGVO & Cloud Computing"
weight = 2
+++

Datenschutz war bereits das Thema im [Modul
231](https://www.modulbaukasten.ch/module/231/1/de-DE?title=Datenschutz-und-Datensicherheit-anwenden).
Neben den Grundlagen zum Datenschutz und zur Datensicherheit wurden auch
konkrete Datenschutzgesetze wie das Schweizer DSG und die europäische DSGVO
betrachtet.

Im Modul 346 soll der Datenschutz noch einmal im Kontext des Cloud Computings
betrachtet werden. Da dieser Kontext ein internationaler ist, tritt dabei unsere
nationale Gesetzgebung in den Hintergrund und die DSGVO in den Vordergrund.

An dieser Stelle werden nur die wichtigsten Konzepte wiedergebeben, siehe auch
[Lernziele](http://localhost:1313/lernziele/pruefung-1/#datenschutz---sicherheit).

**Wichtig**: Diese Webseite enthält keine belastbaren rechtlichen Ratschläge!
Bei Fragen zum Datenschutz wenden Sie sich an den _Datenschutzbeauftragten_
Ihres Lehrbetriebs.

## Einstieg

Die _Datenschutz-Grundverordnung_ (DSGVO) bzw. _General Data Protection
Regulation_ (GDPR) ist eine EU-weite Datenschutzregelung, die am 25. Mai 2018 in
Kraft getreten ist. Sie soll den Schutz _personenbezogener_ Daten gewährleisten
und Europa gleichzeitig "Cloud-freundlich" machen. Der
[Gesetzestext](https://dsgvo-gesetz.de/) kann online nachgelesen werden.

Frühere Datenschutz-Gesetzgebungen standen mit dem Cloud Computing im Konflikt.
Schliesslich werden Daten in der Cloud _grenzübergreifend_ verarbeitet, während
der Datenschutz _länderspezifisch_ geregelt war. Mit der DSGVO soll das folgende
Problem gelöst werden:

> Wie lassen sich personenbezogene Daten datenschutzkonform in der Cloud
> verarbeiten?

## Datenschutz (zur Wiederholung)

Der Datenschutz ist kein reiner Selbstzweck und schützt auch nicht alle Daten.
Zur Wiederholung (siehe [Modul
231](https://www.modulbaukasten.ch/module/231/1/de-DE)) sind Ziel, Gegenstand
und Grundsatz der DSGVO hier aufgeführt:

- **Ziel**
    - Die Freiheit _natürlicher_ Personen, selbst über den Umgang mit ihren
      _personenbezogenen_ Daten entscheiden zu können, soll bewahrt werden.
    - Dadurch soll das Recht auf _informationelle Selbstbestimmung_ geschützt
      werden.
- **Gegenstand**
    - Personenbezogene Daten sind Informationen, die sich auf eine Person
      beziehen und diese _identifizierbar_ machen.
    - Unter der _Verarbeitung_ von Daten versteht man deren Speicherung,
      Übermittlung, Nutzung und Löschung.
- **Grundsatz**
    - Es gilt das _Verbot mit Erlaubnisvorbehalt_: Die Datenverarbeitung ist
      verboten, wenn sie nicht explizit durch einen _Erlaubnistatbestand_
      erlaubt ist.

### Grundsätze der Datenverarbeitung

Bei der Verarbeitung personenbezogener Daten müssen die folgenden Grundsätze
eingehalten werden:

1. **Rechtmässigkeit**: Eine Datenverarbeitung darf nur erfolgen, wenn die
   Einwilligung des Betroffenen besteht (Erlaubnistatbestand).
2. **Treu und Glauben**: Die betroffene Person muss über die Datenverarbeitung
   informiert werden.
3. **Transparenz**: Der Zweck der Datenverarbeitung muss für die betroffene
   Person nachvollziehbar sein.
4. **Zweckbindung**: Die Daten dürfen nur zu einem festgelegten Zweck
   verarbeitet werden.
5. **Datenminimierung**: Es dürfen nur die zum jeweiligen Zweck nötigen Daten
   verarbeitet werden (Prinzip der Verhältnismässigkeit).
6. **Richtigkeit**: Daten müssen aktuell gehalten werden; alte Daten müssen
   berichtigt oder gelöscht werden.
7. **Speicherbegrenzung**: Daten dürfen nur so lange aufbewahrt werden, wie dies
   zum jeweiligen Zweck nötig ist.
8. **Integrität und Vertraulichkeit**: Eine angemessene Datensicherheit muss
   gewährleistet werden.
9. **Rechenschaftspflicht**: Die Datenverarbeitung muss dokumentiert werden,
   damit die Einhaltung des Datenschutzes gegenüber Aufsichtsbehörden
   nachgewiesen werden kann.

## Akteure

Für die DSGVO sind u.a. die folgenden Akteure relevant:

- Die **betroffene Person** (_Data Subject_) ist eine natürliche Person, die über
  schützenswerte personenbezogene Daten verfügt.
    - Ein Lernender an einer Berufsschule ist eine betroffene Person, da sie im
      Kontext dieser Schule über schützenswerte Daten verfügt (z.B.
      Kontaktinformationen, Absenzen, Noten).
- Ein **Verantwortlicher** (_Controller_) ist eine natürliche oder juristische
  Person, die über Zweck und Mittel einer Datenverarbeitung entscheidet.
    - Der Betreiber einer Schulverwaltungssoftware (in diesem Fall die
      Berufsschule) ist ein Verantwortlicher und entscheidet über Zweck und
      Mittel dieser Datenverarbeitung (z.B. warum und wie die Daten von
      Lernenden abgelegt werden sollen).
- Ein **Auftragsverarbeiter** (_Processor_) ist ein Dienstleister, der
  personenbezogene Daten im Auftrag eines Verantwortlichen übernimmt.
    - Microsoft ist ein Dienstleister im Auftrag der Berufsschule und
      verarbeitet z.B. mit _Teams_ die personenbezogenen Daten der Lehrpersonen
      und Lernenden als Auftragsverarbeiter.
- **Dritte** (_Third Party_) sind Aussenstehende, die nicht in die Verarbeitung
  eingebunden sind.
    - Die externen Reinigungskräfte an der Berufsschule sind Dritte und sollten
      somit keinen Zugriff auf die persönlichen Daten der Lernenden und
      Lehrpersonen haben.
- Ein **Empfänger** (_Recipient_) ist jeder, dem personenbezogene Daten
  offengelegt werden.
    - Ein Webseitenbesucher ist ein Empfänger der dort abrufbaren
      personenbezogenen Daten.
- Ein **Datenschutzbeauftragter** (_Data Protection Officer_) ist der
  Ansprechpartner für Datenschutzfragen innerhalb einer Organisation.
    - Eine Organisation ab einer bestimmten Grösse bzw. in einer bestimmten
      Branche muss einen Datenschutzbeauftragten ernennen.
- Die **Aufsichtsbehörde** (_Supervisory Authority_) ist eine staatliche Stelle,
  welche die Einhaltung der DSGVO überwacht und durchsetzt
    - In der Schweiz ist dies der [Eidgenössische Datenschutz- und
      Öffentlichkeitsbeauftragte
      (EDÖB)](https://www.edoeb.admin.ch/edoeb/de/home.html).

## Anwendbarkeit der DSGVO

Die Schweiz verfügt über ein eigenes Datenschutzgesetz
([DSG](https://www.admin.ch/gov/de/start/dokumentation/medienmitteilungen.msg-id-90134.html)).
Dieses ist auf die DSGVO abgestimmt. Doch wann kommt die DSGVO ‒ auch in der
Schweiz ‒ überhaupt zur Anwendung? Hierzu müssen folgende Bedingungen gegeben
sein:

1. Es werden personenbezogene Daten verarbeitet.
2. Die personenbezogenen Daten werden mit Informatikmitteln verarbeitet ‒
   manuell oder (teilweise) automatisch.
3. Es gilt das _Marktortprinzip_: Die Verarbeitung…
    - erfolgt durch eine Niederlassung im EU-Raum.
    - betrifft Personen, die sich gerade im EU-Raum aufhalten.

Mehr Details sind im Artikel [Anwendbarkeit auf Schweizer
Unternehmen](https://www.infosec.ch/blog/anwendbarkeit-auf-schweizer-unternehmen-art-3-und-27-dsgvo/)
nachzulesen.

### Ausnahmen

Es gibt jedoch auch einige Ausnahmen, bei welcher die DSGVO trotz Erfüllung der
oben aufgelisteten Bedingungen _nicht_ greift:

1. _Anonymisierte_ Daten sind _nicht_ von der DSGVO geschützt.
   _Pseudonymisierte_ Daten jedoch schon.
    - Bei anonymisierten Daten kann man _nicht_ mehr auf die betroffene Person
      schliessen.
    - Bei pseudonymisierten Daten ist es weiterhin möglich, auf die betroffene
      Person zu schliessen. (Z.B. wenn Daten von einer Person von den
      eindeutig identifizierenden Merkmalen getrennt worden sind, eine
      entsprechende Zuordnungstabelle aber noch aufbewahrt wird.)
2. Betreffen die Daten ausschliesslich _verstorbene_ Personen, gelten diese
   nicht mehr als schützenswert.
    - Andere Gesetze wie z.B. das Urheberrecht (Copyright) können aber weiterhin
      gelten und das Interesse der Angehörigen schützen.
3. _Haushaltsausnahme_: Erfolgt die Verarbeitung zu rein privaten Zwecken ohne
   Gewinnabsicht, ist diese erlaubt.
    - Das Versenden von Partyfotos in einem Gruppenchat ist erlaubt, sofern sich
      nur Teilnehmer dieser Party im Gruppenchat befinden.
    - Bewirbt der Fotograf aber beispielsweise hochauflösende Versionen dieser
      Fotos im selben Gruppenchat zum Verkauf, greift die Haushaltsausnahme
      nicht mehr, da er eine kommerzielle Absicht verfolgt.
4. _Colocation_: Mietet sich jemand in ein Rechenzentrum an einem EU-Standort
   ein, ohne dass lokales Personal Zugriff auf die Daten erhält, greift die
   DSGVO nicht.

## Erlaubnistatbestände

Es gibt verschiedene Möglichkeiten, wie eine Datenverarbeitung erlaubt werden
kann:

1. **Einwilligung**: Die betroffene Person stimmt der Datenverarbeitung (später
   widerrufbar) zu.
   Hierzu müssen folgende Bedingungen erfüllt sein:
    1. _Freiwilligkeit_: Es darf keine Zwangssituation vorliegen; der
       betroffenen Person dürfen durch die Verweigerung keine Schäden entstehen.
    2. _Bestimmtheit_: Der Zweck der Verarbeitung muss genau bestimmt sein.
    3. _Informiertheit_: Die betroffene Person muss in klarer und verständlicher
       Sprache über die Datenverarbeitung informiert werden.
    4. _Einwilligungsbewusstsein_: Die Einwilligung muss explizit (per Opt-In)
       erfolgen; es gibt keine stillschweigende Einwilligung.
2. **Vertragserfüllung**: Ein abgeschlossener Vertrag kann nur dann erfüllt
   werden, wenn die angegebenen Daten zu diesem Zweck verarbeitet werden dürfen.
    - Z.B. ist bei einem Kaufvertrag in einem Onlineshop die Verarbeitung der
      Adressdaten zum Versand der Ware erlaubt.
3. **Rechtliche Verpflichtung**: Gewisse Daten müssen für eine bestimmte
   Zeitdauer aufbewahrt werden (Kaufbelege, Buchhaltungsdaten).
4. **Wahrung berechtigter Interessen**: Ist die Datenweitergabe in einer
   bestimmten Situation für eine betroffene Person wichtiger als der Schutz
   dieser Daten, dürfen diese weitergegeben werden.
    - Z.B. darf ein Konzern die Bankverbindungen eines Angestellten an eine
      Tochterfirma, welche die Löhne ausbezahlt, weiterleiten, da ein
      Angestellter gegenüber dem Arbeitgeber ein höheres Interesse an einem
      Monatslohn hat als am Schutz seiner Bankverbindung.
5. **Auftragsverarbeitung**: Die Verarbeitung von Daten darf vom
   Verantwortlichen an einen _Auftragsverarbeiter_ weiterdelegiert werden,
   sofern sich dieser an die gleichen Regeln hält.

## Auftragsverarbeitung

Die Auslagerung der Verarbeitung personenbezogener Daten an einen externen
Dienstleister (den _Auftragsverarbeiter_, kurz: AV; z.B. an einen
Cloud-Provider) ist unter den folgenden Bedingungen möglich:

1. Der _Verantwortliche_ hat die Einwilligung der betroffenen Person zur
   Datenverarbeitung eingeholt.
2. Der AV richtet sich nach dem Verantwortlichen, was Mittel und Zweck der
   Datenverarbeitung betrifft. ("Bedingungen reisen mit den Daten")
3. Der AV ist ein _Empfänger_ der Daten und als solcher vom Verantwortlichen
   aufzuführen.
4. Der AV darf keine personenbezogenen Daten zu eigenen Zwecken verarbeiten. 
5. Verantwortlicher und AV schliessen einen _Auftragsverarbeitungsvertrag_
   (AV-Vertrag) ab.

Betroffene Personen werden über die Datenverarbeitung informiert: mit dem
Verzeichnis der Auftragsverarbeiter auf der Webseite als Teil der
Datenschutzerklärung.

## Grenzübergreifende Datenübermittlung

Bei der länderübergreifenden Datenübertragung unterscheidet man zwischen:

1. Datenübertragung innerhalb der EU (und Island/Norwegen/Liechtenstein)
    - Hier ist die DSGVO verbindlich.
    - Eine Datenübertragung ist _grundsätzlich erlaubt_.
2. Datenübertragung in ein Drittland, wobei man zwischen zwei Kategorien
   unterscheidet:
    1. _sichere Drittländer_ mit angemessenem Datenschutzniveau: z.B. die
       Schweiz, Japan, und (noch) das Vereinigte Königreich
    2. _unsichere Drittländer_ mit unzureichendem Datenschutzniveau: z.B. USA

**Vorsicht**: Der Datenzugriff aus einem Drittland (z.B. durch Supportpersonal)
kommt einer Datenübertragung gleich!

Da viele Cloud-Provider (Microsoft Azure, Amazon Web Services, Google Cloud) und
andere grosse IT-Firmen (Apple, Oracle, IBM) in den USA beheimatet sind, ergeben
sich hierdurch einige datenschutztechnische Herausforderungen. Um die
Zusammenarbeit mit US-Firmen zu erleichtern, wurden zwischen der EU und den USA
folgende Vereinbarungen abgeschlossen:

1. Die **Safe-Harbor-Vereinbarung** galt 2000-2015 zwischen der EU und den USA.
    - Ziel: Abbau von Handelshemmnissen
    - Die Vereinbarung basierte auf der Selbstzertifizierung der
      US-Vertragspartner.
    - Der Jurist Max Schrems klagte am europäischen Gerichtshof (EuGH) gegen
      diese Vereinbarung.
    - Mit dem Schrems-I-Urteil wurde das Abkommen für **ungültig** erklärt.
- Der **EU-U.S. Privacy Shield** galt 2016-2020 zwischen EU und USA als
  Folgeabkommen zur gekippten Safe-Harbor-Vereinbarung.
    - Es basierte wieder auf der Selbstzertifizierung der US-Vertragspartner.
    - Max Schrems klagte auch gegen dieses Abkommen.
    - Mit dem Schrems-II-Urteil (EuGH) wurde auch dieses Abkommen für
      **ungültig** erklärt.
- Das **Trans-Atlantic Data Privacy Framework** wurde 2022 als Nachfolger der
  beiden vorherigen Regelungen eingeführt.
    - Ob das Abkommen Bestand hat, wird sich noch zeigen.
    - Max Schrems hat sich bereits [damit
      beschäftigt](https://www.youtube.com/watch?v=nTeFSHO-880) und dürfte wohl
      eine Klage dagegen anstrengen.

Als Alternativen zu diesen Abkommen bieten die Cloud-Anbieter _besondere
Vereinbarungen_ (BCR) und _Standardvertragklauseln_ (SCC) an, welche dem Kunden
im DSGVO-Raum ein entsprechendes Datenschutzniveau garantieren sollen. Solchen
Vertragszusätzen stimmt man i.d.R. bei der Annahme der AGB eines entsprechenden
Anbieters zu.

### Der CLOUD-Act

Aufgrund des **CLOUD-Act** können US-Firmen den Datenschutz aber _nicht_
garantieren. Der CLOUD-Act ermöglicht den US-Sicherheitsbehörden
extraterritorialen Zugriff auf Tochtergesellschaften von US-Unternehmen (z.B. im
EU-Raum) im Rahmen von Strafverfahren.

Beispiel: Betreibt man als Verantwortlicher eine Datenbank auf Microsoft Azure
mit dem Standort Irland, schützt zwar die DSGVO diese Daten, da Irland im
EU-Raum liegt. Haben US-Ermittlungsbehöden jedoch einen begründeten Verdacht,
dass diese Datenbank zu kriminellen Zwecken verwendet werden könnte, dürfen sie
Microsoft gemäss US-Recht zur Herausgabe dieser Daten zwingen.

Der Anbieter ist nun in einem Dilemma:

- Gibt er die Daten heraus, verstösst er gegen die DSGVO. Eine Busse droht.
- Gibt er die Daten _nicht_ heraus, verstösst er gegen US-Recht. Strafen drohen.

In der Praxis wird sich der Anbieter für das "kleinere Übel" entscheiden oder
versuchen mit den beiden Behörden (USA und EU) eine Lösung zu finden. (Durch ein
Rechtshilfegesuch vonseiten der USA könnte auch die Herausgabe der Daten ohne
DSGVO-Verstoss möglich sein.)

## Rechte Betroffener

Eine betroffene Person, deren personenbezogene Daten verarbeitet werden, hat
verschiedene Rechte. Im Cloud Computing besonders relevant sind diese:

1. **Recht auf Information**: Der Verantwortliche informiert die betroffene
   Person über die Datenverarbeitung.
    - _Direkterhebung_: Die Daten werden zu eigenen Zwecken erhoben.
    - _Dritterhebung_: Die Daten werden zu Zwecken eines Dienstleisters (z.B.
      durch Google Analytics) erhoben.
    - _Datenschutzerklärung_: Die betroffene Person wird bei Vertragsabschluss
      (Bestätigung z.B. mit Checkbox) über die Datenverarbeitung informiet.
2. **Recht auf Auskunft**: Die betroffene Person erhält die erhobenen Daten auf
   Anfrage. Hierbei unterscheidet man zwischen:
    - erster Stufe: eine Auskunft, _ob_ überhaupt Daten zur jeweiligen Person vorliegen.
    - zweite Stufe: die vorliegenden Daten werden vollständig an die jeweilige
      Person herausgegeben.
    - Hierzu muss eine _Identitätsprüfung_ der jeweiligen Person erfolgen, damit
      die Daten nicht in falsche Hände geraten!

## Datenschutzbeauftragter

Ein Datentschutzbeauftragter unterstützt eine Organisation in Fragen zum
Datenschutz. Eine Organisation muss einen Datenschutzbeauftragten ernennen,
sofern folgende Bedingungen gegeben sind:

1. **Beschäftigtenzahl**: Wenn mindestens 20 Personen in der Organisation tätig
   sind, die an der automatischen Datenverarbeitung beteiligt sind.
2. **Art der Daten**: Wenn besonders sensible Daten wie z.B.  Gesundheitsdaten
   verarbeitet werden ‒ unabhängig der Beschäftigtenzahl!

## Datenschutzverletzungen ("Datenpanne")

Eine Datenschutzverletzung oder "Datenpanne" liegt in folgenden Fällen vor:

1. **Vernichtung**: Daten existieren nicht mehr bzw. sind nicht mehr lesbar.
2. **Verlust**: Daten existieren noch, aber nicht mehr für Verantwortlichen
   zugänglich.
3. **Veränderung**: Daten wurden durch Unbefugte verändert.
4. **unbefugte Offenlegung, unbefugter Zugang**: unautorisierte Personen nehmen
   Daten zur Kenntnis oder können darauf zugreifen.

### Datenpanne ‒ was tun?

Sobald man eine Datenschutzverletzung feststellt, sollte man folgende Schritte
unternehmen:

1. den Datenschutzbeauftragen einbeziehen
2. das Risiko für betroffene Personen einschätzen
3. den Vorfall dokumentieren
4. je nach Risiko: die Aufsichtsbehörde oder die betroffenen Personen informieren
5. bei abgeschlossener Cybercrime-Versicherung: die Versicherung informieren
6. bei besonders schweren Fällen: weiterer Behörden (wie z.B. Polizei) informieren

Es lohnt sich, für solche Fälle einen _Notfallplan_ auszuarbeiten und das
Vorgehen im Ernstfall auch (durch simulierte Datenpannen) einzuüben.

### Haftung & Strafen

Im Gegensatz zu früheren Datenschutzgesetzgebungen ist die DSGVO ist kein
"zahnloser Tiger". Bei Datenschutzverletzungen ‒ absichtlich oder fahrlässig ‒
drohen hohe Bussen!

Im [GDPR Enforcement Tracker](https://www.enforcementtracker.com/) sind die
bisher ausgesprochenen Bussen gesammelt und können nach verschiedenen Kriterien
gefiltert, sortiert und durchsucht werden (Land, Höhe des Bussgeldes, Details
zur Datenschutzverletzung usw.).

Für die Höhe der Bussen werden verschiedenste Faktoren berücksichtigt:

- Schadensausmass, Anzahl der Betroffenen, Zeitraum der Datenschutzverletzung
- Fahrlässigkeit, Vorsätzlichkeit, Wiederholungsfall
- Zusammenarbeit mit und Information der Aufsichtsbehörden
- Kategorien betroffener Daten

Die Maximalbusse liegt bei 20'000'000 € oder 4% des Jahresumsatzes (es gilt der
höhere Wert).

Neben dem Bussgeld, welches die Organisation an die EU zu entrichten hat, können
Geschädigte betroffene Personen auch Anspruch auf Schadensersatz geltend machen.
