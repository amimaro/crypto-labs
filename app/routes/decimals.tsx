import { ethers } from "ethers";
import { useState } from "react";
import AppCard from "~/components/AppCard";
import AppInput from "~/components/AppInput";

export default function DecimalsPage() {
  const [wei, setWei] = useState("");
  const [gwei, setGwei] = useState("");
  const [ether, setEther] = useState("");

  const handleChange = (unit: string, e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    const re = /^-?\d*\.?\d*$/;
    const isValidNumber = re.test(value);

    if (!isValidNumber) return;

    if (value === "") {
      setWei("");
      setGwei("");
      setEther("");
      return;
    }

    if (unit === "wei") {
      setWei(value);
      setEther(ethers.utils.formatUnits(value, "ether"));
      setGwei(ethers.utils.formatUnits(value, "gwei"));
    }

    if (unit === "gwei") {
      setGwei(value);
      setWei(ethers.utils.formatUnits(value, "wei"));
      setEther(ethers.utils.formatUnits(value, "ether"));
    }

    if (unit === "ether") {
      setEther(value);
      setWei(ethers.utils.formatUnits(value, "wei"));
      setGwei(ethers.utils.formatUnits(value, "gwei"));
    }
  };

  return (
    <div className="md:w-96 mx-auto">
      <AppCard>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-4">
            <div className="w-20 font-semibold">Wei</div>
            <AppInput
              value={wei}
              onChange={(e) => handleChange("wei", e)}
              placeholder="Wei value"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 font-semibold">Gwei</div>
            <AppInput
              value={gwei}
              onChange={(e) => handleChange("gwei", e)}
              placeholder="Gwei value"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 font-semibold">Ether</div>
            <AppInput
              value={ether}
              onChange={(e) => handleChange("ether", e)}
              placeholder="Ether value"
            />
          </div>
        </div>
      </AppCard>
    </div>
  );
}
