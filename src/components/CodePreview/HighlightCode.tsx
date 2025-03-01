import { useLayoutEffect, useState } from "preact/hooks";
import { type BundledLanguage, type BundledTheme, codeToHtml } from "shiki/bundle/web";

export default function HighlightCode(props: { codeString: string; lang: BundledLanguage; theme?: BundledTheme }) {
  const [htmlCode, setHtmlCode] = useState("");

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
    <div className="w-full max-w-full overflow-hidden rounded-lg bg-background">
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
