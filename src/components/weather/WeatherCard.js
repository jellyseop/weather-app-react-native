import { Dimensions, Text, View } from "react-native";

import { formatDate } from "../../utils/dateUtils";
import { styles } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const WeatherCard = ({ daily }) => {
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
};

export default WeatherCard;
