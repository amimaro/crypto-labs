import { utils } from "ethers";

export const hexConcat = (parts: string[]) => {
  return utils.hexConcat(
    parts.map((part) => {
      const isHexString = utils.isHexString(part);
      const isValidLength = part.length % 2 === 0;
      return isHexString && isValidLength ? part : toHex(part);
    })
  );
};

export const hexPrefix = (value: string) => {
  return "0x" + value;
};

export const toHex = (str: string) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return hexPrefix(result);
};
