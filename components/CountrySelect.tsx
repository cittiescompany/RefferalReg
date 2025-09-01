"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountryFlag from "@/lib/helpers"; // this should map countryCode -> <Flag />
import useFormHook from "@/hooks/use-form-hook";
import { userSchemaProps } from "./ReferralSubPage";
import { UseFormReturn } from "react-hook-form";

export default function CountrySelect({form}: {form: UseFormReturn<userSchemaProps>}) {
  const [selected, setSelected] = useState<string>("");
  const { countries } = useFormHook();


  return (
    <div className="space-y-2">
      <Select 
      value={selected} 
    //   onValueChange={setSelected}
     onValueChange={(value) => {
        const selectedValue = countries.find((c) => c.countryCode === value);
        setSelected(value);
        if (selectedValue) {
          form.setValue("country_code", `+${selectedValue.phonecode}`);
        }
      }}
      >
        <SelectTrigger className="w-[130px] py-5">
          {!selected && (
            <SelectValue className="text-xs" placeholder="country code" />
          )}
          {selected && (
            <div className="flex items-center gap-2">
              <CountryFlag
                code={
                  countries.find((c) => c.countryCode === selected)
                    ?.countryCode || ""
                }
                size="w-5 h-5"
              />
              <span>
                +{countries.find((c) => c.countryCode === selected)?.phonecode}
              </span>
            </div>
          )}
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country.countryCode} value={country.countryCode}>
              <button onClick={() => form.setValue("country_code", country.phonecode)} className="flex items-center gap-2">
                <CountryFlag code={country.countryCode} size="w-5 h-5" />
                <span>{country.name}</span>
                <span className="text-muted-foreground">
                  (+{country.phonecode})
                </span>
              </button>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* {selected && (
        <div className="flex items-center gap-2 pt-2">
          <CountryFlag code={selected} size="w-8 h-8" />
          <span className="text-lg font-medium">
            {countries.find((c) => c.countryCode === selected)?.name}
          </span>
          <span className="text-sm text-muted-foreground">
            (+{countries.find((c) => c.countryCode === selected)?.phonecode})
          </span>
        </div>
      )} */}
    </div>
  );
}
