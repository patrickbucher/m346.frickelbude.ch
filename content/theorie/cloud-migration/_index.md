+++
title = "Cloud-Migration"
weight = 4
+++

## Die 7R der Cloud-Migration

Von [Gartners 5R](https://www.gartner.com/en/documents/1485116) abgeleitet
beschreiben die _7R_ sieben verschiedene Strategien zur Migration bestehender
Anwendungen in die Cloud.

### :aerial_tramway: Rehost ("Lift and Shift")

Eine bestehende _on-premise_ (d.h. lokal auf eigener Hardware) betriebene
Applikation wird mithilfe von IaaS-Angeboten (virtuelle Maschinen) in die Cloud
verschoben. Dabei wird die Architektur der Anwendung nicht verändert; die
Anwendung mitsamt Daten und Arbeitsabläufen wird von einem eigenen Server auf
einen Server verschoben, der in der Cloud läuft.

Diese Art der Cloud-Migration ist einfach zu bewerkstelligen, hat ein geringes
Risiko und erfordert kaum speziellen Wissensaufbau. Der Betrieb der eigenen
Hardware entfällt. Die Vorteile cloud-nativer Möglichkeiten werden aber kaum
genutzt.

### :mountain_cableway: Relocate ("Hypervisor-Level Lift and Shift")

Eine bestehende Anwendung, die bereits _on-premise_ auf einer virtualisierten
Plattform (virtuelle Maschinen, Container) läuft, wird in die Cloud verschoben.
Dabei wird die bestehende Laufzeitumgebung (Virtualisierung,
Container-Orchestrierung) weiterhin verwendet, aber nicht mehr selber betrieben.

Die Vor- und Nachteile entsprechen dabei weitgehend denjenigen der
_Rehost_-Strategie.

### :hammer_and_wrench: Replatform ("Lift and Reshape")

Eine bestehende Anwendung wird in die Cloud verschoben, wobei verschiedene Arten
von Angeboten (IaaS, PaaS) in Anspruch genommen werden. Im Gegensatz zur
_Rehost_-Strategie bleibt die Applikation aber nicht unverändert, sondern wird
punktuell angepasst, sodass die Vorteile der Cloud genutzt werden können.

Beispiel: Eine Datenbank-Anwendung läuft nicht mehr auf einem lokalen Server,
sondern auf einer VM in der Cloud. Die Datenbank, die zuvor auf dem gleichen
lokalen Server wie die Anwendung lief, wird nun als Cloud-Service bezogen und
nicht mehr selber auf der Cloud-VM verwaltet.

Die Architektur und der Quellcode der Anwendung wird dabei _nicht_ angepasst.
Die Konfiguration kann aber aufgrund der veränderten Bereitstellung einzelner
Services vom lokalen Setup abweichen.

Verglichen mit der _Rehost_-Strategie werden nun einige Vorteile der Cloud
genutzt, indem einzelne Software-Komponenten als Service bezogen werden können.
Dafür nimmt aber die Abhängigkeit von einem Cloud-Anbieter zu.

### :building_construction: Refactor ("Re-architect")

Die Anwendung wird umgebaut, damit sie besser Gebrauch von _cloud-nativen_
Möglichkeiten (wie z.B. Serverless Computing, automatische Skalierung, Load
Balancing) machen kann. Diese Art der Migration ist sehr aufwändig, macht die
Anwendung aber zukunftssicher und besser skalierbar. Längerfristig ergeben sich
Kostenersparnisse, da die lokale Infrastruktur nicht mehr benötigt wird und die
Applikation effizienter läuft.

Bei diesem Vorgehen können alle Vorteile der Cloud genutzt werden. Hierzu ist
aber ein grosser Wissensaufbau nötig. Der grundlegende Umbau einer Anwendung ist
ausserdem zeitintensiv und teuer. Kostenersparnisse zeigen sich erst nach einer
gewissen Betriebszeit.

### :shopping_cart: Repurchase ("Drop and Shop")

Intern betriebene Systeme werden durch eine SaaS-Lösung eines externen Anbieters
ersetzt. In der Folge muss die Anwendung nicht mehr selber betrieben werden, was
Kosten spart. Die Migration von einer _on-premise_-Anwendung auf eine
SaaS-Lösung kann aber aufwändig sein, gerade wenn dabei der Anbieter der Lösung
gewechselt wird. Ausserdem nimmt dabei die Abhängigkeit vom SaaS-Anbieter zu.

### :headstone: Retire

Eine bestehende Anwendung wird ersatzlos gestrichen. Dies ist nur möglich, wenn
die darin abgebildeten Prozesse nicht mehr oder anderweitig durch Software
abgedeckt werden können. Dies ist die mit Abstand einfachste und kostengünstige
Art der Cloud-Migration, doch leider kann sie nur sehr selten eingesetzt werden,
zumal es oftmals gute Gründe dafür gibt, eine Anwendung überhaupt erst in
Betrieb zu nehmen.

### :no_good: Retain ("Revisit")

Eine bestehende Anwendung wird _nicht_ migriert sondern weiterbetrieben, da sich
eine Migration nicht lohnt (zu teuer, oder die Anwendung wird in absehbarer Zeit
nicht mehr benötigt). 

## Quelle

- [The 7Rs of Cloud
  Migration](https://bluexp.netapp.com/blog/aws-cvo-blg-strategies-for-aws-migration-the-new-7th-r-explained)
- [7 Strategies for Migrating Applications to the
  Cloud](https://aws.amazon.com/blogs/enterprise-strategy/new-possibilities-seven-strategies-to-accelerate-your-application-migration-to-aws/)
