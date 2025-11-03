import { type ComponentProps, createContext } from "preact";
import { forwardRef, type PropsWithChildren, useContext, useRef } from "preact/compat";
import { cn } from "./share/cn";
import { useArrowKeyNavigation } from "./share/useArrowKeyNavigation";
import { useControlledState } from "./share/useControlledState";
import { useId } from "./share/useId";

const TabContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation: "vertical" | "horizontal";
  activationMode: "automatic" | "manual";
  tabsId: string;
} | null>(null);

function useTabs() {
  const c = useContext(TabContext);
  if (!c) throw new Error("useTabs should be used within Tabs");
  return c;
}

type TabsProps = PropsWithChildren<ComponentProps<"div">> & {
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** A function called when a new tab is selected */
  onValueChange?: (value: string) => void;
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: "automatic" | "manual";
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { value: controlledValue, defaultValue, onValueChange, activationMode, orientation, children, className, ...props },
    forwardedRef
  ) => {
    const tabsId = useId("tabs");
    const [value, setValue] = useControlledState({
      defaultValue: defaultValue ?? "",
      controlledValue,
      onChange: onValueChange,
    });

    return (
      <TabContext.Provider
        value={{
          onValueChange: setValue,
          value,
          orientation: orientation || "horizontal",
          activationMode: activationMode || "automatic",
          tabsId,
        }}
      >
        <div
          ref={forwardedRef}
          data-slot="tabs"
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </TabContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, ...props }, forwardedRef) => {
  const { orientation, activationMode } = useTabs();
  const listRef = useRef<HTMLDivElement>(null);

  useArrowKeyNavigation(listRef, {
    enabled: true,
    selector: '[role="tab"]:not([data-disabled="true"])',
    orientation,
    loop: true,
    onSelect: activationMode === "manual" ? (_index, element) => element.click() : undefined,
  });

  return (
    <div
      ref={(node) => {
        listRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as any).current = node;
        }
      }}
      role="tablist"
      aria-orientation={orientation}
      data-slot="tabs-list"
      data-orientation={orientation}
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

type TabsTriggerProps = ComponentProps<"button"> & { value?: string };

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className, ...props }, forwardedRef) => {
  const { value, onValueChange, orientation, activationMode, tabsId } = useTabs();
  const triggerId = useId(`${tabsId}-trigger`);
  const panelId = useId(`${tabsId}-panel`);
  const isSelected = value === props.value;

  const handleClick = () => {
    if (!props.disabled) {
      onValueChange(props.value || "");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (activationMode === "manual" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFocus = () => {
    if (activationMode === "automatic" && !props.disabled) {
      onValueChange(props.value || "");
    }
  };

  return (
    <button
      ref={forwardedRef}
      id={triggerId}
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      data-state={isSelected ? "active" : "inactive"}
      data-orientation={orientation}
      data-disabled={props.disabled ? "true" : undefined}
      data-slot="tabs-trigger"
      onClick={handleClick}
      onKeyDown={handleKeyDown as any}
      onFocus={handleFocus}
      type="button"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

type TabsContentProps = ComponentProps<"div"> & { value?: string };

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(({ className, ...props }, forwardedRef) => {
  const { value, orientation, tabsId } = useTabs();
  const panelId = useId(`${tabsId}-panel`);
  const triggerId = useId(`${tabsId}-trigger`);
  const isActive = value === props.value;

  if (!isActive) return null;

  return (
    <div
      ref={forwardedRef}
      id={panelId}
      role="tabpanel"
      aria-labelledby={triggerId}
      tabIndex={0}
      data-orientation={orientation}
      data-state="active"
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, TabsList, TabsTrigger, useTabs };
