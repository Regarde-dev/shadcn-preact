import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";

export function InputsSection() {
  return (
    <Card className="w-full max-w-[500px] shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl">Inputs</CardTitle>
        <CardDescription className="text-md">
          Displays a form input field or a component that looks like an input field.{" "}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <Input
          type="email"
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
      </CardContent>
    </Card>
  );
}
