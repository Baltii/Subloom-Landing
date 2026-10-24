# Subloom Landing

Live site: [subloom-landing.baltii.tn](https://subloom-landing.baltii.tn).

The standalone Next.js landing website for [Subloom](https://github.com/Baltii/Subloom), with product previews, theme support, and a device download chooser.

## Development

Use Node.js 24 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run build
```

GitHub Actions checks each pull request and push to `main`. Vercel deploys the website independently from the application.

## Downloads

The `/download` route reads the latest published release from [Baltii/Subloom](https://github.com/Baltii/Subloom/releases/latest) and uses GitHub's direct asset URLs for Android, macOS, and Windows. The web option opens [subloom.baltii.tn](https://subloom.baltii.tn).

The landing site uses Next.js server rendering and a 60-second release-data cache so installers update after a new app release without redeploying this repository.

## Assets and branding

Fonts, images, and logo assets are kept locally under `public/`. Font licenses are included. The design uses Lucide icons, accessible navigation, light/dark themes, and reduced-motion support.

This repository was separated from the original `landing/` directory in [Baltii/Subloom](https://github.com/Baltii/Subloom/tree/release-candidate/landing). Earlier landing development history remains available there.

## Shared product design

The root layout wraps both landing and download routes in one `SiteLayout`, with the same header, footer, navigation, local Manrope and DM Sans fonts, and light/dark theme roles. Landing calls to action consistently offer the browser app and the download chooser. Colors follow the app’s `src/theme/tokens.ts`: cloud `#F8FAF8`, forest `#182D25`, green `#087C65`, and the dark background `#101A16` with mint action `#70D2AD`. Surfaces use flat fills with no gradients.

Local agent skills and design guidance are copied from the app into the ignored `.agents/` workspace. These files stay local, following the app repository’s existing private-workspace rule.
