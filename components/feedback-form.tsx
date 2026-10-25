"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bug, Check, Lightbulb, LoaderCircle, Mail, MessageCircle, Send, ShieldCheck } from "lucide-react";

const topics = [
  { value: "idea", label: "An idea", icon: Lightbulb, hint: "A wish, a ‘what if’, or a small improvement. I’d love to hear it.", placeholder: "I wish Subloom could…", action: "Send my idea" },
  { value: "problem", label: "A problem", icon: Bug, hint: "Something feeling off? Tell me what happened, and I’ll take a look.", placeholder: "I was trying to… but then…", action: "Share the problem" },
  { value: "feedback", label: "Just a thought", icon: MessageCircle, hint: "What feels good? What could feel better? There’s room for both.", placeholder: "Something I’ve noticed…", action: "Share my thought" },
] as const;
const endpoint = "https://fdjsmpmgrwzmqovzundx.supabase.co/functions/v1/submit-feedback";

export function FeedbackForm({ version }: { version: string }) {
  const [kind, setKind] = useState<(typeof topics)[number]["value"]>("idea");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<{ message?: string; email?: string }>({});
  const requestId = useRef<string | null>(null);
  const running = useRef(false);
  const success = useRef<HTMLHeadingElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const selected = topics.find(topic => topic.value === kind)!;
  const dirty = !sent && Boolean(message || email);

  useEffect(() => {
    if (!dirty) return;
    const guard = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
  useEffect(() => { if (sent) success.current?.focus(); }, [sent]);

  function edited() { requestId.current = null; setError(null); setFields({}); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (running.current) return;
    const text = message.trim();
    const replyEmail = email.trim();
    const issues: typeof fields = {};
    if (text.length < 10) issues.message = "A little more detail would help — at least 10 characters.";
    if (text.length > 4000) issues.message = "Please keep your thought under 4,000 characters.";
    if (replyEmail && (replyEmail.length > 254 || !emailInput.current?.validity.valid)) issues.email = "That email looks a little off. Could you check it?";
    setFields(issues);
    if (Object.keys(issues).length) { if (issues.message) messageInput.current?.focus(); else emailInput.current?.focus(); return; }
    running.current = true;
    setBusy(true);
    setError(null);
    requestId.current ??= crypto.randomUUID();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ id: requestId.current, kind, title: Array.from(text.replace(/\s+/g, " ")).slice(0, 60).join(""), message: text, replyEmail: replyEmail || null, platform: "web", appVersion: `website@${version}` }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.accepted !== true || result.id !== requestId.current) {
        if (response.status === 429) throw new Error("You’ve shared a few thoughts recently. Please give it a little time, then try again.");
        throw new Error("Your message couldn’t be sent just now. Please try again in a moment.");
      }
      setSent(true);
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "AbortError" && failure.name !== "TypeError" ? failure.message : "The connection took a little too long. Please check your internet and try again.");
    } finally { clearTimeout(timeout); running.current = false; setBusy(false); }
  }
  if (sent) return <div className="feedback-panel feedback-success" role="status">
    <Image className="feedback-success-art" src="/illustrations/feedback-conversation.webp" width={200} height={164} alt="" sizes="200px"/>
    <span className="feedback-success-check"><Check size={22} aria-hidden="true"/></span>
    <h2 tabIndex={-1} ref={success}>Your thought has landed.</h2>
    <p>Thanks for helping Subloom grow. Your message is on its way to my inbox.</p>
    {email.trim() && <p className="feedback-reply-note">You left an email, so I can get back to you there.</p>}
    <button className="feedback-again" onClick={() => { setMessage(""); setEmail(""); setKind("idea"); edited(); setSent(false); }}><MessageCircle size={18} aria-hidden="true"/>Share another thought</button>
  </div>;
  return <form className="feedback-panel" onSubmit={submit} noValidate aria-busy={busy}>
    <fieldset className="feedback-topics" disabled={busy}>
      <legend>What would you like to share?</legend>
      <div>{topics.map(({ value, label, icon: Icon }) => <label key={value} className="feedback-topic">
        <input type="radio" name="topic" value={value} checked={kind === value} onChange={() => { edited(); setKind(value); }}/>
        <span><Icon size={18} aria-hidden="true"/>{label}</span>
      </label>)}</div>
    </fieldset>
    <p className="feedback-hint" id="topic-hint" aria-live="polite">{selected.hint}</p>
    <div className="feedback-field">
      <label htmlFor="feedback-message">Tell me a little more</label>
      <textarea ref={messageInput} id="feedback-message" name="message" value={message} onChange={event => { edited(); setMessage(event.target.value); }} disabled={busy} maxLength={4000} placeholder={selected.placeholder} aria-invalid={Boolean(fields.message)} aria-describedby={`topic-hint message-help${fields.message ? " message-error" : ""}`}/>
      <div className="feedback-field-note"><span id="message-help">A sentence or two is a lovely place to start.</span>{message.length > 3600 && <span>{message.length}/4,000</span>}</div>
      {fields.message && <p className="feedback-error" id="message-error" role="alert">{fields.message}</p>}
    </div>
    <div className="feedback-field">
      <label htmlFor="feedback-email">Your email <span>(only if you’d like a reply)</span></label>
      <div className="feedback-email"><Mail size={18} aria-hidden="true"/><input ref={emailInput} type="email" id="feedback-email" name="email" autoComplete="email" maxLength={254} placeholder="you@example.com" value={email} onChange={event => { edited(); setEmail(event.target.value); }} disabled={busy} aria-invalid={Boolean(fields.email)} aria-describedby={fields.email ? "email-error" : undefined}/></div>
      {fields.email && <p className="feedback-error" id="email-error" role="alert">{fields.email}</p>}
    </div>
    <p className="feedback-privacy"><ShieldCheck size={18} aria-hidden="true"/><span>Private, straight to Ahmed’s inbox. No account needed.</span></p>
    {error && <p className="feedback-error feedback-send-error" role="alert">{error} Your message is still here.</p>}
    <button className="button feedback-submit" type="submit" disabled={busy}>{busy ? <LoaderCircle className="feedback-spinner" size={19} aria-hidden="true"/> : <Send size={19} aria-hidden="true"/>}<span aria-live="polite">{busy ? "Sending your thought…" : selected.action}</span></button>
    <p className="feedback-metadata">The website version and platform are included to help me understand.</p>
  </form>;
}
