import * as React from "react";

function Header() {
  return (
    // Projede ki en başında ki alan. Logo ve slogan için
    <div className="w-full m-auto my-8 flex flex-col gap-y-6 text-center items-center">
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt=""
        className="w-[400px]"
      />
      <p>Sadece 1 gün değil, 7 günün hava durumunu size gösteren yardımcınız</p>
    </div>
  );
}
export default Header;
