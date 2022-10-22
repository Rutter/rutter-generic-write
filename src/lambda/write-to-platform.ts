import { ICase, IInput } from "./types";

export const handler = async (event: IInput): Promise<ICase> => {
  // todo: fill this out
  const myCaseID = event.inputCaseID;
  const myMessage = "Case " + myCaseID + ": started...";
  return { Case: myCaseID, Message: myMessage };
};
