+++
title = 'Handlungsziele & HANOK'
date = 2024-08-16T14:02:40+02:00
+++

Siehe [Modulidentifikation](https://www.modulbaukasten.ch/module/346/1/de-DE)

1. Beurteilt die Eignung von On-Premise und Cloudlösungen abgestimmt auf die
   Zielsetzungen des Unternehmens und leitet draus eine Empfehlung für die
   Umsetzung ab.
    1. Kennt die Definition und die Vorteile von Cloud Computing (On-Demand
       Delivery, On-Demand Pricing, Dynamische Skalierung und die Globale
       Infrastruktur der Hyperscaler).
        - [/theorie/definition/](/theorie/definition/)
    2. Kennt die Cloud Service- (IaaS, PaaS, SaaS) und Betriebsmodelle
       (On-Premise, hybrid Cloud und Cloud-Native) und deren Unterschiede. 
        - [/theorie/definition/](/theorie/definition/)
    3. Kennt Computer-Optionen und deren Unterschiede und Anwendungszwecke
       (virtuelle Maschinen, Container und Serverless).
        - [/theorie/vms-container-serverless/](/theorie/vms-container-serverless/)
    4. Kennt Cloud Services, um die drei Hauptdatentypen (Strukturierte,
       teilweise strukturierte und unstrukturierte Daten) zu speichern.
        - [/hauptdatentypen](/hauptdatentypen)
        - [/hauptdatentypen/strukturierte](/hauptdatentypen/strukturierte)
        - [/hauptdatentypen/strukturierte/duckdb](/hauptdatentypen/strukturierte/duckdb)
        - [/hauptdatentypen/teilweise-strukturierte](/hauptdatentypen/teilweise-strukturierte)
        - [/hauptdatentypen/teilweise-strukturierte/redis](/hauptdatentypen/teilweise-strukturierte/redis)
    5. Kennt die Verteilung der Verantwortlichkeiten für den sicheren Betrieb
       von Cloud Services und die grundlegenden Richtlinien und
       Datenschutzgarantien der grossen Cloud Provider.
        - [/theorie/dsgvo/](/theorie/dsgvo/)
    6. Kennt das grundlegende Netzwerkkonzept einer Cloud (Virtuelle Private
       Cloud, Anbindungsmöglichkeiten, Routing, Netzwerksicherheit) und dessen
       Funktionsweise.
        - [/theorie/cloud-infrastruktur](/theorie/cloud-infrastruktur)
        - [/ssh](/ssh/)
    7. Kennt Infrastruktur, Best Practices und weitere Informationsquellen von
       Hyperscaler (z.B. Referenzarchitekturen und Security Dokumentationen).
        - [/theorie/cloud-infrastruktur](/theorie/cloud-infrastruktur)
2. Spezifiziert die Kosten einschliesslich Betriebsaufwand der vorgeschlagenen
   Lösung und bestimmt die zweckmässige Cloud Adoption.
    1. Kennt Kostenmodelle und das Vorgehen für einfache Kostenanalysen anhand
       von Beispielen.
        - TODO: Mengen- & Kostenabschätzung
    2. Kennt die Grundsätze für Cloudmigrationen (z.B. Lift-and-Shift und
       Lift-and-Reshape).
        - [/theorie/cloud-migration](/theorie/cloud-migration)
3. Entwickelt unter Berücksichtigung der technischen Rahmenbedingungen und
   Anforderungen des entsprechenden Anwendungsbereichs ein technisches Konzept
   für die Integration der ausgewählten Cloudlösung.
    1. Kennt die Begriffe Verfügbarkeit, Datensicherheit und –resilienz und die
       Art und Weise, wie deren Anforderungen mit Hochverfügbarkeit, Disaster
       Recovery und Backup adressiert werden.
        - TODO: Monitoring (Verfügbarkeit), Nextcloud (Backup/Restore)
    2. Kennt die Schritte für die Entwicklung einer einfachen Gesamtarchitektur
       und definiert die dafür relevanten Cloud Services.
        - TODO: Monitoring (Softwarearchitektur), Nextcloud (Servicearchitektur)
    3. Kennt ein Testkonzept zur Überprüfung der Funktionalität, Performance und
       Sicherheit von Systemen und Diensten.
        - TODO: Monitoring (Testing), Nextcloud (Testing)
4. Installiert und konfiguriert die vordefinierten Services in der Cloud.
    1. Kennt die Implementationsmöglichkeiten der ausgewählten Dienste in der Cloud (gemäss technischem Konzept).
        - TODO: Monitoring (Go), Nextcloud (Linux-VM)
