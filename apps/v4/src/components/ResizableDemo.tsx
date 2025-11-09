import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@ui/resizable";

export function ResizableDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Horizontal Resizable Panels</h3>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Vertical Resizable Panels</h3>
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Header</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Resizable with Handle</h3>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

