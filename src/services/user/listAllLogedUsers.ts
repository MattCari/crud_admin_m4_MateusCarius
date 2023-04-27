import { QueryResult } from "pg";
import { allUsersSchemaRequest } from "../../schemas/users.schemas";
import { TMyUserResponse } from "../../interfaces/users.interfaces";
import { TUser } from "../../__tests__/mocks/interfaces";
import { client } from "../../database";
import format from "pg-format";

const listLogedUserService = async (id:number): Promise<TMyUserResponse[]> => {

  const queryString: string = format(
    `
    SELECT *
    FROM
    users
    WHERE id = %L;
  `,
    id
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const user: TMyUserResponse[] = allUsersSchemaRequest.parse([
    queryResult.rows[0]]
  );
  console.log(user)
  return user;

};

export default listLogedUserService;
