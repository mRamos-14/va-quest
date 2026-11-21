# VA Quest

A pixel battle RPG for learning the Tech VA courses: AI automation (Zapier, Make, n8n), AI agents, Claude and HighLevel, plus profiles, portfolio, client-getting and the Zoom calls. Each course is its own world with areas, a boss, hard mode, and a daily Endless Tower.

**Play / install on your phone:** https://mramos-14.github.io/va-quest/
Open it in Chrome (Android) or Safari (iPhone) and choose "Add to Home screen". It works offline after the first visit and shows an Update banner when a new version is out.

## Updating
1. Make the change.
2. `node tools/check.js` (must say 0 problems).
3. `python tools/bump_version.py "what changed"`.
4. Commit and push to `main`. GitHub Actions checks the questions and publishes the site.

Local play: `python serve.py` then open http://localhost:5353.
