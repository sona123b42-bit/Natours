"use client";
import styled from "styled-components";
import ForgotPasswordForm from "@/app/_components/ForgotPasswordForm";
const ForgotPassword = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
`;
export default function page() {
  return (
    <ForgotPassword>
      <ForgotPasswordForm />
    </ForgotPassword>
  );
}
