"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Moon, Sun} from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const changeTheme = (e: React.MouseEvent<HTMLDivElement>, value:"light" | "dark" | "system") => {
    if (theme === value) return

    const transition = document.startViewTransition(async () => {
      // 如果当前是暗色模式，添加类名以控制 z-index
      if (theme === "light") {
        document.documentElement.classList.add('dark-transition');
      } else {
        document.documentElement.classList.remove('dark-transition');
      }
      setTheme(value)
    })

    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = e

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: theme === "light" ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement: theme === "light"
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      )
      // 确保在动画完成后移除类
      transition.ready.then(() => {
        if (theme === "dark") {
          document.documentElement.classList.remove('dark-transition');
        }
      });
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => changeTheme(e,"light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => changeTheme(e,"dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => changeTheme(e,"system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
