import React from "react";
import { useSelector } from "react-redux";
import { weatherSituation } from "../utils";

export const CapitalCities = () => {
  // @ts-ignore
  const allcities = useSelector((state) => state.allcity.allcities);

  const capitalCitiesFilter = allcities.filter((cityName) => {
    return (
      cityName.city === "Moskova" ||
      cityName.city === "Roma" ||
      cityName.city === "Paris" ||
      cityName.city === "Barcelona" ||
      cityName.city === "New_York"
    );
  });

  return (
    <div>
      <div className="bg-white my-10 py-10 px-5 shadow-lg">
        <div className="rounded-lg">
          <p className="mb-6 font-semibold text-xl text-center uppercase text-black">
            BAZI ÜLKELERIN BAŞKENTLERININ GÜNLÜK HAVA DURUMU
          </p>
          <div className="flex text-center justify-between">
            {capitalCitiesFilter.length > 0 ? (
              <>
                {capitalCitiesFilter.map((city, index) => (
                  <div
                    className="flex flex-col w-[170px] border-t-4 border-2 border-t-[#10bbc7] items-center gap-y-4 py-6 bg-[#ffffff]"
                    onClick={() => {
                      // setSearchText(city.city);
                    }}
                  >
                    <div className="">{city.city}</div>
                    <div className="">
                      <img
                        src={`images/${weatherSituation(
                          "Kısmen Güneşli ve Sağanak Yağışlı"
                        )}.svg`}
                        alt=""
                      />
                    </div>
                    <div className="card-city-name">{city.weather}</div>
                    <div className="card-city-name">{city.degree}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="w-full">
                  <p className="font-semibold text-md text-center  text-red-500 ">
                    Bugüne ait herhangi bir hava durumu bilgisi yoktur.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
