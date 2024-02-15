import JSZip from "jszip";
import xml2js from "xml2js";

// xml파일을 포함한 zip 파일 data을 받아, xml데이터를 string list 형태로 반환한다.
export const xmlZip2jsonList = async (data: ArrayBuffer): Promise<any[]> => {
  const zip = await JSZip.loadAsync(data);

  const xmlFiles = Object.keys(zip.files).filter((fileName) =>
    fileName.endsWith(".xml")
  );

  const result: any[] = [];

  for (const fileName of xmlFiles) {
    const fileData = await zip.files[fileName].async("string");
    xml2js.parseString(fileData, (err, data) => {
      if (err) {
        throw err;
      }
      result.push(data);
    });
  }

  return result;
};
