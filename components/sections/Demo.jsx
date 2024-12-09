import React from "react";
import VideoPlayer from "../ui/VideoPlayer";

const Demo = () => {
  return (
    <section className="grid lg:grid-cols-3 gap-5 pt-5 items-center">
      <span
        className="flex flex-col gap-2
      "
      >
        <h2 className="sm:text-5xl text-2xl font-bold">Easy to use</h2>
        <p className="text-lg text-muted-foreground">
          Place bids effortlessly with just a few clicks.
        </p>
      </span>
      <VideoPlayer />
    </section>
  );
};

export default Demo;
