+++
title = "Wahlprogramm 2: Nextcloud"
weight = 9
+++

Im zweitenWahlprogramm wird Nextcloud in Betrieb genommen. Zunächst schauen wir
uns die Problematik mit OpenSource-Lizenzen an, die von Nextcloud sehr
überzeugend gelöst wird. Als nächstes geht es um Service-Management mit systemd,
womit Dienste automatisch (neu)gestartet werden. Nextcloud basiert auf dem
sogenannten LAMP-Stack bestehend aus Linux, apache, MySQL und PHP. Diese
Komponenten werden in Betrieb genommen und zu einer Gesamtarchitektur
zusammengefügt. Wenn alle Komponenten bereit sind, wird Nextcloud in Betrieb
genommen. Zum Schluss wird der lokale Storage durch S3 ersetzt ‒ genauer durch
Minio, das als systemd-Service betrieben werden soll.

- [Einführung in Nextcloud und OpenSource-Lizenzen](/wp2-nextcloud/intro)
