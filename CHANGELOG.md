# 📜 CHANGELOG - Peytor

Alle Änderungen und Verbesserungen an der Web-App **Peytor** werden hier dokumentiert. Jede Version enthält ein Datum und eine kurze Beschreibung der Neuerungen, Bugfixes oder Optimierungen.

---

## [0.2] - 2025-05-25
✨ Hinzugefügt

    - Formularvalidierung für Registrierungsformular inkl. Passwortabgleich und E-Mail-Formatprüfung

    - Fehlermeldungen bei ungültiger Eingabe werden dynamisch unterhalb der Felder angezeigt

    - Checkbox zur Datenschutzbestätigung integriert

    - Toast-Benachrichtigung bei erfolgreicher Registrierung mit Slide-in-Animation

    - Anbindung an Firebase Authentication - sichere Nutzerregistrierung mit E-Mail & Passwort

    - Vorbereitung für Firestore-Nutzerprofil (users/{uid}) inkl. AppUser-Modell

    - Button-Zustand disabled mit grauem Stil, reduziertem Kontrast und deaktivierter Interaktion

🎨 Geändert

    - Layout-Anpassung der Registrierungsseite für bessere Lesbarkeit und mobile Nutzung

    - Button- und Input-Design angepasst (Hover-Zustände, Akzentfarben, moderne Optik)

    - Responsives Verhalten des Headers optimiert (Burger-Menü und Navigation)

    - Dropdown-Menü des Burgers mit Glasmorphism-Effekt versehen (Blur, Transparenz, Schatten)

🐛 Behoben

    - Problem behoben, bei dem der Login-Button bei Fehleranzeige verschoben wurde

    - Fehlerhafte Angular-Klasse .ng-trigger entfernt und durch funktionale Animation ersetzt

    - Main-Bereich verschiebt sich jetzt korrekt, wenn die Sidebar geschlossen wird - position: fixed in Sidebar entfernt, dadurch nimmt sie wieder am Layoutfluss teil

---

## [0.1] - 2025-05-22
### 🚀 Erstveröffentlichung
- Initiale Design-Demo online gestellt
- Startseite, Preisseite und Rechnungsübersicht mit Navigation
- Erste SCSS-Struktur und Web3-inspiriertes Layout

---

## 🔧 Format

Jede Eintragung folgt diesem Aufbau:
- **[Versionsnummer] - Datum**
- **✨ Hinzugefügt** - neue Features
- **🐛 Behoben** - Bugfixes
- **🎨 Geändert** - Änderungen an bestehenden Features oder Design
- **🗑️ Entfernt** - Entfernte Features oder veraltete Komponenten

---

Letztes Update: *25. Mai 2025*
