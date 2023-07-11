import * as Location from "expo-location";

import { API_KEY } from "./config";

export const getLoacation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });

    return { latitude, longitude };
  } catch (error) {
    console.log("error getLocation :>> ", error);
    throw new Error("Failed to get location");
  }
};

export const getCity = async (latitude, longitude) => {
  try {
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    return location[0].city;
  } catch (error) {
    console.log("error getCity :>> ", error);
    throw new Error("Failed to get city");
  }
};

export const getWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    return json.daily;
  } catch (error) {
    console.log("error getWeather :>> ", error);
    throw new Error("Failed to get weather");
  }
};
