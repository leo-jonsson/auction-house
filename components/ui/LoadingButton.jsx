import React from "react";
import { RiLoader2Line } from "react-icons/ri";
import { Button } from "./button";

const LoadingButton = ({ message }) => {
  return (
    <Button disabled className="w-full">
      <RiLoader2Line
        className="animate-spin
    "
      />
      {message}
    </Button>
  );
};

export default LoadingButton;
