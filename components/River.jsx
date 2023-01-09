import axios from "axios";
import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

const River = () => {
  const [riverTemp, setRiverTemp] = useState("");

  useEffect(() => {
    getRiverData();
  }, []);

  const getRiverData = async () => {
    const url = "https://api.hangang.msub.kr/";
    try {
      const riverData = await axios.get(url);
      setRiverTemp(riverData.data.temp);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  if (riverTemp === "") {
    return (
      <RiverTempContainer>
        <ActivityIndicator />
      </RiverTempContainer>
    );
  }
  return (
    <RiverTempContainer>
      <Text>현재 한강 온도</Text>
      <RiverTemp>{riverTemp} °C</RiverTemp>
    </RiverTempContainer>
  );
};

export default River;

const RiverTempContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RiverTemp = styled.Text`
  font-size: 40px;
`;
