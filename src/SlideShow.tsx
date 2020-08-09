import React, { useState } from "react";

function Slideshow() {
  const [img, setImg] = useState(0);
  return (
    <div>
      <button onClick={() => setImg(0)}>start</button>
      <button onClick={() => setImg(img - 1)}>prev</button>
      <img src={`https://picsum.photos/200?image=${img}`} alt="slideshow" />
      <button onClick={() => setImg(img + 1)}>next</button>
    </div>
  );
}

export default Slideshow;
