const { spawn } = require("child_process");

const backend = spawn(
  "npm",
  ["run", "start:all"], // ajusta el script si no se llama exactamente así
  { cwd: "./backend", stdio: "inherit", shell: true }
);

const frontend = spawn(
  "npm",
  ["run", "dev"], // ajusta al comando real de tu Next.js
  { cwd: "./frontend", stdio: "inherit", shell: true }
);

backend.on("close", (code) =>
  console.log(`backend finalizó con código ${code}`)
);
frontend.on("close", (code) =>
  console.log(`frontend finalizó con código ${code}`)
);
