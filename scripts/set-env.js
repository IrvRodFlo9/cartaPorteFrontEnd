require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");

const targetPath = "./src/environments/environment.ts";
const envFileContent = `
export const environment = {
  download: {
    baseURL: '${process.env["downloadBaseURL"]}',
  },
  api: {
    baseURL: '${process.env["baseURLApi"]}',
    tokenApi: '${process.env["tokenApi"]}',
  }
};
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
