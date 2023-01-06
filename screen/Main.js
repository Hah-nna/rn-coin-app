import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

// <Logo source={require("../assets/icon.png")} />
export default function Main() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Container>
        <StatusBar style="auto" />
        <HeaderContainer>
          <Logo source={require("../assets/icon.png")} />
        </HeaderContainer>

        <Swiper>
          <TouchableOpacity
            onPress={() =>
              navigate("Stacks", {
                screen: "detail",
              })
            }
          >
            <TopRateCoin>
              <Image
                source={{ uri: "https://cryptoicons.org/api/icon/xrp/500" }}
                style={{ width: 36, height: 36, marginBottom: 12 }}
              />
              <TopRateCoinName>BitCoin</TopRateCoinName>
              <TopRateCoinPrice>90,000,000</TopRateCoinPrice>
              <TopRateCoinPercent>-48.12%</TopRateCoinPercent>
            </TopRateCoin>
          </TouchableOpacity>
        </Swiper>

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

const TopRateCoin = styled.View`
  height: 180px;
  border-radius: 10px;
  background-color: #efddae;
  justify-content: center;
  align-items: center;
`;

const TopRateLogo = styled.View`
  flex-direction: "row";
  justify-content: "center";
`;

const TopRateCoinName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  font-family: NotoSansKR-Regular;
`;

const TopRateCoinPrice = styled.Text`
  font-size: 24px;
`;

const TopRateCoinPercent = styled.Text`
  font-size: 18px;
  color: red;
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
