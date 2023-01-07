import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");

  const API_KEY = "358666cd643baa4035d9fdde8ff433bf";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("위치에 대한 액세스 권한이 거부되었습니다");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCity(data.name);
          setWeather(data.weather[0].main);
          setTemp(data.main.temp);
        });
    })();
  }, []);

  return (
    <View>
      <Text>{city}</Text>
      <Text>{weather}</Text>
      <Text>{temp}</Text>
    </View>
  );
};

export default Weather;
