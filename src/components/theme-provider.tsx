"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {PropsWithChildren} from "react";

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
};


export default ThemeProvider