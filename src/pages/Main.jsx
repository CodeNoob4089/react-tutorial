import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
export default function Main({ data, setData }) {
  const navigate = useNavigate();

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
            onClick={() => {
              navigate("/create");
            }}
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
                      navigate(`/edit/${item.id}`);
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
                      alert("삭제할까?");
                      const removeData = (id) => {
                        //기존 data값에서 조건을 걸어두고 map으로 뿌려지고있는 현재의 data들에서 item.id와 data내의 id값이 일치하지 않는것들로만 새로 만들어서 data State를 새로 만들었다.
                        const newData = data.filter((item) => item.id !== id);
                        setData(newData);
                      };
                      removeData(item.id);
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
