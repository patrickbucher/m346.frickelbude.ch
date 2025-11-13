+++
title = "Einführung: Nextcloud und Open-Source-Lizenzen"
weight = 1
+++

![Das offizielle Nextcloud-Logo](/img/nextcloud-logo.png)

Nextcloud ist ein Online-Datenspeicher, der mehr bietet als eine reine Datenablage. Auf der [offiziellen Webseite](https://nextcloud.com/) findet man den Verweis auf [Nextcloud Hub](https://nextcloud.com/hub/), das folgenden Funktionsumfang bietet:

- **Nextcloud Files**: Dateien speichern und teilen
- **Nextcloud Talk**: Videokonferenzen abhalten
- **Nextcloud Groupware**: Kalender, Kontakte, E-Mail verwalten
- **Nextcloud Office**: Dokumente kollaborativ bearbeiten

Es stehen Clients für die gängigsten Betriebssysteme (Windows, macOS, Linux, Android, iOS) zur Verfügung.

## Warum Nextcloud?

Nun fragt man sich vielleicht:

> Warum soll man sich mit Nextcloud befassen, wenn doch _Microsoft 365_ und
> _Google Workspace_ das gleiche bieten?

Überlegen Sie sich zuerst diese Frage und schauen Sie sich anschliessend mögliche Antworten an:

{{% expand title="Antworten" %}}
1. Bei Nextclod fallen keine Lizenzkosten an.
2. Das europäische Unternehmen Nextcloud untersteht nicht dem CLOUD-Act.
3. Nextcloud kann selber und on-premise gehosted werden.
    1. Der Standord der Daten kann frei gewählt werden.
    2. Man kann Daten lokal nach eigenen Sicherheitsbedürfnissen abspeichern.
    3. Die Nähe der Clients bei on-premise-Installationen ermöglicht eine höhere
       Zugriffsgeschwindigkeit.
4. Nextcloud ist anpassbar (da OpenSource) und erweiterbar (durch Erweiterungen).
{{% /expand %}}

### :briefcase: Aufgabe 1

Beantworten Sie folgende Fragen in Ihre persönliche Dokumentation:

1. Welchen Datenspeicher setzen Sie ein (privat oder im Lehrbetrieb)?
2. Welche Vor- und Nachteile hätte der Einsatz von Nextcloud gegenüber der derzeit verwendeten Lösung?

## Geschichte

- 2010: Start des ownCloud-Projekts
- 2011: Gründung der Firma ownCloud
- 2016: CTO Frank Karlitschek verlässt ownCloud
    - "moralische Bedenken" als Auslöser
    - **forkt ownCloud zu Nextcloud**
    - Gründung der Nextcloud GmbH
- 2018: Nextcloud als "Bundescloud" in Deutschland
- 2019: Nextcloud für Behörden von Frankreich, Schweden, Niederlande
- 2020: Nextcloud Hub (mit Office-Lösung)
- 2020: Verbesserung von _Talk_ (für Videokonferenzen)
- 2021: Mitarbeit an Cloud-Projekt _Gaia-X_

Die Projekte **ownCloud** und **Nextcloud** sind beide aktiv und erfolgreich!

Ein wichtiger Faktor bei der Abspaltung von ownCloud spielte die Lizenzsituation. Auf OpenSource-Lizenzen soll nun detaillierter eingegangen werden.

## Lizenzen

OpenSource-Lizenzen werden unter dem Oberbegriff _FLOSS_ zusammengefasst: Free-, Libre- und OpenSource-Software.

Grundsätzlich unterscheidet man zwischen zwei Arten von FLOSS-Lizenzen:

1. _permissive_: Die Verwendung solcher Software ist auch in proprietärer Software erlaubt. Beispiele für permissive Lizenzen und dazugehörige Projekte sind:
    - Apache License: Apache HTTP Server, Kubernetes
    - BSD Licenses: FreeBSD, NetBSD, Go
2. _share-alike_:  Es gilt das sogenannte _Copyleft_-Prinzip: Die Bedingungen "reisen mit" der Software mit. Änderungen an der Software müssen unter den gleichen Bedingungen veröffentlicht werden. Beispiele für share-alike-Lizenzen und dazugehörige Projekte sind:
    - General Public License (GPL): Linux, GCC
    - Mozilla Public License (MPL): Firefox, LibreOffice
    - **GNU Affero General Public License** (AGPL): Nextcloud, ownCloud

Überlegen Sie sich zuerst diese Frage und schauen Sie sich anschliessend mögliche Antworten an:

> Welche Art von Lizenz (permissive, share-alike) würden Sie für Ihr Software-Projekt verwenden? Warum?

{{% expand title="Antworten" %}}
- permissive
    1. Rufschädigungen durch schlechte Anpassungen können vermieden werden.
    2. Man kann Änderungen für sich behalten und so einen Wettbewerb erhalten.
    3. Man kann eine höhere Verbreitung damit erreichen.
- share-alike
    1. Dem Nutzer ist der wahre Urheber der Software bekannt.
    2. Man kann nicht von der Arbeit eines anderen profitieren, ohne dass die anderen ebenfalls von dieser Arbeit profitieren würden.
    3. Man erhält längerfristig mehr Mitarbeit von Aussenstehenden.
{{% /expand %}}

### :briefcase: Aufgabe 2

Beantworten Sie folgende Frage in Ihre persönliche Dokumentation:

1. Suchen Sie je drei Beispiele für ein Softwareprojekt, welches eine permissive bzw. eine share-alike-Lizenz verwendet (Name des Projekts, kurze Beschreibung, URL zur offiziellen Webseite).

### Copyright und Copyleft

Lizenzen basieren auf der Idee des Urherberrechts (engl. _Copyright_), welches geistiges Eigentum schútzen soll. Der Urheber hat das Recht zu bestimmen, was mit seinem Werk gemacht werden darf und was nicht. In der Regel dürfen keine Kopien von urheberrechtlich geschützten Werken angelegt werden (Urheberrechtsverletzung). Das Copyright schützt die _Urheberrechte_ gegenüber dem Verbraucher.

Das sogenannte _Copyleft_ basiert auf dem Copyright, kehrt aber dessen Zweck um: Mithilfe des Copylefts sollen _Verbraucherrechte_ gegenüber den Urhebern geschützt werden. Auf Basis des Copyrights kann der Autor eines Werkes bestimmen, dass dieses kopiert werden darf (permissive Lizenzen), ja sogar dass diese Modifikationen weitergegeben werden müssen (share-alike-Lizenzen). Durch das Copyleft wird das Kopieren und Bearbeiten von Werke ermöglicht und gefördert!

### Das ASP-Schlupfloch

Das Nextcloud-Projekt hat sich mit der AGPL für eine share-alike-Lizenz entschieden. Dadurch soll ein Problem verhindert werden, das als _ASP-Schlupfloch_ bekannt ist.

Nextcloud ist eine Serveranwendung. Angenommen, man lizenziert solch eine Software unter einer share-alike-Lizenz wie der GPL, müssen alle Änderungen an dieser Software wiederum unter der GPL veröffentlicht werden. Die GPL erlaubt jedoch, dass man private Änderungen für den internen Hausgebrauch vornehmen kann, die man dann nicht veröffentlichen muss.

Biete ich nun als _Application Service Provider_ (ASP) eine angepasste Version meiner Software auf meinen Servern an, gelten diese Änderungen als intern ‒ und ich muss diese nicht publik machen! Dieses Problem bezeichnet man als das _ASP-Schlupfloch_. Dadurch kann ein Anbieter von der Arbeit einer Community profitieren und Geld verdienen, ohne dass die Community dadurch eine Gegenleistung erhält.

Die GNU Affero General Public License (kurz: AGPL) ist eine share-alike-Lizenz, die auf der GPL basiert. Im Gegensatz zur GPL wird aber vom ASP verlangt, dass dieser seine Änderungen unter den Bedingungen der AGPL publik macht. Dadurch wird sichergestellt, dass auch gewinnorientierte Anbieter ihre Verbesserungen in das Originalprojekt zurückfliessen lassen und dadurch auch die Community profitiert.

Überlegen Sie sich zuerst diese Frage und schauen Sie sich anschliessend mögliche Antworten an:

> Warum wählt eine gewinnorientierte Firma die AGPL als Lizenz?

{{% expand title="Antworten" %}}
1. **Vertrauen**: Die Community weiss, dass die Firma auch Verbesserungen
   beisteuert und diese weiterhin freigibt. Die Community beteiligt sich so
   aktiver an der Entwicklung.
2. **Transparenz**: Man kann nachvollziehen, welche Software tatsächlich in der
   Cloud läuft.
3. **Kein Lock-In**: Verwendet man das kommerzielle Cloud-Angebot, kann man
   später immer noch auf eine selbst gehostete Lösung umsteigen, da man
   Gewissheit hat, alle Features auch lokal zur Verfügung zu haben.
{{% /expand %}}

### :briefcase: Aufgabe 3

Beantworten Sie folgende Fragen in Ihre persönliche Dokumentation:

1. Welche Projekte setzen sonst noch die AGPL als Lizenz ein? Recherchieren Sie im Internet und listen Sie mindestens drei Beispiele auf (Name des Projekts, kurze Beschreibung, URL zur offiziellen Webseite).
2. Was könnte ein Anbieter wie Nextcloud mit seiner Software machen, wenn er plötzlich nicht mehr an die Bedingungen der AGPL gebunden wäre?
