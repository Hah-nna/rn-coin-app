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
    // isLoading: isLoadingNP,
    isRefetching,
  } = useInfiniteQuery(["infinitePersons"], () => getCoinList(), {
    getNextPageParam: (lastPage, allPages) => {
      return false;
      // 다음 페이지 요청에 사용될 pageParam값 return 하기
      // return true; // 여기서는 pageParam을 따로 사용하지 않기 떄문에 true return
    },
  });

  // if (coins) {
  // console.log(" coins : ", coins.pages[0].data);

  // for (let i of Object.values(coins)) {
  //   console.log(i);
  // }

  // console.log(" coins : ", coins.pages[0]);
  // console.log(" coins : ", coins.pageParams);
  // }

  // useEffect(() => {
  //   console.log(" coins : ", coins.pageParams);
  // }, [coins]);

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
          data={coins}
          renderItem={({ coins }) => <CoinListItem item={coins} />}
          // renderItem={getTopCoins.}
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
  background-color: black;
`;
