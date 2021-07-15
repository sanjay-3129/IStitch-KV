const generateId = (name) => {
  if (name === "gender") {
    let rand = Math.random() * 100;
    let round = Math.ceil(rand);
    return "gender" + round;
  } else if (name === "category") {
    let rand = Math.random() * 10000;
    let round = Math.ceil(rand);
    return "category" + round;
  } else if (name === "subcategory") {
    let rand = Math.random() * 10000;
    let round = Math.ceil(rand);
    return "subcategory" + round;
  } else if (name === "styles") {
    let rand = Math.random() * 10000;
    let round = Math.ceil(rand);
    return "styles" + round;
  } else if (name === "deleted") {
    let rand = Math.random() * 10000;
    let round = Math.ceil(rand);
    return "deletedItem" + round;
  } else {
    let rand = Math.random() * 10000;
    let round = Math.ceil(rand);
    return "pattern" + round;
  }
};

export default generateId;
