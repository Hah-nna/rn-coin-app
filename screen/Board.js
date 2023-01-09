import React, { useState } from "react";
import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import FamousSaying from "../components/FamousSaying";
import Weather from "../components/Weather";
import River from "../components/River";
// import prompt from "react-native-prompt-android";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [content, setContent] = useState("");

  const [editId, setEditId] = useState("");
  const [editContent, setEditContent] = useState("");

  const [deletePw, setDeletePw] = useState("");

  console.log("posts22", posts);

  const newPost = {
    id: Date.now(),
    userId,
    userPw,
    content,
    isEdit: false,
    isDelete: false,
  };

  const addPost = () => {
    const userIdValue = userId.trim();
    const userPwValue = userPw.trim();
    const contentValue = content.trim();

    if (!userIdValue) {
      alert("존함을 입력해주세요");
      setUserId("");
      return;
    }

    if (!userPwValue) {
      alert("암호를 입력해주세요");
      setUserPw("");
      return;
    }

    if (!contentValue) {
      alert("Comment writing PLZ");
      setContent("");
      return;
    }

    setPosts((prev) => [...prev, newPost]);
  };

  const DeletePost = (item) => {
    const newPosts = [...posts];
    const idx = newPost.findIndex((post) => post.id === item.id);
    newPosts[idx].isDelete === !newPosts[idx].isDelete;
    setPosts(newPosts);

    if (item.userPw === userPw) {
    }
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 클릭!"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const newPosts = posts.filter((i) => i.id !== item.id);
          setPosts(newPosts);
        },
      },
    ]);
  };

  const EditPost = (id) => {
    const newPosts = [...posts];
    const idx = newPosts.findIndex((post) => post.id === id);
    newPosts[idx].isEdit = !newPosts[idx].isEdit;
    setPosts(newPosts);
  };

  const EditPostValue = (item) => {
    // id 값받아서 배열 요소찾기(idx)
    const newPosts = [...posts];
    const idx = newPosts.findIndex((post) => post.id === item.id);
    newPosts[idx].userId = editId;
    newPosts[idx].userPw = editPw;
    newPosts[idx].content = editContent;
    newPosts[idx].isEdit = false;
    setPosts(newPosts);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Container>
        <StatusBar style="auto" />
        <HeaderContainer>
          <RiverView>
            <River />
          </RiverView>
          <WeatherView>
            <Weather />
          </WeatherView>
        </HeaderContainer>

        <SayingContainer>
          <FamousSaying />
        </SayingContainer>

        <InputContainer>
          <InputTitle>벽보 붙이기</InputTitle>
          <UserInfo>
            <InputId
              onSubmitEditing={addPost}
              onChangeText={setUserId}
              value={userId}
              textContentType="username"
              placeholder="존함"
            />
            <InputPw
              onSubmitEditing={addPost}
              onChangeText={setUserPw}
              value={userPw}
              textContentType="password"
              placeholder="암호"
            />
          </UserInfo>
          <InputContent
            onSubmitEditing={addPost}
            onChangeText={setContent}
            value={content}
            placeholder="Comment writing, PLZ ENTER "
          />
        </InputContainer>

        <ScrollView>
          <InputTitle>놀음판 벽보</InputTitle>
          <PostContainer>
            {posts.map((item) => {
              return (
                <PostItem key={item.id}>
                  <PostInputContainer>
                    {item.isEdit ? (
                      <EditInputId
                        value={editId}
                        onChangeText={setEditId}
                        onSubmitEditing={() => EditPostValue(item)}
                      />
                    ) : (
                      <PostItemText
                        style={{ fontSize: 12, marginLeft: 4, marginBottom: 8 }}
                      >
                        {item.userId}
                      </PostItemText>
                    )}
                    {item.isEdit ? (
                      <EditInputContent
                        onChangeText={setEditContent}
                        onSubmitEditing={() => EditPostValue(item)}
                        value={editContent}
                      />
                    ) : (
                      <PostItemText style={{ fontSize: 16, marginLeft: 8 }}>
                        {item.content}
                      </PostItemText>
                    )}
                  </PostInputContainer>
                  <ConfirmInputPwBtn>
                    <ConfirmInputPwContainer>
                      <ConfirmInputPw />
                    </ConfirmInputPwContainer>
                    <PostBtnContainer>
                      <TouchableOpacity onPress={() => EditPost(item.id)}>
                        <Text> 수정</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => DeletePost(item)}>
                        <Text> 삭제</Text>
                      </TouchableOpacity>
                    </PostBtnContainer>
                  </ConfirmInputPwBtn>
                </PostItem>
              );
            })}
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
  margin-bottom: 12px;
`;
const RiverView = styled.View`
  flex: 1;
  margin-right: 5px;
`;
const WeatherView = styled.View`
  flex: 1;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`;

const SayingContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 12px;
  border: 1px solid #000;
  padding: 2px;
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
  flex-direction: row;
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

const EditInputContent = styled.TextInput`
  background-color: lightblue;
  height: 30px;
`;

const EditInputId = styled.TextInput`
  background-color: gray;
  height: 30px;
`;

const ConfirmInputPw = styled.TextInput`
  background-color: yellow;
  height: 30px;
  width: 60%;
  flex-direction: row;
`;

const ConfirmInputPwContainer = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: flex-end;
  /* margin-bottom: 40px; */
`;

const ConfirmInputPwBtn = styled.View`
  justify-content: flex-end;
  width: 30%;
`;

const PostInputContainer = styled.View`
  width: 70%;
`;
