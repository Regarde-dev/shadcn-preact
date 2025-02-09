export function LoadingSpinner(props: { show: boolean }) {
  if (props.show) {
    return <i className="h-3 w-3 animate-spin rounded-full border-r-2 border-t-2 border-black p-1 mx-2"></i>;
  }
  return null;
}
