import React, { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#8b8dff",
};

function Loading() {
  return (
    <div className="loading-area">
      <ClipLoader color="#8b8dff"  loading={true} cssOverride={override} size={40}/>

    </div>
  );
}

export default Loading;
