import Chat from "./src/schema/chatSchema.ts";
import { connectDatabase } from "./src/config/congi.js";
import app from "./src/app.js";

const port = process.env.PORT || 3000;


process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err.message);
});

process.on("unhandledRejection", (reason: any) => {
  console.error("UNHANDLED REJECTION:", reason?.message || reason);
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDatabase();
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Retrying in 3 seconds...`);
    setTimeout(() => {
      server.close();
      app.listen(port, () => {
        console.log(`Server restarted on port ${port}`);
        connectDatabase();
      });
    }, 3000);
  } else {
    console.error("Server error:", err.message);
  }
});
