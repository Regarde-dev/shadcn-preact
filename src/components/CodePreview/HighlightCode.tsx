import { Button } from "@ui/button";
import { Check, Copy } from "lucide-preact";
import { useLayoutEffect, useState } from "preact/hooks";
import { type BundledLanguage, type BundledTheme, codeToHtml } from "shiki/bundle/web";

export default function HighlightCode(props: { codeString: string; lang: BundledLanguage; theme?: BundledTheme }) {
  const [htmlCode, setHtmlCode] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    (async () => {
      const html = await codeToHtml(props.codeString, {
        lang: props.lang,
        theme: props.theme ?? "github-dark-dimmed",
      });

      setHtmlCode(html);
    })();
  }, []);

  return (
    <div className="group relative w-full max-w-full overflow-hidden rounded-lg bg-background">
      <Button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 hidden h-7 w-7 p-1 group-hover:flex"
        size="icon"
      >
        {!copied && <Copy className="" />}
        {copied && <Check className="" />}
      </Button>

      <div
        className="max-w-full text-sm *:overflow-auto"
        // biome-ignore lint/security/noDangerouslySetInnerHtml:
        dangerouslySetInnerHTML={{
          __html: htmlCode,
        }}
      />
    </div>
  );
}
