import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Facebook,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLanguage } from "../../providers/language-provider";
import { ControlledTextField } from "../../components/form/controlled/controlled-text-field";
import { ControlledTextArea } from "../../components/form/controlled/controlled-text-area";
import { ControlledRadioGroup } from "../../components/form/controlled/controlled-radio-group";
import { email as emailValidation } from "../../components/form/validations";

interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

const ContactPage = () => {
  const { t } = useLanguage();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      category: "general",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form data:", data);
      setSuccessOpen(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorOpen(true);
    }
  };

  const categoryOptions = [
    { value: "general", label: t.contact.formSection.categories.general },
    { value: "mentor", label: t.contact.formSection.categories.mentor },
    { value: "tutor", label: t.contact.formSection.categories.tutor },
    { value: "seeker", label: t.contact.formSection.categories.seeker },
    { value: "technical", label: t.contact.formSection.categories.technical },
  ];

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: t.contact.infoSection.emailTitle,
      value: t.footer.contact.email,
      link: `mailto:${t.footer.contact.email}`,
      color: "#1976d2",
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: t.contact.infoSection.phoneTitle,
      value: t.footer.contact.phone,
      link: `tel:${t.footer.contact.phone}`,
      color: "#2e7d32",
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: t.contact.infoSection.locationTitle,
      value: t.footer.contact.location,
      color: "#ed6c02",
    },
    {
      icon: <AccessTime sx={{ fontSize: 40 }} />,
      title: t.contact.infoSection.hoursTitle,
      value: t.contact.infoSection.hours,
      color: "#9c27b0",
    },
  ];

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
              {t.contact.heroTitle}
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
              {t.contact.heroSubtitle}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Main Content - Form and Info */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 8,
          }}
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                height: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {t.contact.formSection.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  {t.contact.formSection.subtitle}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <ControlledTextField
                      name="name"
                      control={control}
                      label={t.contact.formSection.nameLabel}
                      placeholder={t.contact.formSection.namePlaceholder}
                      required
                      fullWidth
                    />

                    <ControlledTextField
                      name="email"
                      control={control}
                      label={t.contact.formSection.emailLabel}
                      placeholder={t.contact.formSection.emailPlaceholder}
                      type="email"
                      required
                      fullWidth
                      rules={emailValidation}
                    />

                    <ControlledRadioGroup
                      name="category"
                      control={control}
                      label={t.contact.formSection.categoryLabel}
                      options={categoryOptions}
                      required
                    />

                    <ControlledTextArea
                      name="message"
                      control={control}
                      label={t.contact.formSection.messageLabel}
                      placeholder={t.contact.formSection.messagePlaceholder}
                      required
                      fullWidth
                      minRows={6}
                      multiline
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {t.contact.formSection.submitButton}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {t.contact.infoSection.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                  >
                    {t.contact.infoSection.subtitle}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <Box
                          component={info.link ? "a" : "div"}
                          href={info.link}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            textDecoration: "none",
                            color: "inherit",
                            transition: "all 0.3s ease",
                            "&:hover": info.link ? {
                              backgroundColor: "action.hover",
                              transform: "translateX(8px)",
                            } : {},
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 60,
                              height: 60,
                              borderRadius: 2,
                              backgroundColor: `${info.color}15`,
                              color: info.color,
                            }}
                          >
                            {info.icon}
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ mb: 0.5 }}
                            >
                              {info.title}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {info.value}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card
                sx={{
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {t.contact.socialSection.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {t.contact.socialSection.subtitle}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      href="https://www.facebook.com/batumishotarustaveli/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "text.secondary",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#1877f2",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Facebook sx={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton
                      href="https://www.instagram.com/bsubatumi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "text.secondary",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#e4405f",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Instagram sx={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton
                      href="https://ge.linkedin.com/company/bsu-batumi"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "text.secondary",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#0077b5",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <LinkedIn sx={{ fontSize: 32 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t.contact.formSection.successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {t.contact.formSection.errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
