mcp.json tells VS Code how to start and connect to your MCP server so AI can use your tools

A resource is used to READ data

A tool is used to DO actions

Transport is needed for AI ↔ MCP communication.

you can test your MCP server before plugging in an AI client by using the MCP Inspector. The Inspector is a developer tool that connects to your MCP server via transport (usually stdio) and lets you manually call tools, inspect schemas, and see responses — perfect for debugging.

What is Agentic Loop?
A. Call tool and get result then think again and call tool get result think again and repeat until it gets required result.

---------------------------INspector----------------------------------------------------------------------------------------------------------------
Here’s how you can set it up and run it:

01
Install MCP Inspector
Setup
The Inspector is published as an npm package you can install globally.

Run in terminal:

npm install -g @modelcontextprotocol/inspector

Verify installation with mcp-inspector --version

02
Start Your MCP Server
Run your Node.js MCP server so Inspector can connect to it.

Run in terminal:

node mcp/mcp.server.js

Ensure you see 🚀 MCP Server Running... and DB connected

03
Connect Inspector to MCP Server
Use Inspector to attach to your running server via stdio transport.

Run in terminal:

mcp-inspector --stdio node mcp/mcp.server.js

This launches Inspector and connects to your server

04
Test Tools Interactively
Inspector shows all registered tools and lets you call them with sample input.

Select a tool like create_product

Provide JSON input (e.g. { "name": "Laptop", "price": 1000 })

See the response from MongoDB via your tool

05
Debug and Validate
Inspector helps confirm your schemas and DB logic work before AI integration.

Check error messages if validation fails

Confirm DB entries are created/updated/deleted

Adjust Zod schemas or tool logic as needed
