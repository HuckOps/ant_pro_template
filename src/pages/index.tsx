import type { CSSProperties } from "react";
import React, { useEffect } from "react";

type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};
export default function () {
  useEffect(() => {
    console.log("test");
  });
  return <p>test</p>;
}
