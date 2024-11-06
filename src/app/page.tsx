"use client"

import {ModeToggle} from "@/components/modeToggle";
import "../lib/i18n"
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";

export default function Home() {
  const {t,i18n} = useTranslation();
  const changeLanguage = async () => {
    if (i18n.language === "English") {
      await i18n.changeLanguage("Chinese")
    } else {
      await i18n.changeLanguage("English")
    }

  }
  return (
    <div className="bg-background">
      <ModeToggle></ModeToggle>
      <Button onClick={changeLanguage}>change Language</Button>
      {t('Welcome to React')}
    </div>
  );
}
