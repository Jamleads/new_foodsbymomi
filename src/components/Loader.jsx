/* eslint-disable react/prop-types */
import { CirclesWithBar } from "react-loader-spinner";

const Loader = ({ height, width, color }) => {
  return (
    <div className="flex items-center justify-center w-[150px]">
      <CirclesWithBar height={height} width={width} color={color} />
    </div>
  );
};

export default Loader;
