import type { Metadata } from "next";
import Image from "next/image";
import { FeedbackForm } from "../../components/feedback-form";
import { version } from "../../package.json";
import "./feedback.css";

export const metadata: Metadata = {
  title: "Ideas & feedback — Subloom",
  description: "An idea, a little hiccup, or a what if. Share your thoughts privately with Ahmed, the person behind Subloom. No account needed.",
  alternates: { canonical: "/feedback" },
};
export default function FeedbackPage() {
  return <section className="feedback-layout container" aria-labelledby="feedback-title">
    <div className="feedback-intro">
      <span className="feedback-eyebrow">Ideas & feedback</span>
      <h1 id="feedback-title">What’s on<br/>your <em className="heading-accent">mind?</em></h1>
      <p>I’m Ahmed, the person behind Subloom. An idea, a little hiccup, or a “what if” — I’d love to hear it in your own words.</p>
      <Image className="feedback-intro-art" src="/illustrations/feedback-conversation.webp" width={768} height={628} alt="Two soft green conversation bubbles and a little paper plane" priority sizes="(max-width: 700px) 170px, 340px"/>
      <span className="feedback-welcome">Make yourself at home. I’m listening.</span>
    </div>
    <FeedbackForm version={version}/>
  </section>;
}
