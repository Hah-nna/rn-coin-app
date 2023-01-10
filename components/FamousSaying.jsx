import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FamousSaying = () => {
  const [saying, setSaying] = useState("");

  const getSaying = async () => {
    try {
      const { data } = await axios.get(
        `https://api.qwer.pw/request/helpful_text?apikey=guest`
      );
      setSaying(data[1].respond);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getSaying();
  }, []);

  return (
    <View>
      <Text>{saying}</Text>
    </View>
  );
};

export default FamousSaying;
