import React from "react";
import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

export default function Board() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Container>
        <StatusBar style="auto" />
        <HeaderContainer>
          <River />
          <Weather />
        </HeaderContainer>

        <SayingContainer>
          <SayingContents>하이</SayingContents>
        </SayingContainer>

        <InputContainer>
          <InputTitle>벽보 붙이기</InputTitle>
          <UserInfo>
            <InputId textContentType="username" placeholder="존함" />
            <InputPw textContentType="password" placeholder="암호" />
          </UserInfo>
          <InputContent placeholder="Comment writing, PLZ ENTER " />
        </InputContainer>

        <ScrollView>
          <InputTitle>놀음판 벽보</InputTitle>
          <PostContainer>
            <PostItem>
              <PostItemText
                style={{ fontSize: "12px", marginLeft: 4, marginBottom: 8 }}>
                이름
              </PostItemText>
              <PostItemText style={{ fontSize: "16px", marginLeft: 8 }}>
                내용
              </PostItemText>
              <PostBtnContainer>
                <TouchableOpacity>
                  <Text> 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text> 삭제</Text>
                </TouchableOpacity>
              </PostBtnContainer>
            </PostItem>
          </PostContainer>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  padding: 8px;
  flex: 1;
`;

const HeaderContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: center;
  background-color: blue;
  margin-bottom: 12px;
`;
const River = styled.View`
  flex: 1;
  background-color: red;
  margin-right: 5px;
`;
const Weather = styled.View`
  flex: 1;
  background-color: black;
  margin-left: 5px;
`;

const SayingContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 12px;
  background-color: yellow;
`;
const SayingContents = styled.Text`
  font-weight: 500;
`;

const InputContainer = styled.View``;

const InputTitle = styled.Text`
  margin-bottom: 12px;
  font-weight: 500;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const InputId = styled.TextInput`
  width: 48%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #333;
  border-radius: 8px;
`;

const InputPw = styled.TextInput`
  width: 48%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #333;
  border-radius: 8px;
`;
const InputContent = styled.TextInput`
  height: 80px;
  margin-bottom: 12px;
  padding: 0 12px;
  border: 1px solid #333;
  border-radius: 8px;
`;

const PostContainer = styled.View`
  flex: 1;
`;

const PostItem = styled.View`
  height: 80px;
  margin-bottom: 12px;
  padding: 8px;
  justify-content: space-around;
  border-radius: 10px;
  background-color: #efddae;
`;

const PostItemText = styled.Text`
  color: #333;
  font-weight: bold;
`;

const PostBtnContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
