import { Suspense } from "react";
import TabList from "./TabList";

export default function UserTypeNavbar() {
  return (
    <div className="w-full flex justify-center h-20 items-center border-b border-gray-200">
      <Suspense fallback={null}>
        <TabList />
      </Suspense>
    </div>
  );
}
