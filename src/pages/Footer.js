import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="w-full text-center text-lg bg-white my-10 py-10 px-5 shadow-lg">
      Uğur Bektaş 190201072 2022-2023 {t("bitirme_projesi")} &copy;
    </div>
  );
}

export default Footer;
