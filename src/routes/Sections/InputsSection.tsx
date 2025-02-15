import { TokenInput } from "@/components/TokenInput";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";

export function InputsSection() {
  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <Input
        type="email1"
        placeholder="Email"
        className="max-w-sm"
      />

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
        />
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="email"
          placeholder="Email"
        />
        <Button type="submit">Subscribe</Button>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          disabled
          id="username"
          type="text"
          className="max-w-sm"
          placeholder="Raul..."
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="tokens01">Input with Tokenizer</Label>
        <TokenInput
          id="tokens01"
          variant="default"
          value={["Pasta", "Compra", "Fix", "Bug", "Priority"]}
        />
      </div>
    </div>
  );
}
