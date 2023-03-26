import store from "./store";
import { setAllCities } from "./store/AllCity";

export const allCitiesHandle = (data) => {
  store.dispatch(setAllCities(data));
};

export function weatherSituation(weatherSituation) {
  switch (weatherSituation) {
    case "Az Bulutlu":
      return "parcali-bulutlu";
    case "Güneşli":
      return "gunesli";
    case "Yağmurlu":
      return "yagmurlu";
    case "Bulutlu":
      return "bulutlu";
    case "Karla Karışık Yağmur":
      return "karla-yagmur";
    case "Kar Yağışlı":
      return "kar-yagisli";
    case "Sağanak Yağışlı":
      return "saganak-yagisli";
    case "Sağanak Kar Yağışı":
      return "saganak-kar-yagisli";
    case "Kısmen Güneşli ve Sağanak Yağışlı":
      return "kismen-gunesli-saganak-yagisli";
    case "Kısmen Güneşli":
      return "kismen-gunesli";
    default:
      return "bulutlu";
  }
}

export function dayFounder(day) {
  switch (day) {
    case "Pazartesi":
      return "pazartesi";
    case "Salı":
      return "sali";
    case "Çarşamba":
      return "carsamba";
    case "Perşembe":
      return "persembe";
    case "Cuma":
      return "cuma";
    case "Cumartesi":
      return "cumartesi";
    case "Pazar":
      return "pazar";
  }
}

export function dateFounder(tarih) {
  var tarihVeGun = tarih.split(" ");
  var day = tarihVeGun[0];
  var month = tarihVeGun[1];
  var week = tarihVeGun[2];

  return {day, month, week}
}
