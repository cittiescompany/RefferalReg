"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useParamHook from "@/hooks/use-param-hook";
import { useEffect, useState } from "react";

const TabList = () => {
  const [active, setActive] = useState<string>("individual");
  const { handleSearchParams, mode } = useParamHook({key: "reg_type"});

  useEffect(() => {
    handleSearchParams(active, "reg_type");
  }, [active]);

  return (
    <div className="border w-full" >
      <Tabs
        defaultValue="individual"
        value={active}
        onValueChange={setActive}
        className="w-full max-w-lg mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-xl">
          <TabsTrigger
            value="individual"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
          >
            Individual
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
          >
            Business
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabList;
