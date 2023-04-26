import format from "pg-format";
import { QueryResult } from "pg";
import { hash } from "bcryptjs";
import { client } from "../../database";
import { TMyUserRequest, TMyUserResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/users.schemas";
import { TUser } from "../../__tests__/mocks/interfaces";

const createUserService = async (
  data: TMyUserRequest
): Promise<TMyUserResponse> => {
  const hashPassword: string = await hash(data.password, 10);

  data.password = hashPassword;

  const queryString: string = format(
    `
    INSERT INTO
    users(%I)
    VALUES
    (%L)
    RETURNING * ;
`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const newUser: TMyUserResponse = userSchemaResponse.parse(queryResult.rows[0]);

  return newUser;
};

export default createUserService;
