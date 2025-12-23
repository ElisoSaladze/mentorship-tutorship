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

const iconSx = { fontSize: { xs: 28, sm: 32, md: 40 } };

const schemeConfigs: MentoringScheme[] = [
  {
    id: "professional",
    icon: <Business sx={iconSx} />,
    color: "#1976d2",
  },
  {
    id: "idps",
    icon: <EmojiPeople sx={iconSx} />,
    color: "#d32f2f",
  },
  {
    id: "business",
    icon: <Business sx={iconSx} />,
    color: "#388e3c",
  },
  {
    id: "greenDeal",
    icon: <Park sx={iconSx} />,
    color: "#2e7d32",
  },
  {
    id: "localGovernment",
    icon: <AccountBalance sx={iconSx} />,
    color: "#0288d1",
  },
  {
    id: "youngTeacher",
    icon: <School sx={iconSx} />,
    color: "#f57c00",
  },
  {
    id: "digital",
    icon: <Computer sx={iconSx} />,
    color: "#7b1fa2",
  },
  {
    id: "firstYear",
    icon: <PersonAdd sx={iconSx} />,
    color: "#c2185b",
  },
  {
    id: "gender",
    icon: <Wc sx={iconSx} />,
    color: "#e91e63",
  },
  {
    id: "internationalization",
    icon: <Flight sx={iconSx} />,
    color: "#00796b",
  },
  {
    id: "disabilities",
    icon: <Accessible sx={iconSx} />,
    color: "#5e35b1",
  },
  {
    id: "buddy",
    icon: <Groups sx={iconSx} />,
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
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: { xs: 4, sm: 5, md: 6 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 }, textAlign: "center" }}>
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
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: { xs: 2.5, sm: 3, md: 4 },
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
                    transform: { xs: "none", sm: "translateY(-8px)" },
                    boxShadow: { xs: 3, sm: 6 },
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.5, sm: 2 },
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: scheme.color,
                        color: "white",
                        borderRadius: { xs: 1.5, sm: 2 },
                        p: { xs: 1, sm: 1.25, md: 1.5 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: { xs: 44, sm: 52, md: 60 },
                        minHeight: { xs: 44, sm: 52, md: 60 },
                      }}
                    >
                      {scheme.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={600}
                      sx={{
                        flex: 1,
                        fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.25rem" },
                      }}
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
                      fontSize: { xs: "0.85rem", sm: "0.875rem" },
                    }}
                  >
                    {schemeData.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box sx={{ mt: { xs: 4, sm: 5, md: 6 }, textAlign: "center" }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, px: { xs: 2, sm: 0 } }}
          >
            {t.schemes.contactInfo}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SchemesPage;
