type CompanyVisualizationSearchParams = {
  corp_code?: string;
};

interface CompanyVisualizationProps {
  searchParams: CompanyVisualizationSearchParams;
}
const CompanyVisualization = async ({
  searchParams: { corp_code },
}: CompanyVisualizationProps) => {
  return <div></div>;
};

export default CompanyVisualization;
