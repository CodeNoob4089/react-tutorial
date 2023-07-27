import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const initialState = [
    {
      id: nanoid(),
      title: "리액트 복습하기",
      content: "리액트 내용 복습하기",
      author: "작성자",
    },
    {
      id: nanoid(),
      title: "리덕스툴킷 복습하기",
      content: "리덕스툴킷 내용 복습하기",
      author: "작성자",
    },
    {
      id: nanoid(),
      title: "타입스크립트 공부하기",
      content: "타입스크립트 공부하기",
      author: "작성자",
    },
  ];
  const [data, setData] = useState(initialState); //useState를 사용해 data를 state화 시키고 initialState를 따로 만들어서 기본값으로 지정했다.

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main data={data} setData={setData} />} />

      <Route
        path="/detail/:id"
        element={<Detail data={data} setData={setData} />}
      />
      <Route
        path="/create"
        element={<Create data={data} setData={setData} />}
      />
      <Route
        path="/edit/:id"
        element={<Edit data={data} setData={setData} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
