import React from "react";
import PropTypes from "prop-types";

export default function Main({ children }) {
  Main.propTypes = {
    children: PropTypes.node.isRequired,
  };

    // Inject Botpress scripts
    useEffect(() => {
      const botpressScript1 = document.createElement("script");
      botpressScript1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      botpressScript1.async = true;
  
      const botpressScript2 = document.createElement("script");
      botpressScript2.src = "https://files.bpcontent.cloud/2024/11/02/09/20241102093854-JYPQTPG9.js";
      botpressScript2.async = true;
  
      document.body.appendChild(botpressScript1);
      document.body.appendChild(botpressScript2);
  
      return () => {
        document.body.removeChild(botpressScript1);
        document.body.removeChild(botpressScript2);
      };
    }, []);
  return (
    /* Main, Här ska allt skit som dyka upp dyka upp */
    <div className="flex justify-center bg-background-white">{children}</div>
  );
}
