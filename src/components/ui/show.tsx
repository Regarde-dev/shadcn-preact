import { PropsWithChildren } from "preact/compat";

export function Show(props: PropsWithChildren<{ when: boolean }>) {
  if (props.when) {
    return props.children;
  }
  return null;
}
