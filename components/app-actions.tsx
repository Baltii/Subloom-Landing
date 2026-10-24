import { ArrowUpRight, Download } from "lucide-react";

export function AppActions({ light = false }: { light?: boolean }) {
  return <div className={`app-actions${light ? " app-actions-inverse" : ""}`}>
    <a className={`button${light ? " button-light" : ""}`} href="https://subloom.baltii.tn">Open in browser <ArrowUpRight size={18} aria-hidden="true"/></a>
    <a className="app-download-link" href="/download"><Download size={18} aria-hidden="true"/>Download the app</a>
  </div>;
}
