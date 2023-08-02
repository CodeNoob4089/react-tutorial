import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/todolist";

export default function Detail() {
  const data = useSelector((state) => state.todolist);
  const user = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  //옵셔널체이닝 생각
  const detail = data.find((item) => item.id === id); //data에 들어있는 값들 중 useParams를 이용해서 가져온 id값과 일치하는 객체만 따로 꺼낸다.
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
                    return (
                      dispatch(remove(detail.id)),
                      alert("삭제되었습니다."),
                      navigate("/")
                    );
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
