# AI-Driven Exercise Performance and Form Intelligence System

## AI-Driven Exercise Performance and Form Intelligence System

A browser-based exercise assistant with local pose tracking, repetition counting, and spoken feedback.

## Start on this laptop

Double-click **Start Exercise Intelligence.cmd** in this folder. Keep its terminal open while using the application. Open http://127.0.0.1:4173 in Chrome or Edge. If the browser opens before the server, refresh once. If the prototype is already running, simply use that address. On another computer, install Node.js 20 or newer, then run `node server.mjs` from this folder.

All pose runtime and model assets are bundled. Local webcam tracking and the synthetic demo need no external API key or network download. Google Fonts is optional and falls back to system fonts offline. Spoken voice support depends on installed browser/OS voices. The male Microsoft David voice is selected when available.

## Working features

- Local MediaPipe Pose Landmarker inference over webcam frames, with mirrored pose overlay.
- Squat knee angles and curl/push-up elbow angles. The user selects the exercise.
- A three-stage state machine: extended start, bent position, extended finish. Stable endpoints, smoothing, minimum timing and confidence checks reduce false counts.
- Required-joint visibility checks tolerate up to 250 ms of tracking flicker without counting during that gap. Sustained tracking loss invalidates an incomplete cycle.
- Basic curl upper-arm alignment and push-up body alignment feedback.
- Atlas rule-based coaching, browser text-to-speech and a 6.5-second voice cooldown.
- Rep goals, active-session timer, pause/resume and finish/save.
- Device-local workout history with CSV export. Simulated sessions remain separate from live totals.
- Clearly labelled synthetic landmark demo for all three exercises, exercising the same angle and rep rules.

## Honest prototype scope

MediaPipe supplies a pretrained pose model. We have not trained a new neural network. Exercise thresholds are engineering heuristics, not validated measures of fitness or injury risk. Tracking confidence is landmark visibility, not exercise accuracy. The system does not automatically recognize exercise types, grade overall form or diagnose injury.

The application uses JavaScript, the browser camera API and localStorage. LLM conversations and server-side history are planned, not connected. Atlas currently uses movement rules plus text-to-speech. Do not describe it as a live LLM assistant.

## Demo procedure

Read **DEMO-GUIDE.md** for setup, usage, and troubleshooting. Check your webcam and lighting before starting a workout. Face the camera side-on; use curls if space is limited. Enable Voice if desired. If a browser embedding blocks the camera, use Chrome or Edge at the localhost URL. If no camera is available, choose the guided demo and identify it as simulated.

## Validation

Run `npm test` or `node --test tests/engine.test.mjs`. Tests cover geometry, full cycles for all exercises, partial movements, tracking loss, angle spikes, and continuous squats at 15, 30 and 60 fps. Squat thresholds are 150° extended and 115° bent, with a 100 ms stable endpoint requirement. Real-person tracking accuracy has not been benchmarked.

## Architecture

`dist/index.html` and `styles.css`: interface. `dist/app.js`: camera inference, visual feedback, Atlas speech, session state and local history. `dist/engine.js`: exercise definitions, angle geometry and repetition state machine. `dist/vendor`: MediaPipe runtime, WASM and pose model. `server.mjs`: dependency-free local static server. `tests`: rule tests.

## References and attribution

Concept inspiration: https://github.com/shradha-khapra/ai-gym-coach. The reference repository was reviewed for its organization and concept; its source code and visual assets were not copied. This interface and rule engine were authored for AI-Driven Exercise Performance and Form Intelligence System.

Pose runtime: Google MediaPipe Tasks Vision, version `0.10.22-rc.20250304`, https://www.npmjs.com/package/@mediapipe/tasks-vision. Bundled Pose Landmarker Lite float16 model, version 1, https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task. Documentation: https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js. See `THIRD-PARTY-NOTICES.md` for third-party licensing.
