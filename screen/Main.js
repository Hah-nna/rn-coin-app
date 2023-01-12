import styled from "@emotion/native";
import { Platform, StatusBar as IOSStatusBar } from "react-native";
import { StatusBar as AndroidStatusBar } from "expo-status-bar";
import { Text, SafeAreaView, Image } from "react-native";
import Swiper from "react-native-swiper";
import MainTopCoins from "../components/MainTopCoins";
import { useQuery } from "react-query";
import { getCoinList, getTopCoins, searchCoin } from "../api";
import CoinListItem from "../components/CoinListItem";
import { useInfiniteQuery } from "react-query";
import { useState } from "react";
import coinPriceSlice from "../util/coinPriceSlice";
import { useColorScheme } from "react-native";

export default function Main() {
  const isDark = useColorScheme() === "dark";

  const [searchCoinInfo, setSearchCoin] = useState("");
  const { data, isLoading } = useQuery("topCoins", getTopCoins);
  const { data: searchCoinData } = useQuery("searchCoins", searchCoin);
  const submitCoin = (text) => {
    for (let i = 0; i < 2500; i++) {
      if (searchCoinData.data[i].symbol.toLowerCase() === text.toLowerCase()) {
        setSearchCoin(searchCoinData.data[i]);
        return false;
      } else {
        setSearchCoin("");
      }
    }
  };
  const {
    data: coins,
    isLoading: isLoadingCL,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["getCoins"], getCoinList, {
    getNextPageParam: () => {
      return true;
    },
    retry: 100,
  });
  const fetchMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  if (isLoading || isLoadingCL) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? "#273c75" : "#f2f2f2" }}
    >
      <Container>
        {Platform.OS === "ios" ? (
          <IOSStatusBar barStyle={"dark-content"} />
        ) : (
          <AndroidStatusBar />
        )}
        <HeaderContainer>
          <Logo source={require("../assets/icon.png")} />
        </HeaderContainer>
        <ListHeaderText>今日 半時辰 基準 去來量 上位 五</ListHeaderText>
        <DescText>(금일 반시진 기준 거래량 상위 다섯)</DescText>
        <Swiper autoplay={true} loop={true} showsPagination={false}>
          {data &&
            data.data
              .slice(0, 5)
              .map((coin) => <MainTopCoins key={coin.id} coin={coin} />)}
        </Swiper>
        <ListHeader>
          <ListHeaderText>엽전 장부</ListHeaderText>
          <SearchTextInput
            placeholder="심볼 검색(ex. btc)"
            onChangeText={submitCoin}
          />
        </ListHeader>
        {searchCoinInfo === "" ? (
          <SearchView>
            <Text style={{ color: "gray" }}>
              엽전의 상징(심볼)을 검색해보세요.
            </Text>
          </SearchView>
        ) : (
          <SearchView>
            <Image
              source={{
                uri: `https://static.coinpaprika.com/coin/${searchCoinInfo.id}/logo.png`,
              }}
              style={{ width: 24, height: 24, marginRight: 12 }}
            />
            <Text>{searchCoinInfo.symbol}</Text>
            <Text>{searchCoinInfo.name}</Text>
            <Text>{coinPriceSlice(searchCoinInfo.quotes.KRW.price)} 냥</Text>
          </SearchView>
        )}
        <CoinContainer
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
          data={coins.pages.map((page) => page.data).flat()}
          renderItem={({ item }) => <CoinListItem coins={item} />}
          keyExtractor={(item) => item.id}
        />
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
  padding: 4px 0;
  border-radius: 10px;
`;

const ListHeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 0px 4px;
  color: #a58224;
`;
const DescText = styled.Text`
  font-size: 8px;
  padding: 4px;
  color: #a58224;
`;
const CoinContainer = styled.FlatList`
  flex: 2;
`;
const SearchView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  margin: 8px;
`;
const SearchTextInput = styled.TextInput`
  border: 1px solid gray;
  border-radius: 10px;
  width: 150px;
  text-align: center;
`;
