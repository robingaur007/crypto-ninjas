import { useState } from "react";
import "./styles.css";

interface CoinInfoProps {
  name: string;
  desc: string;
}

const CoinInfo = ({ name, desc }: CoinInfoProps) => {
  const [flag, setFlag] = useState(false);

  const smallDesc =
    desc.length > 400
      ? desc.slice(0, 400) +
        "<p style='color:var(--grey); cursor:pointer;'>Read More...</p>"
      : desc;
  const fullDesc =
    desc.length > 400
      ? desc + "<p style='color:var(--grey);cursor:pointer;'>Read Less...</p>"
      : desc;

  const handleToggleFlag = () => {
    if (desc.length > 400) {
      setFlag((prevFlag) => !prevFlag);
    }
  };

  return (
    <div className="grey-wrapper">
      <h1 className="coin-desc-heading">{name}</h1>
      <p
        onClick={handleToggleFlag}
        className="coin-desc-para"
        dangerouslySetInnerHTML={{ __html: flag ? fullDesc : smallDesc }}
      />
    </div>
  );
};

export default CoinInfo;
