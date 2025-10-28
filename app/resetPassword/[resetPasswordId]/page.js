"use client";
import { use } from "react";
import ResetPasswordForm from "@/app/_components/ResetPasswordForm";
import styled from "styled-components";
const ResetPassword = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
`;
export default function Page({ params }) {
  const { resetPasswordId } = use(params);

  return (
    <ResetPassword>
      <ResetPasswordForm token={resetPasswordId} />
    </ResetPassword>
  );
}
