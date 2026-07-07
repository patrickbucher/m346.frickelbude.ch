+++
title = "Nextcloud"
weight = 8
+++

In diesem Vertiefungsprogramm wird Nextcloud in Betrieb genommen. Zunächst schauen wir uns die Problematik mit OpenSource-Lizenzen an, die von Nextcloud sehr überzeugend gelöst wird. Als nächstes geht es um Service-Management mit _systemd_, womit Dienste automatisch (neu)gestartet werden.

Nextcloud basiert auf dem sogenannten _LAMP-Stack_ bestehend aus _Linux_, _Apache_, _MySQL_ und _PHP_. Diese Komponenten werden in Betrieb genommen und zu einer Gesamtarchitektur zusammengefügt.

Wenn alle Komponenten bereit sind, können wir Nextcloud in Betrieb nehmen. Für eine Datenablage wird ein Backup benötigt, was auch einmal geübt werden soll. Anschliessend wird der lokale Storage durch S3 ersetzt ‒ genauer durch Minio, das als systemd-Service betrieben werden soll.

Zum Schluss schauen wir uns, sofern wir noch Zeit dafür haben, Infrastruktur-Automatisierung mit Ansible und die automatische Ausstellung von TLS-Zertifikaten via _Let's Encrypt_ an.

## Themenblöcke

- [Einführung in Nextcloud und Open-Source-Lizenzen](/nextcloud/intro)
- Service-Management mit systemd
- Der LAMP-Stack
- Nextcloud-Installation
- Backup und Restore
- S3-Migration
- Ansible
- TLS und Let's Encrypt

## :briefcase: Ergebnissicherung

Das Ergebnis von diesem Vertiefungsprogramm ist neben einer lauffähigen Nextcloud-Installation eine persönliche Dokumentation. Diese soll aufzeigen, wie man Nextcloud auf dem LAMP-Stack in Betrieb nimmt und den Storage vom Dateisystem auf S3 (Minio) migriert.

Mithilfe der Dokumentation soll der letzte Stand bei Bedarf in kurzer Zeit auf einer neuen virtuellen Maschine wiederhergestellt werden können!

Bei allen Aufgaben, in denen das Symbol :briefcase: zu sehen ist, müssen Inhalte in die Dokumentation aufgenommen werden.

Am Ende des Moduls wird der Stand dieser Dokumentation bewertet. Diese Bewertung fliesst nicht in die Modulnote, aber in die Prädikate ein.

### :desktop_computer: Screenshots

Erfolgt die Ergebnissicherung über einen Screenshot, wird dies mit dem Symbol :desktop_computer: angezeigt. Wird ein Screenshot von einer Shell-Session verlangt, soll der Prompt (z.B. `user@patrick-bucher$ `) klar ersichtlich sein. Beispiel:

> Aufgabe X: Führen Sie den Befehl `systemctl status apache2.service` aus. Erbringen Sie per Screenshot den Nachweis, dass dieser Service läuft:

Nachweis:

![Beispiel: Screnshot einer SSH-Sitzung](/img/vm-ssh-session.png)
