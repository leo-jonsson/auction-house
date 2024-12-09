import React from "react";

const VideoPlayer = () => {
  return (
    <div className="relative max-w-full h-full flex items-center justify-center mx-auto">
      {/* Background Blur/Gradient Effect */}
      {/* <div className="absolute inset-0 w-full h-full bg-primary/80 dark:bg-primary/50 blur-3xl rounded-3xl aspect-square m-auto" /> */}

      {/* Video Player Container */}
      <div className="relative z-10 w-full flex flex-col rounded-lg overflow-hidden bg-card/50 p-0 border">
        {/* Mock Controls */}
        <div className="flex items-center gap-2 p-2">
          <span className="size-3 rounded-full bg-muted-foreground dark:bg-muted" />
          <span className="size-3 rounded-full bg-muted-foreground dark:bg-muted" />
          <span className="size-3 rounded-full bg-muted-foreground dark:bg-muted" />
        </div>
        {/* Video Player */}
        <video
          width="1200"
          height="700"
          preload="none"
          autoPlay
          loop
          muted
          className="mx-auto w-full"
        >
          <source src="/demo.mp4" type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
