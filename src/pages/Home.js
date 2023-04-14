// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react"; // React 'ı kurduğumuzda varsayılan olarak geliyor.
import { useSelector } from "react-redux"; // store içindeki allcities değişkeninin içinde ki verilere erişmek için çağırdık
import { getDailyDatas } from "../firebase"; // Firebase dosyamızın içinde ki getDailyDatas() fonksiyona ve lazım olsaydı diğer fonksiyonklara erişmek için kullandık
import { dateFounder, dayFounder, weatherSituation } from "../utils"; // Bazı ihtiyacımız olan fonksiyonları yazdık ve buradan çağırarak kullandık

// Projede kullandığımız bazı iconlar
import AirIcon from "@mui/icons-material/Air";
import WindPowerIcon from "@mui/icons-material/WindPower";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { DeviceThermostatSharp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function Home() {
  const allcities = useSelector((state) => state.allcity.allcities);
  // Tarih objesi oluştyurduk.
  let date = new Date();
  let day = date.getUTCDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const todayDate = year + "-" + month + "-" + day;
  const { t, i18n } = useTranslation();

  // useState() ise bize hızle değişken ve bu değişkeni set edebileceğimiz yani değerini değiştirebileceğimiz bir fonksiyon oluşturuyor.
  const [searchText, setSearchText] = useState("");
  // o günün tarihini tutuyoruz
  const [dateValue, setDateValue] = useState(todayDate);

  // Arama inputuna yazı yazıldığı zama nburada ki fonksiyon çalışıyor.
  const cityFilter = allcities.filter((item) =>
    item.city.toLowerCase().startsWith(searchText.toLowerCase())
  );

  const capitalCitiesFilter = allcities.filter((cityName) => {
    return (
      cityName.city === "Moskova" ||
      cityName.city === "Roma" ||
      cityName.city === "Paris" ||
      cityName.city === "Barcelona" ||
      cityName.city === "New_York"
    );
  });

  const bigCitiesFilter = allcities.filter((cityName) => {
    return (
      cityName.city === "Istanbul" ||
      cityName.city === "Izmir" ||
      cityName.city === "Ankara" ||
      cityName.city === "Bursa" ||
      cityName.city === "Antalya"
    );
  });

  // useEffect() site ilk açıldığında çalışacak yerdir. Neden biz burayı çalıştırdık çünkü firebase 'den günlük verileri yani bütün şehirlerin verilerini çektik
  useEffect(() => {
    getDailyDatas(dateValue);
  }, [dateValue]);

  return (
    <div>
      {/* Header Search Area */}
      <div className="flex grow my-5">
        {/* Burada ki input arama alanıdır. Her tuşa basıldığında  */}
        <input
          type="search"
          value={searchText}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 "
          placeholder="Search for the city you live in"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {/* Tarih alanımız. Ellerimizle değiştirebildiğimiz tarih inputunun yeri */}

        <input
          type="date"
          className="date-filter"
          max={todayDate}
          value={dateValue}
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
        />
        <div className="h-full flex ">
          <button
            className={`h-full w-[70px] p-4 text-white rounded-full font-extrabold mr-4 ${
              i18n.language === "tr" ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => i18n.changeLanguage("tr")}
          >
            tr
          </button>
          <button
            className={`h-full w-[70px] p-4 text-white rounded-full font-extrabold ${
              i18n.language === "en" ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => i18n.changeLanguage("en")}
          >
            en
          </button>
        </div>
      </div>

      {searchText.length > 0 ? (
        <div className="">
          {cityFilter.length > 0 ? (
            <>
              {cityFilter.map((currentCities) => {
                return (
                  <div className="flex flex-col bg-white mb-10 px-10 py-10 shadow-lg border-l-4 border-l-gray-500 rounded-2xl">
                    <h1 className="text-4xl font-bold text-center">
                      {currentCities.city.replaceAll("_", " ")}
                    </h1>
                    <h2 className="mt-4 mb-2 text-lg text-center">
                      <span className="font-bold">
                        {i18n.language === "tr"
                          ? `${currentCities.city.replaceAll("_", " ")}`
                          : ""}
                        {t("city_header_text")}
                        {i18n.language === "en"
                          ? ` ${currentCities.city.replaceAll("_", " ")} today`
                          : ""}
                      </span>
                    </h2>
                    <div className="flex rounded-xl border py-8 min-w-xl w-auto bg-white items-center self-center gap-x-20 px-10 mt-4 ">
                      <p className="font-bold">
                        {dateFounder(currentCities.date).day}{' '}
                        {t(dateFounder(currentCities.date).month.toLowerCase().replaceAll('ş', 's').replaceAll('ı','i').replaceAll('ğ', 'g').replaceAll('ü','u'))}{' '}
                        {t((dateFounder(currentCities.date).week).toLowerCase().replaceAll('ş', 's').replaceAll('ı','i').replaceAll('ğ', 'g').replaceAll('ü','u').replaceAll('ç','c'))}{' '}

                      </p>
                      <p className="">
                        {t(
                          weatherSituation(currentCities.weather).replaceAll(
                            "-",
                            "_"
                          )
                        )}
                      </p>
                      <div className="flex gap-y-2 justify-around">
                        <img
                          src={`images/${weatherSituation(
                            currentCities.weather
                          )}.svg`}
                          alt=""
                        />
                        <h2 className="font-bold">{currentCities.degree}</h2>
                      </div>
                    </div>

                    <div className="flex justify-between text-center mt-6 mb-2">
                      <div>
                        <p className="font-bold">{t("degree")}</p>
                        <p>
                          <DeviceThermostatSharp />
                          {currentCities.degree}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">{t("wind")}</p>
                        <p>
                          <WindPowerIcon />
                          {currentCities.wind}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">{t("wind_direction")}</p>
                        <p>
                          <AirIcon />
                          {currentCities.windDirection}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">{t("moisture")}</p>
                        <p>
                          <ThunderstormIcon />
                          {currentCities.humidity}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">{t("pressure")}</p>
                        <p>
                          <ThunderstormIcon />
                          {currentCities.pressure}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">{t("sight_distance")}</p>
                        <p>
                          <ThunderstormIcon />
                          {currentCities.sightDistance}
                        </p>
                      </div>
                    </div>

                    <h2 className="mt-6">{t("city_sub_text")}</h2>

                    <div className="flex justify-between mt-4 text-center days ">
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day1))}
                        </p>
                        <img src={currentCities.day1WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day1HighDegree} /{" "}
                          {currentCities.day1LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day2))}
                        </p>
                        <img src={currentCities.day2WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day2HighDegree} /{" "}
                          {currentCities.day2LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day3))}
                        </p>
                        <img src={currentCities.day3WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day3HighDegree} /{" "}
                          {currentCities.day3LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day4))}
                        </p>
                        <img src={currentCities.day4WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day4HighDegree} /{" "}
                          {currentCities.day4LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day5))}
                        </p>
                        <img src={currentCities.day5WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day5HighDegree} /{" "}
                          {currentCities.day5LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day6))}
                        </p>
                        <img src={currentCities.day6WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day6HighDegree} /{" "}
                          {currentCities.day6LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">
                          {t(dayFounder(currentCities.day7))}
                        </p>
                        <img src={currentCities.day7WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day7HighDegree} /{" "}
                          {currentCities.day7LowDegree}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="w-full bg-white my-10 py-10 px-5 shadow-lg">
                <p className="font-semibold text-md text-center  text-red-500 ">
                  {t("noinfo_for_today")}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white my-10 py-10 px-5 shadow-lg">
          <p className="text-md text-center uppercase">
            {t("write_name_of_city")}
          </p>
        </div>
      )}

      <div className="bg-white my-10 py-10 px-5 shadow-lg">
        <div className="rounded-lg">
          <p className="mb-6 font-semibold text-xl text-center uppercase text-black">
            {t("some_big_city_header_text")}
          </p>
          <div className="flex text-center justify-between">
            {bigCitiesFilter.length > 0 ? (
              <>
                {bigCitiesFilter.map((city, index) => (
                  <div
                    className="flex flex-col w-[170px] border-t-4 border-2 border-t-[#10bbc7] items-center gap-y-4 py-6 bg-[#ffffff] cursor-pointer"
                    onClick={() => {
                      setSearchText(city.city);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div className="">{city.city}</div>
                    <div className="">
                      <img
                        src={`images/${weatherSituation(city.weather)}.svg`}
                        alt=""
                      />
                    </div>
                    <div className="card-city-name">
                      {t(weatherSituation(city.weather).replaceAll("-", "_"))}
                    </div>
                    <div className="card-city-name">{city.degree}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="w-full">
                  <p className="font-semibold text-md text-center text-red-500 ">
                    {t("noinfo_for_today")}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white my-10 py-10 px-5 shadow-lg">
          <div className="rounded-lg">
            <p className="mb-6 font-semibold text-xl text-center uppercase text-black">
              {t("some_capital_city_header_text")}
            </p>
            <div className="flex text-center justify-between">
              {capitalCitiesFilter.length > 0 ? (
                <>
                  {capitalCitiesFilter.map((city, index) => (
                    <div
                      className="flex flex-col w-[170px] border-t-4 border-2 border-t-[#10bbc7] items-center gap-y-4 py-6 bg-[#ffffff] cursor-pointer"
                      onClick={() => {
                        setSearchText(city.city);
                        window.scrollTo({
                          top: 0,
                          behavior: "auto",
                        });
                      }}
                    >
                      <div className="">{city.city.replaceAll("_", " ")}</div>
                      <div className="">
                        <img
                          src={`images/${weatherSituation(
                            "Kısmen Güneşli ve Sağanak Yağışlı"
                          )}.svg`}
                          alt=""
                        />
                      </div>
                      <div className="card-city-name">
                        {t(weatherSituation(city.weather).replaceAll("-", "_"))}
                      </div>
                      <div className="card-city-name">{city.degree}</div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="w-full">
                    <p className="font-semibold text-md text-center  text-red-500 ">
                      {t("noinfo_for_today")}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
