import {
  type HTMLAttributes,
  type ImgHTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/compat";
import { cn } from "./share/cn";
import { Show } from "./show";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

const AvatarContext = createContext<{
  status: ImageLoadingStatus;
  changeStatus: (s: ImageLoadingStatus) => void;
} | null>(null);

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const [imgStatus, setImgStatus] = useState<ImageLoadingStatus>("idle");

  const changeImgStatus = (s: ImageLoadingStatus) => setImgStatus(s);

  return (
    <AvatarContext.Provider value={{ status: imgStatus, changeStatus: changeImgStatus }}>
      <div
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
      />
    </AvatarContext.Provider>
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => {
    const { status, changeStatus } = useAvatar();
    const loadingStatus = useImageLoadingStatus(props.src as string, {
      crossOrigin: props.crossOrigin,
      referrerPolicy: props.crossOrigin as string,
    });

    useEffect(() => {
      changeStatus(loadingStatus);
    }, [loadingStatus]);

    return (
      <Show when={status === "loaded"}>
        <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
      </Show>
    );
  }
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => {
  const { status } = useAvatar();

  return status !== "loaded" ? (
    <span
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  ) : null;
});
AvatarFallback.displayName = "AvatarFallback";

function useImageLoadingStatus(
  src: string | undefined,
  {
    referrerPolicy,
    crossOrigin,
  }: {
    referrerPolicy: string;
    crossOrigin: ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
  }
) {
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>("idle");

  useLayoutEffect(() => {
    if (!src) {
      setLoadingStatus("error");
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted) return;
      setLoadingStatus(status);
    };

    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    image.src = src;
    return () => {
      isMounted = false;
    };
  }, [src, referrerPolicy, crossOrigin]);

  return loadingStatus;
}

export function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar should be used inside of an AvatarContextProvider");
  }
  return context;
}

export { Avatar, AvatarFallback, AvatarImage };
