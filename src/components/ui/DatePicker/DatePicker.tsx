import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "./date_picker.scss";

export default function DatePicker(props: { onDateChange: (DateRange) => void }) {
  const [dateRange, setSelected] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    props.onDateChange(dateRange);
  }, [dateRange]);

  return (
    <DayPicker
      mode="range"
      lang="es"
      locale={es}
      captionLayout="label"
      defaultMonth={dayjs(dateRange.to).subtract(1, "month").toDate()}
      weekStartsOn={1}
      numberOfMonths={2}
      startMonth={dayjs("2000-01-01").toDate()}
      endMonth={new Date()}
      selected={dateRange}
      className="border border-gray-100 py-2 shadow flex flex-col justify-center items-center"
      onSelect={setSelected}
    />
  );
}
