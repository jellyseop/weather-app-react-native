import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.city}>SEOUL</Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.day}>Monday</Text>
        <Text style={styles.month}>04 September</Text>
      </View>
      <View style={styles.weather}>
        <Text style={styles.temperature}>27°</Text>
        <Text style={styles.desc}>Sunny</Text>
      </View>
      <View style={styles.meta}>
        <View style={{ flex: 1.4 }}>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>21°</Text>
          <Text style={{ fontSize: "20px", fontWeight: "500" }}>8°</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
            0% Precipitation
          </Text>
          <Text style={{ fontSize: "18px", fontWeight: "500" }}>
            3km/h Wind
          </Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF338",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: {
    flex: 0.8,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  date: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  weather: {
    flex: 3,
    justifyContent: "center",
    width: "100%",
    borderTopWidth: 2.5,
    borderBottomWidth: 2.5,
    borderBottomColor: "black",
  },
  meta: { flex: 1, flexDirection: "row", width: "100%", paddingTop: 45 },
  city: {
    fontSize: 20,
    fontWeight: "500",
  },
  day: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 3,
  },
  month: {
    fontSize: 24,
    fontWeight: "500",
  },
  temperature: {
    fontSize: 136,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 24,
    fontWeight: "500",
  },
});
