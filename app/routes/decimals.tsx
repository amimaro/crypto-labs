import { utils } from "ethers";

import { useRef, useState } from "react";
import {
  ActionFunction,
  Form,
  useActionData,
  useSubmit,
  useTransition,
} from "remix";
import AppCard from "~/components/AppCard";
import AppClipboardButton from "~/components/AppClipboardButton";
import AppInput from "~/components/AppInput";
import useDebounce from "~/hooks/useDebounce";

type ActionData = {
  formError?: string;
  usd: string;
  brl: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const ether = formData.get("ether");
  const parsedEther = parseFloat(ether as string);

  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd,brl"
  );
  const market = await res.json();

  if (isNaN(parsedEther)) {
    return {
      usd: "",
      brl: "",
    };
  }

  return {
    usd: (parseFloat(ether as string) * market.ethereum.usd).toFixed(4),
    brl: (parseFloat(ether as string) * market.ethereum.brl).toFixed(4),
  };
};

export default function DecimalsPage() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  const submit = useSubmit();
  const form = useRef();

  const [wei, setWei] = useState("");
  const [gwei, setGwei] = useState("");
  const [ether, setEther] = useState("");

  useDebounce(1000, ether, () =>
    submit(form.current as any, { replace: true })
  );

  const handleInputChange = (unit: string, e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    const re = /^-?\d*\.?\d*$/;
    const reWei = /^-?\d*$/;
    const isValidNumber =
      unit === "wei" ? reWei.test(e.target.value) : re.test(e.target.value);

    if (!isValidNumber) return;
    if (value === "" || isNaN(parseFloat(value))) {
      setWei("");
      setGwei("");
      setEther("");
      return;
    }

    if (unit === "wei") {
      setWei(value);
      setGwei(utils.formatUnits(value, 8));
      setEther(utils.formatUnits(value, "ether"));
    }

    if (unit === "gwei") {
      setGwei(value);
      const weiVal = parseFloat(value) * 10 ** 9 + "";
      setWei(weiVal);
      setEther(utils.formatUnits(weiVal, "ether"));
    }

    if (unit === "ether") {
      setEther(value);
      const weiVal = utils.parseUnits(value).toString();
      setWei(weiVal);
      setGwei(utils.formatUnits(weiVal, "gwei"));
    }
  };

  return (
    <div className="md:w-96 mx-auto pt-10">
      <AppCard>
        <Form method="post" ref={form as any}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4">
              <div className="w-20 font-semibold">Wei</div>
              <AppInput
                id="wei"
                value={wei}
                onChange={(e) => handleInputChange("wei", e)}
                placeholder="Wei value"
              />
              <AppClipboardButton copy={wei} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 font-semibold">Gwei</div>
              <AppInput
                id="gwei"
                value={gwei}
                onChange={(e) => handleInputChange("gwei", e)}
                placeholder="Gwei value"
              />
              <AppClipboardButton copy={gwei} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 font-semibold">Ether</div>
              <AppInput
                id="ether"
                value={ether}
                onChange={(e) => handleInputChange("ether", e)}
                placeholder="Ether value"
              />
              <AppClipboardButton copy={ether} />
            </div>
            {actionData &&
              actionData.usd.length > 0 &&
              transition.state !== "submitting" &&
              ether.length > 0 && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-20 font-semibold">USD</div>
                    <AppInput
                      value={actionData?.usd}
                      onChange={() => {}}
                      placeholder="USD value"
                      readOnly
                    />
                    <AppClipboardButton copy={actionData?.usd} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 font-semibold">BRL</div>
                    <AppInput
                      value={actionData?.brl}
                      onChange={() => {}}
                      placeholder="USD value"
                      readOnly
                    />
                     <AppClipboardButton copy={actionData?.brl} />
                  </div>
                </>
              )}
          </div>
        </Form>
      </AppCard>
    </div>
  );
}
