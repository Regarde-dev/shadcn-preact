export function getScrollBarWidth(element: HTMLElement): number {
  if (!element) {
    throw new Error("A valid DOM element must be provided.");
  }

  // Create a temporary element
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // Force the scrollbar to appear
  outer.style.width = "100px";
  outer.style.height = "100px";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  inner.style.width = "100%";
  inner.style.height = "100%";
  outer.appendChild(inner);

  const scrollBarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  return scrollBarWidth;
}
