import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion";

export function AccordionDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Single Accordion</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Multiple Accordion</h2>
        <Accordion
          type="multiple"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
            <AccordionContent>Yes. Set type to &quot;multiple&quot; to allow multiple items to be open at once.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              The accordion manages an array of open item values instead of a single value.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it customizable?</AccordionTrigger>
            <AccordionContent>Yes. You can customize the styles and behavior to fit your needs.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

