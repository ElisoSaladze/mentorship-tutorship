import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import { useLanguage } from "~/providers/language-provider";

// Import images at the top
import scheme1 from "../../assets/schemes/1.jpg";
import scheme2 from "../../assets/schemes/2.jpg";
import scheme3 from "../../assets/schemes/3.jpg";
import scheme4 from "../../assets/schemes/4.jpg";
import scheme5 from "../../assets/schemes/5.jpg";
import scheme6 from "../../assets/schemes/6.jpg";
import scheme7 from "../../assets/schemes/7.jpg";
import scheme8 from "../../assets/schemes/8.jpg";
import scheme9 from "../../assets/schemes/9.jpg";
import scheme10 from "../../assets/schemes/10.jpg";
import scheme11 from "../../assets/schemes/11.jpg";
import scheme12 from "../../assets/schemes/12.jpg";

interface MentoringScheme {
  id: string;
  image: string;
}

const schemeConfigs: MentoringScheme[] = [
  { id: "professional", image: scheme1 },
  { id: "idps", image: scheme2 },
  { id: "business", image: scheme3 },
  { id: "greenDeal", image: scheme4 },
  { id: "localGovernment", image: scheme5 },
  { id: "youngTeacher", image: scheme6 },
  { id: "digital", image: scheme7 },
  { id: "firstYear", image: scheme8 },
  { id: "gender", image: scheme9 },
  { id: "internationalization", image: scheme10 },
  { id: "disabilities", image: scheme11 },
  { id: "buddy", image: scheme12 },
];

type SchemeData = { title: string; description: string };

const SchemesPage = () => {
  const { t } = useLanguage();

  const getSchemeTranslation = (id: string): SchemeData | null => {
    const schemes = t.schemes as Record<string, SchemeData | string>;
    const scheme = schemes[id];
    if (scheme && typeof scheme === "object" && "title" in scheme) {
      return scheme;
    }
    return null;
  };

  return (
    <Box
      sx={{
        bgcolor: "grey.50",
        minHeight: "100vh",
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ mb: { xs: 5, sm: 6, md: 8 }, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={700}
            gutterBottom
            color="primary"
            sx={{ fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" } }}
          >
            {t.schemes.pageTitle}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 800,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
              px: { xs: 1, sm: 0 },
            }}
          >
            {t.schemes.pageSubtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 3, sm: 4, md: 4 },
          }}
        >
          {schemeConfigs.map((scheme) => {
            const schemeData = getSchemeTranslation(scheme.id);
            if (!schemeData) return null;

            return (
              <Card
                key={scheme.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-12px)" },
                    boxShadow: {
                      xs: 3,
                      sm: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "60%",
                    overflow: "hidden",
                    bgcolor: "grey.100",
                  }}
                >
                  <Box
                    component="img"
                    src={scheme.image}
                    alt={schemeData.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: { xs: 2.5, sm: 3, md: 3.5 },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      mb: 2,
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.2rem",
                        md: "1.3rem",
                      },
                    }}
                  >
                    {schemeData.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                    }}
                  >
                    {schemeData.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default SchemesPage;
