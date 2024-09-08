+++
title = "SSH-Schlüssel"
+++

Für den Zugriff auf eine virtuelle Maschine wird ein SSH-Schlüsselpaar benötigt.
Dieses Schlüsselpaar wird mithilfe von [OpenSSH](https://www.openssh.com/)
generiert. Unter Linux und macOS kann OpenSSH direkt installiert werden bzw. ist
schon vorhanden. Unter Windows installiert man sich hierzu am einfachten die Git
Bash.

## Windows: Git Bash installieren

Laden Sie sich die [Git
Bash](https://github.com/git-for-windows/git/releases/download/v2.46.0.windows.1/Git-2.46.0-64-bit.exe)
für Windows (64-Bit) herunter. Installieren Sie die Software mit den
Standardeinstellungen.

## SSH-Schlüsselpaar generieren

Starten Sie die Bash (unter Windows: Git Bash). Ein Terminal-Fenster sollte
erscheinen. Führen Sie nun den folgenden Befehl aus, wobei Sie
`[vorname]_[nachname]@sluz.ch` durch die entsprechende Adresse ersetzen:

```bash
ssh-keygen -t ed25519 -C '[vorname]_[nachname]@sluz.ch
```

Also z.B. für den Lernenden _Hans Meier_:

```bash
ssh-keygen -t ed25519 -C 'Hans_Meier@sluz.ch
```

Führen Sie den Befehl mit _[Enter]_ aus.

Betätigen Sie die _[Enter]_-Taste anschliessend weitere drei mal, um die Fragen
zu beantworten bzw. die Standardeinstellungen zu bestätigen.

Im Verzeichnis `~/.ssh` sind nun zwei Dateien entstanden:

1. Der _private_ Schlüssel `id_ed25519`, der **nicht herausgegeben** werden darf.
2. Der _öffentliche_ Schlüssel `id_ed25519.pub`, der **weitergegeben** werden darf.

## Öffentlichen Schlüssel herauskopieren

Füren Sie nun den folgenden Befehl aus, um den öffentlichen Schlüssel
anzuzeigen:

```bash
cat ~/.ssh/id_ed25519.pub
```

Die Ausgabe sollte ungefähr folgendermassen aussehen:

```plain
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyJq+TnCGe38yUZoBlGH2y4jJ+aNmeeA6lGYIOFoWps hans_meier@sluz.ch
```

Markieren Sie die komplette Ausgabe mit dem Mauszeiger, betätigen Sie die rechte
Maustaste und wählen Sie den Kontextmenüeintrag _Copy_ aus, um den öffentlichen
Schlüssel in die Zwischenablage zu kopieren.

Der öffentliche Schlüssel kann nun bei der Lehrperson eingereicht werden.
Hinterlegt die Lehrperson den Schlüssel auf einem anderen System, kann von dann
an via SSH interaktiv auf dieses System zugegriffen werden.
