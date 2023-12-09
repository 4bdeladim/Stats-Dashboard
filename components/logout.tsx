"use client"
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function LogoutButton() {
    return (
        <Button onClick={() => signOut()} variant="secondary">
            <ExitIcon />
        </Button>
    );
}
