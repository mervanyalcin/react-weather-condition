// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react"; // React 'ı kurduğumuzda varsayılan olarak geliyor.
import { useSelector } from "react-redux"; // store içindeki allcities değişkeninin içinde ki verilere erişmek için çağırdık
import { getDailyDatas } from "../firebase"; // Firebase dosyamızın içinde ki getDailyDatas() fonksiyona ve lazım olsaydı diğer fonksiyonklara erişmek için kullandık
import { weatherSituation } from "../utils"; // Bazı ihtiyacımız olan fonksiyonları yazdık ve buradan çağırarak kullandık

import { BigCities } from "../components/BigCities";
import { CapitalCities } from "../components/CapitalCities";

// Projede kullandığımız bazı iconlar
import AirIcon from "@mui/icons-material/Air";
import WindPowerIcon from "@mui/icons-material/WindPower";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { DeviceThermostatSharp } from "@mui/icons-material";

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

  // useState() ise bize hızle değişken ve bu değişkeni set edebileceğimiz yani değerini değiştirebileceğimiz bir fonksiyon oluşturuyor.
  const [searchText, setSearchText] = useState("");
  // o günün tarihini tutuyoruz
  const [dateValue, setDateValue] = useState(todayDate);

  // Arama inputuna yazı yazıldığı zama nburada ki fonksiyon çalışıyor.
  const cityFilter = allcities.filter((item) =>
    item.city.toLowerCase().startsWith(searchText.toLowerCase())
  );

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
      </div>

      {searchText.length > 0 ? (
        <div className="">
          {cityFilter.length > 0 ? (
            <>
              {cityFilter.map((currentCities) => {
                return (
                  <div className="flex flex-col bg-white mb-10 px-10 py-10 shadow-lg border-l-4 border-l-gray-500 rounded-2xl">
                    <h1 className="text-4xl font-bold text-center">
                      {currentCities.city}
                    </h1>
                    <h2 className="mt-4 mb-2 text-lg text-center">
                      <span className="font-bold">{currentCities.city}</span>{" "}
                      için bugün neler olacak?
                    </h2>
                    <div className="flex rounded-xl border py-8 max-w-xl bg-white items-center self-center gap-x-20 px-10 mt-4 ">
                      <p className="font-bold">{currentCities.date}</p>
                      {/* <h1 className=" mb-1">{cityhaha.city}</h1> */}
                      <p className="">{currentCities.weather}</p>
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
                        <p className="font-bold">DERECE</p>
                        <p>
                          <DeviceThermostatSharp />
                          {currentCities.degree}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">RÜZGAR</p>
                        <p>
                          <WindPowerIcon />
                          {currentCities.wind}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">RÜZGAR YÖNÜ</p>
                        <p>
                          <AirIcon />
                          {currentCities.windDirection}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">NEM</p>
                        <p>
                          <ThunderstormIcon />
                          {currentCities.humidity}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">BASINÇ</p>
                        <p>
                          <ThunderstormIcon />
                          {currentCities.pressure}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">GÖRÜŞ MESAFESİ</p>
                        <p>
                          <ThunderstormIcon />
                          {currentCities.sightDistance}
                        </p>
                      </div>
                    </div>

                    <h2 className="mt-6">
                      <span className="font-bold"> {currentCities.city}</span>{" "}
                      için önümüzdeki günlere ait hava durumu tahminleri
                    </h2>

                    <div className="flex justify-between mt-4 text-center days ">
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day1}</p>
                        <img src={currentCities.day1WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day1HighDegree} /{" "}
                          {currentCities.day1LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day2}</p>
                        <img src={currentCities.day2WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day2HighDegree} /{" "}
                          {currentCities.day2LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day3}</p>
                        <img src={currentCities.day3WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day3HighDegree} /{" "}
                          {currentCities.day3LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day4}</p>
                        <img src={currentCities.day4WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day4HighDegree} /{" "}
                          {currentCities.day4LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day5}</p>
                        <img src={currentCities.day5WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day5HighDegree} /{" "}
                          {currentCities.day5LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day6}</p>
                        <img src={currentCities.day6WeatherIcon} alt="" />
                        <p className="">
                          {currentCities.day6HighDegree} /{" "}
                          {currentCities.day6LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{currentCities.day7}</p>
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
                  Bugüne ait herhangi bir hava durumu bilgisi yoktur.
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white my-10 py-10 px-5 shadow-lg">
          <p className="text-md text-center uppercase">
            Hava tahmini raporunu görmek istediğiniz şehrin adını yazınız.
          </p>
        </div>
      )}

      <BigCities />
      <CapitalCities />
    </div>
  );
}
