import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    position: "absolute", // position header absolutely
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0)",
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
