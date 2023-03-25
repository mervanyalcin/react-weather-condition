// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // firebase tarafından verilen zorunlu fonksiyon
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore"; // Firebase 'de tanımlı fonksiyonlar. Örneğin; getDocs() fonksiyonu veri tabanında ki verilere erişmemizi sağlıyor.
import { allCitiesHandle } from "./utils";


// Firebase tarafından verilen initial veriler
const firebaseConfig = {
  apiKey: "AIzaSyDhGIMShn4nP5O045-ZFOg6vMNj-X2Bg7s",
  authDomain: "weather-project-9b153.firebaseapp.com",
  projectId: "weather-project-9b153",
  storageBucket: "weather-project-9b153.appspot.com",
  messagingSenderId: "445735899248",
  appId: "1:445735899248:web:682f6243141f6a483824b5",
  measurementId: "G-Z59W5BP5L0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Bu fonksiyon sayesinde günlük verimizi çekiyoruz
export const getDailyDatas = async (today) => {
  try {
    const colRef = query(collection(db, today), orderBy("city", "asc"));
    const snapshots = await getDocs(colRef);
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    console.log(docs);
    allCitiesHandle(docs); // bu kod sayesinde projemizde ki store 'umuza ihtiyacımız olan verileri yazdık.
  } catch (err) {
    console.log(err.code);
  }
};