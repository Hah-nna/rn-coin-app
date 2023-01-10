import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import coinPriceSlice from "../util/coinPriceSlice";
import { useNavigation } from "@react-navigation/native";

export default function CoinListItem({ coins }) {
  const { navigate } = useNavigation();
  const {
    id,
    name,
    symbol,
    quotes: {
      KRW: { price, percent_from_price_ath },
    },
  } = coins;

  return (
    <TouchableOpacity
      onPress={() =>
        navigate("Stacks", {
          screen: "detail",
          params: {
            coinId: id,
          },
        })
      }
    >
      <CoinItem>
        <FirstItemContainer>
          <Image
            source={{
              uri: `https://static.coinpaprika.com/coin/${id}/logo.png`,
            }}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <CoinItemText>{symbol}</CoinItemText>
        </FirstItemContainer>
        <CoinItemText>{name}</CoinItemText>
        <CoinItemText>{coinPriceSlice(price)} 냥</CoinItemText>
      </CoinItem>
    </TouchableOpacity>
  );
}

const CoinItem = styled.View`
  margin-bottom: 12px;
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #efddae;
`;

const FirstItemContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const CoinItemText = styled.Text`
  color: #333;
  font-weight: bold;
`;
