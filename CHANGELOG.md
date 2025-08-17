# 📜 CHANGELOG - Peytor

Alle Änderungen und Verbesserungen an der Web-App **Peytor** werden hier dokumentiert. Jede Version enthält ein Datum und eine kurze Beschreibung der Neuerungen, Bugfixes oder Optimierungen.

---

##

## [0.42] - 2025-08-17

✨ Hinzugefügt

- Neue Rechnungen können jetzt in Supabase gespeichert werden
- Speicherung in Supabase mit Row-Level-Security: Benutzer sehen nur ihre eigenen Rechnungen
- Alle Rechnungen für den Benutzer werden in einer Liste angezeigt und können einzeln in einer Detailansicht 
angezeigt werden
- Möglichkeit bei der Rechnungserstellung "Reverse Charge" auszuwählen

🎨 Geändert

- Die Sidebar wird jetzt in kleineren Ansichten zur Botton-Navbar

---

##

## [0.41] – 2025-07-24

✨ Hinzugefügt

- Funktionsfähige Kundenverwaltung implementiert
- Kunden anlegen mit Kundennummer und Firmenname (via Reactive Forms)
- Speicherung in Supabase mit Row-Level-Security: Benutzer sehen nur ihre eigenen Kunden
- Kundenliste mit Anzeige von Firma und Kundennummer
- UI-Komponenten für CustomerAdd und CustomerList
- RLS-konforme Policies und user_id-Zuweisung beim Insert integriert

---

##

## [0.4] – 2025-07-04

✨ Hinzugefügt

- Umstellung auf eigene Supabase-Instanz: Peytor verwendet nun ein selbst gehostetes Supabase-Backend auf einem Server bei einem deutschen Hoster
- Supabase-Selfhosting via Docker-Setup inkl. PostgreSQL, Auth, Storage, Realtime und Studio
- Eigener JWT Secret + manuell generierte `anon` und `service_role` Keys für sichere API-Nutzung
- Automatische Erstellung von User-Datensätzen in der Tabelle `users` direkt nach erfolgreicher Registrierung
- SQL-Trigger für automatische Pflege von `created_at` und `updated_at` Timestamps bei Nutzern
- Supabase Policies eingerichtet: Authentifizierte Nutzer dürfen nur eigene Daten einfügen
- **Row-Level Security aktiviert**: Zugriff auf `users`-Tabelle durch Policies eingeschränkt – authentifizierte Nutzer dürfen nur ihre eigenen Daten einfügen und lesen

🎨 Geändert

- Registrierung verarbeitet Supabase-Session jetzt korrekt über `auth.getUser()` und übergibt ID an `users`-Tabelle

##

## [0.32] – 2025-06-30

✨ Hinzugefügt

- PDF-Export-Funktion für Rechnungen: Der rechte Bereich der Rechnungsvorschau kann nun als druckfertiges PDF im DIN-A4-Format heruntergeladen werden
- Umsetzung mit html2canvas und jsPDF für zuverlässige PDF-Generierung direkt im Browser
- Sauberes Layout für PDF-Ansicht mit fester Breite, Arial-Schriftart, tabellarischem Aufbau und strukturiertem Kopf-/Fußbereich

🎨 Geändert

- .invoice-preview um neue PDF-konforme Layoutregeln erweitert (z. B. width: 794px, font-family: Arial)

## 

## [0.31] – 2025-06-10

✨ Hinzugefügt

- Registrierung via Supabase: E-Mail + Passwort mit Auth-API
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

Letztes Update: *27. Juli 2025*
