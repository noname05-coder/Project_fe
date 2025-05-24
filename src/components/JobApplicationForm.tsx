
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  experience: z.string().min(5, { message: "Please provide more details about your experience." }),
  company_applying: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  job_description: z.string().min(10, { message: "Job description must be at least 10 characters." }),
});

// Type for our form values
type FormValues = z.infer<typeof formSchema>;

export const JobApplicationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      experience: "",
      company_applying: "",
      job_description: "",
    },
  });

  // Form submission handler
  function onSubmit(data: FormValues) {
    
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader className="bg-form-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Job Application</CardTitle>
        <CardDescription className="text-form-100">
          Please fill out the form below to submit your application
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="focus:border-form-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your experience of if you are a fresher just write you are a fresher " {...field} className="min-h-32" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_applying"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company You're Applying To</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste the job description here" {...field} className="min-h-32" />
                  </FormControl>
                  <FormDescription>
                    Include the full job description to get better preparation suggestions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-zinc-600 hover:bg-form-700">Submit Application</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 bg-gray-50">
        <p className="text-sm text-gray-500">Your information is secure and will not be shared with third parties.</p>
      </CardFooter>
    </Card>
  );
}