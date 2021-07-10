import * as sewing from "../../../../public/lotties/62905-sewing.json";
import * as success from "../../../../public/lotties/1127-success.json";

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

export default { defaultOptions1, defaultOptions2 };
