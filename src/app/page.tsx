
    "use client";

import {Card, CardContent} from "@/components/ui/card";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import  {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  age: z.string({
    required_error: "Age is required",
  }).transform( (val) => parseInt(val))
});

type userType = {
  name: string,
  lastName: string,
  age: number,
  status: string;
  email: string;
}

function Page() {
  const form = useForm <userType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      lastName: "",
      age: 0,
      email: "",
    }
  });

  console.log(form.formState.errors)

  const onSubmit = form.handleSubmit((values)=> {
    console.log(values);
  })

  return (
      <Card>
        <CardContent>
          <FormProvider {...form}>
            <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
              <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormDescription>
                          Ingresa tu nombre completo
                        </FormDescription>
                      </FormItem>
                  )}
              />
              <FormItem>
                <FormLabel htmlFor="lastName">LastName</FormLabel>
                <FormDescription>
                  Ingresa tu apellido
                </FormDescription>
                <FormControl>
                  <Input id="lastName" type="text" {...form.register("lastName")} />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="age">Age</FormLabel>
                <FormDescription>
                  Ingresa tu edad
                </FormDescription>
                <FormControl>
                  <Input id="age" type="text" {...form.register("age")} />
                </FormControl>
              </FormItem>
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">admin@petal.com</SelectItem>
                            <SelectItem value="m@google.com">price@petal.com</SelectItem>
                            <SelectItem value="m@support.com">tool@price.com</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/">email settings</Link>.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <Button type="submit">Guardar</Button>
            </form>
          </FormProvider>

        </CardContent>

      </Card>
  );
}

export default Page
