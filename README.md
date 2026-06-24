# PA Deck

An offline-first flight-deck tool that builds Delta passenger-announcement (PA) scripts on an iPad. Set the crew once, paste your dispatch release (or type the details), pick the announcement you need, and read it straight off the glass. Built for glance use on a yoke-mounted iPad and designed to run with no connection of any kind once it has loaded.

## Paste-and-go

The fastest way to fill a flight. Paste your full MiCrew dispatch release into the **PASTE RELEASE** box and tap **PARSE & FILL**. PA Deck reads it entirely on the device and fills:

- Flight number, origin, and destination
- Flight time and planned cruise altitude
- Captain, First Officer, and the flight attendants
- Destination weather — the parser uses the **METAR and TAF embedded in the release itself**, so no network is needed

Fields filled from the release show in cyan and stay fully editable. The raw text is never saved or transmitted, and the box clears the moment it parses. If a release ever comes through in a layout the parser doesn't recognize, just fill the fields by hand — every field is independent.

## Weather

- **From a pasted release:** destination METAR/TAF are read straight out of the release. No connection required.
- **Without a release:** tap **PULL METAR/TAF** during your preflight connection to fetch the current report from the NOAA/NWS Aviation Weather Center. After that the value is cached and the app is fully offline.

Either way the conditions and temperatures land in the script as editable fields. Always confirm against your official weather source.

## Announcements

Grouped by phase of flight:

- **Pre-Departure** — Welcome Aboard, Welcome (Delay), Delay Announcement, Deicing
- **In-Flight** — Seat Belt Release, Cruise Update, Relief Crew, Rough Air, Service Disruption
- **Arrival** — Prepare Cabin / Descent, Gate (On Time), Gate (Early), Go-Around
- **IROPS** — Fuel Stop / Flag Stop, Part 117 Cancellation

Only the inputs that a given announcement needs appear when you select it. Required and safety items are flagged, and a quiet-hours reminder appears for non-required PAs late at night. Required command lines are visually bracketed in the script.

## Crew and speaker

Set the Captain, First Officer, and flight-attendant names once and choose who is speaking. Scripts adjust automatically — first-person wording, who is referenced, and lines like the seat-belt call read correctly whether the Captain or the First Officer makes the announcement.

## Flight-deck design

- Day / Night / Auto themes, applied before first paint so there's no bright flash at night; last setting is remembered
- Sub-minimum DIM slider that goes darker than the iPad's own minimum brightness, plus an optional red night-vision tint
- Large, glance-legible script text with an adjustable size control
- Big touch targets for gloved or turbulent conditions; no hover-only controls
- Orientation-aware layout, online/offline indicator, and an automatic screen wake-lock so the display won't sleep mid-task
- **In-flight mode** hides setup and enlarges the working script card

## Files

- `index.html` — the entire app (all logic, styles, and PA library inline)
- `manifest.json` — PWA manifest
- `sw.js` — service worker for offline caching
- `icon-512.png`, `icon-192.png`, `apple-touch-icon-180.png`, `favicon.png` — app icons
- `icon-512-maskable.png` — maskable icon for Android adaptive masks

## Important

PA Deck is a reference aid only. Verify all wording against the current AOM Vol. 1 / FCOM / FOM before use, and confirm weather against your official source. It is not a substitute for any required checklist or publication.
