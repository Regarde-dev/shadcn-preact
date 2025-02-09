import { forwardRef, useEffect, useState } from "preact/compat";
import { Show } from "./show";

/**
 * Input for tokens
 * For now you should have to pass a input ref and manually focus
 * */
export const InputForTokens = forwardRef<HTMLInputElement, { onChange: (tokens: string[]) => void; value: string[] }>(
  (props, ref) => {
    const [raw, setRaw] = useState(props.value.join(" "));
    const [tokens, setTokens] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
      if (isFocus) {
        const newTokens = raw.split(" ");
        setTokens(newTokens);
      } else {
        setRaw(
          raw
            .split(" ")
            .filter((v) => v !== "")
            .join(" ")
        );
        setTokens(raw.split(" ").filter((v) => v !== ""));
      }
    }, [raw, isFocus]);

    useEffect(() => {
      props.onChange(tokens);
    }, [tokens]);

    return (
      <div className="flex border-2 h-10 px-1 rounded border-gray-500 flex-row justify-start items-center gap-2">
        {tokens.map((t, i) => (
          <>
            <span className="px-2 border border-gray-400 shadow rounded">
              {t}
              <Show when={isFocus}>
                <span className="duration-75 animate-pulse">
                  {i === tokens.length - 1 || tokens.length === 0 ? "|" : ""}
                </span>
              </Show>
            </span>
          </>
        ))}
        <input
          className="fixed -top-[9999999px] -z-50 select-none"
          ref={ref}
          onFocus={() => setIsFocus(true)}
          onFocusOut={() => setIsFocus(false)}
          value={raw}
          onInput={(e) => {
            setRaw(e.currentTarget.value);
          }}
        />
      </div>
    );
  }
);
