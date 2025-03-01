import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Calendar } from "@ui/calendar";
import { AlertCircle } from "lucide-preact";
import { useState } from "preact/hooks";

export default function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <h2 className="mb-4">
        The Calendar component is built on top of
        <a className="ml-2 underline" href="https://daypicker.dev/v8" target="_blank" rel="noreferrer">
          React DayPicker
        </a>
        .
      </h2>

      <Alert className="my-4 max-w-[720px]">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>React DayPicker version</AlertTitle>
        <AlertDescription>
          This calendar component is not fully compatible with the original shadcn calendar component. In order to use
          the latest version of React DatePicker, we are using a custom component.
        </AlertDescription>
      </Alert>

      <h2>
        All credit of this components goes to{" "}
        <a className="underline" href="https://github.com/flixlix/shadcn-date-picker" target="_blank" rel="noreferrer">
          flixlix
        </a>
        .
      </h2>

      <div className="mt-6 flex w-full max-w-fit flex-col">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow" />
      </div>
    </>
  );
}
