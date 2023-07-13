import React from "react";
import style from "./index.less";

export function BodyFooterRender() {
  return (
    <div className={style.footer}>
      <div className={style.footerdiv}>Powerd by HuckOps</div>
      <div className={style.footerdiv}>
        Framework version: {process.version}
      </div>
    </div>
  );
}
