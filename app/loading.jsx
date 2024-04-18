import React from "react";

export default function Loading() {
  return (
    <div className="size-full flex flex-center justify-center align-middle">
      <div className="loading">
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
}
