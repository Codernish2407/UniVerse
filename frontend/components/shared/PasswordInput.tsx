"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { inputCls } from "./FormField";
import { cn } from "@/lib/utils";

export function PasswordInput(props: React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? "text" : "password"} className={cn(inputCls, "pr-11", props.className)} />
      <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}
        className="absolute top-0 right-0 flex size-11 items-center justify-center text-subtle hover:text-foreground">
        {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
