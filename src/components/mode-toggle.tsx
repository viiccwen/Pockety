"use client"

import { useState } from "react"
import { useTheme } from "next-themes"

import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const [ isDark , setIsDark ] = useState<boolean> (false);
  const { setTheme } = useTheme()

  if(isDark) {
    setTheme("dark");
    
  } else {
    setTheme("light");
  }

  return (
    <>
        <div className="flex items-center">
            <Switch 
                className="w-10 h-6"
                aria-label="theme"
                checked={isDark}
                onClick={() => setIsDark(!isDark)}
            />
            <Button variant="ghost" className={cn("hover:bg-inherit hover:opacity-75 transition")} size="icon" onClick={() => setIsDark(!isDark)}>
              <Sun className={`h-[1.2rem] w-[1.2rem] icon-transition ${!isDark ? 'visible' : ''}`} />
              <Moon className={`h-[1.2rem] w-[1.2rem] icon-transition ${isDark ? 'visible' : ''}`} />
            </Button>
        </div>
    </>
  )
}
