import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail({ data, setData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const detail = data.find((item) => item.id === id);
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
          {detail.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {detail.content}
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
