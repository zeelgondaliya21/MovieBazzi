import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SearchBarWithPhoto from "../common/searchbarwithphoto";
import CelebritiesCard from "./celebritiescard";

function Celebrities(props) {
  return (
    <React.Fragment>
      <Header />
      <SearchBarWithPhoto />
      <CelebritiesCard />
      <Footer />
    </React.Fragment>
  );
}

export default Celebrities;
