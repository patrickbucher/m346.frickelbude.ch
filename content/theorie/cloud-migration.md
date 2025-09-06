+++
title = "Cloud-Migration"
weight = 6
+++

## Die 7R der Cloud-Migration

Die von [Gartners 5R](https://www.gartner.com/en/documents/1485116) abgeleiteten 7R beschreiben sieben verschiedene Strategien zur Migration bestehender Anwendungen in die Cloud.

### :aerial_tramway: Rehost ("Lift and Shift")

Eine bestehende _on-premise_ (d.h. lokal auf eigener Hardware) betriebene Applikation wird mithilfe von IaaS-Angeboten (virtuelle Maschinen) in die Cloud verschoben. Dabei wird die Architektur der Anwendung nicht verändert; die Anwendung mitsamt Daten und Arbeitsabläufen wird von einem eigenen Server auf einen Server verschoben, der in der Cloud läuft.

Diese Art der Cloud-Migration ist einfach zu bewerkstelligen, hat ein geringes Risiko und erfordert kaum speziellen Wissensaufbau. Der Betrieb der eigenen Hardware entfällt. Die Vorteile der cloud-nativen Softwareentwicklung (z.B.  Functions) werden aber kaum genutzt.

### :mountain_cableway: Relocate ("Hypervisor-Level Lift and Shift")

Eine bestehende Anwendung, die bereits _on-premise_ auf einer virtualisierten Plattform (virtuelle Maschinen, Container) läuft, wird in die Cloud verschoben.  Dabei wird die bestehende Laufzeitumgebung (Virtualisierung, Container-Orchestrierung) weiterhin verwendet, aber nicht mehr selber betrieben.

Die Vor- und Nachteile entsprechen dabei weitgehend denjenigen der _Rehost_-Strategie. Der einzige Unterschied zwischen Relocate und Rehost ist die Ausgangslage.

### :hammer_and_wrench: Replatform ("Lift and Reshape")

Eine bestehende Anwendung wird in die Cloud verschoben, wobei verschiedene Arten von Angeboten (IaaS, PaaS) in Anspruch genommen werden können. Im Gegensatz zur _Rehost_-Strategie bleibt die Applikation aber nicht unverändert, sondern wird punktuell angepasst, sodass erste Vorteile der Cloud genutzt werden können.

Beispiel: Eine Datenbank-Anwendung soll nicht mehr auf einem lokalen Server, sondern auf einer VM in der Cloud laufen. Die Datenbank, die auf dem gleichen lokalen Server wie die Anwendung läuft, soll neu als Cloud-Service bezogen und nicht mehr selber auf der Cloud-VM betrieben werden.

Architektur und Quellcode der Anwendung werden dabei nicht oder höchstens geringfügig angepasst. Die Konfiguration der Anwendung kann aber aufgrund der veränderten Bereitstellung einzelner Services vom vorherigen lokalen Setup abweichen.

Verglichen mit der _Rehost_-Strategie werden nun einige Vorteile der Cloud genutzt, indem einzelne Software-Komponenten als Service bezogen werden können.  Dafür nimmt aber die Abhängigkeit von einem Cloud-Anbieter zu.

### :building_construction: Refactor ("Re-architect")

Die Anwendung wird im grossen Stil umgebaut, damit sie besser Gebrauch von _cloud-nativen_ Möglichkeiten (wie z.B. Serverless Computing, automatische Skalierung, Load Balancing, Object Storage, Scale to Zero) machen kann. Diese Art der Migration ist sehr aufwändig, macht die Anwendung aber zukunftssicher und besser skalierbar. Längerfristig ergeben sich Kostenersparnisse, da die lokale Infrastruktur nicht mehr benötigt wird und die Applikation effizienter läuft und besser skalierbar ist.

Bei diesem Vorgehen können alle Vorteile der Cloud genutzt werden. Hierzu ist aber ein grosser Wissensaufbau nötig. Der grundlegende Umbau einer Anwendung ist ausserdem zeitintensiv und teuer. Kostenersparnisse zeigen sich erst nach einer gewissen Betriebszeit. Je nach verwendetem Angebot kann auch die Abhängigkeit vom Anbieter zunehmen.

### :shopping_cart: Repurchase ("Drop and Shop")

Intern betriebene Systeme werden durch eine SaaS-Lösung eines externen Anbieters ersetzt. In der Folge muss die Anwendung nicht mehr selber betrieben werden, was Kosten spart. Die Migration von einer _on-premise_-Anwendung auf eine SaaS-Lösung kann aber aufwändig sein, gerade wenn dabei der Anbieter der Lösung gewechselt wird. Ausserdem nimmt dabei die Abhängigkeit vom SaaS-Anbieter zu.

### :headstone: Retire

Eine bestehende Anwendung wird ersatzlos gestrichen. Dies ist nur möglich, wenn die darin abgebildeten Prozesse nicht mehr benötigt werden oder anderweitig durch Software abgedeckt werden können.

Dies ist die mit Abstand einfachste und kostengünstige Art der Cloud-Migration, doch leider kann sie nur sehr selten eingesetzt werden, zumal es oftmals gute Gründe dafür gibt, eine Anwendung überhaupt erst in Betrieb zu nehmen.

### :no_good: Retain ("Revisit")

Eine bestehende Anwendung wird _nicht_ migriert sondern weiterbetrieben, da sich eine Migration nicht lohnt, da diese zu teuer ist, oder die Anwendung wird in absehbarer Zeit nicht mehr benötigt wird. 

Diese Strategie ist zwar einerseits sehr einfach und kostengünstig "umzusetzen", löst aber keine Probleme, sondern vertagt diese bloss. Das Weiterbetreiben von Software, die nicht mehr gewartet und weiterentwickelt wird, kann ausserdem ein hohes Risiko (sicherheitstechnisch, betriebswirtschaftlich) darstellen. Die _Retain_-Strategie ist dann sinnvoll, wenn sie mit einer anderen Strategie als Zukunftsabsicht (z.B. _Retire_ oder _Repurchase_) kombiniert werden kann.

## Quellen

- [The 7Rs of Cloud Migration](https://bluexp.netapp.com/blog/aws-cvo-blg-strategies-for-aws-migration-the-new-7th-r-explained)
- [7 Strategies for Migrating Applications to the Cloud](https://aws.amazon.com/blogs/enterprise-strategy/new-possibilities-seven-strategies-to-accelerate-your-application-migration-to-aws/)
