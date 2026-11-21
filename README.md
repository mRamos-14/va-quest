# VA Quest

A pixel battle RPG for learning the Tech VA courses: AI automation (Zapier, Make, n8n), AI agents, Claude and HighLevel, plus profiles, portfolio, client-getting and the Zoom calls. Each course is its own world with areas, a boss, hard mode, and a daily Endless Tower.

**Download page:** https://mramos-14.github.io/va-quest/
- **Android:** tap *Download the app (APK)*, open the file, allow *Install unknown apps* if asked, then *Install*. The app opens the live game, so it updates itself.
- **iPhone:** open the page in Safari, tap *Share → Add to Home Screen*.
- **Play in the browser:** https://mramos-14.github.io/va-quest/play/

The game shows an Update banner when a new version is out, and plays offline after the first visit.

## Updating
1. Make the change.
2. `node tools/check.js` (must say 0 problems).
3. `python tools/bump_version.py "what changed"`.
4. Commit and push to `main`. GitHub Actions checks the questions and publishes the site.

Local play: `python serve.py` then open http://localhost:5353.

## Android app (APK)
`.github/workflows/android.yml` builds the APK with Capacitor (`android-app/`) and attaches it to the `android` release.
It only runs when the Android wrapper or icons change, since the app loads the live game.
It needs two repository secrets, the signing key kept outside this repo (in `VA Quest Keys/` on the owner's PC):
`ANDROID_KEYSTORE_B64` (base64 of `vaquest-release.p12`) and `ANDROID_KEYSTORE_PASSWORD`.
Always sign with the same key, or phones won't accept the update.
