"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { TagsInput } from "../ui/tags-input";
import ListingAPI from "@/lib/api/listings";
import { listingSchema } from "@/app/schema";

export default function AuctionForm() {
  const form = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      media: [{ url: "", alt: "" }], // Initial media item
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "media",
  });

  async function onSubmit(values) {
    try {
      console.log(values);
      const response = await new ListingAPI().listings.create(values);
      window.location.href = `/listings/${response.data.id}`;
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7 w-full py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="What are you selling?"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Name of the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (max 280 characters)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about the thing you are selling"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>The description of your listing</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <div className="w-full">
            <FormLabel>Media *</FormLabel>
            {fields.map((media, index) => (
              <div key={media.id} className="flex gap-4 mb-4 mt-3">
                <div className="basis-2/3 w-full">
                  <FormField
                    control={form.control}
                    name={`media.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="your-image-url.com"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="basis-1/3">
                  <FormField
                    control={form.control}
                    name={`media.${index}.alt`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Alt text"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <div className="flex gap-4 items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ url: "", alt: "" })}
                disabled={fields.length >= 8} // Disable if fields >= 8
              >
                +
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => remove(fields.length - 1)}
                disabled={fields.length <= 1} // Disable if only one media field
              >
                -
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="endsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ending date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full flex text-start items-center justify-between ${
                        !field.value
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {field.value
                        ? format(new Date(field.value), "PPP")
                        : "Select a date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                      } // Minimum date is tomorrow (prevent past dates)
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your desired date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Add tags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
