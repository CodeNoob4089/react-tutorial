import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit({ data, setData }) {
  const { id } = useParams();
  const detail = data.find((item) => item.id.toString() === id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigater = useNavigate();

  return (
    <Fragment>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("제출!");
          }}
        >
          <div>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder={detail.title}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder={detail.content}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={() => {
              const newTodo = {
                id: detail.id,
                title: title,
                content: content,
              };
              setData((prevData) =>
                prevData.map((item) => (item.id === id ? newTodo : item))
              );
              navigater("/");
            }}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
