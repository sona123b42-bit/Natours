"use client";
import SignupForm from "@/app/_components/SignupForm";
import styled from "styled-components";

const signUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
`;

export default function Page() {
  return (
    <signUpLayout>
      <SignupForm />
    </signUpLayout>
  );
}
