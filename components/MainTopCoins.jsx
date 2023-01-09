import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import coinPriceSlice from "../util/coinPriceSlice";

const MainTopCoins = ({ coin }) => {
  const { navigate } = useNavigation();
  const {
    name,
    symbol,
    quotes: {
      KRW: { price, percent_from_price_ath },
    },
  } = coin;

  return (
    <TouchableOpacity
      onPress={() =>
        navigate("Stacks", {
          screen: "detail",
          params: {
            coinId: coin.id,
          },
        })
      }
    >
      <TopRateCoin>
        <Image source={{ uri: `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/500` }} style={{ width: 36, height: 36, marginBottom: 12 }} />
        <TopRateCoinName>{name}</TopRateCoinName>
        <TopRateCoinPrice>{coinPriceSlice(price)} 냥</TopRateCoinPrice>
        <TopRateCoinPercent percent={percent_from_price_ath}>{percent_from_price_ath}%</TopRateCoinPercent>
      </TopRateCoin>
    </TouchableOpacity>
  );
};

const TopRateCoin = styled.View`
  height: 180px;
  border-radius: 10px;
  background-color: #efddae;
  justify-content: center;
  align-items: center;
`;

const TopRateCoinName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  font-family: SongMyung-Regular;
`;

const TopRateCoinPrice = styled.Text`
  font-size: 24px;
`;

const TopRateCoinPercent = styled.Text`
  font-size: 18px;
  color: ${({ percent }) => (percent > 0 ? "red" : "blue")};
`;

export default MainTopCoins;
