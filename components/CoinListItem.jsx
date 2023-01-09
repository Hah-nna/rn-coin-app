import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { useQuery } from "react-query";
import { getTopCoins, getCoinById } from "../api";
import coinPriceSlice from "../util/coinPriceSlice";

export default function CoinListItem({ coins }) {
  // console.log("coins : ", coins);
  const {
    name,
    symbol,
    quotes: {
      KRW: { price, percent_from_price_ath },
    },
  } = coins;
  return (
    <TouchableOpacity>
      <CoinItem>
        <FirstItemContainer>
          <Image
            source={{
              uri: `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/500`,
            }}
            style={{ width: 36, height: 36, marginBottom: 12 }}
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
