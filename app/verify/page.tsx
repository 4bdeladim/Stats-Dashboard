import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Verify({
    searchParams,
}: {
    searchParams: { email: string; code: string };
}) {
    let alertTitle: string = "";
    let alertDescription: string = "";
    try {
        const { email, code } = searchParams;
        if (!email || !code) {
            alertTitle = "Invalid Url";
            alertDescription =
                "Please make sure to not delete anything or edit the url you received";
        }
        await prisma.verificationToken.findUnique({
            where: {
                email: email,
                token: code,
            },
        });
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                emailVerified: new Date(),
            },
        });
        alertTitle = "Success";
        alertDescription =
            "Your account is now verified you can now login to your account !!";
    } catch (error) {
        (alertTitle = "Invalid Url"),
            (alertDescription =
                "This url is either wrong or expired please make sure to visit the link you received by email in less than a day ");
    }
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <Alert className="w-[320px] sm:w-[600px]">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>{alertTitle}</AlertTitle>
                <AlertDescription>{alertDescription}</AlertDescription>
            </Alert>
            <div>
                <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "m-4"
                    )}
                >
                    Sign Up
                </Link>
                <Link
                    href="/signin"
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "m-4"
                    )}
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}
