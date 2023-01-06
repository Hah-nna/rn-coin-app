import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  useColorScheme,
  Text,
  View,
  ImageBackground,
} from "react-native";
import styled from "@emotion/native";

import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "react-query";

export default function Detail({ navigation: { navigate } }) {
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Coin Name</HeaderTitle>
      </HeaderContainer>

      <UpdatedDateContainer>
        <UpdatedDate>2023.01.01</UpdatedDate>
      </UpdatedDateContainer>

      <View>
        <BackgroundImg source={require("../assets/paper.png")}>
          <CoinPrice>90,000,000</CoinPrice>
          <CoinPercentContainer>
            <CoinPercentItem>
              <CoinPercentContent>왼쪽</CoinPercentContent>
              <CoinPercentContent>오른쪽</CoinPercentContent>
            </CoinPercentItem>
            <CoinPercentItem>
              <CoinPercentContent>왼쪽</CoinPercentContent>
              <CoinPercentContent>오른쪽</CoinPercentContent>
            </CoinPercentItem>
            <CoinPercentItem>
              <CoinPercentContent>왼쪽</CoinPercentContent>
              <CoinPercentContent>오른쪽</CoinPercentContent>
            </CoinPercentItem>
            <CoinPercentItem>
              <CoinPercentContent>왼쪽</CoinPercentContent>
              <CoinPercentContent>오른쪽</CoinPercentContent>
            </CoinPercentItem>
          </CoinPercentContainer>
          <HighFlowContainer>
            <HighFlowTitle>고점 대비 흐름 : -75%</HighFlowTitle>
            <HighFlowPrice>절대 다시 안 오는 가격</HighFlowPrice>
          </HighFlowContainer>
        </BackgroundImg>
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 12px 0;
`;

const HeaderTitle = styled.Text`
  font-size: 32px;
  text-align: center;
`;

const UpdatedDateContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const UpdatedDate = styled.Text`
  font-size: 12px;
  color: gray;
`;

const BackgroundImg = styled.ImageBackground`
  margin: 0 10px;
  height: 90%;
  align-items: center;
`;

const CoinPrice = styled.Text`
  font-size: 32px;
  text-align: center;
  margin: 20px 0;
`;

const CoinPercentContainer = styled.View`
  width: 100%;
  height: 45%;
`;

const CoinPercentItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px;
`;
const CoinPercentContent = styled.Text`
  font-size: 32px;
`;

const HighFlowContainer = styled.View`
  width: 100%;
  height: 20%;
  padding: 0 20px;
`;

const HighFlowTitle = styled.Text`
  font-size: 30px;
`;

const HighFlowPrice = styled.Text`
  font-size: 22px;
`;
