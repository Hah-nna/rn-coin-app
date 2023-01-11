import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import styled from "@emotion/native";
import { useQuery } from "react-query";
import { getCoinById } from "../api";
import coinPriceSlice from "../util/coinPriceSlice";

export default function Detail({
  route: {
    params: { coinId },
  },
}) {
  const { data, isLoading } = useQuery(["detailCoin", coinId], getCoinById);

  if (isLoading) {
    return <Text>loading ...</Text>;
  }

  const {
    data: {
      name,
      symbol,
      last_updated,
      quotes: {
        KRW: {
          price,
          percent_change_15m,
          percent_change_30m,
          percent_change_1h,
          percent_change_24h,
          ath_price,
          percent_from_price_ath,
        },
      },
    },
  } = data;

  return (
    <ScrollView>
      <Container>
        {data && (
          <>
            <HeaderContainer>
              <Image
                source={{
                  uri: `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/500`,
                }}
                style={{ width: 36, height: 36, marginRight: 12 }}
              />
              <HeaderTitle>{name}</HeaderTitle>
            </HeaderContainer>
            <UpdatedDateContainer>
              <UpdatedDate>{last_updated.split("T")[0]}</UpdatedDate>
            </UpdatedDateContainer>
            <View>
              <BackgroundImg source={require("../assets/paper.png")}>
                <CoinPrice>{coinPriceSlice(price)} 냥</CoinPrice>
                <CoinPercentContainer>
                  <CoinPercentItem>
                    <CoinPercentContent>15m</CoinPercentContent>
                    <CoinPercentContent percent={percent_change_15m}>
                      {percent_change_15m} %
                    </CoinPercentContent>
                  </CoinPercentItem>
                  <CoinPercentItem>
                    <CoinPercentContent>30m</CoinPercentContent>
                    <CoinPercentContent percent={percent_change_30m}>
                      {percent_change_30m} %
                    </CoinPercentContent>
                  </CoinPercentItem>
                  <CoinPercentItem>
                    <CoinPercentContent>1h</CoinPercentContent>
                    <CoinPercentContent percent={percent_change_1h}>
                      {percent_change_1h} %
                    </CoinPercentContent>
                  </CoinPercentItem>
                  <CoinPercentItem>
                    <CoinPercentContent>24h</CoinPercentContent>
                    <CoinPercentContent percent={percent_change_24h}>
                      {percent_change_24h} %
                    </CoinPercentContent>
                  </CoinPercentItem>
                </CoinPercentContainer>
                <HighFlowContainer>
                  <HighFlowTitle>
                    고점 대비 흐름 : {percent_from_price_ath} %
                  </HighFlowTitle>
                  <HighFlowPrice>
                    절대 다시 안 오는 가격 : {coinPriceSlice(ath_price)} 냥
                  </HighFlowPrice>
                </HighFlowContainer>
              </BackgroundImg>
              <GambleWrap>
                <GambleImage source={require("../assets/gamble.png")} />
              </GambleWrap>
            </View>
          </>
        )}
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #efddae;
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
  align-items: center;
`;

const CoinPrice = styled.Text`
  font-size: 32px;
  text-align: center;
  margin: 20px 0;
`;

const CoinPercentContainer = styled.View`
  width: 100%;
`;

const CoinPercentItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 4px 40px;
`;
const CoinPercentContent = styled.Text`
  font-size: 32px;
  color: ${({ percent }) =>
    percent ? (percent < 0 ? "blue" : "red") : "black"};
`;

const HighFlowContainer = styled.View`
  width: 100%;
  margin: 20px 0px;
  padding: 0 20px;
  align-items: center;
`;

const HighFlowTitle = styled.Text`
  font-size: 30px;
`;

const HighFlowPrice = styled.Text`
  font-size: 20px;
`;
const GambleWrap = styled.View`
  align-items: center;
`;
const GambleImage = styled.Image`
  margin-top: 20px;
  width: 338px;
  height: 210px;
`;
