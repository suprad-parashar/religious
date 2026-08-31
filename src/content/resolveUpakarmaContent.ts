import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import { marked } from "marked";
import { applyTemplate } from "@/lib/applyTemplate";
import { flattenSubtextEntries } from "@/lib/flattenSubtextEntries";
import type {
  ResolvedStepSubtext,
  ResolvedUpakarmaContent,
  RichText,
  StepSubtext,
  UpakarmaContent,
} from "@/types/upakarma";

const TEXTS_DIR = path.join(process.cwd(), "src/content/texts");

marked.setOptions({ gfm: true, breaks: true });

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function plainTextToHtml(value: string) {
  return `<p>${escapeHtml(value).replace(/\n/g, "<br />")}</p>`;
}

function resolveMarkdownPath(src: string) {
  const candidates = path.isAbsolute(src)
    ? [src]
    : [path.join(process.cwd(), src), path.join(TEXTS_DIR, src)];

  const match = candidates.find((candidate) => existsSync(candidate));
  if (!match) {
    throw new Error(
      `Markdown file not found: "${src}". Looked in: ${candidates.join(", ")}`,
    );
  }
  return match;
}

function markdownToHtml(markdown: string) {
  return marked.parse(markdown, { async: false }) as string;
}

function hasLivePlaceholder(src: string) {
  return /\{\{\s*[a-zA-Z0-9_.-]+\s*\}\}/.test(src);
}

function resolveRichText(text: RichText): string {
  if (typeof text === "string") {
    return plainTextToHtml(text);
  }

  const source = readFileSync(resolveMarkdownPath(text.src), "utf8");
  const markdown = text.type === "template" ? applyTemplate(source, text.values) : source;
  return markdownToHtml(markdown);
}

function loadMarkdownHtml(): Record<string, string> {
  if (!existsSync(TEXTS_DIR)) return {};
  const files = readdirSync(TEXTS_DIR).filter((file) => file.endsWith(".md"));
  const html: Record<string, string> = {};
  for (const file of files) {
    html[file] = markdownToHtml(readFileSync(path.join(TEXTS_DIR, file), "utf8"));
  }
  return html;
}

function resolveSubtext(subtext: StepSubtext): ResolvedStepSubtext {
  const text = subtext.text;
  if (typeof text === "object" && hasLivePlaceholder(text.src)) {
    return {
      title: subtext.title,
      textSrc: text.src,
      audio: subtext.audio,
      when: subtext.when,
    };
  }

  return {
    title: subtext.title,
    textHtml: text !== undefined ? resolveRichText(text) : undefined,
    audio: subtext.audio,
    when: subtext.when,
  };
}

export function resolveUpakarmaContent(content: UpakarmaContent): ResolvedUpakarmaContent {
  const { introduction, setup, ...rest } = content;
  return {
    ...rest,
    introductionHtml: resolveRichText(introduction),
    setup: {
      title: setup.title,
      bodyHtml: resolveRichText(setup.body),
    },
    markdownHtml: loadMarkdownHtml(),
    steps: content.steps.map((step) => {
      const { information, subtexts, ...stepRest } = step;
      return {
        ...stepRest,
        informationHtml:
          information !== undefined ? resolveRichText(information) : undefined,
        subtexts: flattenSubtextEntries(subtexts).map(resolveSubtext),
      };
    }),
  };
}
