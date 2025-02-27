# `shadcn/ui` port for PREACT

An unofficial, Preact port of shadcn/ui .

This is **NOT** a component library. It’s a collection of re-usable components that you
can copy and paste into your apps.

**What do you mean by not a component library?**

I mean you do not install it as a dependency. It is not available or distributed via npm. I have no
plans to publish it as an npm package (for now).

Pick the components you need. Copy and paste the code into your project and customize to your needs.
The code is yours.

_Use this as a reference to build your own component libraries._

**Why if Preact is compatible with React?**

Shadcn/ui is built on top of Radix UI and Tailwind CSS. Radix is ​​an excellent component library, 
but it is a heavy dependency and I have tried to move it to Preact for better 
integration and a build with minimal external dependencies.


**External Deps**

- lucide-preact

- Calendar
  - react-day-picker

- Carousel
  - embla-carousel-react

- Chart
  - recharts

- Command
  - cmdk

- Drawer
  - vaul

- Input Otp
  - input-otp

- Tooltip
  - @floating-ui/react-dom