import { Box } from "@mui/material";
import { useLanguage } from "~/providers/language-provider";

const HomePage = () => {
  const { t } = useLanguage();

  return <Box width={1}>{t.home.title}</Box>;
};

export default HomePage;
