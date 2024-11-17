+++
title = "Wahlprogramm 2: Nextcloud"
weight = 9
+++

Im zweiten Wahlprogramm wird Nextcloud in Betrieb genommen. Zunächst schauen wir
uns die Problematik mit OpenSource-Lizenzen an, die von Nextcloud sehr
überzeugend gelöst wird. Als nächstes geht es um Service-Management mit systemd,
womit Dienste automatisch (neu)gestartet werden.

Nextcloud basiert auf dem sogenannten LAMP-Stack bestehend aus Linux, apache,
MySQL und PHP. Diese Komponenten werden in Betrieb genommen und zu einer
Gesamtarchitektur zusammengefügt.

Wenn alle Komponenten bereit sind, wird Nextcloud in Betrieb genommen. Zum
Schluss wird der lokale Storage durch S3 ersetzt ‒ genauer durch Minio, das als
systemd-Service betrieben werden soll.

## Themenblöcke

- [Einführung in Nextcloud und OpenSource-Lizenzen](/wp2-nextcloud/intro)
- [Service-Management mit systemd](/wp2-nextcloud/systemd)
- LAMP-Stack
- Nextcloud-Installation
- S3-Migration

## :briefcase: Ergebnissicherung

Das Ergebnis von diesem Wahlprogramm ist eine persönliche Dokumentation. Diese
soll aufzeigen, wie man Nextcloud auf dem LAMP-Stack in Betrieb nimmt und den
Storage vom Dateisystem auf S3 (Minio) migriert.

Mithilfe der Dokumentation soll der letzte Stand in kurzer Zeit auf einer neuen
virtuellen Maschine wiederhergestellt werden!

Bei allen Aufgaben, in denen das Symbol :briefcase: zu sehen ist, müssen Inhalte
in die Dokumentation aufgenommen werden.

Am Ende des Moduls wird der Stand dieser Dokumentation bewertet. Diese Bewertung
fliesst nicht in die Modulnote, aber in die Prädikate ein.
