import React, { useEffect, useState } from "react";

const CheckBox = (props) => {
  const [checked, setChekced] = useState(false);
  useEffect(() => {
    // console.log("checkbox");
    let index = props.relations.findIndex(
      (r) => r.styleId === props.style.styleId
    );
    if (index !== -1) {
      setChekced(true);
    } else {
      setChekced(false);
    }
  }, [props.relations]);

  const selectHandler = () => {
    // console.log("checkbox-selecter");
    props.onSelectHandler(props.style, props.index);
  };

  return (
    <input
      type="checkbox"
      id={props.style.styleId}
      onChange={selectHandler}
      checked={checked}
    />
  );
};

export default CheckBox;