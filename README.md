# ⏱️ TimeRecorder – Zeiterfassung für Mitarbeitende

## 📘 Projektbeschreibung

**TimeRecorder** ist eine schlanke Vue 3-Applikation mit TypeScript, die es ermöglicht, Mitarbeitende zu erfassen und ihre wöchentliche Arbeitszeit zu dokumentieren. Die App wurde im Rahmen der **ATL**-Aufgabe im Modul **Webtechnologien Advanced (WT A)** entwickelt und beinhaltet grundlegende Vue-Features wie Props, Slots, Computed Properties, LocalStorage, API-Zugriffe und anpassbares Styling.

---

## ⚙️ Installation und Konfiguration

### Voraussetzungen

- Node.js (empfohlen: Version 18 oder höher)
- npm (wird automatisch mit Node installiert)

### Schritte

1. 📦 Repository klonen oder herunterladen:
   ```bash
   git clone <REPOSITORY-URL>
   cd TimeRecorder
   ```

2. 📥 Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. 🔑 `.env` Datei erstellen im Root-Verzeichnis:
   ```env
   VITE_WEATHER_API_KEY=dein_api_key_von_weatherapi.com
   ```

4. 🚀 Projekt starten:
   ```bash
   npm run dev
   ```

5. 🌐 Im Browser öffnen:
   ```
   http://localhost:5173
   ```

---

## 💡 Einsatz und Beispiele

Die Anwendung bietet folgende Funktionen:

- 👤 **Mitarbeitende erfassen** über ein einfaches Formular.
- 🗂️ **Wochenzeiten eingeben** mit Start- und Endzeit pro Tag.
- 📊 **Automatische Berechnung der Stunden pro Tag/Woche**.
- 🧾 **Abgeschlossene Wochen speichern** – auch nach dem Neuladen sichtbar (LocalStorage).
- 🌦️ **Wetteranzeige** mit Stadt-Auswahl via Dropdown (API-Zugriff auf weatherapi.com).

### Beispiel: Mitarbeitende hinzufügen
1. Navigiere zu **"Employer"**.
2. Trage Name, Nachname und Wochenstunden ein.
3. Speichere → automatisch erscheint eine Karte mit Eingabe für die Arbeitszeit.

---

## 📄 Lizenz

Dieses Projekt wurde im Rahmen einer Ausbildungsaufgabe erstellt und steht unter der **MIT Lizenz**:

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

> ✨ Viel Spass beim Ausprobieren der App! Bei Fragen gerne melden.
