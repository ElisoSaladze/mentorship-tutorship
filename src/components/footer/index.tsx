import { Box, Container, Typography, Link, useTheme, IconButton } from "@mui/material";
import { Email, Phone, LocationOn, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useLanguage } from "../../providers/language-provider";

const Footer = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === "dark"
          ? "rgba(30, 30, 30, 0.95)"
          : "rgba(250, 250, 250, 0.95)",
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 6,
        mt: "auto",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {/* About Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Box
                component="img"
                src="/bsu-logo.png"
                alt="BSU Logo"
                sx={{
                  height: 40,
                  width: "auto",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                }}
              >
                {t.footer.aboutSection.title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.7 }}
            >
              {t.footer.aboutSection.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                href="https://www.facebook.com/batumishotarustaveli/"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#1877f2",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/bsubatumi/"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#e4405f",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://ge.linkedin.com/company/bsu-batumi"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#0077b5",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {t.footer.quickLinks.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="/home"
                color="text.secondary"
                underline="none"
                sx={{
                  fontSize: "0.875rem",
                  transition: "all 0.3s ease",
                  position: "relative",
                  width: "fit-content",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    paddingLeft: "8px",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
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
                }}
              >
                {t.footer.quickLinks.aboutProject}
              </Link>
              <Link
                href="#registration"
                color="text.secondary"
                underline="none"
                sx={{
                  fontSize: "0.875rem",
                  transition: "all 0.3s ease",
                  position: "relative",
                  width: "fit-content",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    paddingLeft: "8px",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
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
                }}
              >
                {t.footer.quickLinks.registration}
              </Link>
              <Link
                href="/gallery"
                color="text.secondary"
                underline="none"
                sx={{
                  fontSize: "0.875rem",
                  transition: "all 0.3s ease",
                  position: "relative",
                  width: "fit-content",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    paddingLeft: "8px",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
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
                }}
              >
                {t.footer.quickLinks.gallery}
              </Link>
              <Link
                href="/contact"
                color="text.secondary"
                underline="none"
                sx={{
                  fontSize: "0.875rem",
                  transition: "all 0.3s ease",
                  position: "relative",
                  width: "fit-content",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    paddingLeft: "8px",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
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
                }}
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
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {t.footer.contact.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link
                href="mailto:info@bsuproject.ge"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Email
                  fontSize="small"
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <Typography variant="body2">
                  {t.footer.contact.email}
                </Typography>
              </Link>
              <Link
                href="tel:+995XXXXXXXXX"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.text.secondary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Phone
                  fontSize="small"
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <Typography variant="body2">
                  {t.footer.contact.phone}
                </Typography>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.text.secondary,
                }}
              >
                <LocationOn fontSize="small" />
                <Typography variant="body2">
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
            mt: 4,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} {t.footer.aboutSection.title}. {t.footer.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
