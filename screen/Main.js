import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Swiper from "react-native-swiper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import MainTopCoins from "../components/MainTopCoins";
import { useQuery } from "react-query";
import { getCoinList, getTopCoins } from "../api";
import CoinListItem from "../components/CoinListItem";
import { useInfiniteQuery, useQueryClient } from "react-query";

// <Logo source={require("../assets/icon.png")} />
export default function Main() {
  const { data, isLoading } = useQuery("topCoins", getTopCoins);
  const {
    data: coins,
    isLoading: isLoadingCL,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["getCoins"], getCoinList, {
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1;
    },
  });
  // console.log('coins : ', coins);
  const fetchMore = async () => {
    // fetch next page!
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  if (isLoading || isLoadingCL) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Container>
        <StatusBar style="auto" />
        <HeaderContainer>
          <Logo source={require("../assets/icon.png")} />
        </HeaderContainer>

        <Swiper autoplay={true} loop={true} showsPagination={false}>
          {data &&
            data.data
              .slice(0, 5)
              .map((coin) => <MainTopCoins key={coin.id} coin={coin} />)}
        </Swiper>

        <ListHeader>
          <ListHeaderText>동전 장부</ListHeaderText>
          <TouchableOpacity>
            <ListHeaderText>▼ 거름망</ListHeaderText>
          </TouchableOpacity>
        </ListHeader>
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
  margin: 12px 0;
  border-radius: 10px;
`;

const ListHeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  color: #a58224;
`;

const CoinContainer = styled.FlatList`
  flex: 2.2;
`;
