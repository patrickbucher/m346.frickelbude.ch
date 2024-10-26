+++
title = "Minio"
+++

## Übung 1: Minio-Server verwenden

Der Minio-Server (`minio`) und -Client (`mc`) sind vorinstalliert.

### Datenverzeichnis erstellen

Erstellen Sie ein Verzeichnis in Ihrem `$HOME`-Verzeichnis namens `minio-data`:

```bash
mkdir ~/minio-data
```

### Benutzername und Passwort konfigurieren

Editieren Sie anschliessend die Datei `~/.bashrc` mit einem Texteditor Ihrer
Wahl, z.B. mit `nano`.

Definieren Sie ganz unten an der Datei zwei neue Umgebungsvariablen mit dem
`export`-Befehl:

```bash
export MINIO_ROOT_USER=minio
export MINIO_ROOT_PASSWORD=topsecret
```

Speichern Sie die Datei ab. Laden Sie die Datei anschliessend mit dem
`source`-Befehl nach:

```bash
source ~/.bashrc
```

Als Kurzschreibweise kann auch der `.`-Befehl verwendet werden:

```bash
. ~/.bashrc
```

Geben Sie nun testhalber beide Variablen aus:

```bash
echo $MINIO_ROOT_USER
echo $MINIO_ROOT_PASSWORD
```

Es sollte der konfigurierte Benutzername und das konfigurierte Passwort
ausgegeben werden.

### Minio starten

Starten Sie nun den Minio-Server mit dem folgenden Befehl:

```bash
minio server ~/minio-data
```

Lassen Sie den Server nun in diesem Terminal laufen.

### Auf Web-Interface einloggen

Besuchen Sie im Browser die Seite `http://[IP-ADRESSE]:9000`, wobei Sie
`[IP-Adresse]` durch die jeweiligen IP-Adresse ihrer virtuellen Maschine
ersetzen müssen. Sie werden zu einem Login-Bildschirm weitergeleitet.

Loggen Sie sich mit dem zuvor definierten Benutzernamen und Passwort ein.

Sie sollten nun die leere Bucket-Übersicht sehen.

### Bucket erstellen

Erstellen Sie nun einen neuen Bucket per Klick auf den entsprechenden
Link ("Create Bucket"). Nennen Sie diesen "hello". Sie brauchen keine anderen
Optionen anzuwählen. Klicken Sie anschliessend auf die Schaltfläche "Create
Bucket", um den neuen Bucket definitiv zu erstellen.

### Datei hochladen

Klicken Sie in der Navigation links unter dem Abschnitt "User" auf den Link
"Object Browser". Wählen Sie nun den zuvor neu erstellten Bucket "hello" aus.

Betätigen Sie als nächstes die "Upload"-Schaltfläche oben rechts. Klicken Sie
dann auf "Upload File". Laden Sie nun **drei** Dateien unterschiedlichen Typs
aus Ihrem `$HOME`-Verzeichnis hoch:

1. eine Bilddatei (Endung `.png`, `.jpeg` usw.)
2. eine Textdatei (Endung `.txt`)
3. eine Binärdatei (Endung `.exe`)

### Kontrollfragen

Beantworten Sie folgende Fragen für Ihre persönliche Dokumentation:

1. Wie gross sind die drei Dateien gemäss Anzeige im Web-Interface (grob
   zusammengerechnet)?
2. Wie gross ist der `hello`-Bucket auf dem Dateisystem unter `~/minio-data`?
   Verwenden Sie den Befehl `du -hs` um die Grösse zu ermitteln!
3. Betrachten Sie die Dateien und Ordner im Verzeichnis `~/minio-data/hello`.
   Wie sind die Daten organisiert, und warum ist das wohl so gelöst?

## Übung 2: Minio-Client verwenden

Minio stellt einen Kommandozeilen-Client zur Verfügung, mit dem die Daten auf
dem Minio-Server komfortabel verwendet werden können.

### Client-Alias erstellen

Der Minio-Client `mc` kann so konfiguriert werden, dass er unter einem
Alias-Namen mit einem bestimmten Minio-Server zusammenarbeitet. Führen Sie den
folgenden Befehl aus, um einen neuen Alias namens `local` zu erstellen:

```bash
mc alias set local http://localhost:9000 minio topsecret
```

Unter dem Namen `local` kann man nun auf die lokale Minio-Instanz zugreifen.
Testen Sie den Zugriff mit dem folgenden Befehl:

```bash
mc admin info local
```

Es sollten nun Zustandsinformationen zum lokalen Minio-Server angezeigt werden.

Die Konnektivität kann mithilfe des `ping`-Befehls überprüft werden:

