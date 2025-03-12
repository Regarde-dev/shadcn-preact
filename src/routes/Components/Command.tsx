import { DocsLayout } from "@/components/Layout/DocsLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense, lazy } from "preact/compat";

const CommandSection = lazy(() => import("./Sections/CommandSection"));

export default function CommandPage() {
  return (
    <DocsLayout title="Command" description="Fast, composable, unstyled command menu.">
      <Suspense fallback={<LoadingSpinner />}>
        <CommandSection />
      </Suspense>
    </DocsLayout>
  );
}
