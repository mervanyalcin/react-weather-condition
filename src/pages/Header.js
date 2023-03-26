import { t } from "i18next";
import * as React from "react";
import { Translation, useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation()
  return (
    // Projede ki en başında ki alan. Logo ve slogan için
    <div className="w-full m-auto my-8 flex flex-col gap-y-6 text-center items-center">
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt=""
        className="w-[400px]"
      />
      <p>{t("header_ad")}</p>
    </div>
  );
}
export default Header;