```bash
mc ping local
```

Mit `[Ctrl]-[C]` stoppen Sie die `ping`-Endlosschleife.

### Client-Befehle kennenlernen
    
Der Minio-Client `mc` bietet zahlreiche Befehle, die man von Unix/Linux her kennt:

- `ls`: Dateien auflisten
- `mv`: Dateien umbenennen (verschieben)
- `rm`: Dateien entfernen (löschen)
- `cat`: Dateien aneinanderhängen/ausgeben
- `cp`: Dateien kopieren
- `head`: Anfang einer Datei ausgeben
- `find`: Dateien suchen
- `diff`: Dateien vergleichen
- `du`: Dateigrösse ermitteln
- `stat`: Metadaten zu Dateien und Verzeichnissen ausgeben

Diese Befehle können zwar für normale Dateien im Dateisystem verwendet werden.
Die `mc`-Versionen dieser Befehle bieten aber dadurch keinen Vorteil gegenüber
den herkömmlichen Befehlen.

Die `mc`-Befehle können jedoch auf S3-Daten angewendet werden, indem man Alias
und Bucket (`[Alias]/[Bucket]`) angibt:

```bash
mc ls local/hello
```

Ausgabe:

```plain
[2022-12-04 13:31:53 CET] 346KiB STANDARD minio-logo.png
[2022-12-04 13:32:07 CET] 2.0KiB STANDARD exercises.md
[2022-12-04 13:32:59 CET]  24MiB STANDARD mc
```

Weiter bietet `mc` einige Befehle, die nur im Zusammenhang mit einem S3-Storage
sinnvoll sind. Die folgenden Befehle dienen dem Umgang mit Buckets und
S3-Datenobjekten:

- `mb`: Bucket erstellen
- `rb`: Bucket entfernen
- `tag`: Tags verwalten
- `pipe`: Standardausgabe in Objekt umleiten
- `mirror`: Daten mit anderem S3-Server synchronisieren
- `retention`: Speicherdauer von Objekten festlegen
- `share`: Objekte per URL teilen
- `version`: Versionierung von Buckets verwalten

### Bucket via `mc` erstellen

Erstellen Sie einen neuen Bucket namens `backup` mithilfe des `mc mb`-Befehls.
Kopieren Sie dann wieder drei unterschiedliche Dateien mit dem `mc cp`-Befehl in
den neuen Bucket.

Kontrollieren Sie anschliessend im Browser, ob der Bucket erstellt worden ist
und alle Dateien enthält.

Führen Sie nun den Befehl `mc ls local/backup` aus und leiten Sie dessen Ausgabe
in die Datei `uebung-2-ls.txt` weiter. (Verwenden Sie hierzu den Operator `>`
auf der Shell.) Übernehmen Sie die Ausgabe in Ihre persönliche Dokumentation.

### Buckets taggen

Verwenden Sie den `mc tag`-Befehl (genauer: den Unterbefehl `mc tag set`), um
den Buckets die folgenden Tags zu vergeben:

| Bucket   | Tag (Key) | Tag (Value) |
|----------|-----------|-------------|
| `hello`  | `purpose` | `upload`    |
| `hello`  | `module`  | `346`       |
| `backup` | `purpose` | `archive`   |
| `backup` | `module`  | `346`       |

Mit `mc tag --help` bzw. `mc tag set --help` erhalten Sie Hilfestellungen dazu.

Listen Sie nun die Tags mit `mc tag` **im JSON-Format** auf, und speichern Sie
die Ausgaben unter den Dateien `aufgabe-2-tag-hello.json` und
`aufgabe-2-tag-backup.json` ab. Fügen Sie die Inhalte dieser Dateien in ihre
persönlichen Dokumentation ein.

## Übung 3: s3cmd

Im Gegensatz zu `mc` ist der Befehl `s3cmd` nicht nur für die Zusammenarbeit mit
MinIO ausgelegt, sondern sollte auch mit anderen S3-Implementierungen und
-Angeboten zusammenspielen.

Der Befehl `s3cmd` sollte bereits installiert sein. (Installieren Sie ihn
andernfalls mit dem folgenden Befehl):

```bash
sudo apt install -y s3cmd
```

Erstellen Sie die Datei `~/.s3cfg` und speichern Sie darin die folgende Konfiguration ab:

```ini
host_base = localhost:9000
host_bucket = localhost:9000
use_https = False
access_key = minio
secret_key = topsecret
```

Listen Sie nun die Dateien im `hello`-MinIO-Bucket auf:

```bash
s3cmd ls s3://hello
```

Mit `s3cmd` müssen Sie anstelle des Alias `local/` bloss das Protokoll `s3://`
als Präfix angeben.

