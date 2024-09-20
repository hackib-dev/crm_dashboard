import React, { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<ImageProps> = (props) => {
  return <img {...props} />;
};

export default Image;
