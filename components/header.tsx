"use client"

import Link from "next/link"
import { Moon, Sun, Search, Bookmark, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { useQuranStore } from "@/lib/store"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BookmarksList } from "./bookmarks-list"

// Add new navigation items for prayer times, duas, and settings

import { Clock, Heart, Settings } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { searchQuery, setSearchQuery } = useQuranStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">Q</span>
          </div>
          <span className="hidden font-bold sm:inline-block">Al-Quran Digital</span>
        </Link>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-8"
              />
            </div>
          </div>

          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-4 w-4" />
          </Button>

          {/* Bookmarks */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Bookmark Ayat</SheetTitle>
                <SheetDescription>Ayat-ayat yang telah Anda bookmark</SheetDescription>
              </SheetHeader>
              <BookmarksList />
            </SheetContent>
          </Sheet>

          {/* Home */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </Button>

          {/* Prayer Times */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/prayer-times">
              <Clock className="h-4 w-4" />
            </Link>
          </Button>

          {/* Daily Duas */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/duas">
              <Heart className="h-4 w-4" />
            </Link>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari surah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      )}
    </header>
  )
}
