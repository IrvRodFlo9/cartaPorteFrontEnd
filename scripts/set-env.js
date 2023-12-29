require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");

const targetPathProduction = "./src/environments/environment.prod.ts";
const targetPath = "./src/environments/environment.ts";

const envFileContent = `
export const environment = {
  production: false,
  api: {
    baseURL: '${process.env["baseURLApi"]}',
    tokenApi: '${process.env["tokenApi"]}',
  }
};
`;

mkdirSync("./src/environments", { recursive: true });

if (process.env["production"]) {
  const envFileContentProduction = `
export const environment = {
  production: ${process.env["production"] ? true : false},
  api: {
    baseURL: '${process.env["baseURLApi"]}',
    tokenApi: '${process.env["tokenApi"]}',
  }
};
`;

  writeFileSync(targetPathProduction, envFileContentProduction);
}

writeFileSync(targetPath, envFileContent);
