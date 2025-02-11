import React from "react";
import TopMenu from "../components/topmenu/TopMenu";

const HtmlIframe = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <TopMenu />

      <iframe
        src="/DocumentaciónHTML/Sistema de ayuda para ShotReel.html"
        title="Sistema de Ayuda ShotReel"
        style={{ width: "100%", height: "100vw", border: "none" }}
      />
    </div>
  );
};

export default HtmlIframe;
