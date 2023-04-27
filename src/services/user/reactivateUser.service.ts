import format from "pg-format";
import { client } from "../../database";
import {TMyUserResponse } from "../../interfaces/users.interfaces";

const reactivateUser = async (userId: number): Promise<TMyUserResponse> => {
  const queryString = format(`
          UPDATE users
          SET "active" = 'true'
          WHERE
          id = $1
          RETURNING *;
          `);
  const queryConfig = {
    text: queryString,
    values: [userId],
  };
  const queryResult = await client.query(queryConfig);
  const reactivatedUser:TMyUserResponse = queryResult.rows[0];

  return reactivatedUser;
};

export { reactivateUser };
