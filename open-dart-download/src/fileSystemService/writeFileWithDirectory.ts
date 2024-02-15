import fs from "fs";

const writeFileWithDirectory = async (
  fileName: string,
  data: string,
  path = "."
) => {
  path
    .split("/")
    .filter((dir) => dir !== ".")
    .forEach((dir, i, ori) => {
      const currPath = ori.slice(0, i + 1).join("/");
      if (!fs.existsSync(currPath)) {
        fs.mkdirSync(currPath);
      }
    });

  return fs.writeFile(`${path}/${fileName}`, data, (err) => {
    if (err) {
      console.error(`파일 저장 중 에러 발생: ${fileName}`, err);
    } else {
      console.log(`${fileName} 파일이 성공적으로 저장되었습니다.`);
    }
  });
};

export default writeFileWithDirectory;
