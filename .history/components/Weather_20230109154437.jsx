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
        alert(
          "위치에 대한 액세스 권한이 거부되었습니다. 설정에서 권한을 허용해주세요."
        );
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

  const getWeatherSrc = () => {
    const weatherLowerCase = weather.toLowerCase();
    if (weatherLowerCase.includes("clear")) {
      return clear;
    }
    if (weatherLowerCase.includes("clouds")) {
      return cloud;
    }
    if (weatherLowerCase.includes("rain")) {
      return rain;
    }
    if (weatherLowerCase.includes("snow")) {
      return snow;
    }
    if (weatherLowerCase.includes("thunderstorm")) {
      return storm;
    }
    if (weatherLowerCase.includes("mist")) {
      return clear;
    }
    return weather;
  };

  return (
    <WeatherContainer>
      <Text>{city}</Text>
      <Text>
        <WeatherImg source={getWeatherSrc()} alt="weatherImg" />
      </Text>
      <Text>{temp} °C</Text>
    </WeatherContainer>
  );
};

export default Weather;

const WeatherContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WeatherImg = styled.Image`
  width: 40px;
  height: 40px;
  margin-top: 4px;
`;
