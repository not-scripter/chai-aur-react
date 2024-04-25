import { Account, Client, Databases, Query, Users } from "node-appwrite";

export default async ({ req, res }) => {
  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65d4d01ac41d1120ee37");

  const db = new Databases(client);
  const users = new Users(client);
  const account = new Account(client)

  if (req.method === "GET") {
    try {
        const response = await users.get("65ff30b5623d46b52805");
        return res.json(response);
    } catch (e) {
      console.error(e.message)
      return res.send("Error Occured");
    }
  }

  return res.send("namaste world");
};
