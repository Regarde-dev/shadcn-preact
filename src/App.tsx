import { Toaster } from "react-hot-toast";
import HomePage from "./routes/Home";

export function App() {
  return (
    <>
      <HomePage />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            border: "2px solid #000",
          },
        }}
      />
    </>
  );
}
