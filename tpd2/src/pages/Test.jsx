import { useState } from "react";
import { Button, CardBox, Confirm, Container, Modal } from "../components";

export default function Test() {
  const [open, setopen] = useState(false);
  return (
    <>
    <Container>
      <CardBox>
        <Button onClick={() => setopen(true)}>Open</Button>
      </CardBox>
    </Container>
        <Confirm open={open} setopen={setopen} />
    </>
  );
}
