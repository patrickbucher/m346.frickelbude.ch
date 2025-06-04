+++
draft = true
title = "Ansible"
weight = 7
+++

## Theorie (Folien)

### Einstiegsfragen

**Wie viele Server verwaltet Ihr Lehrbetrieb?**

Wie kontrollieren Sie…

- …welche **Software** auf welchen Servern **installiert** ist?
- …welche **Dienste** auf welchen Servern **laufen**?
- …welche **Benutzer** auf welchen Servern welche **Berechtigungen** haben?

### Was ist Konfigurationsmanagement?

Die Konfiguration von Systemen wird…

- …**zentral** verwaltet (i.d.R. in einem Git-Repository),
    - _Infrastructure as Code_ (IaC)
- …**automatisch** angewendet (zeitlich oder manuell getriggert),
- …durch Änderungen **mitdokumentiert**.

Dank einem Konfigurationsmanagementsystem kann man…

- …lokal eine realitätsnahe **Testumgebung** betreiben,
- …Systeme bei Bedarf schnell **neu aufsetzen**.

Die Systemkonfiguration sollte aber **nicht** mehr **manuell** angepasst werden!

### Was ist Ansible?

Ansible…

- …ist ein **Konfigurationsmanagementsystem** (_Configuration Management_, CM),
- …wird von **Red Hat** betreut,
- …ist unter der **GPLv3** lizenziert,
- …ist **modular** aufgebaut,
- …arbeitet **agentless** (erfordert SSH und Python 3 auf dem verwalteten System).

### Begriffe

- **Control Node**: Unix-System, welches andere Systeme steuert.
- **Managed Host**: System, welches gesteuert wird.
- **Inventory**: Datei mit (gruppierter) Auflistung von _Managed Hosts_.
- **Task**: Auszuführender Konfigurationsschritt.
    - z.B. Software installieren
- **Role**: Gruppierung von Tasks für eine bestimmte Art von System.
    - z.B. Datenbankserver, Web-Server, FTP-Server
- **Playbook**: Sammlung sortierter Tasks/Roles zur Konfiguration eines Hosts.

### Control Nodes und Managed Hosts

![_Control Nodes_ und _Managed Hosts_](/img/ansible-graph.png)

### Idempotenz

Interessiert mich die **Handlung** oder der **Zustand**?

- _imperativ_: «Schliessen Sie das Fenster!»
- _deklarativ_: «Das Fenster soll geschlossen sein!»

```python
if window.is_open():
    window.close()
```

Nur **nötige Änderungen** sollen vorgenommen werden:

- _idempotent_: Gleiches Ergebnis nach mehreren Ausführungen
- Mathematik: $x + 0$, $x \times 1$, $x^1$

Ansible-Tasks sind _idempotent_; Ansible arbeitet _deklarativ_.

### Setup & Tools

Installation (unter Debian):

```bash
sudo apt install -y ansible
```

Werkzeuge:

- `ansible`: Ausführung einzelner Task
- `ansible-playbook`: Ausführung ganzer Playbooks
- `ansible-vault`: Verwaltung von Secrets
- `ansible-galaxy`: Rollen verwalten

### Einstiegsbeispiel (I): Playbook

Playbook (`apache.yaml`):

```yaml
- name: Setup Apache Web Server
  hosts: webservers
  become: yes
  become_method: sudo
  remote_user: user
  tasks:
  - name: Install Apache 2
    package:
      name: apache2
      state: present
```

### Einstiegsbeispiel (II): Inventory & Ausführung

Inventory (`hosts.ini`):

```ini
[webservers]
localhost
```

Ausführung (Apache installieren):

```bash
ansible-playbook -i hosts.ini -c local apache.yaml
```

Einmalige Tasks (Service neu starten):

```bash
ansible -i hosts.ini \
    -m service -a "name=apache2 state=restarted" \
    -b -c local webservers
```

### Literatur

![Bücher zu Ansible: _DevOps for the Desperate_, _Ansible for DevOps_, _Ansible Up & Running_](/img/ansible-books.png)

### Links

