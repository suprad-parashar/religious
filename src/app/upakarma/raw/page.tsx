import Link from "next/link";
import { AudioPlayer } from "@/components/AudioPlayer";
import { upakarmaContent } from "@/content/upakarma";
import type { Metadata } from "next";

const { fullRecording } = upakarmaContent;

export const metadata: Metadata = {
  title: `${fullRecording.label} | ${upakarmaContent.title}`,
  description: "Full Upakarma recording without the step-by-step guide.",
};

export default function UpakarmaRawPage() {
  return (
    <main className="page">
      <header>
        <h1>{fullRecording.label}</h1>
        <p className="subtitle">
          <Link href="/">Back to the guide</Link>
        </p>
      </header>

      <section className="full-recording">
        <AudioPlayer src={fullRecording.src} label={fullRecording.label} />
      </section>

      <footer>Yajur Veda Upakarma Guide</footer>
    </main>
  );
}
