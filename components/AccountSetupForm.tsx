"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormHook from "@/hooks/use-form-hook";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import useParamHook from "@/hooks/use-param-hook";
import clientApi from "@/lib/clientApi";
import { toast } from "react-toastify";

const formSchema = z.object({
  identity: z.string().nonempty("User identity is required"),
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  city: z.string().nonempty("City is required"),
  social_media: z
    .string()
    .nonempty("Social media handle is required")
    .optional(),
  user_name: z
    .string()
    .nonempty("Username is required")
    .regex(/^\S+$/, "Username cannot contain spaces"),
  social_media_username: z
    .string()
    .nonempty("Social media username is required")
    .optional(),
});

export default function AccountSetupForm() {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { otpPhoneNumber } = useFormHook();
  const { handleSearchParams } = useParamHook();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: otpPhoneNumber || "",
      state: "",
      country: "Nigeria",
      city: "",
      social_media: "",
      social_media_username: "",
      user_name: "",
    },
  });

  const { states, cities, handleGetCities } = useFormHook({
    cc: "NG",
    sc: form.getValues("state"),
  });
  console.log(states);
  console.log(cities);
  console.log(form.getValues("state"));

  useEffect(() => {
    if (otpPhoneNumber) {
      form.setValue("identity", otpPhoneNumber);
    }
    const code = form.getValues("state");
    handleGetCities(code);
  }, [form.watch("state"), form, otpPhoneNumber, handleGetCities]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setisLoading(true);
    const stateName = states.find((v) => v.stateCode === values.state);
    const dataValue = {
      ...values,
      state: stateName?.name,
    };
    const res = await clientApi.post(
      `/register/complete_registration`,
      dataValue
    );
    if (res.data.status) {
      setisLoading(false);
      toast.success(res.data.message || "Account setup is successful");
      handleSearchParams("lagos Account setup is successful", "is_success");
      form.reset();
    } else {
      toast.error(res.data.message || "Account setup is successful");
      setisLoading(false);
    }
  };

  return (
    <div className=" w-full mx-auto  text-center space-y-6">
      <h2 className="text-xl font-semibold">Finish setting up your account</h2>
      <p className="text-gray-500 mb-6">
        Provide the following information to finish setting up your account
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="h-11 bg-gray-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full py-6">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states?.map((state) => (
                      <SelectItem key={state.stateCode} value={state.stateCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full py-6">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities?.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social media handle</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full py-6">
                      <SelectValue placeholder="Select handle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-11 w-full py-6"
                    placeholder="John"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social_media_username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Socia media username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-11 w-full py-6"
                    placeholder="jdoe2020"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit */}
          <Button
            className="w-full h-12 bg-[#3561D3] hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading && <Loader className="animate-spin" />}

            {isLoading ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
