import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";

export function TextareaSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-20 *:max-w-[500px]">
      <Textarea placeholder="Type your message here." />
      <Textarea
        placeholder="This textarea are disabled, Type your message here."
        disabled
      />
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message012">Your message</Label>
        <Textarea
          placeholder="Type your message here."
          id="message012"
        />
      </div>
      <div className="grid w-full gap-2">
        <Textarea placeholder="Type your message here." />
        <Button>Send message</Button>
      </div>
      <div className="w-full space-y-3 border border-border p-4 max-w-[500px] rounded-lg shadow-md">
        <h3 className={"text-sm font-medium"}>Bio</h3>
        <Textarea
          placeholder="Tell us a little bit about yourself"
          className="resize-none"
        />
        <p className="text-sm text-muted-foreground">
          You can <span>@mention</span> other users and organizations.
        </p>
        <Button
          type="submit"
          className="mt-3"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
