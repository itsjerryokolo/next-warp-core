import React, { useContext } from "react";
import { Check } from "../../Icons";

export interface Props {
  name: string;
  connectFunction: () => void;
  selected: boolean;
  activating: boolean;
  active: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function WalletButton(props: Props) {

  const { name, connectFunction, Icon, activating, active } = props;

  const handleClick = () => {
    connectFunction && connectFunction();
  };
  return (
    <button onClick={handleClick} >
      <div >
        <div >
          <p>{activating ? "Connecting..." : name}</p>
          {active && <Check />}
        </div>
        <Icon />
      </div>
    </button>
  );
}

export default React.memo(WalletButton);
