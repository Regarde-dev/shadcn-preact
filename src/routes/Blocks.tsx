import { Header } from "../components/Header";
import { Login01 } from "./Blocks/Login01";
import { Login04 } from "./Blocks/Login04";

export default function BlocksPage() {
  return (
    <div className="flex flex-1 min-h-screen h-auto w-full flex-col items-center justify-start relative bg-background">
      <Header />

      <div className="w-full flex flex-1 flex-col items-center border-b border-dashed border-accent justify-start mb-4 relative">
        <div className="max-w-screen-2xl min-h-[calc(100vh-4rem)] *:max-w-[100vw] *:overflow-auto flex px-1 2xl:px-4 flex-col w-full 2xl:border-x border-dashed border-accent py-4 gap-4">
          <div className=" flex flex-col items-start gap-1 py-4 md:p-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">Blocks</h1>

            <div className="w-full h-screen overflow-auto shadow bg-muted rounded-md p-6 md:p-10 flex flex-col justify-center items-center">
              <Login01 className="w-full max-w-lg" />
            </div>

            <div className="w-full h-screen overflow-auto shadow bg-muted rounded-md p-6 md:p-10 flex flex-col justify-center items-center">
              <Login04 className="w-full max-w-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
