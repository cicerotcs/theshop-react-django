import React from "react";

import { Puff } from "react-loader-spinner";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <Puff
        height="80"
        width="80"
        radisu={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
