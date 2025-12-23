import { Box, Container, Typography, Link, useTheme, IconButton } from "@mui/material";
import { Email, Phone, LocationOn, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useLanguage } from "../../providers/language-provider";

const Footer = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const linkStyles = {
    fontSize: { xs: "0.9rem", sm: "0.875rem" },
    transition: "all 0.3s ease",
    position: "relative" as const,
    width: "fit-content",
    py: 0.5,
    "&:hover": {
      color: theme.palette.primary.main,
      paddingLeft: "8px",
    },
    "&::before": {
      content: '""',
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      width: 0,
      height: "2px",
      backgroundColor: theme.palette.primary.main,
      transition: "width 0.3s ease",
    },
    "&:hover::before": {
      width: "100%",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === "dark"
          ? "rgba(30, 30, 30, 0.95)"
          : "rgba(250, 250, 250, 0.95)",
        borderTop: `1px solid ${theme.palette.divider}`,
        py: { xs: 4, sm: 5, md: 6 },
        mt: "auto",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 4, sm: 4, md: 5 },
          }}
        >
          {/* About Section */}
          <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1", md: "auto" } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Box
                component="img"
                src="/bsu-logo.png"
                alt="BSU Logo"
                sx={{
                  height: { xs: 36, sm: 40 },
                  width: "auto",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  color: theme.palette.primary.main,
                }}
              >
                {t.footer.aboutSection.title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                lineHeight: 1.7,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                maxWidth: { md: "90%" },
              }}
            >
              {t.footer.aboutSection.description}
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, mt: 2 }}>
              <IconButton
                href="https://www.facebook.com/batumishotarustaveli/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  width: { xs: 44, sm: 40 },
                  height: { xs: 44, sm: 40 },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#1877f2",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Facebook sx={{ fontSize: { xs: 24, sm: 22 } }} />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/bsubatumi/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  width: { xs: 44, sm: 40 },
                  height: { xs: 44, sm: 40 },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#e4405f",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Instagram sx={{ fontSize: { xs: 24, sm: 22 } }} />
              </IconButton>
              <IconButton
                href="https://ge.linkedin.com/company/bsu-batumi"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  width: { xs: 44, sm: 40 },
                  height: { xs: 44, sm: 40 },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#0077b5",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <LinkedIn sx={{ fontSize: { xs: 24, sm: 22 } }} />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {t.footer.quickLinks.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 1.5 } }}>
              <Link
                href="/"
                color="text.secondary"
                underline="none"
                sx={linkStyles}
              >
                {t.footer.quickLinks.aboutProject}
              </Link>
              <Link
                href="#registration"
                color="text.secondary"
                underline="none"
                sx={linkStyles}
              >
                {t.footer.quickLinks.registration}
              </Link>
              <Link
                href="/gallery"
                color="text.secondary"
                underline="none"
                sx={linkStyles}
              >
                {t.footer.quickLinks.gallery}
              </Link>
              <Link
                href="/contact"
                color="text.secondary"
                underline="none"
                sx={linkStyles}
              >
                {t.footer.quickLinks.contact}
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {t.footer.contact.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 } }}>
              <Link
                href="mailto:info@bsuproject.ge"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  py: 0.5,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Email sx={{ fontSize: { xs: 20, sm: 18 } }} />
                <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", sm: "0.875rem" } }}>
                  {t.footer.contact.email}
                </Typography>
              </Link>
              <Link
                href="tel:+995XXXXXXXXX"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  py: 0.5,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Phone sx={{ fontSize: { xs: 20, sm: 18 } }} />
                <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", sm: "0.875rem" } }}>
                  {t.footer.contact.phone}
                </Typography>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  color: theme.palette.text.secondary,
                  py: 0.5,
                }}
              >
                <LocationOn sx={{ fontSize: { xs: 20, sm: 18 }, mt: 0.25 }} />
                <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", sm: "0.875rem" } }}>
                  {t.footer.contact.location}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            mt: { xs: 3, sm: 4 },
            pt: { xs: 2, sm: 3 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
          >
            &copy; {new Date().getFullYear()} {t.footer.aboutSection.title}. {t.footer.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
