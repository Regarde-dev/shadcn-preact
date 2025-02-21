import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Calendar } from "@ui/calendar";
import { Terminal } from "lucide-preact";
import { useState } from "preact/hooks";

export default function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <h2 className="mb-4">
        The Calendar component is built on top of
        <a
          className="underline ml-2"
          href="https://daypicker.dev/v8"
          target="_blank"
        >
          React DayPicker
        </a>
        .
      </h2>

      <Alert
        className="max-w-[500px] my-4"
        variant="destructive"
      >
        <Terminal className="h-4 w-4" />
        <AlertTitle>React DayPicker version</AlertTitle>
        <AlertDescription>
          The last supported version of React DayPicker is <span className="mx-1 font-semibold">8.10.1</span>
        </AlertDescription>
      </Alert>

      <div className="w-full max-w-fit flex flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
    </>
  );
}