Erstellen Sie mit `s3cmd mb` nun einen neuen Bucket namens `backup-copy`:

```bash
s3cmd mb s3://backup-copy
```

Kopieren Sie die drei Dateien aus dem `backup`-Bucket in den
`backup-copy`-Bucket. Verwenden Sie dazu den `s3cmd cp`-Befehl.

Dokumentieren Sie die Befehle in Ihrer persönlichen Dokumentation.

Kontrollieren Sie nun im MinIO-GUI im Browser sowie per `s3cmd ls`-Befehl, ob
alle Dateien erfolgreich kopiert worden sind.

## Übung 4: s3fs

FUSE (Filesystem in Userspace) bietet die Möglichkeit, Dateisysteme ohne
Root-Berechtigungen einzubinden.

Mithilfe von `s3fs` können S3-Buckets als normale Ordner eingebunden werden.

Der Befehl `s3fs` sollte bereits installiert sein. (Installieren Sie ihn
andernfalls mit dem folgenden Befehl):

```bash
sudo apt install -y s3fs
```

Erstellen Sie eine Konfigurationsdatei `~/.passwd-s3fs` mit dem folgenden
Inhalt:

```plain
minio:topsecret
```

Ändern Sie die Berechtigungen für diese Datei folgendermassen:

```bash
chmod 600 ~/.passwd-s3fs
```

Dadurch stellen Sie sicher, dass nur Ihr Benutzer diese Datei lesen und
schreiben kann (`s3fs` verweigert sonst den Dienst).

Erstellen Sie nun mit dem `mkdir`-Befehl ein Verzeichnis `~/minio-mount` mit
Unterverzeichnissen für die verschiedenen Buckets:

```bash
mkdir -p ~/minio-mount/hello
mkdir -p ~/minio-mount/backup
mkdir -p ~/minio-mount/backup-copy
```

Mithilfe des `s3fs`-Befehls können die einzelnen Buckets nun "gemounted", d.h.
eingehängt werden:

```bash
s3fs hello ~/minio-mount/hello -o use_path_request_style,url=http://localhost:9000
s3fs backup ~/minio-mount/backup -o use_path_request_style,url=http://localhost:9000
s3fs backup-copy ~/minio-mount/backup-copy -o use_path_request_style,url=http://localhost:9000
```

Die Unterverzeichnisse von `~/minio-mount/` können nun weitgehend wie lokale
Ordner verwendet werden.

Kopieren Sie nun eine beliebige Datei, die noch nicht in MinIO vorhanden ist, in
alle drei Buckets über das `~/minio-mount/`-Verzeichnis.

Überprüfen Sie nun im MinIO-GUI im Browser, ob Sie die Datei in jedem Bucket
sehen können.

Führen Sie nun den folgenden Befehl aus:

```bash
mount | grep minio
```

Legen Sie die Ausgabe in ihrer persönlichen Dokumentation ab.

Damit wird demonstriert, dass `s3fs` die S3-Buckets über das Betriebssystem
(d.h. über eine Kernel-Funktion) einhängt.

Mit dem `umount`-Befehl können die Buckets wieder vom Dateisystem gelöst werden:

```bash
umount ~/minio-mount/hello/
umount ~/minio-mount/backup
umount ~/minio-mount/backup-copy/
```

(Zwar gibt es hierfür auch den `s3fs unmount`-Befehl, es ist aber bemerkenswert,
dass dies auch mit dem gewöhnlichen `umount`-Befehl funktioniert.)

Mit `find` können Sie nun überprüfen, dass keine Dateien mehr "da" sind, sondern
nur noch die Verzeichnisse:

```bash
find ~/minio-mount
```

Ausgabe:

```plain
minio-mount/
minio-mount/backup-copy
minio-mount/hello
minio-mount/backup
```

Die Dateien existieren aber weiterhin in MinIO, was Sie gerne über den Browser,
per `mc ls` oder per `s3cmd ls` überprüfen können.

## Übung 5: Einsatzgebiete

Sie haben mit MinIO und den Hilfsprogrammen `mc`, `s3cmd` und `s3fs` nun einige
Werkzeuge zum Umgang mit dem S3-Storage kennengelernt.

Überlegen Sie sich je einen Anwendungsfall für den privaten und den
professionellen Bereich (z.B. für Ihren Lehrbetrieb), und beschreiben Sie
diese beiden in ihrer persönlichen Dokumentation.

Gehen Sie dabei davon aus, dass nicht bloss ein lokaler Storage, sondern
derjenige von einem Public-Cloud-Anbieter verwendet wird, und dass Sie die
Region dafür frei wählen können.

