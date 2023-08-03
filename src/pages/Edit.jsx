import React, { Fragment, useState, useEffect } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const fetchPost = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/posts/${id}`);
  return data;
};

const updatePosts = async ({ id, title, content }) => {
  const { data } = await axios.patch(`http://localhost:4000/posts/${id}`, {
    title,
    content,
  });
  return data;
};

export default function Edit() {
  const queryClient = useQueryClient();
  const mutation = useMutation(updatePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigater = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const post = await fetchPost(id);
      setTitle(post.title);
      setContent(post.content);
    };

    fetchData();
  }, [id]);

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
            mutation.mutate({ id, title, content });
            navigater("/");
          }}
        >
          <div>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="제목"
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
              placeholder="내용"
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
            type="submit"
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
