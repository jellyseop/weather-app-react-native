import dayjs from "dayjs";

const dayMapper = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export const formatDate = (milisecond) => {
  const dateObj = dayjs(milisecond * 1000);

  const day = dayMapper[dateObj.day()];
  const month = dateObj.format("MMMM");
  const date = dateObj.format("DD");

  return { day, month, date };
};
