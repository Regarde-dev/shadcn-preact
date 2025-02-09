import { PropsWithChildren } from "preact/compat";

export function BreadCrumbs(props: PropsWithChildren) {
  return <div className="w-full flex flex-row items-center justify-start py-1">{props.children}</div>;
}

export function BreadCrumb(props: PropsWithChildren) {
  return <div className="w-fit *:text-md flex flex-row">{props.children}</div>;
}

export function BreadCrumbSeparator() {
  return <span className="mx-2">/</span>;
}