- [Ansible.com](https://www.ansible.com/): Offizielle Webseite
- [Get Started](https://www.ansible.com/resources/get-started): Einstieg in Ansible
- [Ansible Galaxy](https://www.ansible.com/community/galaxy): Playbooks der Community
- [Documentation](https://docs.ansible.com/ansible/latest/index.html): Offizielle Dokumentation
- [Module Index](https://docs.ansible.com/ansible/2.9/modules/modules_by_category.html):
  Modulübersicht
- [YAML
  Syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html):
  Einführung in die YAML-Syntax
- [Using
  Variables](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html):
  Arbeiten mit Variablen
- [Vault Guide](https://docs.ansible.com/ansible/latest/vault_guide/index.html):
  Schützenswerte Daten mit Ansible Vault verschlüsseln

## Praxis (Übungen)

### Aufgabe 0: Vorbereitung und Test

Installieren Sie Ansible:

```bash
sudo apt install -y ansible
```

Laden Sie sich die folgenden Dateien mit `wget` auf Ihre VM herunter:

- [`apache.yaml`](/files/apache.yaml)
- [`environment.jinja2`](/files/environment.jinja2)
- [`hosts.ini`](/files/hosts.ini)
- [`index.php`](/files/index.php)
- [`minio.service.jinja2`](/files/minio.service.jinja2)
- [`phpinfo.conf`](/files/phpinfo.conf)

Führen Sie nun das Playbook zur Installation des Apache-Webservers aus:

```bash
ansible-playbook -i hosts.ini -c local apache.yaml
```

### Aufgabe 1: Eine Apache-Testseite erstellen

Erweitern Sie das Playbook `apache.yaml`, sodass unter
[http://IP-ADRESSE](http://IP-ADRESSE) eine PHP-Infoseite angezeigt wird. Hierzu
sind folgende Schritte nötig, für welche Sie den Abschnitt `tasks` im Playbook
erweitern:

1. Installieren Sie das PHP-Paket `php8.2`.
2. Erstellen Sie das Verzeichnis `/var/www/phpinfo`, das dem Benutzer und der
   Gruppe `www-data` gehört.
3. Erstellen Sie eine Apache-Konfiguration
   `/etc/apache2/sites-available/phpinfo.conf`.
4. Erstellen Sie eine PHP-Seite `/var/www/phpinfo/index.php`.
5. Aktivieren Sie die PHP-Infoseite, indem Sie einen symbolischen Link von
   `/etc/apache2/sites-enabled/phpinfo.conf` auf
   `/etc/apache2/sites-available/phpinfo.conf` erstellen.
6. Deaktivieren Sie die Debian-Infoseite, indem Sie den symbolischen Link
   `/etc/apache2/sites-enabled/000-default.conf` entfernen.
7. Laden Sie die Apache-Konfiguration neu.

Verwenden Sie hierzu die folgenden Ansible-Module:

- [`package`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/package_module.html)
  zur Installation von PHP (analog zu Apache).
- [`file`](https://docs.ansible.com/ansible/2.9/modules/file_module.html#file-module)
  zum Erstellen von Verzeichnissen und symbolischer Links.
    - Beachten Sie die Parameter `state` und `src` (für symbolische Links).
- [`copy`](https://docs.ansible.com/ansible/2.9/modules/copy_module.html#copy-module)
  zum Kopieren vorgegebener Dateien auf das Zielsystem.
- [`service`](https://docs.ansible.com/ansible/2.9/modules/service_module.html#service-module)
  zum Verwalten von Diensten.
    - Der Zielzustand soll `reloaded` lautet.

**Tipp**: Gehen Sie in einzelnen Schritten vor, d.h. erweitern Sie das Playbook nur
um jeweils einen Tasks und führen Sie es anschliessend aus:

```bash
ansible-playbook -i hosts.ini -c local apache.yaml
```

Verwenden Sie sprechende Bezeichnungen für den `name` der einzelnen `tasks`.

Da Ansible _idempotent_ arbeitet, werden nur jeweils die noch ausstehenden
Schritte durchgeführt.

Überprüfen Sie anschliessend, ob die [PHP-Infoseite](http://IP-ADRESSE) im
Browser erscheint.

Nehmen Sie anschliessend das erweiterte Playbook `apache.yaml` in dieses
Repository auf.

### Aufgabe 2: PHP-FPM konfigurieren

Erstellen Sie ein neues Playbook namens `php-fpm.yaml`, wobei Sie (bis
auf `name`, welchen Sie anpassen) die ersten Zeilen vom Playbook `apache.yaml`
verwenden können (bis zu den Tasks). Erweitern Sie das Playbook um folgende
Tasks:

1. Installieren Sie die Pakete `php8.2-fpm` und `libapache2-mod-fcgid`.
2. Deaktivieren Sie das Apache-Modul `php8.2`.
3. Aktivieren Sie das Apache-Modul `proxy_fcgi`.
4. Aktivieren Sie die Apache-Konfiguration `php-fpm`.
5. Laden Sie die Apache-Konfiguration neu, damit die Änderungen aktiv werden.
6. Erhöhen Sie das `memory_limit` in der PHP-FPM-Konfiguration
   `/etc/php/8.2/fpm/php.ini` von 128 auf 256 Megabyte.
7. Starten sie den PHP-FPM-Service neu, damit die Änderungen aktiv werden.

Verwenden Sie hierzu die folgenden Ansible-Module:

- `package` zur Installation von PHP-FPM.
- [`command`](https://docs.ansible.com/ansible/2.9/modules/command_module.html#command-module)
  zum Deaktivieren/Aktivieren von Apache-Modulen bzw. -Konfigurationen mit
  `a2dismod`, `a2enconf` usw.
    - Der `cmd`-Parameter definiert den auszuführenden Befehl.
    - **Achtung**: Durch die Verwendung von `command` wird das Playbook
      _imperativ_ («tue das!») und ist nicht mehr _deklarativ_ («sorge für
      diesen Zustand»)! Damit das Playbook trotzdem _idempotent_ bleibt, kann
      die Ausführung des Befehls mit den Parametern `creates` bzw. `removes` auf
      bestimmte Situationen beschränkt werden.
        - Aktivieren Sie ein Modul nur, wenn die entsprechende `*.load`-Datei
          noch nicht im Verzeichnis `/etc/apache2/mods-enabled` besteht.
        - Deaktivieren Sie ein Modul nur, wenn die entsprechende `*.load`-Datei
          noch im Verzeichnis `/etc/apache2/mods-enabled` besteht.
- [`lineinfile`](https://docs.ansible.com/ansible/2.9/modules/lineinfile_module.html#lineinfile-module) zum Ersetzen einer einzelnen Zeile in der PHP-Konfiguration.
    - Der `path`-Parameter gibt die zu verändernde Datei an.
    - Der `line`-Parameter definiert die _neue_ Zeile.
    - Der `regexp`-Parameter definiert ein Muster (regulärer Ausdruck) für die _zu ersetzende_ Zeile.
- `service` zum Neustarten bzw. Neuladen von einem systemd-Service.

**Tipp**: Der `name`-Parameter unterstützt nicht nur einen einzelnen Wert,
sondern Listen von Werten:

```yaml
name:
  - foo
  - bar
```

Kontrollieren Sie auf [PHP-Infoseite](http://localhost) zwei Sachen:

1. Die `Server API` heisst `FPM/FastCGI` und nicht mehr `Apache 2.0 Handler`.
2. Das `memory_limit` beträgt `256M` und nicht mehr `128M`.

Nehmen Sie anschliessend das neue Playbook `php-fpm.yaml` in dieses Repository
auf.

### Aufgabe 3: Minio in Betrieb nehmen

Erstellen Sie ein neues Playbook namens `minio.yaml` analog zu den beiden
vorherigen. Vor dem Abschnitt `tasks` soll ein neuer Abschnitt namens `vars`
eingefügt werden, in welchem die folgenden wiederverwendbaren _Variablen_
definiert werden:

```yaml
vars:
  minio_bin: /usr/local/bin/minio
  minio_data_dir: TODO
  minio_user: TODO
  minio_group: TODO
  minio_password: TODO
  environment_file: TODO
tasks:
  …
```

Ersetzen Sie dabei den Platzhalter `TODO` durch die Werte, die gleich in der
Aufgabenstellung folgen. Die oben definierten Variablen können folgendermassen
verwendet werden:

```yaml
# old
dest: /usr/local/bin/minio

# new
dest: '{{ minio_bin }}'
```

Dank Variablen können die gleichen Werte sowohl im Playbook als auch in
_Templates_ verwendet werden. Dadurch können Änderungen nun zentral vorgenommen
‒ und die hartkodierten Passwörter ausgelagert werden.

Ergänzen Sie das Playbook um folgende `tasks`, um Minio in Betrieb zu nehmen:

1. Laden Sie den Minio-Server `minio` von der
   [Minio-Downloadseite](https://min.io/download#/linux) herunter ins lokale
   Verzeichnis `/usr/local/bin/` und machen Sie die Datei ausführbar.
2. Erstellen Sie einen Benutzergruppe namens `minio` und einen Benutzer gleichen
   Namens mit dem Home-Verzeichnis `/home/minio`.
3. Erstellen Sie das Minio-Datenverzeichnis `/home/minio/minio-data`, welches
   dem Benutzer `minio` gehört.
4. Erstellen Sie eine Datei `/home/minio/environment` mit den beiden
   Umgebungsvariablen `MINIO_ROOT_USER=minio` und
   `MINIO_ROOT_PASSWORD=topsecret`.
5. Erstellen Sie ein systemd-Unitfile unter `/etc/systemd/system/minio.service`
   auf Basis des _Templates_ `minio.service.jinja2`.

Verwenden Sie hierzu die folgenden Ansible-Module:

- [`get_url`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/get_url_module.html)
  zum Herunterladen von Dateien von einer bestimmten Quelle (`url`) an einen
  bestimmten Ort (`dest`). Damit `minio` ausführbar ist, sollte der
  `mode`-Parameter auf `755` gesetzt werden. Optional kann auch auf eine
  bestimmte `checksum` geprüft werden.
- [`group`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/group_module.html#ansible-collections-ansible-builtin-group-module)
  zum Erstellen einer Benutzergruppe.
- [`user`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html)
  zum Erstellen eines Benutzers. Verwenden Sie die Parameter `create_home`,
  `home`, `group`, und `shell`.
- [`template`](https://docs.ansible.com/ansible/2.9/modules/template_module.html#template-module)
  zum Erstellen von Konfigurationsdateien aus Vorlagen. Geben Sie das Template
  als `src` und die Zieldatei mit `dest` an.
- [`systemd_service`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_service_module.html)
  zum Verwalten von systemd-Services. Setzen Sie `daemon_reload: true`, damit
  das neu erstellte Service-Unit-File nachgeladen wird. Verwenden Sie weiter die
  Parameter `enabled` und `state`, um den Service (automatisch) zu starten.

Wenn Sie alles richtig gemacht haben, steht Minio unter
[http://IP-ADRESSE:9090](http://IP-ADRESSE:9090) zur Verfügung.

**Tipp**: Schauen Sie bei Unklarheiten im
[systemd-Repository](https://code.frickelbude.ch/m346/systemd#teil-2-selbst%C3%A4ndig-minio)
nach, wie wir Minio manuell in Betrieb genommen haben.

### Aufgabe 4: Passwörter mit Ansible Vault verschlüsseln

Passwörter im Klartext zu speichern ist ein Sicherheitsrisiko, zumal Playbooks
und Template-Dateien oftmals in einem (öffentlichen) Git-Repository zu liegen
kommen. Aus diesem Grund sollten Passwörter und andere Secrets (wie z.B. Token)
nur _verschlüsselt_ abgelegt werden.

In dieser Übung soll das Minio-Passwort aus dem Playbook entfernt, durch ein
stärkeres ersetzt und verschlüsselt in eine separate Datei ausgelagert werden.

Zunächst soll die Variable `minio_password` aus dem Playbook `minio.yaml`
entfernt werden. Unmittelbar nach `vars` soll ein Abschnitt namens `vars_files`
hinzugefügt werden:

```yaml
vars:
  …
vars_files:
  - minio-secrets.yaml
tasks:
  …
```

Das Werkzeug `pwgen` soll installiert werden, womit sich sichere zufällige
Passwörter generieren lassen:

```bash
sudo apt install -y pwgen
```

Ein zufälliges Passwort der Länge 36 lässt sich folgendermassen generieren:

```bash
pwgen 36 1
```

Mögliche Ausgabe:

    Hie6sheim2FiefahWoo4vu7shisoozeeboka

Das Newline-Zeichen `\n` am Ende soll jedoch entfernt werden, da dieses nicht
mitverschlüsselt werden soll:

```bash
pwgen 36 1 | tr -d '\n'
```

Als nächstes wird die Datei `minio-secrets.yaml` mit der verschlüsselten
Variablen `minio_password` mithilfe von `ansible-vault` erstellt:

```bash
pwgen 36 1 | tr -d '\n' | ansible-vault encrypt_string --stdin-name minio_password > minio-secrets.yaml
```

Es wird ein _Vault-Passwort_ interaktiv abgefragt, das man sich merken muss.
(Mit diesem Passwort werden die Secrets bei der neuerlichen Ausführung des
Playbooks entschlüsselt.)

Mit `--stdin-name` wird angegeben, wie die Variable heissen soll, deren Wert per
`stdin` mitgegeben werden soll. Die Datei `minio-secrets.yaml` wurde nun erstellt
und enthält ein zufälliges, verschlüsseltes Secret.

Nun soll das angepasste Playbook mit dem angepassten und ausgelagerten Passwort
ausgeführt werden, wozu zusätzlich der Parameter `--ask-vault-pass` angegeben
wird, damit das Passwort zum Entschlüsseln der verwendeten Secrets interaktiv
eingegeben werden kann:

```bash
ansible-playbook -i hosts.ini -c local --ask-vault-pass minio.yaml
```

Das neue Passwort sollte jetzt in `/home/minio/environment` gesetzt sein und
unter [http://IP-ADRESSE:9090](http://IP-ADRESSE:9090) verwendet werden können.
Die Datei `minio-secrets.yaml` kann nun ins Repository aufgenommen werden.
