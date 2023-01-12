import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import coinPriceSlice from "../util/coinPriceSlice";

const MainTopCoins = ({ coin }) => {
  const { navigate } = useNavigation();
  const {
    name,
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
        <Image
          source={{
            uri: `https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
          }}
          style={{ width: 32, height: 32, marginBottom: 8 }}
        />
        <TopRateCoinName>{name}</TopRateCoinName>
        <TopRateCoinPrice>{coinPriceSlice(price)} 냥</TopRateCoinPrice>
        <TopRateCoinPercent percent={percent_from_price_ath}>{percent_from_price_ath}%</TopRateCoinPercent>
      </TopRateCoin>
    </TouchableOpacity>
  );
};

const TopRateCoin = styled.View`
  padding: 16px 0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itembgColor};
  justify-content: center;
  align-items: center;
`;

const TopRateCoinName = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.title};
`;

const TopRateCoinPrice = styled.Text`
  margin: 4px 0;
  font-size: 20px;
  color: ${({ theme }) => theme.title};
`;

const TopRateCoinPercent = styled.Text`
  font-size: 18px;
  color: ${({ percent }) => (percent > 0 ? "red" : "blue")};
`;

export default MainTopCoins;
