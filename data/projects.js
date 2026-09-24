/* Loaded as a CLASSIC script, not fetched as JSON.
   fetch() of a file:// URL is blocked in every major browser, so assigning a
   global is what lets the page behave identically on file://, localhost and
   GitHub Pages with no build step. */
window.PORTFOLIO_DATA = {
  featured: {
    slug: 'twitch-emote-no-restart',
    version: '2.6.1',
    license: 'GPL-3.0',
    loc: 697,
    dependencies: 0,
    repo: 'https://github.com/deadnme/Twitch-Emote-No-Restart',
    greasyfork: 'https://greasyfork.org/en/scripts/595615-twitch-emote-no-restart',
    metrics: [
      { value: '~7,900 → 0', label: 'Forced <code>elementFromPoint</code> hit-tests per second, after profiling' },
      { value: '~6,700 → a few hundred', label: 'Forced <code>getComputedStyle</code> calls per second' },
      { value: '1,927 → 697', label: 'Lines of code after the v2.6.1 rewrite, with the same 20-check test suite passing' },
      { value: '23% → 0%', label: 'Canvases showing the wrong emote during a 60-messages-per-second flood of 7TV, BTTV and FFZ emotes' }
    ]
  }
};
