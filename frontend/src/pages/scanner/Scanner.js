import React, { useEffect } from "react";
import "./Scanner.css";


export function Scanner() {
  useEffect(() => {
  }, []);
  return (
    <div>
      <video muted playsinline id="preview"></video>
    </div>
  );
}
