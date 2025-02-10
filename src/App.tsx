import { ThemeProvider } from "@ui/theme";
import { Toaster } from "react-hot-toast";
import HomePage from "./routes/Home";

export function App() {
  return (
    <ThemeProvider>
      <HomePage />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            border: "1px solid var(--border)",
          },
        }}
      />
    </ThemeProvider>
  );
}
