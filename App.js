import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "./styles";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { formatDate } from "./util";
import { API_KEY } from "./config";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("initializing...");
  const [errorMsg, setErrorMsg] = useState("");

  const getLoacation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });

    return { latitude, longitude };
  };

  const getCity = async (latitude, longitude) => {
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
  };

  const getWeather = async (latitude, longitude) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setWeatherData(json.daily);
  };

  useEffect(() => {
    (async () => {
      setLoadingMsg("Getting Location...");
      const { latitude, longitude } = await getLoacation();
      if (!latitude || !longitude) {
        setErrorMsg("Plz restart");
      }
      await getCity(latitude, longitude);
      setLoadingMsg("Getting Weather ...");
      await getWeather(latitude, longitude);

      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#1f2937" />
          <Text style={styles.loading_text}>{loadingMsg}</Text>
        </View>
      )}
      {!isLoading && (
        <View style={styles.header}>
          <Text style={styles.city}>{city}</Text>
        </View>
      )}
      {!isLoading && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {weatherData.map((daily, index) => {
            const {
              dt,
              pop,
              wind_speed,
              temp: { day: today, max, min },
              weather: [{ main }],
            } = daily;
            const { day, month, date } = formatDate(dt);
            let backgroundColor;
            const textColor = "#1f2937";
            if (main == "Rain" || main == "Drizzle") {
              backgroundColor = "#38bdf8";
            }
            if (main == "Snow") {
              backgroundColor = "#d1d5db";
            }
            if (main == "Clear") {
              backgroundColor = "#FFF338";
            }
            if (main == "Clouds") {
              backgroundColor = "#cbd5e1";
            }
            return (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  paddingTop: 100,
                  paddingHorizontal: 20,
                  backgroundColor,
                }}
                key={index}
              >
                <View style={styles.date_container}>
                  <Text style={{ ...styles.day, color: textColor }}>{day}</Text>
                  <Text style={{ ...styles.month, color: textColor }}>
                    {date + "  " + month}
                  </Text>
                </View>
                <View style={styles.weather_container}>
                  <Text style={{ ...styles.temperature, color: textColor }}>
                    {Math.floor(today)}°
                  </Text>
                  <Text style={{ ...styles.desc, color: textColor }}>
                    {main == "Clear" ? "Sunny" : main}
                  </Text>
                </View>
                <View style={styles.detail_container}>
                  <View>
                    <Text style={{ ...styles.detail_bold, color: textColor }}>
                      {Math.floor(max)}°
                    </Text>
                    <Text style={{ ...styles.detail_light, color: textColor }}>
                      {Math.floor(min)}°
                    </Text>
                  </View>
                  <View>
                    <Text style={{ ...styles.detail_bold, color: textColor }}>
                      {pop * 100}% Precipitation
                    </Text>
                    <Text style={{ ...styles.detail_light, color: textColor }}>
                      {Math.floor(wind_speed * 3.6)}km/h Wind
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
