import * as React from "react"
import { cn } from "@/lib/utils"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Container({ className, ...props }: any) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
