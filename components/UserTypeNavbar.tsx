import { Suspense } from "react";
import TabList from "./TabList";

export default function UserTypeNavbar() {
  return (
    <div className="w-full flex justify-center h-16 items-center border-b border-gray-200">
      <Suspense fallback={null}>
      </Suspense>
    </div>
  );
}
