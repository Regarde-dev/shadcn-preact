import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

export function AvatarSection() {
  return (
    <div className="flex w-full max-w-[500px] flex-col items-start justify-center gap-6">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
