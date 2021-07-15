import Skeletons from "react-loading-skeleton";

const Skeleton = () => {
  return (
    <>
      <Skeletons />
      <Skeletons count={5} />
    </>
  );
};

export default Skeleton;
