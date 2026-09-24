# AI-Driven Exercise Performance and Form Intelligence System

A browser-based workout assistant with local webcam pose tracking, customizable spoken cues and an offline exercise library.

## Run locally

Install Node.js 20 or newer. Run `npm start`, or double-click `Start Exercise Intelligence.cmd` on Windows. Open http://127.0.0.1:4173 and keep the server running. There is no build step and no API key.

## Features

- Squats, bicep curls, push-ups, shoulder presses and pull-ups: complete movement counting.
- Plank: accumulated seconds with visible joints and a straight, horizontal body position.
- Six bundled animated guides with numbered steps, tracking-joint highlights and angle annotations. These are diagrams, not filmed trainer demonstrations.
- A 1.5-second camera readiness check before each camera set and after resuming; counting waits for visible joints and a stable start position.
- Adjustable 0–300 second rest countdown between sets, optional spoken completion cue and manual start/skip.
- Seven-day live workout totals and a daily activity chart, excluding simulated sessions.
- Voice selection from installed browser/OS voices, speed, pitch and preview. Preferences stay on the device. An offline-only filter and empty-list guidance help select a usable voice. Male/female voice availability depends on the operating system; no gender classification is inferred.
- Set targets (1–20) with reps or hold seconds per set. Counting pauses at each target; Start next set resumes after your rest. History and CSV include completed sets and total results.
- Camera overlay, angle chart, targets, pause/resume, local workout history and CSV export. Simulated sessions are labelled separately.
- Downloadable offline pack, including the pose model, WASM runtime and videos. No external fonts or APIs are required.

## Offline use

Open the site online and click **Download for offline**. Watch the file-by-file download progress and wait for **Offline pack ready** before disconnecting. The pack is stored inside the browser, not in the Downloads folder. Reopen the same address in the same browser. Choose a voice marked **offline** for spoken coaching. An internet connection is required for the first download. Clearing browser storage, private browsing or browser eviction can remove cached files. Offline availability is specific to each browser and device.

The local server also works without internet because all runtime assets are bundled. Camera access requires HTTPS or localhost. Open the app using the server, not by double-clicking index.html.

## Deploy on Netlify

Upload the complete `dist` folder with Netlify's manual deploy interface. For a repository-based deploy, publish directory is `dist` and no build command is needed (`netlify.toml` is included). Use the public production HTTPS address in presentations. Verify public access in a signed-out browser. The local address does not work on another computer.

When changing cached assets, change the version in `dist/sw.js`. New versions install only after the complete asset list is cached successfully.

## Tracking scope

The app uses Google's pretrained MediaPipe Pose Landmarker with an exercise-specific rule engine. It does not train a custom neural network, recognize the selected exercise automatically, assess injuries, or provide validated accuracy scores. Landmark confidence indicates visibility, not form accuracy. Pull-up counting measures elbow cycles; it does not verify chin clearance over a bar. Plank measures accumulated valid hold time, excluding tracking loss and pauses.

A side view is used for squats, curls, push-ups and plank. Shoulder presses and pull-ups use a front view with wrists above shoulders. Camera placement, occlusion and lighting affect results. Real-person accuracy across body types and cameras still needs evaluation.

## Verification

`npm test` runs geometry, rep-cycle, tracking-loss, frame-rate and plank timing tests. Automated browser verification additionally checks all six demo flows, pause/save/reload, mobile layout, offline video playback and offline model initialization. See `VERIFICATION.md` for the verification scope.

## Structure

- `dist/`: complete deployable website; keep the vendor and guides folders.
- `dist/engine.js`: measurement and exercise tracking rules.
- `dist/training.js`: readiness gating, rest timing and weekly progress aggregation.
- `dist/app.js`: sessions, webcam analysis, feedback and voice settings.
- `dist/guides.js`: movement-diagram geometry used by simulations and video generation.
- `dist/sw.js`: versioned offline asset cache and video range responses.
- `server.mjs`: local static server.
- `tests/`: automated tracking tests.
- `scripts/generate-guides.mjs`: optional guide regeneration; requires Playwright installed separately and Microsoft Edge. Start the local server first.

## Third-party components

MediaPipe runtime and pose-model notices are retained in `THIRD-PARTY-NOTICES.md` and `dist/vendor/LICENSE.txt`. The user-supplied ai-gym-coach repository provided concept inspiration; its source and visual assets were not copied. The visible application has no external repository or builder branding.
