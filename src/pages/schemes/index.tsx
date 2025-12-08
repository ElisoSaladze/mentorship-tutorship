import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import {
  Business,
  EmojiPeople,
  AccountBalance,
  School,
  Computer,
  PersonAdd,
  Wc,
  Flight,
  Accessible,
  Groups,
  Park,
} from "@mui/icons-material";
import { useLanguage } from "~/providers/language-provider";

interface MentoringScheme {
  id: string;
  icon: React.ReactNode;
  color: string;
}

const schemeConfigs: MentoringScheme[] = [
  {
    id: "professional",
    icon: <Business sx={{ fontSize: 40 }} />,
    color: "#1976d2",
  },
  {
    id: "idps",
    icon: <EmojiPeople sx={{ fontSize: 40 }} />,
    color: "#d32f2f",
  },
  {
    id: "business",
    icon: <Business sx={{ fontSize: 40 }} />,
    color: "#388e3c",
  },
  {
    id: "greenDeal",
    icon: <Park sx={{ fontSize: 40 }} />,
    color: "#2e7d32",
  },
  {
    id: "localGovernment",
    icon: <AccountBalance sx={{ fontSize: 40 }} />,
    color: "#0288d1",
  },
  {
    id: "youngTeacher",
    icon: <School sx={{ fontSize: 40 }} />,
    color: "#f57c00",
  },
  {
    id: "digital",
    icon: <Computer sx={{ fontSize: 40 }} />,
    color: "#7b1fa2",
  },
  {
    id: "firstYear",
    icon: <PersonAdd sx={{ fontSize: 40 }} />,
    color: "#c2185b",
  },
  {
    id: "gender",
    icon: <Wc sx={{ fontSize: 40 }} />,
    color: "#e91e63",
  },
  {
    id: "internationalization",
    icon: <Flight sx={{ fontSize: 40 }} />,
    color: "#00796b",
  },
  {
    id: "disabilities",
    icon: <Accessible sx={{ fontSize: 40 }} />,
    color: "#5e35b1",
  },
  {
    id: "buddy",
    icon: <Groups sx={{ fontSize: 40 }} />,
    color: "#ff6f00",
  },
];

type SchemeData = { title: string; description: string };

const SchemesPage = () => {
  const { t } = useLanguage();

  // Helper function to get scheme translation
  const getSchemeTranslation = (id: string): SchemeData | null => {
    const schemes = t.schemes as Record<string, SchemeData | string>;
    const scheme = schemes[id];
    if (scheme && typeof scheme === "object" && "title" in scheme) {
      return scheme;
    }
    return null;
  };

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            {t.schemes.pageTitle}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            {t.schemes.pageSubtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
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
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: scheme.color,
                        color: "white",
                        borderRadius: 2,
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {scheme.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={600}
                      sx={{ flex: 1 }}
                    >
                      {schemeData.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      textAlign: "justify",
                    }}
                  >
                    {schemeData.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            {t.schemes.contactInfo}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SchemesPage;
