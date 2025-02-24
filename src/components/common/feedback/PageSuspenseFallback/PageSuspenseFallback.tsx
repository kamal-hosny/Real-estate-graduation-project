import { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center w-screen h-screen">
          <LottieHandler type="loading" message="" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
