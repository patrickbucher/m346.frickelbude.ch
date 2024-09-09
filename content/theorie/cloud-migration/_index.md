+++
title = "Cloud-Migration"
weight = 4
draft = true
+++

## Die 7R der Cloud-Migration

Von [Gartners 5R](https://www.gartner.com/en/documents/1485116) abgeleitet beschreiben die _7R_ sieben verschiedene Strategien zur Migration bestehender Anewndungen in die Cloud.

### Rehost ("Lift and Shift")

Eine bestehende _on-premise_ betriebene Applikation wird mithilfe von IaaS-Angeboten (virtuelle Maschinen) in die Cloud verschoben. Dabei wird die Architektur der Anwendung nicht verändert; die Anwendung mitsamt Daten und Arbeitsabläufen wird von einem eigenen Server auf einen Server verschoben, der in der Cloud läuft.

- :heavy_plus_sign: einfach zu bewerkstelligen
- :heavy_plus_sign: geringes Risiko
- :heavy_plus_sign: kein spezieller Wissensaufbau nötig
- :heavy_minus_sign: die Vorteile der Cloud werden kaum genutzt

### Relocate ("Hypervisor-Level Lift and Shift")

Eine bestehende Anwendung, die bereits _on-premise_ auf einer virtualisierten Plattform (virtuelle Maschinen, Container) läuft, wird in die Cloud verschoben. Dabei wird die bestehende Laufzeitumgebung (Virtualisierung, Container-Orchestrierung) weiterhin verwendet, aber nicht mehr selber betrieben.

- TODO: Vor- und Nachteile

### Replatform ("Lift and Reshape")

TODO: ???

### Refactor ("Re-architect")

Die Anwendung wird umgebaut, damit sie besser Gebrauch von _cloud-nativen_ Möglichkeiten (wie z.B. Serverless Computing, automatische Skalierung, Load Balancing) machen kann. Diese Art der Migration ist sehr aufwändig, macht die Anwendung aber zukunftssicher und besser skalierbar. Längerfristig ergeben sich Kostenersparnisse, da die lokale Infrastruktur nicht mehr benötigt wird und die Applikation effizienter läuft.

### Repurchase ("Drop and Shop")

Intern betriebene Systeme werden durch eine SaaS-Lösung eines externen Anbieters ersetzt. In der Folge muss eine Anwendung weniger selber betrieben werden, was Kosten spart. Die Migration von einer _on-premie_-Anwendung auf eine SaaS-Lösung kann aber aufwändig sein, gerade wenn dabei der Anbieter der Lösung gewechselt wird.

### Retire

Eine bestehende Anwendung wird ersatzlos gestrichen. Dies ist nur möglich, wenn die darin abgebildeten Prozesse nicht mehr oder anderweitig durch Software abgedeckt werden können.

### Retain ("Revisit")

Eine bestehende Anwendung wird _nicht_ migriert sondern weiterbetrieben, da sich eine Migration nicht lohnt (zu teuer, oder die Anwendung wird in absehbarer Zeit nicht mehr benötigt). 

## Quelle

- [The 7Rs of Cloud Migration](https://bluexp.netapp.com/blog/aws-cvo-blg-strategies-for-aws-migration-the-new-7th-r-explained)
- [7 Strategies for Migrating Applications to the Cloud](https://aws.amazon.com/blogs/enterprise-strategy/new-possibilities-seven-strategies-to-accelerate-your-application-migration-to-aws/)
