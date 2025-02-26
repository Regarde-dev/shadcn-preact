import { createPortal, PropsWithChildren } from "preact/compat";
import { Show } from "./show";

type PortalProps = PropsWithChildren & {
  show: boolean;
};

export const Portal = ({ show, ...props }: PortalProps) => {
  const $app_modal_container = document.querySelector<HTMLDivElement>("#app-modal");
  const $app_root_container = document.querySelector<HTMLDivElement>("#app-root");

  if (!$app_modal_container || !$app_root_container) {
    throw new Error("`#app-modal` or `#app-root` DOM elements does not exist");
  }

  return createPortal(<Show when={show}>{props.children}</Show>, $app_modal_container);
};
