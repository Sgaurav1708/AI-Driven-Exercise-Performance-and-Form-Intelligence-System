# Getting started

## AI-Driven Exercise Performance and Form Intelligence System

Run **Start Exercise Intelligence.cmd**, then open http://127.0.0.1:4173 in Chrome or Edge. Keep the launcher window open while using the application.

## Start a workout

1. Select Squats, Bicep curls, or Push-ups and set a repetition target.
2. Choose Enable camera and allow camera access.
3. Position yourself side-on with the required joints visible. Start in the extended position.
4. Complete the movement and return to the starting position. The counter records full cycles.
5. Enable Voice for Atlas spoken feedback if desired.
6. Choose Finish session to save the workout. Open Workout history to review or export your sessions.

## Squat tracking

Keep your hips, knees and ankles visible. The counter looks for a knee angle below 115 degrees followed by a return above 150 degrees. Atlas shows which movement it is waiting for. Do not force a painful movement to meet the thresholds.

## Camera troubleshooting

Allow Camera in the browser's site controls, then reload. On Windows, check Settings > Privacy & security > Camera and desktop-app camera access. Close other applications using the camera if the device is busy.

Improve lighting and keep the required joints inside the frame when confidence is low. Brief tracking flicker pauses counting; sustained tracking loss resets the incomplete cycle.

## Guided demo

Choose Try the guided demo to explore without a webcam. It uses synthetic landmarks with the same repetition rules. History labels simulated sessions separately from live workouts.

## Data and capabilities

Camera frames are processed locally and are not recorded or uploaded by the application. Workout summaries are stored in this browser. Export CSV to keep a copy.

Atlas uses exercise rules and browser speech synthesis. LLM conversations and automatic exercise recognition are planned. MediaPipe supplies the pretrained pose model. Landmark confidence is not a measure of exercise accuracy, and the application does not assess injuries.

The pose runtime and model are included locally. Optional web fonts use system fallbacks offline. Voice availability depends on the browser and installed voices.