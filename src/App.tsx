import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { ThemeProvider } from "@ui/theme";
import { ErrorRoute, Route, Router, RouterErrorBoundary } from "preact-hashish-router";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import BlocksPage from "./routes/Blocks";
import AlertPage from "./routes/Components/Alert";
import AlertDialogPage from "./routes/Components/AlertDialog";
import BadgePage from "./routes/Components/Badge";
import BreadcrumbsPage from "./routes/Components/Breadcrumb";
import ButtonPage from "./routes/Components/Button";
import CardPage from "./routes/Components/Card";
import CheckboxPage from "./routes/Components/Checkbox";
import DialogPage from "./routes/Components/Dialog";
import InputPage from "./routes/Components/Input";
import LabelPage from "./routes/Components/Label";
import SwitchPage from "./routes/Components/Switch";
import TextareaPage from "./routes/Components/Textarea";
import ToastPage from "./routes/Components/Toast";
import TogglePage from "./routes/Components/Toggle";
import TooltipPage from "./routes/Components/Tooltip";
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

          <Route path={AppRoutes.COMPONENTS.TOGGLE}>
            <TogglePage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.TOOLTIP}>
            <TooltipPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.TEXTAREA}>
            <TextareaPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.TOAST}>
            <ToastPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.CARD}>
            <CardPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.DIALOG}>
            <DialogPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.CHECKBOX}>
            <CheckboxPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.BREADCRUMB}>
            <BreadcrumbsPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.INPUT}>
            <InputPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.LABEL}>
            <LabelPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.SWITCH}>
            <SwitchPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.BADGE}>
            <BadgePage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.ALERT_DIALOG}>
            <AlertDialogPage />
          </Route>

          <Route path={AppRoutes.COMPONENTS.ALERT}>
            <AlertPage />
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
