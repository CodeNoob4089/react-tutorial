import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    const auth = getAuth();

    // 이메일과 비밀번호의 유효성 검사
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    // 비밀번호와 확인용 비밀번호가 일치하는지 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다."); // return setError를 사용해도 되지만 값을 도출하고 바로 종료할때는 지금과 같은 방식으로 적어도된다.
      return;
    }

    // 비밀번호 유효성 검사 추가
    const isPasswordValid = (password) => {
      const hasUpperCase = /[A-Z]/.test(password); //정규표현식(RegExp) : 문자열을 검색, 치환, 추출하는데 사용되는 도구
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[@$!%*?&]/.test(password);

      return (
        password.length >= 8 &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar
      );
    };

    if (!isPasswordValid(password)) {
      setError(
        "올바른 형식의 비밀번호를 입력해주세요. 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함하고 최소 8자 이상이어야 합니다."
      );
      return;
    }

    try {
      // Firebase 인증 서비스를 사용하여 회원가입 처리
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("회원가입 성공:", user.email);

      // Firebase Firestore를 사용하여 회원 정보 저장
      const db = getFirestore(app);

      const usersCollectionRef = collection(db, "users");
      await addDoc(usersCollectionRef, {
        uid: user.uid,
        email: user.email,
      });

      console.log("회원 정보 저장 완료");
      window.alert("회원가입이 성공적으로 완료되었습니다.");
      navigator("/");
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      window.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호 확인"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              {error && (
                <div
                  style={{
                    color: "red",
                  }}
                >
                  {error}
                </div>
              )}
              <button
                type="button"
                onClick={handleSignup}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                onClick={() => {
                  navigator("/login");
                }}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
