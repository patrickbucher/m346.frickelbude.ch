- strukturierte
    - Die Daten sind in einer genau definierten Form abgespeichert.
    - Beim Zugriff auf die Daten weiss man, in welcher Form man sie erhalten
      will.
    - Die Form umfasst z.B. die Felder, deren Datentypen und
      Zusatzinformationen, z.B. ob ein Feld mit einem Wert versehen werden muss
      oder nicht.
    - Beispiel: Ein Klasse (`class`) oder eine Struktur (`struct`) beim
      Programmieren oder eine Tabelle in einer relationalen Datenbank.
- halbstrukturierte
    - Die Daten weisen eine Struktur auf, müssen sich aber nur unterschiedlich
      stark nach dieser Form richten.
    - Beim Zugriff auf die Daten weiss man, dass gewisse Sachen auf die Daten
      zutreffen, hat aber gewisse Unsicherheiten.
    - Beispiel: Eine JSON- oder XML-Datei oder eine NoSQL-Datenbank wie MongoDB,
      welche sogenannte Dokumente abspeichert, oder ein Key-Value-Store wie
      Redis, der abstrakte Datenstrukturen wie Listen, Maps oder Strings
      abspeichert.
- unstrukturierte
    - Die Daten können zwar über eine bestimmte Struktur verfügen, der
      Speichermechanismus ignoriert diese aber.
    - Beim Zugriff auf die Daten weiss man nur, dass man Daten erhält, aber
      nicht, in welcher Form diese vorliegen.
    - Beispiel: Die verschiedenen Dateien in einem Dateisystem, die ein
      bestimmtes Dateiformat haben können (z.B. plain text, MP4-Video,
      JPEG-Bild, Word-Dokument) oder aber nur eine Reihe von Bytes sind (z.B.
      verschlüsselte und/oder komprimierte Dateien). Solche Daten werden in
      einem Dateisystem oder per S3 abgelegt.
