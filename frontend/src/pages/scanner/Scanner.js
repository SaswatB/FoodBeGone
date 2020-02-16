import React from "react";
import QrReader from "react-qr-reader";
import "./Scanner.css";
import { useHistory } from "react-router-dom";

export function Scanner() {
  const history = useHistory();
  const onScan = value => {
    if (value) history.push(`/confirmation/${value}`);
  };
  return (
    <div className="qr-scanner-page">
      <div className="qr-scanner-container">
        <QrReader
          delay={300}
          onError={e => console.error(e)}
          onScan={onScan}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
