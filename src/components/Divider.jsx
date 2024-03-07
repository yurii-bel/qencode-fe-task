import React from "react";

const Divider = () => {
  return (
    <div className="w-full h-4 flex justify-center items-center mt-[30px] gap-[5px]">
      <span className="h-[1px] w-[186px] bg-divider-line"></span>
      <p className="text-divider-text">OR</p>
      <span className="h-[1px] w-[186px] bg-divider-line"></span>
    </div>
  );
};

export default Divider;
