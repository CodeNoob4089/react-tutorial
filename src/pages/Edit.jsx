import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit({ data, setData }) {
  const { id } = useParams();
  const detail = data.find((item) => item.id.toString() === id); //data에 들어있는 값들 중 useParams를 이용해서 가져온 id값과 일치하는 객체만 따로 꺼낸다.
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
              //수정기능 : newTodo라는 새로운 객체를 만들어서 id값은 기존의 data와 동일해야하니 유지를 하고 title과 content만 변경되게끔했다.
              const newTodo = {
                id: detail.id,
                title: title,
                content: content,
              };
              setData(
                (
                  prevData //setData를 통해 state를 변경하고자 했다. prevData는 기존 state배열이고 map을 사용해 id값이 일치하는 객체는 newTodo에 해당하는 값으로 변경되게하고 일치하지 않는 객체는 그대로 반환해 새로운 배엻을 만들게 했다.
                ) => prevData.map((item) => (item.id === id ? newTodo : item))
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
