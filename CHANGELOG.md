# 📜 CHANGELOG - Peytor

Alle Änderungen und Verbesserungen an der Web-App **Peytor** werden hier dokumentiert. Jede Version enthält ein Datum und eine kurze Beschreibung der Neuerungen, Bugfixes oder Optimierungen.

---

## 

## [0.31] – in Arbeit

✨ Hinzugefügt

- Registrierung via Supabase: E-Mail + Passwort mit Auth-API
- Speicherung von Benutzerdaten (Name und E-Mail) in der `users`-Tabelle (Supabase) nach erfolgreicher Registrierung
- `id` des authentifizierten Nutzers wird als Primärschlüssel in der Tabelle `users` verwendet (Verknüpfung mit `auth.users.id`)
- Neuer `UserService` zur Verwaltung von Nutzerprofilen in Supabase – vorbereitet für spätere Erweiterungen (z. B. Rollen, Einstellungen)
- Grundstruktur für Supabase-Integration (Service, Auth-API, environment)

🎨 Geändert

- `register.component.ts`: Aufruf von `storeUserData()` und `addUserToSupabase()` angepasst für Supabase
- Firebase entfernt: `AuthService` und `UserService` vollständig auf Supabase umgestellt
- `app.config.ts`: Firebase-Provider entfernt, da Supabase nun Backend-Funktionalität übernimmt

---

## [0.3] – 2025-06-02

✨ Hinzugefügt

- Speicherung von Benutzerdaten (Name und E-Mail) in Firestore nach erfolgreicher Registrierung
- UID des authentifizierten Users wird als Dokument-ID in Firestore verwendet (`users/{uid}`)
- Neuer `UserService` zur Verwaltung von Nutzerdaten in Firestore – vorbereitet für spätere Erweiterungen (z. B. Rollen, Einstellungen)
- Separierung von Zuständigkeiten: Authentifizierung (`AuthService`) und Datenhaltung (`UserService`)

🎨 Geändert

- `register.component.ts`: Aufruf von `storeUserData()` und `addUserToFirestore()` integriert
- Firestore-Zugriff von zufälliger ID (`addDoc`) auf benutzerdefinierte UID (`setDoc`) umgestellt


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

    - Logo: Hover-Effekt mit Farbverlauf (Gradient) für modernen Look implementiert

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

Letztes Update: *28. Mai 2025*
