import React from "react";

const VideoPlayer = () => {
  return (
    <div className="w-full -translate-y-14 flex-flex-col border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 p-2 border-b">
        <span className="size-3 rounded-full bg-muted-foreground" />
        <span className="size-3 rounded-full bg-muted-foreground" />
        <span className="size-3 rounded-full bg-muted-foreground" />
      </div>
      <video
        width="1200"
        height="700"
        preload="none"
        autoPlay
        loop
        muted
        className="mx-auto w-full"
      >
        <source src="/test.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
