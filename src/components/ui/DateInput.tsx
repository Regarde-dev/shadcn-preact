import dayjs from "dayjs";
import { useEffect, useState } from "preact/hooks";
import toast from "react-hot-toast";
import { isDateInDateTimeFormat } from "../../toolbox/date";
import { Button, ButtonText } from "./button";
import { Show } from "./show";

export function DateInput(props: { onChange: (value: string) => void }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!day || !month || !year) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }, [day, month, year]);

  const save_handler = (e: Event) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (day === "" || month === "" || year === "") {
        return;
      }

      if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
        throw new Error("Los días deben ser de 2, los meses de 2 y los años de 4");
      }

      if (!/^[0-9]+$/.test(day) || !/^[0-9]+$/.test(month) || !/^[0-9]+$/.test(year)) {
        throw new Error("Deben ser números");
      }
      if (parseInt(day) > 31 || parseInt(day) < 1) {
        throw new Error("Los días deben estar entre 1 y 31");
      }
      if (parseInt(month) > 12 || parseInt(month) < 1) {
        throw new Error("Los meses deben estar entre 1 y 12");
      }
      if (parseInt(year) > 3000 || parseInt(year) < 2000) {
        throw new Error("Los años deben estar entre 2000 y 3000");
      }

      const date = `${year}-${month}-${day}`;
      const date_formatted = dayjs(date).format("YYYY-MM-DD HH:mm:ss");

      if (!isDateInDateTimeFormat(date_formatted)) {
        throw new Error("Error al Formatear la fecha");
      }
      props.onChange(date_formatted);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <input
        value={day}
        onInput={(e) => setDay(e.currentTarget.value)}
        type="text"
        placeholder="Día"
        maxLength={2}
        className="w-7 border-b border-b-gray-400 text-center"
      />

      <span>/</span>

      <input
        value={month}
        onInput={(e) => setMonth(e.currentTarget.value)}
        type="text"
        placeholder="Mes"
        maxLength={2}
        className="w-8 border-b border-b-gray-400 text-center"
      />

      <span>/</span>

      <input
        value={year}
        onInput={(e) => setYear(e.currentTarget.value)}
        type="text"
        placeholder="Año"
        maxLength={4}
        className="w-10 border-b border-b-gray-400 text-center"
      />

      <Show when={open}>
        <Button
          type="button"
          onClick={save_handler}
          variant="secondary"
        >
          <ButtonText value="Guardar" />
        </Button>
      </Show>
    </div>
  );
}
