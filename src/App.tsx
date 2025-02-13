import { ErrorRoute, Route, Router, RouterErrorBoundary } from "@packages/Router";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { ThemeProvider } from "@ui/theme";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import BlocksPage from "./routes/Blocks";
import AlertDialogPage from "./routes/Components/AlertDialog";
import ButtonPage from "./routes/Components/Button";
import CardPage from "./routes/Components/Card";
import DialogPage from "./routes/Components/Dialog";
import InstallationPage from "./routes/Docs/Installation";
import IntroductionPage from "./routes/Docs/Introduction";
import ThemingPage from "./routes/Docs/Theming";
import HomePage from "./routes/Home";

export function App() {
  return (
    <Router type="browser">
      <RouterErrorBoundary>
        <ThemeProvider>
          <Route path={AppRoutes.HOME}>
            <HomePage />
          </Route>

          <Route path={AppRoutes.BLOCKS}>
            <BlocksPage />
          </Route>

          <Route path={AppRoutes.DOCS.INTRO}>
            <IntroductionPage />
          </Route>

          <Route path={AppRoutes.DOCS.INSTALLATION}>
            <InstallationPage />
          </Route>

          <Route path={AppRoutes.DOCS.THEMING}>
            <ThemingPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.BUTTON}>
            <ButtonPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.CARD}>
            <CardPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.DIALOG}>
            <DialogPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.ALERT_DIALOG}>
            <AlertDialogPage />
          </Route>

          <ErrorRoute>
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-background">
              <Alert
                variant="destructive"
                className="max-w-[500px]"
              >
                <AlertTitle>404 error, Not found</AlertTitle>
                <AlertDescription>This resource doesn't exists</AlertDescription>
              </Alert>
            </div>
          </ErrorRoute>

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
      </RouterErrorBoundary>
    </Router>
  );
}
