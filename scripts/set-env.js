require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");

const targetPath = "./src/environments/environment.ts";
const envFileContent = `
  export const environment = {
    facturama: {
      baseURL: '${process.env["facturamaBaseURL"]}',
      auth: '${process.env["facturamaAuth"]}',
    },
    download: {
      baseURL: '${process.env["downloadBaseURL"]}',
    },
  };
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
