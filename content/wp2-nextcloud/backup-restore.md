+++
title = "Backup und Restore"
weight = 5
draft = true
+++

In dieser geführten Übung erfahren Sie, wie man eine Datensicherung von Nextcloud einrichtet (Backup) und notfalls wieder einspielt (Restore). Der ganze Prozess soll testhalber anhand eines Notfallszenarios einmal durchgespielt werden.

## Ausgangslage

Für die Übung benötigen Sie folgendes:

1. Eine funktionstüchtige Nextcloud-Installation.
    - siehe [Nextcloud-Setup](/wp2-nextcloud/nextcloud-setup) bzw. das entsprechende [Walkthrough-Video](https://www.youtube.com/watch?v=MwYIDH1vaBw)
2. Einen Benutzeraccount mit einigen hochgeladenen Dateien.
    - siehe [Übung ?]() und [Übung ?]() unter TODO
3. TODO: Das Werkzeug `rsync`.
    - `sudo apt install -y rsync`

**Achtung**: Die Anweisungen gehen davon aus, dass die Dateien _noch nicht_ auf Minio sondern immer noch im Dateisystem unter `/var/www/nextcloud/data`. Falls Sie hingegen Minio schon eingebunden haben, ersetzen Sie den genannten Pfad durch `/home/minio/minio-data`. Das Backup und Restore sollten gleichermassen funktionieren.

![Don Corleone verwendet Nextcloud bereits fleissig für seine ehrenhaften Geschäfte](/img/1-nextcloud-before-accident.png)

## Vorbereitung

Nextcloud verwendet das Dateisystem für Nutzdaten (d.h. auf Nextcloud abgelegte Dateien) und MariaDB für Metadaten (d.h. für Benutzerinformationen, Einstellungen usw.).

Dateisystem und Datenbank müssen unabhängig voneinander aber möglichst zeitnah zueinander gesichert werden. Für die beiden Backups sollen folgende Verzeichnisse mit den entsprechenden Besitzern eingerichtet werden:

- `/backup`: `root`
- `/backup/nextcloud-data`: `www-data`
- `/backup/nextcloud-db`: `mysql`

Erstellen Sie diese Verzeichnisse mit `mkdir` und übertragen Sie mit `chown` die Berechtigungen auf den jeweiligen Benutzer und die gleichnamige Gruppe.

## Teil 1: Backup erstellen

Siehe auch [Backup](https://docs.nextcloud.com/server/latest/admin_manual/maintenance/backup.html) in der Nextcloud-Dokumentation. (Auf die Sicherung der Konfiguration und der Themes soll hier verzichtet werden.)

Vor einer Datensicherung soll Nextcloud in den Maintenance-Modus versetzt werden. Dadurch wird verhindert, dass ein inkonsistenter Zustand gesichert wird.

Verwenden Sie hierzu den `occ`-Befehl von Nextcloud:

    $ sudo -u www-data php /var/www/nextcloud/occ maintenance:mode --on
    Maintenance mode enabled

![Die Datensicherung sollte im _Maintenance mode_ erfolgen](/img/2-nextcloud-maintenance-mode.png)

### Datenbank sichern

Verwenden Sie den Befehl `mysqldump` um eine Sicherung der Nextcloud-Datenbank vorzunehmen. Die Syntax lautet folgendermassen:

    $ sudo -u [Benutzer] mysqldump --single-transaction -h [Host] -u [Datenbank-Benutzer] -p[Datenbank-Passwort] [Datenbank-Name] > [Zieldatei]

Die Zieldatei soll zuerst unter `/tmp` zu liegen kommen und die Dateiendung `.sql` haben. Verschieben Sie die Datei anschliessend ins vorher dafür eingerichtete Verzeichnis, übertragen Sie den Besitz dem entsprechenden Benutzer und schränken Sie die Zugriffsrechte auf die Datei ein:

    $ sudo mv /tmp/[Backup-Datei].sql /backup/nextcloud-db/[Backup-Datei].sql
    $ sudo chown [Benutzer:Gruppe] /backup/nextcloud-db/[Backup-Datei].sql
    $ sudo chmod [Berechtigungen] /backup/nextcloud-db/[Backup-Datei].sql

Verwenden Sie sinnvollerweise das aktuelle Tagesdatum (mit oder ohne Uhrzeit) im Dateinamen, z.B. `2024-01-14.sql`.

### Dateisystem sichern

Verwenden Sie den Befehl `rsync` um eine Sicherung der Nextcloud-Nutzdaten vorzunehmen. Die Syntax lautet folgendermassen:

    $ sudo -u [Benutzer] rsync -Aavx /var/www/nextcloud/data/ [Zielordner]/

Lesen Sie in der _Manpage_ `rsync(1)` nach, was die Parameter `-a`, `-A`, `-v` und `-x` bedeuten.

Der Zielordner muss vorher erstellt werden und soll unter `/backup/nextcloud-data` zu liegen kommen. Sein Name sollte wiederum ein aktuelles Datum enthalten:

    $ sudo -u [Benutzer] mkdir /backup/nextcloud-data/[Ordnername]

Nach der Sicherung sollte der Inhalt etwa folgendermassen aussehen:

    $ sudo -u [Benutzer] ls /backup/nextcloud-data/[Ordnername]/data
    admin  appdata_ock0f049kuv4  don_corleone  files_external  index.html  nextcloud.log

Damit wären die Datenbank und das Dateisystem gesichert. Nextcloud kann wieder aus dem Maintenance-Modus genommen werden:

    $ sudo -u www-data php /var/www/nextcloud/occ maintenance:mode --off
    Maintenance mode disabled

## Teil 2: Restore einspielen

Siehe auch [Restore](https://docs.nextcloud.com/server/latest/admin_manual/maintenance/restore.html) in der Nextcloud-Dokumentation.

Löschen Sie nun ein paar Dateien über das Web-Interface von Nextcloud. Leeren Sie auch den Papierkorb, damit die Daten für den Benutzer definitiv weg sind.

![Das Canolli-Rezept und das unwiderstehliche Angebot an die Firma _Woltz Films_ werden versehentlich gelöscht](/img/3-nextcloud-files-deleting.png)

![Don Corleones Dateien: Da fehlt doch etwas!](/img/4-nextcloud-files-deleted.png)

### Dateisystem wiederherstellen

Die Dateien können nun mithilfe von `rsync` wiederhergestellt werden.

Versetzen Sie zuerst Nextcloud wieder in den Wartungsmodus (_Maintenance Mode_).

Anschliessend können Sie das Nextcloud-Datenverzeichnis wiederherstellen:

    $ sudo -u [Benutzer] rsync --dry-run -Aavx /backup/nextcloud-data/[Ordnername]/ /var/www/nextcloud/data/

Der Parameter `--dry-run` führt dazu, dass nur ein "Trockenlauf" gestartet wird. Überprüfen Sie, ob die Ausgabe dem entspricht, was Sie machen wollen. Ist dies der Fall, lassen Sie `--dry-run` weg und führen Sie den Befehl erneut aus.

Belassen Sie Nextcloud noch im Wartungsmodus.

### Datenbank wiederherstellen

Damit die Datenbank wiederhergestellt werden kann, muss sie zuerst komplett gelöscht und anschliessend neu erstellt werden:

    $ sudo -u [Benutzer] mysql -h [Host] -u [Datenbank-Benutzer] -p[Datenbank-Passwort] -e "DROP DATABASE [Datenbank-Name];"
    $ sudo -u [Benutzer] mysql -h [Host] -u [Datenbank-Benutzer] -p[Datenbank-Passwort] -e "CREATE DATABASE [Datenbank-Name] CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';"

Nun kann das Restore erfolgen:

    $ sudo -u [Benutzer] mysql -h [Host] -u [Datenbank-Benutzer] -p[Datenbank-Passwort] [Datenbank-Name] <[Backup-Datei]

Wird Nextcloud nun wieder aus dem Wartungsmodus genommen, sollten alle Dateien wieder vorhanden sein.