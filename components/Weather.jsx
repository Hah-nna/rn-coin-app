import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import styled from "@emotion/native";
import clear from "../weather-img/clear.png";
import cloud from "../weather-img/cloud.png";
import rain from "../weather-img/rain.png";
import snow from "../weather-img/snow.png";
import storm from "../weather-img/storm.png";

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

  if (city === "" || weather === "" || temp === "") {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Text>{city}</Text>
      <Text>
        {weather.toLowerCase().includes("clear") ? (
          <StWeatherImg source={clear} alt="weatherImg" />
        ) : weather.toLowerCase().includes("clouds") ? (
          <StWeatherImg source={cloud} alt="weatherImg" />
        ) : weather.toLowerCase().includes("rain") ? (
          <StWeatherImg source={rain} alt="weatherImg" />
        ) : weather.toLowerCase().includes("snow") ? (
          <StWeatherImg source={snow} alt="weatherImg" />
        ) : weather.toLowerCase().includes("thunderstorm") ? (
          <StWeatherImg source={storm} alt="weatherImg" />
        ) : weather.toLowerCase().includes("mist") ? (
          <StWeatherImg source={clear} alt="weatherImg" />
        ) : (
          weather
        )}
      </Text>
      <Text>{temp} °C</Text>
    </View>
  );
};

export default Weather;

const StWeatherImg = styled.Image`
  width: 30px;
  height: 30px;
`;
