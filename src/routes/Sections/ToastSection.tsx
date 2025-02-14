import { Button } from "@ui/button";
import toast from "react-hot-toast";

export function ToastSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <Button
        variant="secondary"
        onClick={() => {
          toast.success("Transaction Success");
        }}
      >
        Toast Success
      </Button>

      <Button
        variant="destructive"
        onClick={() => {
          toast.error("Transaction Error");
        }}
      >
        Error
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          const id = toast.loading("Making Transaction");
          setTimeout(() => {
            toast.success("Transaction Success", { id });
          }, 2000);
        }}
      >
        Loading
      </Button>
    </div>
  );
}
