import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/todolist";
export default function Main() {
  const data = useSelector((state) => state.todolist);
  const user = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={() =>
              user
                ? navigate("/create")
                : alert("로그인 후 사용 가능합니다.", navigate("login"))
            }
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {data.map(
          (
            item //data라는 state 안에있는 내용물을 map함수를 사용해 보여준다. state안에 배열형태로 들어있기때문에 map함수로 보여줄수있다.
          ) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#EEEEEE",
                height: "100px",
                borderRadius: "24px",
                marginBottom: "12px",
                display: "flex",
                padding: "12px 16px 12px 16px",
              }}
            >
              <div
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
                style={{
                  flex: 4,
                  borderRight: "1px solid lightgrey",
                  cursor: "pointer",
                }}
              >
                <h2>{item.title}</h2>
                <p
                  style={{
                    width: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.content}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  justifyContent: "space-around",
                  gap: "12px",
                }}
              >
                <div>{item.author}</div>
                <div>
                  <button
                    onClick={() => {
                      if (user !== null) {
                        if (item.author !== user.email) {
                          return alert("수정권한이 없습니다.");
                        } else {
                          return navigate(`/edit/${item.id}`);
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
                        if (item.author === user.email) {
                          if (window.confirm("삭제하시겠습니까?")) {
                            return (
                              dispatch(remove(item.id)),
                              alert("삭제되었습니다.")
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
              </div>
            </div>
          )
        )}
      </Container>
    </>
  );
}
