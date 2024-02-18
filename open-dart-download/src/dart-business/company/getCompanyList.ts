import { downloadCompanyList } from "../../api";
import { xmlZip2jsonList } from "../../dataFarser/xmlZip2data";
import { Company } from "./company.type";

const getCompanyList = async (): Promise<Company[]> => {
  const data = await downloadCompanyList();
  const [json] = await xmlZip2jsonList(data);

  const origineList: any[] = json.result.list;

  const companyList: Company[] = origineList.map((company: any) => {
    return {
      corp_code: company.corp_code[0],
      corp_name: company.corp_name[0],
      stock_code: company.stock_code[0] || undefined,
      modify_date: company.modify_date[0],
    };
  });

  return companyList;
};

export default getCompanyList;

export const getPublicCompanyList = async () => {
  const companyList = await getCompanyList();

  return companyList.filter((company) => !!Number(company.stock_code));
};
