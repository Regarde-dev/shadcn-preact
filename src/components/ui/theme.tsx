import { createContext } from "preact";
import { PropsWithChildren, useContext, useEffect, useState } from "preact/compat";

const ThemeContext = createContext<{
  theme: "ligth" | "dark";
  setTheme: (v: "ligth" | "dark") => void;
}>({
  setTheme: () => {},
  theme: "ligth",
});

export const ThemeProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<"ligth" | "dark">("ligth");

  useEffect(() => {
    if (theme === "ligth") {
      document.body.classList.remove("dark");
    } else if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const c = useContext(ThemeContext);
  if (!c) {
    throw new Error("useTheme should be inside of ThemeProvider");
  }

  return c;
};
