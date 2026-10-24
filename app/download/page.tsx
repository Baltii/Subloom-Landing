import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowDownToLine, ArrowUpRight, ExternalLink, Globe2, Laptop2, MonitorDown, Smartphone } from "lucide-react";
import { getLatestRelease, type InstallAsset } from "./release";
import "./download.css";

const webAppUrl = "https://subloom.baltii.tn";
const releasesUrl = "https://github.com/Baltii/Subloom/releases/latest";

export const metadata: Metadata = {
  title: "Download Subloom — Android, macOS, Windows or Web",
  description: "Download Subloom for Android, macOS or Windows, or start tracking subscriptions right in your browser.",
  alternates: { canonical: "/download" },
};

function formatReleaseDate(isoDate: string | null): string | null {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? null : new Intl.DateTimeFormat("en", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(date);
}

function DownloadAction({ asset, label, platform }: { asset: InstallAsset | null; label: string; platform: string }) {
  if (!asset) return <div className="installer-option"><span className="installer-unavailable">{label}: not available yet</span></div>;
  return <div className="installer-option">
    <a className="download-action" href={asset.url} title={asset.name} aria-label={`Download ${platform} — ${label}`}>
      <span>{label}</span><ArrowDownToLine size={18} aria-hidden="true"/>
    </a>
    <span className="installer-meta">{(asset.size / (1024 * 1024)).toFixed(1)} MB{asset.checksumUrl && <> · <a href={asset.checksumUrl} aria-label={`${platform} ${label} SHA-256 checksum`}>SHA-256</a></>}</span>
  </div>;
}

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const releaseDate = formatReleaseDate(release?.publishedAt ?? null);
  const androidTest = release?.android && /(?:^|[-_])test(?:[._-]|$)/i.test(release.android.name);

  return <>
      <section className="download-hero container" aria-labelledby="download-title">
        <div className="download-intro">
          <h1 id="download-title">A calmer view.<br/>On your device.</h1>
          <p>Bring your subscriptions together with Subloom for Android, Mac or Windows. Or start right in your browser.</p>
          <div className="app-actions"><a className="button" href="#download-options">Choose your device <ArrowDown size={18} aria-hidden="true"/></a><a className="app-download-link" href={webAppUrl}>Open in browser <ArrowUpRight size={17} aria-hidden="true"/></a></div>
          <p className="download-reassurance">No bank connection. Start without an account.</p>
        </div>
        <div className="download-art"><Image src="/illustrations/wallet-coins.webp" width={500} height={405} alt="Subloom’s green wallet with gold coins" priority sizes="(max-width: 600px) 220px, (max-width: 900px) 300px, 420px"/></div>
      </section>

      <section className="download-options container" id="download-options" aria-labelledby="download-options-title">
        <div className="download-section-heading"><h2 id="download-options-title">Download Subloom</h2>
          <div className="download-release-line">{release ? <><span>{release.tag}{releaseDate && <> · {releaseDate}</>}</span><a href={release.url}>Release notes <ExternalLink size={14} aria-hidden="true"/></a></> : <span>Release details couldn’t load. <a href={releasesUrl}>Find downloads on GitHub <ExternalLink size={14} aria-hidden="true"/></a></span>}</div>
        </div>
        <div className="download-list">
          <article className="download-platform">
            <div className="platform-heading"><Smartphone size={26} strokeWidth={1.6} aria-hidden="true"/><div><h3>Android</h3><p>Your overview, on the go.</p></div></div>
            <p className="platform-guidance">Open the APK on your Android device to install.{androidTest && <> This release is a test build.</>}</p>
            <div className="platform-installers"><DownloadAction asset={release?.android ?? null} label="Download APK" platform="Android"/></div>
          </article>
          <article className="download-platform">
            <div className="platform-heading"><Laptop2 size={26} strokeWidth={1.6} aria-hidden="true"/><div><h3>macOS</h3><p>A little clarity for your Mac.</p></div></div>
            <p className="platform-guidance">Requires macOS 14 or later. Unzip, then move Subloom.app to Applications.</p>
            <div className="platform-installers"><DownloadAction asset={release?.macArm ?? null} label="Apple silicon" platform="macOS"/><DownloadAction asset={release?.macIntel ?? null} label="Intel Mac" platform="macOS"/></div>
          </article>
          <article className="download-platform">
            <div className="platform-heading"><MonitorDown size={26} strokeWidth={1.6} aria-hidden="true"/><div><h3>Windows</h3><p>Room to see the whole picture.</p></div></div>
            <p className="platform-guidance">For 64-bit PCs. Download the installer, then follow the setup prompts.</p>
            <div className="platform-installers"><DownloadAction asset={release?.windows ?? null} label="Download installer" platform="Windows"/></div>
          </article>
        </div>
        <p className="download-source">Files come directly from the official Subloom release. <a href={release?.url ?? releasesUrl}>View all release files <ArrowUpRight size={14} aria-hidden="true"/></a></p>
      </section>

      <section className="download-browser container" aria-labelledby="browser-title"><div className="download-browser-inner">
        <div><Globe2 size={28} strokeWidth={1.6} aria-hidden="true"/><h2 id="browser-title">Just your browser.</h2><p>The same calm overview, with nothing to install. Start a personal space on this device, then sign in when you want to sync.</p></div>
        <a className="button" href={webAppUrl}>Open in browser <ArrowUpRight size={18} aria-hidden="true"/></a>
      </div></section>

      <section className="download-help container" aria-labelledby="install-title"><h2 id="install-title">Before you install</h2><div className="download-help-content">
        <details><summary>Which Mac download should I choose?</summary><p>Open the Apple menu and choose About This Mac. If it lists an Apple chip, choose Apple silicon. If it lists an Intel processor, choose Intel Mac.</p></details>
        <details><summary>What should I know about these builds?</summary><p>Windows installers are unsigned. Mac apps are ad-hoc signed and are not notarized by Apple. If your device blocks installation, you can use Subloom in your browser.</p><p>Android test APKs use a test signing key and cannot update a store-signed installation. Export your guest data before replacing an existing installation.</p></details>
        <details><summary>Can I use Subloom on iPhone or iPad?</summary><p>Use Subloom in your browser on iPhone or iPad. A public iOS download is not available yet.</p></details>
      </div></section>
  </>;
}
