import React from "react";
import "./SearchPanel.css";

export const SearchPanel = props => {
  return (
    <div
      className="modal"
      style={{
        transform: props.show ? " translateY(0)" : " translateY(-100%)",
        opacity: props.show ? "1" : " 0"
      }}
    >
      <p>znajdz film</p>
      <input
        type="text"
        placeholder="wyszukaj film"
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};
