import React, { useEffect, useState } from "react";
import { Container, Footer, Header, Loader } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {}, []);

  // !loading && (
  //   <>
  //     <Container>
  //       <Header />
  //       <Outlet />
  //       <Footer />
  //     </Container>
  //   </>
  // );
  // return <Loader />;
  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </>
  )
}
