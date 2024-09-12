import React from "react";
import video from "../../assets/video/bgvideo1.mp4";

interface BgVideoProps {
  className?: string;
}

export const BgVideo: React.FC<BgVideoProps> = ({ className }) => {
  return (
    <div className={`bgContainer ${className}`}>
      <div className="overlay">
        <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
