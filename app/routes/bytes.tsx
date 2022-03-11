import { useEffect, useState } from "react";
import AppCard from "~/components/AppCard";
import AppClipboardButton from "~/components/AppClipboardButton";
import AppInput from "~/components/AppInput";
import AppTextarea from "~/components/AppTextArea";
import { hexConcat } from "~/utils/helpers";

export default function BytesPage() {
  const [textInput, setTextInput] = useState("AA,ABBB");
  const [encodePackedOutput, setEncodePackedOutput] = useState("");

  useEffect(() => {
    let encodePacked: string[] | string;
    encodePacked = hexConcat(textInput.split(",").map((text) => text.trim()));
    setEncodePackedOutput(encodePacked);
  }, [textInput]);

  return (
    <div className="mx-auto pt-10 md:px-20">
      <AppCard>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-4">
            <AppTextarea
              id="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Text input"
              caption="Comma separated input"
            />
            <AppClipboardButton copy={textInput} />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 font-semibold">Encode Packed</div>
            <AppInput
              value={encodePackedOutput}
              onChange={() => {}}
              placeholder="Encode Packed Output"
              readOnly
            />
            <AppClipboardButton copy={encodePackedOutput} />
          </div>
        </div>
      </AppCard>
    </div>
  );
}
