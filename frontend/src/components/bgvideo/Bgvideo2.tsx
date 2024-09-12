import React from "react";
import video2 from "../../assets/video/bgvideo2.mp4";

interface BgVideoProps {
  className?: string;
}

export const BgVideo2: React.FC<BgVideoProps> = ({ className }) => {
  return (
    <div className={`bgContainer ${className}`}>
      <div className="overlay">
        <video src={video2} autoPlay loop muted className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
