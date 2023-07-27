import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail({ data, setData }) {
  const navigate = useNavigate();
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
              navigate(`/edit/${detail.id}`);
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
              removeData(detail.id);
              navigate("/");
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
