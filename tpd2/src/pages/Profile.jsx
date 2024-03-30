import React from "react";
import { ProfileComp } from "../components/profile";
import { Container } from "../components";

export default function Profile({ children }) {
  return (
    <>
      <Container>
        <ProfileComp>{children}</ProfileComp>
      </Container>
    </>
  );
}
