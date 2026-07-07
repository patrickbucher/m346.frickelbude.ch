+++
title = "Go-Entwicklungsumgebung"
weight = 2
+++

[Video](https://www.youtube.com/watch?v=adevO4GSVMM)

Zum Aufsetzen der Go-Entwicklungsumgebung gehen Sie folgendermassen vor:

1. Laden Sie sich die aktuellste Version vo Go auf der offiziellen [Download-Seite](https://go.dev/dl/) herunter. Für Windows können Sie direkt [den Installer](https://go.dev/dl/go1.25.3.windows-amd64.msi) herunterladen und mit Standardeinstellungen installieren.
2. Falls Sie es nicht schon installiert haben: Laden Sie sich Visual Studio Code von der offiziellen [Download-Seite](https://code.visualstudio.com/Download) herunter. Für Windows können Sie direkt [den systemweiten Installer](https://code.visualstudio.com/Download#) herunterladen und mit Standardeinstellungen installieren. Sie können auch gerne eine andere Entwicklungsumgebung oder einen Texteditor verwenden.
3. Git sollten Sie bereits über die [Git Bash](https://git-scm.com/downloads/win) installiert haben. Laden Sie sich andernfalls den [Installer für Windows](https://github.com/git-for-windows/git/releases/download/v2.51.2.windows.1/Git-2.51.2-64-bit.exe) herunter und installieren Sie ihn mit den Standardeinstellungen.

Hinterlegen Sie Ihren öffentlichen SSH-Schlüssel auf [GitHub](https://github.com/settings/keys), damit Sie das Repository via SSH klonen und pushen können.

Stellen Sie sicher, dass bei Git die Einstellungen `user.name` und `user.email` gesetzt sind:

```bash
git config --global user.name "VORNAME NACHNAME"
git config --global user.email VORNAME_NACHNAME@sluz.ch
```

Falls Sie den Computer auch im Lehrbetrieb brauchen und dort eine andere E-Mail-Adresse für Commits verwenden, kann Git auch [entsprechend konfiguriert](https://www.paedubucher.ch/articles/git-with-multiple-email-addresses/) werden.
