import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { useQuery } from "react-query";
import { getTopCoins, getCoinById } from "../api";

export default function CoinListItem() {
  //   const getRequestsQuery = useInfiniteQuery('queryKey', ({ pageParam = 0 }) => {
  //     return RequestService.getRequests(pageParam);
  // }, {
  // getNextPageParam: (lastPageData: PageResult) => {
  //   return lastPageData.last ? undefined : lastPageData.number + 1;
  // },
  // onSuccess: (result: InfiniteData<PageResult>) => {
  //   console.log('==== Request 리스트 조회 성공 ====');
  //   console.log(result);
  // },
  // onError: (err: AxiosError) => {
  //   console.log(err.message);
  // },
  // keepPreviousData: true
  // })

  return (
    <TouchableOpacity>
      <CoinItem>
        <FirstItemContainer>
          <CoinItemText>로고</CoinItemText>
          <CoinItemText>심볼</CoinItemText>
        </FirstItemContainer>
        <CoinItemText>이름</CoinItemText>
        <CoinItemText>가격</CoinItemText>
      </CoinItem>
    </TouchableOpacity>
  );
}

const CoinItem = styled.View`
  margin-bottom: 12px;
  padding: 20px 0px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  background-color: #efddae;
`;

const FirstItemContainer = styled.View``;

const CoinItemText = styled.Text`
  color: #333;
  font-weight: bold;
`;
