import { languages, fallbackLng } from '../i18n/settings'
import {useTranslation} from "@/app/i18n";
import {Footer} from "@/app/[lng]/components/Footer";

export default async function Home({ params }: {
  params: {
    lng: string;
  };
}) {
  let { lng } = await params
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = await useTranslation(lng)

  return (
    <div className="bg-background">
      {t('title')}
      <br/>
      {lng}
      <Footer lng={lng}/>
    </div>
  );
}
