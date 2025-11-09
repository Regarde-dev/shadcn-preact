import { useState } from "preact/hooks";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@ui/input-otp";

export function InputOTPDemo() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic OTP Input</h3>
        <div className="flex flex-col gap-4">
          <InputOTP
            maxLength={6}
            value={value1}
            onChange={(value) => setValue1(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-sm text-muted-foreground">
            Value: <span className="font-mono">{value1 || "(empty)"}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">OTP with Separator</h3>
        <div className="flex flex-col gap-4">
          <InputOTP
            maxLength={6}
            value={value2}
            onChange={(value) => setValue2(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-sm text-muted-foreground">
            Value: <span className="font-mono">{value2 || "(empty)"}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Pattern Validation (Numbers Only)</h3>
        <div className="flex flex-col gap-4">
          <InputOTP
            maxLength={4}
            value={value3}
            onChange={(value) => setValue3(value)}
            pattern="^[0-9]+$"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-sm text-muted-foreground">
            Value: <span className="font-mono">{value3 || "(empty)"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

