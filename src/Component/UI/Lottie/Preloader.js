import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

import * as sewing from "../public/preloaders/62905-sewing.json";
import * as success from "../public/preloaders/1127-success.json";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: sewing.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

function PreLoader2() {
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setloading(true);

      setTimeout(() => {
        setcompleted(true);
      }, 1000);
    }, 2000);
  }, []);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <Lottie options={defaultOptions1} height={300} width={300} />
          ) : (
            <Lottie options={defaultOptions2} height={100} width={100} />
          )}
        </>
      ) : null}
    </>
  );
}

export default PreLoader2;
