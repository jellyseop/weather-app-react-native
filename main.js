import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { styles } from "./styles";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { formatDate } from "./util";
import { API_KEY } from "./const";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      const { latitude, longitude } = await getLoacation();
      if (!latitude || !longitude) {
        setErrorMsg("Plz restart");
      }
      await getCity(latitude, longitude);
      await getWeather(latitude, longitude);

      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View></View>
      ) : (
        <>
          <View style={styles.appBar}>
            <Text style={styles.city}>{city}</Text>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            onMomentumScrollEnd={(event) => console.log(event)}
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
              if (main == "Rain" || main == "Drizzle") {
                backgroundColor = "#38bdf8";
              }
              if (main == "Snow") {
                backgroundColor = "#f0f9ff";
              }
              if (main == "Clear") {
                backgroundColor = "#FFF338";
              }
              if (main == "Clouds") {
                backgroundColor = "#e5e7eb";
              }
              return (
                <View
                  style={{ width: SCREEN_WIDTH - 40, backgroundColor }}
                  key={index}
                >
                  <View style={styles.date_container}>
                    <Text style={styles.day}>{day}</Text>
                    <Text style={styles.month}>{date + "  " + month}</Text>
                  </View>
                  <View style={styles.weather_container}>
                    <Text style={styles.temperature}>{Math.floor(today)}°</Text>
                    <Text style={styles.desc}>{main}</Text>
                  </View>
                  <View style={styles.detail_container}>
                    <View>
                      <Text style={styles.detail_bold}>{Math.floor(max)}°</Text>
                      <Text style={styles.detail_light}>
                        {Math.floor(min)}°
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.detail_bold}>
                        {pop * 100}% Precipitation
                      </Text>
                      <Text style={styles.detail_light}>
                        {Math.floor(wind_speed * 3.6)}km/h Wind
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
