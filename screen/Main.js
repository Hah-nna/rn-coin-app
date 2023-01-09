import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import MainTopCoins from "../components/MainTopCoins";
import { useQuery } from "react-query";
import { getTopCoins } from "../api";

// <Logo source={require("../assets/icon.png")} />
export default function Main() {
  const { data, isLoading } = useQuery("topCoins", getTopCoins);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Container>
        <StatusBar style="auto" />
        <HeaderContainer>
          <Logo source={require("../assets/icon.png")} />
        </HeaderContainer>
        <Swiper showsPagination={false}>{data && data.data.slice(0, 5).map((coin) => <MainTopCoins key={coin.id} coin={coin} />)}</Swiper>
        <ListHeader>
          <ListHeaderText>동전 장부</ListHeaderText>
          <TouchableOpacity>
            <ListHeaderText>▼ 거름망</ListHeaderText>
          </TouchableOpacity>
        </ListHeader>
        <ScrollView>
          <CoinContainer>
            <TouchableOpacity>
              <CoinItem>
                <CoinItemText>안녕하세용</CoinItemText>
                <CoinItemText>안녕하세용</CoinItemText>
                <CoinItemText>안녕하세용</CoinItemText>
              </CoinItem>
            </TouchableOpacity>
          </CoinContainer>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  padding: 8px;
  flex: 1;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 72px;
  height: 72px;
  margin-bottom: 10px;
`;

const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  border-radius: 10px;
`;

const ListHeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  color: #a58224;
`;

const CoinContainer = styled.View`
  flex: 1;
  /* height: 100%; */
  background-color: black;
`;

const CoinItem = styled.View`
  height: 80px;
  margin-bottom: 12px;
  padding: 8px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  background-color: #efddae;
`;

const CoinItemText = styled.Text`
  color: #333;
  font-weight: bold;
`;
