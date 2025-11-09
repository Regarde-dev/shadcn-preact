import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Step, StepContent, Steps, StepTitle } from "@ui/steps";

export function StepsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Basic Steps</h2>
        <Steps>
          <Step>
            <StepTitle label="1">Create your account</StepTitle>
            <StepContent>
              <p className="text-muted-foreground text-sm">Enter your email and password to create an account.</p>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                />
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepTitle label="2">Verify your email</StepTitle>
            <StepContent>
              <p className="text-muted-foreground text-sm">
                We&apos;ve sent a verification code to your email address. Please enter it below.
              </p>
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter 6-digit code"
                />
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepTitle label="3">Complete your profile</StepTitle>
            <StepContent>
              <p className="text-muted-foreground text-sm">Add your personal information to complete your profile.</p>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                />
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder="Tell us about yourself"
                />
              </div>
            </StepContent>
          </Step>
        </Steps>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Steps with Actions</h2>
        <Steps>
          <Step>
            <StepTitle label="1">Choose a plan</StepTitle>
            <StepContent>
              <p className="text-muted-foreground text-sm">Select the plan that best fits your needs.</p>
              <div className="flex gap-2">
                <Button variant="outline">Free</Button>
                <Button variant="outline">Pro</Button>
                <Button variant="outline">Enterprise</Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepTitle label="2">Payment details</StepTitle>
            <StepContent>
              <p className="text-muted-foreground text-sm">Enter your payment information securely.</p>
              <div className="grid gap-2">
                <Label htmlFor="card">Card Number</Label>
                <Input
                  id="card"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <Button className="mt-2">Continue</Button>
            </StepContent>
          </Step>
        </Steps>
      </div>
    </div>
  );
}

