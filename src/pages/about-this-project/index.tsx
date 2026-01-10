import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Group,
  Psychology,
  EmojiEvents,
  ExpandMore,
} from "@mui/icons-material";
import { useLanguage } from "../../providers/language-provider";
import img1 from "../../assets/image.png";
import img2 from "../../assets/Picture1.png";

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

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Box component="img" src={img1} />
                <Box component="img" src={img2} />
              </Box>
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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 5, textAlign: "center" }}
          >
            {t.aboutProject.questionsSection.title}
          </Typography>
          <Box sx={{ mb: 8 }}>
            {t.aboutProject.questionsSection.questions.map((item, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  "&:before": { display: "none" },
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      my: 2,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {item.answers.map((answer, answerIndex) => (
                      <Typography
                        key={answerIndex}
                        component="li"
                        variant="body1"
                        sx={{
                          mb: 1.5,
                          lineHeight: 1.8,
                          color: "text.secondary",
                        }}
                      >
                        {answer}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutProjectPage;
