import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
import fs from "node:fs/promises";

const server = new McpServer({
  name: "test",
  version: "1.0.0"
});

// ✅ FIXED TOOL
server.tool(
  "create-user",
  "Create a new user in the database",
  {
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
  },
  async (params: {
    name: string;
    email: string;
    address: string;
    phone: string;
  }) => {
    try {
      const id = await createUser(params);

      return {
        content: [
          {
            type: "text",
            text: `User created with ID: ${id}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to save user",
          },
        ],
      };
    }
  }
);

// ✅ CREATE USER FUNCTION
async function createUser(user: {
  name: string;
  email: string;
  address: string;
  phone: string;
}) {
  const filePath = "./src/data/users.json";

  // Read existing users
  const data = await fs.readFile(filePath, "utf-8");
  const users = JSON.parse(data);

  const id = users.length + 1;

  users.push({ id, ...user });

  // Save back to file
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return id;
}

// ✅ START SERVER
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();