import { Component, VNode } from "preact";
import { PropsWithChildren } from "preact/compat";

export class RouterErrorBoundary extends Component<PropsWithChildren & { fallback?: VNode }> {
  state = { error: null };

  static getDerivedStateFromError(error: any) {
    return { error: error.message };
  }

  componentDidCatch(error: any) {
    console.error(error);
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <p className="flex flex-row justify-center items-center w-full h-fit text-red-500 font-bold text-pretty">
          Oh no! We ran into an error: {this.state.error}
        </p>
      );
    }
    return this.props.children;
  }
}
