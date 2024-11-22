import { useRecoilState, useSetRecoilState } from "recoil";
import { authState, isOpenAuthModal } from "../../../recoil/atoms/auth";
import BaseModal from "../BaseModal";
import styled from "styled-components";
import { useState } from "react";
import { alert } from "../../../utils/alert";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenAuthModal);
  const setAuth = useSetRecoilState(authState);
  const [step, setStep] = useState("login"); // login => 로그인 화면, join-id => 회원가입 아이디 화면, join-pw =>회원가입 비밀번호 화면
  const handleActiveTrial = () => {
    setAuth(true);
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
  };

  const handleCompleteJoin = () => {
    alert("회원가입이 완료되었습니다", "success");
    setStep("login");
  };

  const LoginContent = (
    <Content>
      <Title>로그인</Title>
      <InputContent>
        <span>아이디</span>
        <Input placeholder="아이디를 입력해주세요" />
      </InputContent>
      <InputContent>
        <span>비밀번호</span>
        <Input placeholder="비밀번호를 입력해주세요" type="password" />
        <TextButton>비밀번호 찾기</TextButton>
      </InputContent>
      <ButtonWrapper>
        <LoginButton>로그인</LoginButton>
        <TrialLoginButton onClick={handleActiveTrial}>
          체험판 로그인
        </TrialLoginButton>
      </ButtonWrapper>
      <BottomContent>
        <span>계정이 없으신가요?</span>
        <TextButton
          onClick={() => {
            setStep("join-id");
          }}
        >
          회원가입
        </TextButton>
      </BottomContent>
    </Content>
  );

  const JoinContent = (
    <Content>
      <Title>회원가입</Title>
      {step === "join-id" ? (
        <>
          <InputContent>
            <span>닉네임</span>
            <Input placeholder="닉네임을 입력해주세요" />
          </InputContent>
          <InputContent>
            <span>아이디</span>
            <Input placeholder="아이디를 입력해주세요" />
          </InputContent>

          <LoginButton onClick={() => setStep("join-pw")}>계속</LoginButton>
        </>
      ) : step === "join-pw" ? (
        <>
          <InputContent>
            <span>비밀번호</span>
            <Input placeholder="비밀번호를 입력해주세요" type="password" />
          </InputContent>
          <InputContent>
            <span>비밀번호 재확인</span>
            <Input placeholder="비밀번호를 재확인해주세요" type="password" />
          </InputContent>
          <ButtonWrapper>
            <TrialLoginButton onClick={() => setStep("join-id")}>
              이전으로
            </TrialLoginButton>
            <LoginButton onClick={handleCompleteJoin}>완료</LoginButton>
          </ButtonWrapper>
        </>
      ) : (
        <></>
      )}
      <BottomContent>
        <span>이미 계정이 있으신가요?</span>
        <TextButton
          onClick={() => {
            setStep("login");
          }}
        >
          로그인하러 가기
        </TextButton>
      </BottomContent>
    </Content>
  );

  return (
    <BaseModal isOpen={isOpen} onClose={handleDelete}>
      <img src="/public/img/logo.png" alt="logo" style={{ width: "12rem" }} />
      {step === "login" ? LoginContent : JoinContent}
    </BaseModal>
  );
};

export default AuthModal;

const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6rem;
`;

const Title = styled.h5`
  margin: 2rem 0 4rem 0;
  font-size: 2.2rem;
  font-weight: 600;
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1.4rem;

  > span {
    font-weight: 600;
    font-size: 1.3rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  padding: 0 1rem;
  font-size: 1.3rem;

  &:hover,
  &:focus {
    background-color: var(--color-grey-06);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  padding: 1rem 0;
  height: 4.8rem;
`;

const LoginButton = styled(Button)`
  color: var(--color-white-bg);
  background-color: var(--color-tag-purple);
`;

const TrialLoginButton = styled(Button)`
  color: var(--color-tag-purple);
  background-color: var(--color-white-bg);
  border: 1px solid var(--color-tag-purple);
`;

const TextButton = styled.button`
  font-size: 1.3rem;
  text-decoration: underline;
  color: var(--color-purple);
  background-color: transparent;
`;

const BottomContent = styled.div`
  font-size: 1.3rem;
  padding: 2rem;
  margin-bottom: 3rem;
`;
