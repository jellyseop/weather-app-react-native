import { StyleSheet } from "react-native";
//FFF338
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  appBar: {
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  date_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  weather_container: {
    flex: 3,
    justifyContent: "center",
    borderTopWidth: 2.5,
    borderBottomWidth: 2.5,
    borderBottomColor: "black",
  },
  detail_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 45,
  },
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
  detail_bold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail_light: {
    fontSize: 18,
    fontWeight: "500",
  },
});
