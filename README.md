# Subloom Landing

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
