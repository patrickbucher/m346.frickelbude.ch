+++
title = 'Vorteile & Risiken'
date = 2024-08-16T14:05:37+02:00
draft = true
+++

- In der frühen Phasen eines Unternehmens ist der Aufbau eigener
  Server-Kapazitäten oft zu kapital- und personalintensiv. Start-ups können
  sich das zeitlich und finanziell nicht leisten und greifen deshalb eher zu
  einer Public Cloud.
- Cloud Computing ist oft der pragmatischste Ansatz um digitale Lösungen
  möglichst schnell bereitstellen zu können. 
- Cloud Computing erlaubt das Auslagern IT-basierter Wertschöpfung an externe
  Dienstleister. ("Do what you can do best, outsource the rest.")
    - Problem: Früher haben viele Unternehmen ihre IT outgesourced, da diese
      nicht zu ihrem Kerngeschäft gehörte (z.B. Banken, Versicherungen). In der
      Zwischenzeit ist die Abhängigkeit von der IT in vielen Branchen und
      Unternehmen so gross geworden, dass man auf IT-Wissen angewiesen ist.
- Je höher man das Service-Modell wählt (SaaS > PaaS > IaaS > Legacy In-House
  IT), desto mehr nimmt die Gefahr eines Vendor-Lock-Ins (Abhängigkeit von
  einem einzelnen Anbieter) zu. Cloud-Native ist jedoch eine Denkweise und
  damit nicht von einem einzelnen Anbieter abhängig.
- Dank SaaS können Anwendungen ohne das dazu notwendige IT-Wissen verwendet
  werden können; es muss keine eigene Plattform betrieben werden.
- Dank Cloud-Angeboten können Fachabteilungen unabhängig der zentralen
  Firmen-IT einfach, schnell und kostengünstig eigene Anwendungen und eigene
  Infrastruktur verwenden.
    - Problem: Interne Standards, Richtlinien und die Sicherheit können dadurch
      verletzt werden.
- Cloud-Native-Anwendungen sind speziell auf die Skalierbarkeit optimiert und
  können helfen, Kosten zu sparen. Der Fokus ist auf horizontaler (mehr/weniger
  Dinge) statt auf vertikaler (schwächere/stärkere Dinge) Skalierung.
- Dank dem Pay-as-you-go-Kostenmodell werden nur Ressourcen abgerechnet, die
  tatsächlich verwendet werden. Die Kosten können der Lastkurve optimal folgen
  bzw. sich ihr "anschmiegen".
- Je höher das Peak-to-Average-Verhältnis p/a (Spitzenlast zu
  Durchschnittslast) ist, desto eher lohnt sich der Einsatz von
  Cloud-Ressourcen. Absteigend nach Sparpotenzial eignen sich folgende Arten
  von Workloads besonders für die Cloud:
    1. einmalige/seltene Workflows
    2. zufällige/periodische Workflows
    3. kontinuierlich steigende/sinkende Workflows
    4. statische Workflows
- Auch wenn Cloud-Ressourcen teurer als intern bereitgestellte Ressourcen sein
  können, kann die Cloud dennoch wirtschaftlicher sein, solange das Verhältnis
  von Cloud-/In-House-Kosten das Verhältnis von Spitzen-/Durchschnittslast
  nicht übersteigt!
- Ressourcen können nach zwei Stellschrauben eingeteilt werden:
    - feingranularere Zuteilung (vertikale Stellschraube)
        - z.B. mehr oder weniger CPUs, Memory, Storage
        - Container erlauben (dank z.B. cgroups) das Aufteilen von CPUs
    - zeitlich kürzere Zuteilung (horizontale Stellschraube)
        - z.B. bei Inaktivität herunterfahren, bei Bedarf hochfahren
        - FaaS erlaubt das komplette Herunterskalieren

# Abhängigkeit

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
