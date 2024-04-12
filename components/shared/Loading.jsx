import React from "react";

const Loading = () => {
  return (
    <div>
      <div class="loading">
        <svg height="48px" width="64px">
          <polyline
            id="back"
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          ></polyline>
          <polyline
            id="front"
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          ></polyline>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
