import { Idl as ShankIdl } from "@solanafm/kinobi-lite";

import { ErrorParserInterface } from "../../../interfaces";
import { IdlItem } from "../../../types/IdlItem";
import { ParserType } from "../../../types/Parsers";

export const createShankErrorParser: (idlItem: IdlItem) => ErrorParserInterface = (idlItem: IdlItem) => {
  const idl = idlItem.idl as ShankIdl;
  const errorsLayout = new Map<
    number,
    {
      name: string;
      msg: string;
    }
  >();

  idl?.errors?.forEach((error) => {
    if (error.code) {
      errorsLayout.set(error.code, {
        name: error.name ?? "No error name specified",
        msg: error.msg ?? "No error message specified",
      });
    }
  });

  const parseError = (unparsedErrorCode: string) => {
    try {
      const errorCode: number = parseInt(unparsedErrorCode);
      const error = errorsLayout.get(errorCode);

      if (error) {
        return {
          name: error.name,
          data: error.msg,
          type: ParserType.ERROR,
        };
      }
    } catch (parseErr) {
      return null;
    }

    return null;
  };

  return { errorsLayout, parseError };
};
