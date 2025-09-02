"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

import clientApi from "@/lib/clientApi";
import { businessFormSchema } from "@/lib/formSchemas";

export type userSchemaProps = z.infer<typeof businessFormSchema>;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const BusinessSubPage = () => {
      // const params = useSearchParams();
  // const referralCode = params.get("ref") || "ABC123";
  // const [loading, setLoading] = useState(false);
  const form = useForm<userSchemaProps>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      business_name: "",
      business_sector: "",
      email: "",
      password: "",
      country_code: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data: userSchemaProps) => {
    // setLoading(true);
    console.log(data);
    const res = await clientApi.post(`${baseUrl}/register/individual`, data);
    if (res.status) {
      // setLoading(false);
      console.log(res);
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
            name="business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business name</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="business_sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business sector</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="Information and technology(It)" {...field} />
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
          <FormField
            control={form.control}
            name="country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country code </FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="100234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder="070*******25"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="business_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business category</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder="registered"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
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

          <Button type="submit" className="w-full h-12 cursor-pointer">
            Register
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BusinessSubPage