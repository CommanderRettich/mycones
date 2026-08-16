<!-- BEGIN:maxmybusiness-workspace-rules -->
# Regeln für dieses Repo, verbindlich

Dieser Block ist in allen Repos von Max identisch und wird zentral gepflegt. Ändere ihn
nicht von Hand, er wird überschrieben. Alles darunter ist projektspezifisch und gilt zusätzlich.

## Sprache in allem, was ein Mensch liest

- **Umlaute ausschreiben:** ä, ö, ü, ß. Niemals ae, oe, ue, ss. Gilt für Oberflächentexte,
  Fehlermeldungen, Kommentare, Commit-Nachrichten und Pull-Request-Texte. Ausgenommen sind
  nur URL-Pfade und Variablennamen.
- **Kein Gedankenstrich als Satzzeichen.** Stattdessen Komma, Doppelpunkt oder Klammer.
- **Keine KI-Floskeln:** kein "Additionally", "crucial", "delve", "showcase", "underscore",
  keine Dreierfiguren, keine Zusammenfassung am Ende, die wiederholt, was darüber steht.
- **Schreibweise der Marke:** `MaxMy.Business`, mit Punkt, beide groß. Ausnahmen sind die
  Domain `maxmy.business`, E-Mail-Adressen und Ordnernamen. Die Cannabis-Projekte tragen
  bewusst kein Branding von MaxMy.Business.

## Git

- Nie direkt auf `main` committen. Feature-Branch, dann Pull Request.
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`.
- **Merge immer als Merge-Commit, nie Squash, nie Rebase.** Squash setzt den Autor des Pull
  Requests als Commit-Autor, und wenn das ein Agenten-Konto ist, baut Vercel die Produktion
  stillschweigend nicht. Squash ist in den Repo-Einstellungen deshalb abgeschaltet.
- Keine Force-Pushes auf `main` oder geteilte Branches.

## Bevor du einen Pull Request aufmachst

- Der Gate-Befehl des Projekts läuft grün. Steht er weiter unten in dieser Datei, gilt der.
  Sonst: `npm run build` plus Typprüfung und Linter.
- Rot ist dein Problem, nicht "war schon vorher kaputt". Wenn es wirklich vorher kaputt war,
  schreib das in den Pull Request, mit dem Commit, der es kaputt gemacht hat.
- TypeScript strikt, kein `any`, kein `eslint-disable`. Die Regel wird gefixt, nicht abgeschaltet.
- Eingaben an Systemgrenzen mit Zod validieren, Fehlerzustände in der Oberfläche behandeln.

## Sicherheit, ohne Ausnahme

- Keine Geheimnisse in Code, Commits, Logs oder Pull-Request-Texten. Nur Umgebungsvariablen.
- Bei Supabase: Row Level Security auf jeder Tabelle mit Mandantendaten, der Service-Role-Key
  gehört nie in Client-Code. Neue Richtlinie heißt: Positivtest **und** Test, dass ein fremder
  Mandant abgewiesen wird.
- Migrationen schreibst du, ausgeführt werden sie nicht von dir.
- Test-Mails gehen ausschließlich an max@maxmy.business.

## Wann du aufhörst und fragst

Neues Datenbankschema, neue Bibliothek, neuer Dienstleister, grundlegend anderer Ansatz,
Preise, Rechtstexte, alles im Bereich Zahlungen und Authentifizierung: nicht selbst entscheiden.
Schreib die Frage mit zwei Optionen und einer Empfehlung als Kommentar ins Ticket, liefere den
Rest und lass den Pull Request offen.

## Wo mehr steht

Projektkarten mit Stack, Deploy-Modell, Gate-Befehlen und Stolperfallen liegen im Repo
`CommanderRettich/full-knowledge` unter `knowledge/projects/<projekt>.md`, der Index unter
`knowledge/projects/README.md`. Muster für Auth, Datenbank, Formulare, Zahlungen und Tests
liegen dort unter `knowledge/patterns/`. Im Zweifel dort nachlesen statt raten.
<!-- END:maxmybusiness-workspace-rules -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
