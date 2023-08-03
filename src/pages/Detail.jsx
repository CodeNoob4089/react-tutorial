import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchPostById = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/posts/${id}`);
  console.log("Data from server: ", data);
  return data;
};

const deletePostById = async (id) => {
  await axios.delete(`http://localhost:4000/posts/${id}`);
};

export default function Detail() {
  const user = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const removePostMutation = useMutation(deletePostById, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const { data: detail } = useQuery(["post", id], () => fetchPostById(id));

  console.log(detail);
  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {detail?.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {detail?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              //if문 중첩은 헷갈릴수있으니 분리할 방법 찾아보기
              if (user !== null) {
                if (detail.author !== user.email) {
                  return alert("수정권한이 없습니다.");
                } else {
                  return navigate(`/edit/${detail.id}`);
                }
              } else {
                return alert("로그인이 필요합니다"), navigate("/login");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              if (user !== null) {
                if (detail.author === user.email) {
                  if (window.confirm("삭제하시겠습니까?")) {
                    removePostMutation.mutate(detail.id);
                    alert("삭제되었습니다.");
                    return navigate("/");
                  } else {
                    return;
                  }
                } else {
                  alert("삭제권한이 없습니다");
                }
              } else {
                return alert("로그인이 필요합니다"), navigate("/login");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </Container>
    </>
  );
}
