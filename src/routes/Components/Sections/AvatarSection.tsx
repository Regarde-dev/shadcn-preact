import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

export function AvatarSection() {
  return (
    <div className="w-full max-w-[500px] justify-center items-start flex flex-col gap-6">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
