+++
title = "SSH"
weight = 1
+++

Für den Zugriff auf eine virtuelle Maschine wird ein SSH-Schlüsselpaar benötigt.  Dieses Schlüsselpaar wird mithilfe von [OpenSSH](https://www.openssh.com/) generiert. Unter Linux und macOS kann OpenSSH direkt installiert werden bzw. ist schon vorhanden. Unter Windows installiert man sich hierzu am einfachten die Git Bash.

## Windows: Git Bash installieren

Laden Sie sich die [Git Bash](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe) für Windows (64-Bit) herunter. Installieren Sie die Software mit den Standardeinstellungen. (Wenn die Git Bash bereits installiert ist, kann dieser Schritt übersprungen werden.)

## SSH-Schlüsselpaar generieren

Starten Sie die Bash (unter Windows: Git Bash). Ein Terminal-Fenster sollte erscheinen. Führen Sie nun den folgenden Befehl aus, wobei Sie
`[vorname]_[nachname]@sluz.ch` durch Ihre eigene Adresse ersetzen:

```bash
ssh-keygen -t ed25519 -C '[vorname]_[nachname]@sluz.ch'
```

Also z.B. für den Lernenden _Hans Meier_:

```bash
ssh-keygen -t ed25519 -C 'hans_meier@sluz.ch'
```

Führen Sie den Befehl mit _[Enter]_ aus.

Betätigen Sie die _[Enter]_-Taste anschliessend weitere drei mal, um die Fragen zu beantworten bzw. die Standardeinstellungen zu bestätigen.

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

Markieren Sie die komplette Ausgabe mit dem Mauszeiger, betätigen Sie die rechte Maustaste und wählen Sie den Kontextmenüeintrag _Copy_ aus, um den öffentlichen Schlüssel in die Zwischenablage zu kopieren.

Speichern Sie den Schlüssel in einer Datei namens `[vorname]_[nachname].txt` ab, wobei Sie Ihren Vor- und Nachnamen entsprechend einsetzen, also für den Lernenden _Hans Meier_ `hans_meier.txt`. Reichen Sie diese Datei als Abgabe zur Teams-Aufgabe ein.

Die Lehrperson kopiert diesen öffentlichen Schlüssen dann auf die virtuelle Maschine, auf welcher sich der Besitzer des dazu passenden privaten Schlüssels dann passwortlos authentifizieren kann.

