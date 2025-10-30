import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Group,
  Psychology,
  EmojiEvents,
  Business,
  TrendingUp,
} from "@mui/icons-material";
import { useLanguage } from "../../providers/language-provider";

const AboutProjectPage = () => {
  const { t } = useLanguage();

  const roles = [
    {
      title: t.aboutProject.rolesSection.mentor.title,
      description: t.aboutProject.rolesSection.mentor.description,
      icon: <Psychology sx={{ fontSize: 40 }} />,
      color: "#03a9f3",
    },
    {
      title: t.aboutProject.rolesSection.tutor.title,
      description: t.aboutProject.rolesSection.tutor.description,
      icon: <Group sx={{ fontSize: 40 }} />,
      color: "#F57C00",
    },
    {
      title: t.aboutProject.rolesSection.seeker.title,
      description: t.aboutProject.rolesSection.seeker.description,
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      color: "#7B1FA2",
    },
  ];

  const activities = t.aboutProject.activities.items;

  //   const consortium = [
  //     { name: "ლვოვის პოლიტექნიკური ეროვნული უნივერსიტეტი", abbr: "LPNU" },
  //     { name: "დნიპროს ტექნოლოგიური უნივერსიტეტი", abbr: "DniproTech" },
  //     { name: "პეტრო მოგილას შავი ზღვის ეროვნული უნივერსიტეტი", abbr: "PMBSNU" },
  //     { name: "ჩერნიგოვის პოლიტექნიკური ეროვნული უნივერსიტეტი", abbr: "CPNU" },
  //     { name: "შოთა რუსთაველის სახელმწიფო უნივერსიტეტი", abbr: "BSU" },
  //     { name: "საქართველოს ტექნიკური უნივერსიტეტი", abbr: "GTU" },
  //     { name: "სილეზიის ტექნოლოგიური უნივერსიტეტი", abbr: "SUT" },
  //     { name: "პერუჯიის უნივერსიტეტი", abbr: "UNIPG" },
  //     { name: "ავეიროს უნივერსიტეტი", abbr: "UA" },
  //     { name: "ვენის ტექნოლოგიური უნივერსიტეტი", abbr: "TUW" },
  //     { name: "ლვოვის IT კლასტერის ასოციაცია", abbr: "IT" },
  //     { name: "დნიპროპეტროვსკის სავაჭრო და მრეწველობის პალატა", abbr: "DCCI" },
  //     {
  //       name: "მიკოლაევის რეგიონალური ადმინისტრაციის განათლებისა და მეცნიერების დეპარტამენტი",
  //       abbr: "DESMRSA",
  //     },
  //     { name: "ჩერნიგოვის IT კლასტერ", abbr: "Chernihiv IT" },
  //     { name: "აჭარის სავაჭრო და მრეწველობის პალატა", abbr: "ACCI" },
  //     { name: "LLC Coaching Academy", abbr: "CA" },
  //   ];

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, md: 8 },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "2rem", md: "3.5rem" },
              }}
            >
              {t.aboutProject.heroTitle}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                maxWidth: 800,
                mx: "auto",
                opacity: 0.95,
                lineHeight: 1.8,
              }}
            >
              {t.aboutProject.heroSubtitle}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              mb: 8,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.9, fontSize: "1.1rem" }}
              >
                {t.aboutProject.mainDescription.paragraph1}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.9, fontSize: "1.1rem" }}
              >
                {t.aboutProject.mainDescription.paragraph2}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, lineHeight: 1.9, fontSize: "1.1rem" }}
              >
                {t.aboutProject.mainDescription.paragraph3}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ px: 5, py: 1.5 }}
                >
                  {t.aboutProject.mainDescription.learnMoreButton}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roles Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 5, textAlign: "center" }}
          >
            {t.aboutProject.rolesSection.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              mb: 10,
              justifyContent: "center",
            }}
          >
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                style={{ flex: "1 1 250px", maxWidth: "300px" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    textAlign: "center",
                    p: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      bgcolor: `${role.color}15`,
                      color: role.color,
                    }}
                  >
                    {role.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, color: role.color }}
                  >
                    {role.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.7, color: "text.secondary" }}
                  >
                    {role.description}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Background Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card sx={{ borderRadius: 4, p: { xs: 3, md: 5 }, mb: 8 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Business sx={{ fontSize: 40, color: "#03a9f3", mr: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {t.aboutProject.background.title}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.9, fontSize: "1.05rem" }}
            >
              {t.aboutProject.background.paragraph1}
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}
            >
              {t.aboutProject.background.paragraph2}
            </Typography>
          </Card>
        </motion.div>

        {/* T&M Centers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card sx={{ borderRadius: 4, p: { xs: 3, md: 5 }, mb: 8 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <TrendingUp sx={{ fontSize: 40, color: "#2E7D32", mr: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {t.aboutProject.tmCenters.title}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}
            >
              {t.aboutProject.tmCenters.description}
            </Typography>
          </Card>
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 5, textAlign: "center" }}
          >
            {t.aboutProject.activities.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mb: 10,
            }}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    borderLeft: "4px solid #03a9f3",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(3,169,243,0.15)",
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {activity}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Consortium */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
          >
            კონსორციუმი
          </Typography> */}
          {/* <Card sx={{ borderRadius: 4, p: { xs: 3, md: 5 }, mb: 5 }}>
            <Typography
              variant="body1"
              sx={{ mb: 4, lineHeight: 1.9, fontSize: "1.05rem" }}
            >
              კონსორციუმში გაერთიანებულია საგანმანათლებლო და ბიზნეს
              ორგანიზაციები, რომლებიც 10 HEI-სა და 6 ინდუსტრიულ პარტნიორს შორის
              სტუდენტების პროფესიული განვითარებისთვის მრავალმხრივი მხარდაჭერას
              უზრუნველყოფს.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {consortium.map((org, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.02 * index }}
                >
                  <Chip
                    label={org.abbr}
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      py: 2.5,
                      px: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      },
                    }}
                    color="primary"
                  />
                </motion.div>
              ))}
            </Box>
          </Card> */}
        {/* </motion.div> */}
      </Container>
    </Box>
  );
};

export default AboutProjectPage;
