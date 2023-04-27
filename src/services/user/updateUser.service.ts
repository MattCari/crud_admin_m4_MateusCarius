import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import {
  TMyUserResponse,
  TMyUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { userSchemaResponse } from "../../schemas/users.schemas";
import { TUser } from "../../__tests__/mocks/interfaces";

const updateUserService = async (
  payload: TMyUserUpdateRequest,
  userId: number
): Promise<TMyUserResponse> => {
  const queryString: string = format(`
    UPDATE users
    SET(%I) = ROW(%L)
    WHERE
    id = $1
    RETURNING * ;
`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };


  const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  //const user: TMyUserResponse = userSchemaResponse.parse(queryResult.rows[0]);

  return queryResult.rows[0];
};

export default updateUserService;
