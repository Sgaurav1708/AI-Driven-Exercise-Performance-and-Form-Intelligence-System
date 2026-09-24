# Verification — 24 September 2026

Passed:
- 16 automated tracking tests: geometry, five exercise cycle rules, incomplete movements, tracking loss, spikes, squat frame rates, plank timing and standing rejection.
- All six browser demo sessions advanced their result, paused, finished, saved and persisted after reload.
- All six bundled WebM guides played with browser networking disabled after the offline download.
- MediaPipe initialized from the offline cache with networking disabled.
- Desktop (1440px) and mobile (390px) layouts inspected; no horizontal overflow at 390px.
- Camera start/inference loop/stop checked with a browser-provided synthetic camera. No person was present in that feed; the app correctly reported no pose and stopped the stream on finish.
- Voice speed preference persisted after reload; visible app contains no builder branding or broken text encoding.
- No page JavaScript errors during the browser session tests.

Remaining manual checks:
- Perform physical sets in front of a real webcam. These checks do not establish counting accuracy across users, cameras or environments.
- Listen to selected male/female voices on the target device; headless browser testing does not verify audible voice quality or installed voice availability.
- Test the final public deployment after publication. This update has only been verified locally and is not uploaded to GitHub or Netlify yet.

Offline mode requires an initial successful download on each browser/device. Browser storage eviction can remove it. Guide clips are animated movement diagrams, not filmed trainer footage.

Set tracking update: browser checks passed for two full squat sets, two timed plank sets, paused counting during rest, counter reset between sets, early finish without a completed set, persisted set totals and mobile layout. All 16 tracking tests still pass.

## Full recheck after set controls

Passed again: all 16 tracking tests; all six demo flows; squat and plank multi-set completion; early finish; pause/save/reload; synthetic camera startup and shutdown; saved voice speed; offline model initialization and all six offline videos. No page JavaScript errors were reported by these browser checks.

Additional checks passed: widths 320, 390, 768, 1024, 1440 and 1920 pixels without document overflow; set/rep input boundaries; legacy single-set history compatibility; CSV download with set columns; offline reload and 206 video byte-range response.

Fixed and reproduced successfully:
- Refresh offline pack now restores missing cached assets and waits for a newly installing worker to activate before reporting success.
- Changing the set target after finishing no longer exposes an inactive Start next set button.

Physical exercise accuracy, audible voice quality on the user's device, and the future public deployment remain manual checks. Automated camera testing used a synthetic feed, not a person exercising. The refreshed ZIP archives contain these fixes.

## Readiness, rest, guides and progress update

Added camera readiness gating before each camera set and after resume, a configurable rest countdown with manual restart, seven-day live-session totals, an offline-only voice filter, file-count download progress, and regenerated annotated guide videos.

Passed 19 unit tests, including continuous readiness, interrupted readiness, rest time and weekly aggregation. Browser checks confirmed the camera readiness gate prevents counting with no person in the synthetic feed; rest completes without auto-starting a set; next-set counters reset; weekly totals exclude demos; layouts fit 320, 390, 768 and 1440 pixel widths; all six demo/video flows and multi-set history still work. Offline reload/model/video checks and Chrome offline demo passed. Repairing a deliberately missing cache file passed. Updated guide and progress screenshots were inspected.

The readiness check checks required-joint visibility and starting angles. It cannot certify camera perspective, safe exercise technique or accuracy across real users. Real-person exercise tests and audible speaker checks remain necessary. The six guides are annotated animated diagrams, not human trainer footage. No public deployment has been performed for this update.
