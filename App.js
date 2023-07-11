import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { getLoacation, getWeather, getCity } from "./src/api/api";
import { styles } from "./src/styles/globalStyles";

import LoadingIndicator from "./src/components/common/LoadingIndicator";
import WeatherCard from "./src/components/weather/WeatherCard";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("initializing...");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    setLoadingMsg("Getting Location...");
    try {
      const { latitude, longitude } = await getLoacation();

      const city = await getCity(latitude, longitude);
      setCity(city);

      setLoadingMsg("Getting Weather...");
      const data = await getWeather(latitude, longitude);
      setWeatherData(data);

      setIsLoading(false);
    } catch (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator loadingMsg={loadingMsg} />}
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
          {weatherData.map((daily, index) => (
            <WeatherCard daily={daily} key={index} />
          ))}
        </ScrollView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
