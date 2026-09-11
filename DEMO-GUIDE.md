# Fit Vision AI: SIH presentation guide

Use the exact project title: **AI-Driven Exercise Performance and Form Intelligence System**. Team: **Fit Vision AI**.

## Three-minute walkthrough

**0:00–0:25 — Problem and idea.** “Many students exercise independently without immediate feedback or a simple record of progress. Fit Vision AI uses a laptop webcam to turn body movement into understandable exercise feedback.”

**0:25–0:45 — Scope.** “Our prototype supports squats, bicep curls and push-ups. It combines a pretrained pose model with our exercise-specific rules. Atlas gives spoken guidance and we save workout summaries.”

**0:45–1:40 — Live demonstration.** Select Bicep curls, set a target of 3, and enable the camera. Stand side-on with shoulder, elbow and wrist visible. Start with the arm extended, curl fully, and extend again. Show the angle, state transition and rep count. Try a partial movement to explain why a full cycle is required. If appropriate, enable Atlas Voice. The app does not need microphone access.

**Backup:** Select “Try the guided demo.” Say: “These are simulated landmarks demonstrating the same rule engine; they are not a live camera prediction.”

**1:40–2:10 — Progress.** Finish the session and open Workout history. Show the recorded exercise, repetition target, duration and live/demo source. CSV export produces an actual downloadable report.

**2:10–2:40 — Explainable design.** “MediaPipe predicts pose landmarks. We calculate joint angles and pass them to a state machine. A rep needs a stable extended position, a bent position and a return. Low-confidence landmarks reset the incomplete cycle. Speech feedback has a cooldown.”

**2:40–3:00 — Next steps.** “We plan to validate thresholds with varied users, add automatic exercise recognition, and connect Atlas to an LLM. This prototype uses local browser storage. Our PPT proposes a Python and SQLite implementation for the next phase.”

## Questions judges may ask

**Did you train the AI model?** No. We use Google's pretrained MediaPipe pose model. Our work is the exercise rule engine, feedback workflow and prototype integration.

**What differs from the reference?** The repository supplied the initial concept. Our interface, modular rule engine, labelled fallback simulation, visibility handling and presentation workflow were implemented independently. Do not claim worldwide novelty without broader research.

**Is Atlas an LLM now?** No. This version uses context from the active exercise and movement rules with browser speech synthesis. LLM integration is planned.

**Why does the code differ from the PPT stack?** We prioritized a portable browser prototype for demonstration. The pose-and-rules architecture remains consistent; the PPT's Python, OpenCV, Streamlit and SQLite implementation is a next-stage option.

**What is the accuracy?** We have verified state-machine behavior with automated tests, but have not run a representative real-person accuracy benchmark. We cannot claim an accuracy percentage. The interface's confidence number describes landmark visibility.

**Does it prevent injury?** We do not claim that. It provides basic movement feedback; it is not a trainer replacement or a medical assessment.

**Where does video go?** Frames are processed on the device by browser-based MediaPipe. The app does not upload or record video. Session metrics are stored in this browser only.

## Before leaving for the event

1. Run the launcher on the presentation laptop and rehearse in Chrome or Edge.
2. Check camera permissions, framing and room lighting with three real repetitions.
3. Select an installed male voice and confirm speakers work; leave voice off if it interrupts your explanation.
4. Keep the entire project folder, including `dist/vendor`, on the laptop and a USB backup. Copying only the HTML file will not work.
5. Use the local launcher for a presentation without network dependence. Hosted access is private to the owner by default.
