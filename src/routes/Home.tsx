import { LoadingSpinner } from "@/components/LoadingSpinner";
import { lazy, Suspense } from "preact/compat";
import { Header } from "../components/Header";
import { Login01 } from "./Blocks/Login01";
import { Login04 } from "./Blocks/Login04";
import { AlertDialogSection } from "./Sections/AlertDialog";
import { AlertSection } from "./Sections/AlertSection";
import { BadgesSection } from "./Sections/BadgeSection";
import { ButtonsSection } from "./Sections/ButtonsSection";
import { CardsSection } from "./Sections/CardsSection";
import { CheckboxSection } from "./Sections/CheckBoxSection";
import { DialogSection } from "./Sections/DialogSection";
import { InputsSection } from "./Sections/InputsSection";
import { LabelSection } from "./Sections/LabelSection";

const ChartSection = lazy(() => import("./Sections/Charts/ChartSection"));

export default function HomePage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-start justify-start relative">
      <Header />

      <div className="w-full flex flex-1 px-2 flex-col items-start justify-start relative py-10 gap-6">
        <ButtonsSection />

        <BadgesSection />

        <CardsSection />

        <AlertSection />

        <InputsSection />

        <LabelSection />

        <CheckboxSection />

        <AlertDialogSection />

        <DialogSection />

        <Suspense fallback={<LoadingSpinner show />}>
          <ChartSection />
        </Suspense>

        <h2 className="w-full text-center text-xl font-bold text-primary">Blocks</h2>

        <div className="w-full h-screen overflow-auto shadow bg-muted rounded-md p-6 md:p-10 flex flex-col justify-center items-center">
          <Login01 className="w-full max-w-lg" />
        </div>

        <div className="w-full h-screen overflow-auto shadow bg-muted rounded-md p-6 md:p-10 flex flex-col justify-center items-center">
          <Login04 className="w-full max-w-3xl" />
        </div>
      </div>
    </div>
  );
}
