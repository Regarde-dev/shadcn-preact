import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SelectDemo() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 font-bold text-2xl">Select Component Demo</h2>
        <p className="mb-6 text-muted-foreground">Examples of the Select component with different configurations.</p>
      </div>

      {/* Basic Select */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Basic Select</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
            <SelectItem value="mango">Mango</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select with Groups */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Select with Groups</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Asia</SelectLabel>
              <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              <SelectItem value="cst-china">China Standard Time (CST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Select with Disabled Items */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Select with Disabled Items</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem
              value="enterprise"
              disabled
            >
              Enterprise (Coming Soon)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select with Default Value */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Select with Default Value</h3>
        <Select defaultValue="react">
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
            <SelectItem value="preact">Preact</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Controlled Select */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Controlled Select</h3>
        <Select
          value="medium"
          onValueChange={(value) => console.log("Selected:", value)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
            <SelectItem value="xlarge">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Long List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Long List (Scrollable)</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a number" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 50 }, (_, i) => (
              <SelectItem
                key={`item-${i + 1}`}
                value={`${i + 1}`}
              >
                Number {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Different Positions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Different Positions</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="mb-2 text-muted-foreground text-sm">Bottom (default)</p>
            <Select side="bottom">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2 text-muted-foreground text-sm">Top</p>
            <Select side="top">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2 text-muted-foreground text-sm">Right</p>
            <Select side="right">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2 text-muted-foreground text-sm">Left</p>
            <Select side="left">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Disabled Select */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Disabled Select</h3>
        <Select
          disabled
          defaultValue="apple"
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Integration */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Form Integration</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            alert(`Selected fruit: ${formData.get("fruit")}`);
          }}
          className="space-y-4"
        >
          <Select
            name="fruit"
            required
            defaultValue="banana"
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a fruit (required)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}
