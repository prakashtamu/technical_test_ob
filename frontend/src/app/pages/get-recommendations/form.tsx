"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
  user_id: z.string().min(1, {
    message: "User ID cannot be empty",
  }),
});

export function GetRecommendation({
  onFetch,
}: {
  onFetch: (data: { recommendations: string[]; interests: string[] }) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
    },
  });

  const { control, handleSubmit } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { user_id } = values;

    axios
      .get(`${API_URL}/users/${user_id}/recommendations`)
      .then((response) => {
        if (response.status === 200) {
          onFetch({
            recommendations: response.data.recommendations,
            interests: response.data.interests,
          });
        }
      })
      .catch((error) => {
        console.log({ error, lol: error.response?.data?.interests });
        if (error.response.status === 404) {
          onFetch({
            recommendations: [],
            interests: error.response?.data?.interests || [],
          });
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response.data.message,
          });
        } else {
          onFetch({
            recommendations: [],
            interests: [],
          });
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        }
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col"
      >
        <FormField
          control={control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="User ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Fetch Recommendations</Button>
      </form>
    </Form>
  );
}
