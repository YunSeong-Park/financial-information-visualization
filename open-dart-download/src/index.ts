import apiDownloadService from "./api-download-service/download";
import createAll from "./sql-service/createAll";
import deleteAll from "./sql-service/deleteAll";

const sqlApp = async () => {
  await deleteAll();
  await createAll();
};
const OPTION = {
  download: apiDownloadService,
  sql: sqlApp,
} as const;

type Command = "download" | "sql";

const isOption = (command: string): command is Command => {
  return ["download", "sql"].includes(command);
};

const app = async (command?: string) => {
  if (!command || !isOption(command)) {
    console.log('command를 입력해주세요. ["download", "sql"]');
    return;
  }

  await OPTION[command]();
};

const command = process.argv.slice(2)[0];

app(command);
