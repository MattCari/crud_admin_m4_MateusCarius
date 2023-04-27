import { QueryResult } from "pg";
import { allUsersSchemaRequest } from "../../schemas/users.schemas";
import { TMyUserResponse } from "../../interfaces/users.interfaces";
import { TUser } from "../../__tests__/mocks/interfaces";
import { client } from "../../database";
import format from "pg-format";

const listLogedUserService = async (id:number): Promise<TMyUserResponse[]> => {

  const queryString: string = 
    `
    SELECT *
    FROM
    users
    WHERE "active" = 'true';
  `

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const user: TMyUserResponse[] = queryResult.rows
 
  return user;

};

export default listLogedUserService;
