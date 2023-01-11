import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import uuid from "react-native-uuid";
import {
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import FamousSaying from "../components/FamousSaying";
import Weather from "../components/Weather";
import River from "../components/River";
import axios from "axios";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [content, setContent] = useState("");

  const [editId, setEditId] = useState("");
  const [editContent, setEditContent] = useState("");

  const [deletePw, setDeletePw] = useState("");

  const getPost = async () => {
    const getPostData = await axios.get("http://192.168.35.126:3001/posts");
    // const getPostData = await axios.get("http://192.168.200.115:3001/posts");

    /**
     * json 서버를 열 때 본인의 ip주소를 맞추어야한다
     * json 서버를 열 때 아래와 같이 입력한다
     * yarn json-server --watch db.json --port 3001 --host 192.168.35.126(192~부터는 자신의 ip주소임)
     * api.js에서 자신의 ip주소로 바꾸세요
     */

    setPosts(getPostData.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  const addPost = async () => {
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
    const todoItem = {
      id: uuid.v4(),
      userId,
      userPw,
      content,
      isEdit: false,
      isDelete: false,
    };
    await axios.post("http://192.168.35.126:3001/posts", todoItem);
    setPosts((prev) => [...prev, todoItem]);
  };
  const deletePost = (id) => {
    const newPosts = [...posts];
    const idx = newPosts.findIndex((post) => post.id === id);
    newPosts[idx].isDelete = !newPosts[idx].isDelete;
    setPosts(newPosts);
    setDeletePw("");
  };
  const deletePostValue = (item) => {
    const newPosts = [...posts];
    const idx = newPosts.findIndex((post) => post.id === item.id);
    newPosts[idx].isDelete = false;
    setPosts(newPosts);

    if (item.userPw === deletePw) {
      Alert.alert("삭제", "정말 삭제하시겠습니까?", [
        {
          text: "취소",
          style: "cancel",
          // onPress: () => console.log("취소 클릭!")
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.35.126:3001/posts/${item.id}`);
              const newPosts = posts.filter((i) => i.id !== item.id);
              setPosts(newPosts);
              setDeletePw("");
            } catch (error) {
              console.log("error : ", error);
            }
          },
        },
      ]);
      return;
    } else {
      alert("암호가 틀렸습니다222");
      return;
    }
  };

  const editPost = (id) => {
    const newPosts = [...posts];
    const idx = newPosts.findIndex((post) => post.id === id);
    newPosts[idx].isEdit = !newPosts[idx].isEdit;
    newPosts[idx].isDelete = !newPosts[idx].isDelete;
    setPosts(newPosts);
    setDeletePw("");
    return;
  };

  const editPostValue = async (item) => {
    // id 값받아서 배열 요소찾기(idx)
    const newPosts = [...posts];
    const idx = newPosts.findIndex((post) => post.id === item.id);
    if (item.userPw === deletePw) {
      try {
        const newPost = {
          userId: editId,
          content: editContent,
          isEdit: false,
          isDelete: false,
        };
        newPosts[idx].userId = editId;
        newPosts[idx].content = editContent;
        newPosts[idx].isEdit = false;
        newPosts[idx].isDelete = false;
        await axios.patch(
          `http://192.168.35.126:3001/posts/${item.id}`,
          newPost
        );
        setPosts(newPosts);
        setEditId("");
        setEditContent("");
        return;
      } catch (error) {
        console.log("error : ", error);
      }
    } else {
      newPosts[idx].isEdit = false;
      newPosts[idx].isDelete = false;
      alert("암호가 틀렸습니다");

      setPosts(newPosts);
      console.log(newPosts[idx]);
      return;
    }
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

        <ScrollView>
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

          <InputTitle>놀음판 벽보</InputTitle>
          <PostContainer>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {posts.map((item) => {
                return (
                  <PostItem key={item.id}>
                    <PostInputContainer>
                      {item.isEdit ? (
                        <>
                          <EditInputId
                            placeholder="개명할 존함을 작성해주세요."
                            value={editId}
                            onChangeText={setEditId}
                            onSubmitEditing={() => editPostValue(item)}
                          />
                          <EditInputContent
                            placeholder="수정할 벽보 내용을 입력해주세요."
                            onChangeText={setEditContent}
                            onSubmitEditing={() => editPostValue(item)}
                            value={editContent}
                          />
                        </>
                      ) : (
                        <>
                          <PostItemText
                            style={{
                              fontSize: 12,
                              marginLeft: 4,
                              marginBottom: 8,
                            }}
                          >
                            {item.userId}
                          </PostItemText>
                          <PostItemText style={{ fontSize: 16, marginLeft: 8 }}>
                            {item.content}
                          </PostItemText>
                        </>
                      )}
                    </PostInputContainer>
                    <ConfirmInputPwBtn>
                      <ConfirmInputPwContainer>
                        {item.isDelete && (
                          <ConfirmInputPw
                            placeholder="암호"
                            onChangeText={setDeletePw}
                            onSubmitEditing={() =>
                              item.isEdit
                                ? editPostValue(item)
                                : deletePostValue(item)
                            }
                          />
                        )}
                      </ConfirmInputPwContainer>
                      <PostBtnContainer>
                        <TouchableOpacity onPress={() => editPost(item.id)}>
                          <Text> 수정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePost(item.id)}>
                          <Text> 삭제</Text>
                        </TouchableOpacity>
                      </PostBtnContainer>
                    </ConfirmInputPwBtn>
                  </PostItem>
                );
              })}
            </KeyboardAvoidingView>
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
  height: 70px;
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
  height: 30px;
  padding: 0 12px;
  border: 1px solid #333;
  border-radius: 8px;
`;

const InputPw = styled.TextInput`
  width: 48%;
  height: 30px;
  padding: 0 12px;
  border: 1px solid #333;
  border-radius: 8px;
`;
const InputContent = styled.TextInput`
  height: 40px;
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
  padding-left: 12px;

  height: 30px;
`;

const EditInputId = styled.TextInput`
  width: 65%;
  padding-left: 8px;
  height: 30px;
  font-size: 12px;
`;

const ConfirmInputPw = styled.TextInput`
  height: 30px;
  width: 50%;
  flex-direction: row;
  margin-bottom: 15px;
  ::placeholder {
    text-align: center;
  }
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
