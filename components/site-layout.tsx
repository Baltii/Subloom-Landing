import { ArrowUpRight, Leaf } from "lucide-react";
import { Brand } from "./brand";
import { Navigation } from "./experience";

function SiteHeader() {
  return <header className="header container"><Brand/><Navigation/></header>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="container">
    <div className="footer-top"><div><Brand/><p>A little less admin.<br/>A little more life.</p></div>
      <div className="footer-links"><a href="/#features">Why Subloom</a><a href="/#preview">Take a look</a><a href="/#your-space">Your space</a><a href="/#questions">FAQs</a><a href="/feedback">Ideas & feedback</a><a href="/download">Download the app <ArrowUpRight size={14} aria-hidden="true"/></a><a href="https://subloom.baltii.tn">Open in browser <ArrowUpRight size={14} aria-hidden="true"/></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getUTCFullYear()} Subloom</span><span>Made for a little peace of mind. <Leaf size={15} aria-hidden="true"/></span><a href="#top">Back to the top <ArrowUpRight size={15} aria-hidden="true"/></a></div>
  </div></footer>;
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="hero-field" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader/>
    <main id="main">{children}</main>
    <SiteFooter/>
  </div>;
}
