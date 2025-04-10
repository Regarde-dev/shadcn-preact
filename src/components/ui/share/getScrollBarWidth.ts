export function getScrollBarWidth(element: HTMLElement): number {
  if (!element) {
    throw new Error("A valid DOM element must be provided.");
  }

  const scrollBarWidth = window.innerWidth - element.offsetWidth ;

  return scrollBarWidth;
}
