import {readFileSync} from 'node:fs';

/**
 * A standalone, offline browser for the SuperIntelligence icon collection.
 * The SVG source remains the source of truth: motion is applied by this page only.
 */
export function previewHtml(manifest, iconSvgs) {
  const brandMark = readFileSync(new URL('../brand/superintelligence-mark.svg', import.meta.url), 'utf8')
    .replace(/<\?xml[^>]*\?>\s*/, '')
    .replace('<svg ', '<svg class="brand-mark" aria-hidden="true" ');
  const brandCount = manifest.filter(icon => icon.collection === 'brands').length;
  const systemCount = manifest.length - brandCount;
  const payload = JSON.stringify({ manifest, iconSvgs })
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="description" content="SuperIntelligence: isometric icons for AI systems, autonomous agents, and the platforms behind them.">
  <title>SuperIntelligence / AI Systems</title>
  <style>
    :root {
      --paper: #f7f7f3;
      --surface: #ffffff;
      --ink: #202833;
      --muted: #78818c;
      --line: #e3e6e8;
      --accent: #4168d8;
      --accent-soft: #edf2ff;
      --radius: 15px;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0; background: var(--paper); color: var(--ink);
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    button, input, textarea { font: inherit; }
    button { color: inherit; }
    button, label { -webkit-tap-highlight-color: transparent; }
    button { cursor: pointer; }
    button:focus-visible, input:focus-visible, textarea:focus-visible, a:focus-visible {
      outline: 3px solid #7b9bfa; outline-offset: 4px;
    }
    button:disabled { cursor: wait; opacity: .6; }
    .shell { max-width: 1800px; margin: auto; padding: 0 42px; }
    .masthead {
      height: 84px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid var(--line);
    }
    .brand { display: flex; gap: 12px; align-items: center; }
    .brand-wordmark { display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; }
    .brand-mark { width: 52px; height: 34px; flex: none; color: var(--accent); }
    .brand-name { font-size: 17px; letter-spacing: -.035em; font-weight: 760; }
    .brand-divider { height: 16px; width: 1px; background: #d6dade; margin: 0 5px; }
    .brand-section { font-size: 13px; color: #6f7882; }
    .version {
      display: flex; align-items: center; gap: 9px; font-size: 11px;
      color: #737d86; letter-spacing: .08em;
    }
    .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ca8a0; }
    .intro { padding: 33px 0 28px; display: flex; justify-content: space-between; gap: 24px; align-items: center; }
    .eyebrow {
      margin: 0 0 10px; color: var(--accent); font-size: 10px; line-height: 1.4;
      letter-spacing: .15em; text-transform: uppercase; font-weight: 750;
    }
    h1 { margin: 0; font-size: 31px; line-height: 1.2; letter-spacing: -.035em; font-weight: 650; }
    .intro p:last-child { margin: 11px 0 0; color: #7a828b; font-size: 13px; line-height: 1.6; }
    .package-meta { display: flex; gap: 29px; align-items: center; padding-top: 12px; }
    .package-stat { min-width: 60px; }
    .package-stat strong { display: block; font-size: 20px; font-weight: 600; letter-spacing: -.04em; }
    .package-stat span { display: block; margin-top: 6px; color: #8b929a; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
    .package-stat + .package-stat { border-left: 1px solid var(--line); padding-left: 28px; }
    .workspace { display: grid; grid-template-columns: minmax(0, 1fr) 296px; gap: 28px; align-items: start; }
    .collection { min-width: 0; }
    .toolbar { margin-bottom: 18px; }
    .collection-options { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; margin-bottom: 15px; }
    .collection-button {
      display: inline-flex; align-items: center; gap: 7px; padding: 8px 11px;
      border: 1px solid transparent; border-radius: 8px; background: transparent;
      color: #7a8490; font-size: 11px; font-weight: 550; line-height: 1.2;
    }
    .collection-button:hover { color: var(--ink); background: #eef0ef; }
    .collection-button[aria-pressed="true"] { border-color: #dce4f6; background: var(--accent-soft); color: #3f5eac; }
    .collection-button span { color: #97a2b5; font-size: 10px; font-variant-numeric: tabular-nums; }
    .toolbar-top { display: flex; align-items: center; gap: 18px; justify-content: space-between; }
    .style-options {
      display: flex; padding: 4px; gap: 3px; border: 1px solid #e0e4e7;
      border-radius: 10px; background: #ecefeb; min-width: 0;
    }
    .style-button {
      border: 0; background: transparent; border-radius: 7px; padding: 10px 14px;
      font-size: 11px; line-height: 1; white-space: nowrap; color: #7d858d; font-weight: 560;
      transition: color 160ms ease, background 160ms ease;
    }
    .style-button:hover { color: var(--ink); }
    .style-button[aria-pressed="true"] {
      background: white; color: #2d3d60; box-shadow: 0 1px 3px #24313f12;
    }
    .search-box {
      height: 41px; display: flex; align-items: center; gap: 9px; min-width: 145px; max-width: 235px;
      flex: 1; padding: 0 12px; border: 1px solid var(--line); border-radius: 10px; background: #fff;
    }
    .search-box svg { width: 15px; height: 15px; flex: none; color: #8b94a0; }
    .search-box input { border: none; background: transparent; width: 100%; min-width: 0; outline: none; font-size: 11px; color: var(--ink); }
    .search-box input::placeholder { color: #969da4; }
    .search-box:focus-within { border-color: #91a7e9; box-shadow: 0 0 0 3px #4168d80c; }
    .toolbar-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 19px; min-height: 19px; }
    .results { margin: 0; font-size: 10px; color: #969da4; letter-spacing: .025em; }
    .results strong { font-weight: 620; color: #6e7882; }
    .motion-control { display: flex; align-items: center; gap: 7px; font-size: 10px; color: #7c8790; cursor: pointer; }
    .motion-control input { accent-color: var(--accent); width: 13px; height: 13px; margin: 0; }
    .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 11px; }
    .icon-card {
      position: relative; min-width: 0; border: 1px solid var(--line); border-radius: var(--radius);
      background: var(--surface); padding: 8px 12px 16px; text-align: left;
      transition: border-color 160ms ease, background 160ms ease;
    }
    .icon-card:hover { border-color: #aebbd7; background: #fefeff; }
    .icon-card[aria-pressed="true"] { border-color: #8da6ec; background: #f8faff; }
    .icon-card[aria-pressed="true"]::after {
      content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); position: absolute; right: 15px; top: 15px;
    }
    .icon-number {
      position: absolute; top: 14px; left: 14px; color: #b5bbc2; font-size: 9px;
      font-variant-numeric: tabular-nums; letter-spacing: .04em;
    }
    .icon-card[aria-pressed="true"] .icon-number { color: #8a9bc5; }
    .icon-stage { display: flex; justify-content: center; align-items: center; height: 133px; padding-top: 9px; }
    .icon-stage svg { display: block; width: 124px; height: 124px; flex: none; }
    body.motion-on .icon-stage svg { transition: transform 250ms cubic-bezier(.2,.8,.2,1); }
    body.motion-on .icon-card:hover .icon-stage svg,
    body.motion-on .icon-card:focus-visible .icon-stage svg { transform: translateY(-3px); }
    .icon-name { display: block; text-align: center; color: #4b5663; font-size: 11px; font-weight: 550; line-height: 1.4; }
    .icon-card[aria-pressed="true"] .icon-name { color: #3f5eac; }
    .empty-state { text-align: center; padding: 96px 20px; border: 1px dashed #dce1e5; border-radius: var(--radius); }
    .empty-state strong { font-size: 14px; font-weight: 600; }
    .empty-state p { color: var(--muted); font-size: 12px; margin: 10px 0 18px; }
    .empty-state button { border: 1px solid var(--line); border-radius: 8px; padding: 8px 14px; background: white; font-size: 11px; }
    .inspector {
      position: sticky; top: 24px; background: #fff; border: 1px solid var(--line); border-radius: 17px;
      padding: 17px; margin-bottom: 24px;
    }
    .inspector-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; }
    .section-label { color: #929aa4; font-size: 9px; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
    .inspector-count { color: #9ca5ae; font-size: 9px; font-variant-numeric: tabular-nums; }
    .inspector-stage {
      display: grid; place-items: center; width: 100%; height: 234px;
      border: 1px solid #e9edf3; border-radius: 11px; background-color: #f8faff;
      background-image: radial-gradient(#cdd5e4 .65px, transparent .65px);
      background-size: 11px 11px; position: relative; overflow: hidden;
    }
    .inspector-stage svg { width: 218px; height: 218px; display: block; }
    .canvas-label {
      position: absolute; bottom: 11px; right: 11px; color: #a5aebe; font-size: 8px; letter-spacing: .06em;
      font-variant-numeric: tabular-nums;
    }
    .inspector-title-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 9px; margin-top: 20px; }
    h2 { margin: 0; font-size: 17px; line-height: 1.3; letter-spacing: -.025em; font-weight: 620; }
    .category-tag {
      display: inline-block; margin-top: 8px; font-size: 9px; padding: 4px 7px; border-radius: 4px;
      background: #f0f3f8; color: #7b8797; max-width: 100%;
    }
    .description { color: #85909b; font-size: 11px; line-height: 1.75; margin: 15px 0 21px; min-height: 38px; }
    .brand-details { padding: 11px 12px; margin: -7px 0 18px; background: #f8f9fc; border-radius: 8px; }
    .brand-details dl { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 6px 10px; margin: 0 0 10px; font-size: 10px; line-height: 1.5; }
    .brand-details dt { color: #909aa7; }
    .brand-details dd { margin: 0; color: #69788c; overflow-wrap: anywhere; }
    .brand-details a { color: #5471b8; font-size: 10px; text-underline-offset: 3px; }
    .brand-links { display: flex; flex-wrap: wrap; gap: 5px 12px; }
    .brand-details p { margin: 9px 0 0; color: #919ba9; font-size: 9px; line-height: 1.6; }
    .detail-rule { height: 1px; background: #edf0f3; margin: 18px 0; }
    .size-row { display: flex; align-items: flex-end; justify-content: space-around; height: 96px; padding: 7px 6px 0; }
    .size-sample { display: flex; align-items: center; justify-content: end; flex-direction: column; gap: 9px; }
    .size-sample svg { display: block; }
    .size-sample span { color: #9ca5ae; font-size: 9px; font-variant-numeric: tabular-nums; }
    .export-heading { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .style-name { font-size: 9px; color: #8290a5; }
    .export-button {
      width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px;
      font-weight: 600; min-height: 39px; padding: 10px 12px; border: 1px solid #dce2ee; border-radius: 8px; background: #fff;
      transition: background 150ms ease, border-color 150ms ease;
    }
    .export-button:hover { background: #f5f7fb; border-color: #b7c6e7; }
    .export-button.primary { background: #4168d8; border-color: #4168d8; color: white; }
    .export-button.primary:hover { background: #365cc6; }
    .export-button svg { width: 13px; height: 13px; }
    .export-secondary { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
    .export-note { color: #a0a8b0; text-align: center; font-size: 9px; line-height: 1.6; margin: 12px 0 0; }
    .source-fallback { width: 100%; height: 118px; border: 1px solid #ccd6ed; border-radius: 8px; padding: 10px; margin-top: 12px; font-family: ui-monospace, monospace; font-size: 10px; resize: vertical; }
    .selection-hint { margin: 14px 0 0; text-align: center; font-size: 10px; color: #a0a7af; line-height: 1.7; }
    .footer {
      display: flex; justify-content: space-between; gap: 20px; margin-top: 32px; padding: 23px 0 28px;
      border-top: 1px solid var(--line); color: #98a0a8; font-size: 10px; line-height: 1.6;
    }
    .footer strong { font-weight: 550; color: #76818d; }
    .footer-dot { padding: 0 9px; color: #bbc1c7; }
    .toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      padding: 12px 18px; background: #27364b; color: #fff; font-size: 12px; line-height: 1.5;
      max-width: calc(100vw - 32px); border-radius: 10px; box-shadow: 0 5px 24px #1c2d4820; z-index: 20;
    }
    [hidden] { display: none !important; }
    .sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }
    @media (min-width: 1650px) {
      .icon-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
      .workspace { grid-template-columns: minmax(0, 1fr) 320px; gap: 32px; }
      .icon-stage { height: 149px; }
      .icon-stage svg { width: 134px; height: 134px; }
      .inspector-stage { height: 252px; }
    }
    @media (max-width: 1200px) {
      .shell { padding: 0 28px; }
      .workspace { grid-template-columns: minmax(0, 1fr) 270px; gap: 20px; }
      .style-button { padding: 10px 11px; }
      .toolbar-top { flex-wrap: wrap; gap: 11px; }
      .search-box { max-width: none; }
      .inspector-stage { height: 214px; }
      .inspector-stage svg { width: 200px; height: 200px; }
      .icon-grid { grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); }
    }
    @media (max-width: 900px) {
      .shell { padding: 0 24px; }
      .workspace { grid-template-columns: minmax(0, 1fr) 248px; gap: 17px; }
      .style-options { width: 100%; justify-content: space-between; }
      .style-button { padding: 10px 9px; font-size: 10px; }
      .search-box { min-width: 100%; }
      .inspector { padding: 14px; }
      .inspector-stage { height: 198px; }
      .inspector-stage svg { width: 184px; height: 184px; }
      .package-meta { gap: 18px; }
      .package-stat + .package-stat { padding-left: 18px; }
      .package-stat:last-child { display: none; }
      .icon-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 670px) {
      .shell { padding: 0 18px; }
      .masthead { height: 67px; }
      .brand { gap: 8px; }
      .brand-mark { width: 44px; height: 29px; }
      .brand-wordmark { gap: 2px; }
      .brand-name { font-size: 14px; }
      .brand-divider { margin: 0 3px; }
      .brand-section { font-size: 11px; }
      .version { font-size: 9px; }
      .version .status-dot { display: none; }
      .intro { padding: 27px 0 24px; }
      h1 { font-size: 26px; }
      .intro p:last-child { font-size: 11px; max-width: 280px; }
      .package-meta { display: none; }
      .workspace { display: flex; flex-direction: column; gap: 24px; }
      .collection, .inspector-wrap { width: 100%; }
      .toolbar-top { gap: 10px; }
      .collection-options { gap: 3px; }
      .collection-button { gap: 5px; padding: 8px; font-size: 10px; }
      .collection-button span { font-size: 9px; }
      .style-button { padding: 10px 13px; font-size: 11px; }
      .search-box { max-width: 100%; height: 40px; }
      .icon-grid { gap: 10px; }
      .icon-stage { height: 137px; }
      .icon-card { padding-bottom: 15px; }
      .inspector { position: static; padding: 18px; }
      .inspector-stage { height: 245px; }
      .inspector-stage svg { width: 230px; height: 230px; }
      .description { min-height: 0; }
      .size-row { justify-content: center; gap: 48px; }
      .selection-hint { display: none; }
      .footer { margin-top: 10px; flex-direction: column; gap: 6px; font-size: 9px; }
      .mobile-detail-link {
        display: inline-flex !important; align-items: center; gap: 5px; color: var(--accent);
        font-size: 10px; text-decoration: none;
      }
    }
    @media (max-width: 420px) {
      .version { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
      body.motion-on .icon-card:hover .icon-stage svg,
      body.motion-on .icon-card:focus-visible .icon-stage svg { transform: none; }
    }
  </style>
</head>
<body class="motion-on">
  <div class="shell">
    <header class="masthead">
      <div class="brand">
        <span class="brand-wordmark" role="img" aria-label="SuperIntelligence"><span class="brand-name">Super</span>${brandMark}<span class="brand-name">Intelligence</span></span><span class="brand-divider"></span><span class="brand-section">AI Systems</span>
      </div>
      <div class="version"><span class="status-dot"></span>VOL. 01 <span aria-hidden="true">/</span> 1.6</div>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <div>
        <p class="eyebrow">An isometric icon collection</p>
        <h1 id="page-title">Advanced AI, in perspective.</h1>
        <p>AI systems, autonomous agents, and the platforms behind them. One precise visual language.</p>
      </div>
      <div class="package-meta" aria-label="Collection specifications">
        <div class="package-stat"><strong id="icon-total">${manifest.length}</strong><span>Icons</span></div>
        <div class="package-stat"><strong>${String(Object.keys(iconSvgs).length).padStart(2, '0')}</strong><span>Styles</span></div>
        <div class="package-stat"><strong>128</strong><span>ViewBox</span></div>
      </div>
    </section>

    <div class="workspace">
      <main class="collection" aria-label="Icon collection">
        <div class="toolbar">
          <div class="collection-options" role="group" aria-label="Icon collection">
            <button class="collection-button" type="button" data-collection="all" aria-pressed="true">All <span>${manifest.length}</span></button>
            <button class="collection-button" type="button" data-collection="systems" aria-pressed="false">Systems <span>${systemCount}</span></button>
            <button class="collection-button" type="button" data-collection="brands" aria-pressed="false">Agents &amp; platforms <span>${brandCount}</span></button>
          </div>
          <div class="toolbar-top">
            <div class="style-options" role="group" aria-label="Icon style">
              <button class="style-button" type="button" data-style="stroke" aria-pressed="false">Stroke</button>
              <button class="style-button" type="button" data-style="two-tone" aria-pressed="false">Two-tone</button>
              <button class="style-button" type="button" data-style="duotone" aria-pressed="false">Duotone</button>
              <button class="style-button" type="button" data-style="fill" aria-pressed="false">Fill</button>
              <button class="style-button" type="button" data-style="color" aria-pressed="true">Color</button>
            </div>
            <label class="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/></svg>
              <span class="sr-only">Search icons by name, concept, organization, or category</span>
              <input id="search" type="search" placeholder="Search icons…" autocomplete="off" spellcheck="false">
            </label>
          </div>
          <div class="toolbar-bottom">
            <p class="results" id="results" aria-live="polite"></p>
            <label class="motion-control"><input type="checkbox" id="motion" checked>Hover motion</label>
          </div>
        </div>
        <div class="icon-grid" id="icon-grid"></div>
        <div class="empty-state" id="empty-state" hidden>
          <strong>No matching icons</strong><p>Try another name or concept, or choose a different collection.</p>
          <button type="button" id="clear-search">Clear search</button>
        </div>
      </main>

      <div class="inspector-wrap">
        <aside class="inspector" id="inspector" aria-labelledby="selected-name">
          <div class="inspector-top"><span class="section-label">Icon detail</span><span class="inspector-count" id="selected-index"></span></div>
          <div class="inspector-stage" id="selected-stage"></div>
          <div class="inspector-title-row"><h2 id="selected-name"></h2></div>
          <span class="category-tag" id="selected-category"></span>
          <p class="description" id="selected-description"></p>
          <div class="brand-details" id="brand-details" hidden>
            <dl>
              <dt>Organization</dt><dd id="selected-organization"></dd>
              <dt>Product</dt><dd id="selected-product-type"></dd>
              <dt>Artwork</dt><dd id="selected-artwork"></dd>
            </dl>
            <div class="brand-links">
              <a id="selected-reference" target="_blank" rel="noopener noreferrer">Product reference ↗</a>
              <a id="selected-asset-source" target="_blank" rel="noopener noreferrer" hidden>Mark source ↗</a>
            </div>
            <p>Unofficial adaptation. Brand marks retain their owners' rights and source terms.</p>
          </div>
          <div class="detail-rule"></div>
          <div class="section-label">Small scale preview</div>
          <div class="size-row" id="size-samples" aria-label="Selected icon at 32, 48, and 64 pixels"></div>
          <div class="detail-rule"></div>
          <div class="export-heading"><span class="section-label">Export asset</span><span class="style-name" id="selected-style">Color · SVG</span></div>
          <button type="button" class="export-button primary" id="download-svg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4"/></svg>
            Download SVG
          </button>
          <div class="export-secondary">
            <button type="button" class="export-button" id="copy-svg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg>Copy SVG
            </button>
            <button type="button" class="export-button" id="download-png">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 17 5-5 4 4 4-6 5 7"/><circle cx="8" cy="8" r="1"/></svg>PNG · 512px
            </button>
          </div>
          <p class="export-note">Transparent background. Static, editable vectors.</p>
          <textarea class="source-fallback" id="source-fallback" aria-label="SVG source; select and copy manually" readonly hidden></textarea>
        </aside>
        <p class="selection-hint">Choose any icon to inspect and export.<br>All assets work offline.</p>
      </div>
    </div>

    <footer class="footer">
      <span><strong>SuperIntelligence / AI Systems</strong><span class="footer-dot">·</span><span id="footer-count">${manifest.length} icons · ${manifest.length * Object.keys(iconSvgs).length} SVGs</span><span class="footer-dot">·</span>128 × 128 viewBox</span>
      <span>Isometric geometry. Consistent perspective. Infinite resolution.</span>
    </footer>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
  <script type="application/json" id="collection-data">${payload}</script>
  <script>
    (() => {
      'use strict';
      const { manifest, iconSvgs } = JSON.parse(document.getElementById('collection-data').textContent);
      const styleLabels = { stroke: 'Stroke', 'two-tone': 'Two-tone', duotone: 'Duotone', fill: 'Fill', color: 'Color' };
      const grid = document.getElementById('icon-grid');
      const search = document.getElementById('search');
      const motion = document.getElementById('motion');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let selectedId = manifest.some(icon => icon.id === 'agent') ? 'agent' : manifest[0]?.id;
      let selectedStyle = 'color';
      let selectedCollection = 'all';
      let toastTimer;

      function announce(message) {
        const toast = document.getElementById('toast');
        clearTimeout(toastTimer);
        toast.textContent = message;
        toast.hidden = false;
        toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
      }
      function svgSource(id = selectedId, style = selectedStyle) {
        return iconSvgs[style]?.[id] || '';
      }
      function appendSvg(parent, source, size) {
        const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
        const sourceRoot = parsed.documentElement;
        if (sourceRoot.localName !== 'svg' || parsed.querySelector('parsererror')) return;
        const svg = document.importNode(sourceRoot, true);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.removeAttribute('role');
        svg.removeAttribute('aria-labelledby');
        if (size) {
          svg.setAttribute('width', String(size));
          svg.setAttribute('height', String(size));
        }
        // Every displayed copy needs its own ID namespace for standalone SVGs
        // that contain titles, masks, clips, or definitions.
        const prefix = 'preview-' + (++appendSvg.counter) + '-';
        const idMap = new Map();
        svg.querySelectorAll('[id]').forEach(node => {
          const oldId = node.id;
          idMap.set(oldId, prefix + oldId);
          node.id = prefix + oldId;
        });
        svg.querySelectorAll('*').forEach(node => {
          for (const attribute of Array.from(node.attributes)) {
            let value = attribute.value;
            idMap.forEach((nextId, oldId) => {
              value = value.split('url(#' + oldId + ')').join('url(#' + nextId + ')');
              if (value === '#' + oldId) value = '#' + nextId;
              if (attribute.name === 'aria-labelledby' || attribute.name === 'aria-describedby') {
                value = value.split(' ').map(id => id === oldId ? nextId : id).join(' ');
              }
            });
            if (value !== attribute.value) node.setAttribute(attribute.name, value);
          }
        });
        parent.appendChild(svg);
      }
      appendSvg.counter = 0;

      function inCollection(icon) {
        return selectedCollection === 'all' ||
          (selectedCollection === 'brands' ? icon.collection === 'brands' : icon.collection !== 'brands');
      }
      function filteredIcons() {
        const query = search.value.trim().toLocaleLowerCase();
        return manifest.filter(icon => inCollection(icon) &&
          [icon.id, icon.name, icon.category, icon.description, icon.brand?.organization,
            icon.brand?.productType, ...(icon.tags || [])].join(' ').toLocaleLowerCase().includes(query)
        );
      }
      function renderGrid() {
        const query = search.value.trim();
        const filtered = filteredIcons();
        const collectionTotal = manifest.filter(inCollection).length;
        const fragment = document.createDocumentFragment();
        filtered.forEach(icon => {
          const index = manifest.indexOf(icon);
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'icon-card';
          card.dataset.id = icon.id;
          card.setAttribute('aria-pressed', String(icon.id === selectedId));
          card.setAttribute('aria-label', icon.name + ', inspect icon');
          const number = document.createElement('span');
          number.className = 'icon-number';
          number.setAttribute('aria-hidden', 'true');
          number.textContent = String(index + 1).padStart(2, '0');
          const stage = document.createElement('span');
          stage.className = 'icon-stage';
          appendSvg(stage, svgSource(icon.id), 128);
          const name = document.createElement('span');
          name.className = 'icon-name';
          name.textContent = icon.name;
          card.append(number, stage, name);
          card.addEventListener('click', () => {
            selectedId = icon.id;
            grid.querySelectorAll('.icon-card').forEach(button =>
              button.setAttribute('aria-pressed', String(button.dataset.id === selectedId))
            );
            renderInspector();
            if (window.matchMedia('(max-width: 670px)').matches) {
              document.getElementById('inspector').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
              const heading = document.getElementById('selected-name');
              heading.tabIndex = -1;
              heading.focus({ preventScroll: true });
            }
          });
          fragment.appendChild(card);
        });
        grid.replaceChildren(fragment);
        document.getElementById('empty-state').hidden = filtered.length !== 0;
        const results = document.getElementById('results');
        results.replaceChildren();
        const count = document.createElement('strong');
        count.textContent = String(filtered.length).padStart(2, '0');
        const collectionLabel = { all: 'the collection', systems: 'Systems', brands: 'Agents & platforms' }[selectedCollection];
        results.append(count, document.createTextNode(query ? ' of ' + collectionTotal + ' icons in ' + collectionLabel : ' icons in ' + collectionLabel));
      }

      function renderInspector() {
        const icon = manifest.find(item => item.id === selectedId);
        if (!icon) return;
        document.getElementById('selected-name').textContent = icon.name;
        document.getElementById('selected-category').textContent = icon.category || 'AI Systems';
        document.getElementById('selected-description').textContent = icon.description || '';
        const brandDetails = document.getElementById('brand-details');
        brandDetails.hidden = !icon.brand;
        document.getElementById('selected-organization').textContent = icon.brand?.organization || '';
        document.getElementById('selected-product-type').textContent = icon.brand?.productType || '';
        document.getElementById('selected-artwork').textContent = icon.brand ? (icon.brand.artwork || 'Brand mark in isometric presentation') : '';
        const reference = document.getElementById('selected-reference');
        reference.removeAttribute('href');
        const referenceUrl = icon.brand?.reference || icon.brand?.website;
        reference.hidden = !referenceUrl;
        if (referenceUrl) reference.href = referenceUrl;
        const assetSource = document.getElementById('selected-asset-source');
        assetSource.removeAttribute('href');
        assetSource.hidden = !icon.brand?.assetSource;
        if (icon.brand?.assetSource) assetSource.href = icon.brand.assetSource;
        document.getElementById('selected-index').textContent = String(manifest.indexOf(icon) + 1).padStart(2, '0') + ' / ' + String(manifest.length).padStart(2, '0');
        document.getElementById('selected-style').textContent = styleLabels[selectedStyle] + ' · SVG';
        const stage = document.getElementById('selected-stage');
        stage.replaceChildren();
        appendSvg(stage, svgSource(), 218);
        const canvasLabel = document.createElement('span');
        canvasLabel.className = 'canvas-label';
        canvasLabel.textContent = '128 × 128';
        stage.appendChild(canvasLabel);
        const samples = document.getElementById('size-samples');
        samples.replaceChildren();
        [32, 48, 64].forEach(size => {
          const sample = document.createElement('div');
          sample.className = 'size-sample';
          appendSvg(sample, svgSource(), size);
          const label = document.createElement('span');
          label.textContent = size + 'px';
          sample.appendChild(label);
          samples.appendChild(sample);
        });
        const fallback = document.getElementById('source-fallback');
        fallback.hidden = true;
        fallback.value = '';
      }

      document.querySelectorAll('[data-style]').forEach(button => {
        button.addEventListener('click', () => {
          selectedStyle = button.dataset.style;
          document.querySelectorAll('[data-style]').forEach(option =>
            option.setAttribute('aria-pressed', String(option.dataset.style === selectedStyle))
          );
          renderGrid();
          renderInspector();
        });
      });
      document.querySelectorAll('[data-collection]').forEach(button => {
        button.addEventListener('click', () => {
          selectedCollection = button.dataset.collection;
          document.querySelectorAll('[data-collection]').forEach(option =>
            option.setAttribute('aria-pressed', String(option.dataset.collection === selectedCollection))
          );
          const filtered = filteredIcons();
          if (filtered.length && !filtered.some(icon => icon.id === selectedId)) selectedId = filtered[0].id;
          renderGrid();
          renderInspector();
        });
      });
      search.addEventListener('input', renderGrid);
      document.getElementById('clear-search').addEventListener('click', () => {
        search.value = '';
        renderGrid();
        search.focus();
      });
      function updateMotion() {
        document.body.classList.toggle('motion-on', motion.checked && !reducedMotion.matches);
      }
      motion.checked = !reducedMotion.matches;
      motion.addEventListener('change', updateMotion);
      reducedMotion.addEventListener('change', updateMotion);
      updateMotion();

      function download(blob, filename) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
      document.getElementById('download-svg').addEventListener('click', () => {
        download(new Blob([svgSource()], { type: 'image/svg+xml;charset=utf-8' }), selectedId + '-' + selectedStyle + '.svg');
      });
      document.getElementById('copy-svg').addEventListener('click', async () => {
        const source = svgSource();
        try {
          if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
          await navigator.clipboard.writeText(source);
          announce('SVG copied to clipboard.');
        } catch {
          const fallback = document.getElementById('source-fallback');
          fallback.value = source;
          fallback.hidden = false;
          fallback.focus();
          fallback.select();
          announce('Clipboard access is unavailable. The SVG is selected below; press ⌘C or Ctrl+C to copy.');
        }
      });
      document.getElementById('download-png').addEventListener('click', async event => {
        const button = event.currentTarget;
        const source = svgSource();
        const filename = selectedId + '-' + selectedStyle + '-512.png';
        const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
        button.disabled = true;
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () => reject(new Error('Could not render SVG'));
            img.src = url;
          });
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Canvas is unavailable');
          context.drawImage(img, 0, 0, 512, 512);
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          if (!blob) throw new Error('Could not encode PNG');
          download(blob, filename);
        } catch {
          announce('PNG export could not be completed in this browser. Download the SVG to retain the original artwork.');
        } finally {
          URL.revokeObjectURL(url);
          button.disabled = false;
        }
      });
      document.getElementById('icon-total').textContent = String(manifest.length).padStart(2, '0');
      document.getElementById('footer-count').textContent = manifest.length + ' icons · ' + (manifest.length * Object.keys(iconSvgs).length) + ' SVGs';
      renderGrid();
      renderInspector();
    })();
  </script>
</body>
</html>`;
}
