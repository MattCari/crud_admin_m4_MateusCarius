import { QueryResult } from "pg";
import { allUsersSchemaRequest } from "../../schemas/users.schemas";
import { TMyUserResponse } from "../../interfaces/users.interfaces";
import { TUser } from "../../__tests__/mocks/interfaces";
import { client } from "../../database";

const listUsersService = async (): Promise<TMyUserResponse[]> => {
  const queryString: string = `
    SELECT *
    FROM
    users;
  `;

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const users: TMyUserResponse[] = allUsersSchemaRequest.parse(queryResult.rows);

  return users;
};

export default listUsersService;
