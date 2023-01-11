import React, { useState } from "react";
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
import { createPost, getPost, removePost, updatePost } from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Board() {
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [content, setContent] = useState("");

  const [editId, setEditId] = useState("");
  const [editContent, setEditContent] = useState("");

  const [deletePw, setDeletePw] = useState("");

  const {
    isLoading: getLoading,
    isError,
    data,
    error,
  } = useQuery("posts", getPost);
  const { isLoading: createLoading, mutate: createMutate } =
    useMutation(createPost);
  const { isLoading: editLoading, mutate: updateMutate } =
    useMutation(updatePost);
  const { isLoading: deleteLoading, mutate: deleteMutate } =
    useMutation(removePost);

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

    createMutate(todoItem, {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    });

    setUserId("");
    setUserPw("");
    setContent("");
  };
  const deletePost = (item) => {
    const itemData = {
      id: item.id,
      isDelete: !item.isDelete,
    };
    updateMutate(itemData, {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
      onError: (error) => {
        console.log("error : ", error);
      },
    });
    setDeletePw("");
    return;
  };
  const deletePostValue = (item) => {
    if (item.userPw === deletePw) {
      Alert.alert("삭제", "정말 삭제하시겠습니까?", [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            deleteMutate(item, {
              onSuccess: () => {
                queryClient.invalidateQueries("posts");
              },
              onError: (error) => {
                console.log("error : ", error);
              },
            });
            setDeletePw("");
          },
        },
      ]);
      return;
    } else {
      alert("암호가 틀렸습니다.");
      return;
    }
  };

  const editPost = (item) => {
    const itemData = {
      id: item.id,
      isEdit: !item.isEdit,
      isDelete: !item.isDelete,
    };
    updateMutate(itemData, {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
      onError: (error) => {
        console.log("error : ", error);
      },
    });
    setDeletePw("");
    return;
  };

  const editPostValue = (item) => {
    if (item.userPw === deletePw) {
      const newPost = {
        id: item.id,
        userId: editId,
        content: editContent,
        isEdit: false,
        isDelete: false,
      };
      updateMutate(newPost, {
        onSuccess: () => {
          queryClient.invalidateQueries("posts");
        },
      });
      setEditId("");
      setEditContent("");
      return;
    } else {
      alert("암호가 틀렸습니다");
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
                maxLength={10}
                onSubmitEditing={addPost}
                onChangeText={setUserId}
                value={userId}
                textContentType="username"
                placeholder="존함"
              />
              <InputPw
                maxLength={4}
                onSubmitEditing={addPost}
                onChangeText={setUserPw}
                value={userPw}
                textContentType="password"
                placeholder="암호"
              />
            </UserInfo>
            <InputContent
              maxLength={32}
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
              {data?.data &&
                data.data.map((item) => {
                  return (
                    <PostItem key={item.id}>
                      <PostInputContainer>
                        {item.isEdit ? (
                          <>
                            <EditInputId
                              placeholder="개명할 존함을 작성해주세요."
                              onChangeText={setEditId}
                              onSubmitEditing={() => editPostValue(item)}
                              value={editId}
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
                            <PostItemText
                              style={{ fontSize: 16, marginLeft: 8 }}
                            >
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
                          <TouchableOpacity onPress={() => editPost(item)}>
                            <Text>{item.isEdit ? "취소" : "수정"}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => deletePost(item)}>
                            <Text>
                              {item.isDelete && item.isEdit === false
                                ? "취소"
                                : "삭제"}
                            </Text>
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
  flex-direction: row;
  justify-content: flex-end;
`;

const ConfirmInputPwBtn = styled.View`
  justify-content: flex-end;
  width: 30%;
`;

const PostInputContainer = styled.View`
  width: 70%;
`;
