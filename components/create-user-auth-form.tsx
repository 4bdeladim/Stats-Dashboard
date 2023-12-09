"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { signUpFormSchema } from "@/lib/validation"
import { useToast } from "./ui/use-toast"
import axios from "axios"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface FormData {
	name: string,
	email: string,
	password: string
}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();
	const [formData, setFormData] = React.useState<FormData>({email:"", name: "", password: ""})
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
		const validation = signUpFormSchema.validate(formData);
		console.log(formData);
		if (validation.error) {
			toast({
				variant: "destructive",
				title: "Invalid information",
				description: validation.error.message,
			})
			setIsLoading(false);
			return;
		};
		try {
			const { data } = await axios.post("/api/auth/signup", formData);
			console.log(data);
			setIsLoading(false);
		} catch (error:any) {

			console.log(error.response.data);
		}
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
					<div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              placeholder="name"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
							onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
							onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={isLoading}
            />
          </div>
					<div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
							onChange={(e) => setFormData({...formData, password: e.target.value})}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}