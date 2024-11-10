+++
title = "Nextcloud 1: Einführung"
weight = 1
+++

![Das offizielle Nextcloud-Logo](/img/nextcloud-logo.png)

Nextcloud ist ein Online-Datenspeicher, der mehr bietet als eine reine
Datenablage. Auf der [offiziellen Webseite](https://nextcloud.com/) findet man
den Verweis auf [Nextcloud Hub](https://nextcloud.com/hub/), das folgenden
Funktionsumfang bietet:

- **Nextcloud Files**: Dateien speichern und teilen
- **Nextcloud Talk**: Videokonferenzen abhalten
- **Nextcloud Groupware**: Kalender, Kontakte, E-Mail verwalten
- **Nextcloud Office**: Dokumente kollaborativ bearbeiten

Es stehen Clients für die gängigsten Betriebssysteme (Windows, macOS, Linux,
Android, iOS) zur Verfügung.

## Warum Nextcloud?

Nun fragt man sich vielleicht:

> Warum soll man sich mit Nextcloud befassen, wenn doch _Microsoft 365_ und
> _Google Workspace_ das gleiche bieten?

Überlegen Sie sich diese Frage und schauen Sie sich dann mögliche Antworten an:

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

## Geschichte

Nextcloud ist ein _Fork_, d.h. eine Abspaltung, vom älteren ownCloud-Projekt und
wird heute unabhängig von ownCloud weiterentwickelt. Die Geschichte des Projekts
geht aufs Jahr 2010 zurück und hat folgende wichtigste Meilensteine:

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

Ein wichtiger Faktor bei der Abspaltung von ownCloud spielte die
Lizenzsituation. Auf OpenSource-Lizenzen soll nun detaillierter eingegangen
werden.

## Lizenzen

OpenSource-Lizenzen werden unter dem Oberbegriff _FLOSS_ zusammengefasst: Free-,
Libre- und OpenSource-Software.

Grundsätzlich unterscheidet man zwischen zwei Arten von FLOSS-Lizenzen:

1. _permissive_: Die Verwendung solcher Software ist auch in proprietärer
   Software erlaubt. Beispiele für permissive Lizenzen und dazugehörige Projekte
   sind:
    - Apache License: Apache HTTP Server, Kubernetes
    - BSD Licenses: FreeBSD, NetBSD, Go
2. _share-alike_:  Es gilt das sogenannte _Copyleft_-Prinzip: Die Bedingungen
   "risen mit" der Software mit. Änderungen an der Software müssen unter den
   gleichen Bedingungen veröffentlicht werden. Beispiele für
   share-alike-Lizenzen und dazugehörige Projekte sind:
    - General Public License (GPL): Linux, GCC
    - Mozilla Public License (MPL): Firefox, LibreOffice
    - **GNU Affero General Public License** (AGPL): Nextcloud, ownCloud

Überlegen Sie sich folgende Frage:

> Welche Art von Lizenz (permissive, share-alike) würden Sie für Ihr
> Software-Projekt verwenden? Warum?

{{% expand title="Antworten" %}}
- permissive
    1. Rufschädigungen durch schlechte Anpassungen können vermieden werden.
    2. Man kann Änderungen für sich behalten und so einen Wettbewerb erhalten.
    3. Man kann eine höhere Verbreitung damit erreichen.
- share-alike
    1. Dem Nutzer ist der wahre Urheber der Software bekannt.
    2. Man kann nicht von der Arbeit eines anderen profitieren, ohne dass die
       anderen ebenfalls von dieser Arbeit profitieren würden.
    3. Man erhält längerfristig mehr Mitarbeit von Aussenstehenden.
{{% /expand %}}

Das Nextcloud-Projekt hat sich mit der AGPL für eine share-alike-Lizenz
entschieden. Dadurch soll ein Problem verhindert werden, das als
_ASP-Schlupfloch_ bekannt ist.

### Das ASP-Schlupfloch

Nextcloud ist eine Serveranwendung. Angenommen, man lizenziert solch eine
Software unter einer share-alike-Lizenz wie der GPL, müssen alle Änderungen an
dieser Software wiederum unter der GPL veröffentlicht werden. Die GPL erlaubt
jedoch, dass man private Änderungen für den internen Hausgebrauch vornehmen
kann, die man dann nicht veröffentlichen muss. Biete ich nun als _Application
Service Provider_ (ASP) eine angepasste Version meiner Software auf meinen
Servern an, gelten diese Änderungen als intern ‒ und ich muss sie nicht publik
machen! Dieses Problem bezeichnet man als das _ASP-Schlupfloch_.

TODO: Lösung
