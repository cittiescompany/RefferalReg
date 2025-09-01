"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// ShadCN form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { userFormSchema } from "@/lib/formSchemas";
import clientApi from "@/lib/clientApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Loader } from "lucide-react";
import CountrySelect from "./CountrySelect";
import useParamHook from "@/hooks/use-param-hook";
import { toast } from "react-toastify";
import useFormHook from "@/hooks/use-form-hook";

export type userSchemaProps = z.infer<typeof userFormSchema>;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const ReferralSubPage = () => {
  const params = useSearchParams();
  const referralCode = params.get("ref") || "ABC123";
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());
  const { router } = useParamHook();
  const {countries} = useFormHook({cc: "NG", sc: ""});
  const form = useForm<userSchemaProps>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      pin: "",
      reffer_by: referralCode || "",
      country_code: "",
      date_of_birth: new Date(),
      phone_number: "",
    },
  });

 const onSubmit = async (data: userSchemaProps) => {
  try {
    setLoading(true);
    const rawData = {...data, phone_number: Number(data.phone_number)};
    console.log(rawData); 

    const res = await clientApi.post(`/register/individual`, rawData);

    if (res.data.status) {
      toast.success("✅ User registered successfully!");
      window.localStorage.setItem("userPhoneNumber", data.phone_number);
      setTimeout(() => {
        router.push("/otp"); 
        setLoading(false);
        form.reset();
      }, 2000);

      console.log(res.data); 
    }
  } catch (err) {
    console.error(err);
    toast.error("❌ Registration failed. Please try again.");
    setLoading(false);
  }
};


  return (
    <div className="max-w-lg mx-auto mt-3 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Join with Referral</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email field */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country code </FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="+234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <div className="text flex gap-2">
                    <CountrySelect form={form} />
                    <Input
                      className="h-11"
                      placeholder="070*******25"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal h-11",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      month={month}
                      onMonthChange={setMonth}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="py-6 w-full">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Male", "Female", "Others"].map((gen, index) => (
                        <SelectItem key={index} value={gen.toLowerCase()}>
                          {gen}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-[#3561D3] cursor-pointer hover:bg-[#3561D3] w-full h-14 "
            type="submit"
            disabled={loading}
          >
            {loading && <Loader className="animate-spin" />}

            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReferralSubPage;
