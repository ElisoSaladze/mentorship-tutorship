import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import {
  Email,
  Work,
  School,
  Psychology,
  Interests,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getMentors } from "~/api/users/api";
import { keys } from "~/api/keys";
import { useLanguage } from "~/providers/language-provider";
import { useResourceUrl } from "~/hooks/useResourceUrl";

const MentorAvatar = ({ mentor }: { mentor: TYPES.UserResponse }) => {
  const { url } = useResourceUrl(mentor.data?.[0]);

  return (
    <Avatar
      src={url || undefined}
      sx={{
        width: 56,
        height: 56,
        fontSize: "1.25rem",
        bgcolor: "primary.main",
        color: "white",
        fontWeight: 600,
      }}
    >
      {mentor.name?.[0]?.toUpperCase()}
      {mentor.surname?.[0]?.toUpperCase()}
    </Avatar>
  );
};

const AcademicStaffPage = () => {
  const { t } = useLanguage();

  const {
    data: mentors,
    isLoading,
    error,
  } = useQuery({
    queryKey: keys.users.mentors(),
    queryFn: getMentors,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {t.common?.error || "Error loading mentors"}: {(error as Error).message}
        </Alert>
      </Container>
    );
  }

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
            {t.academicStaff?.pageTitle || "Our Mentors"}
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
            {t.academicStaff?.pageSubtitle || "Meet our experienced mentors ready to guide you"}
          </Typography>
        </Box>

        {mentors && mentors.length > 0 ? (
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
            {mentors.map((mentor) => (
              <Card
                key={mentor.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "none",
                  transition: "box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 2,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <MentorAvatar mentor={mentor} />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {mentor.name} {mentor.surname}
                      </Typography>
                      {mentor.workingPosition && (
                        <Typography variant="body2" color="text.secondary">
                          {mentor.workingPosition}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Stack spacing={1}>
                    {mentor.email && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Email sx={{ fontSize: 18, color: "text.disabled" }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {mentor.email}
                        </Typography>
                      </Box>
                    )}

                    {mentor.workingPlace && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Work sx={{ fontSize: 18, color: "text.disabled" }} />
                        <Typography variant="body2" color="text.secondary">
                          {mentor.workingPlace}
                        </Typography>
                      </Box>
                    )}

                    {mentor.mentoringCourseName && (
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <School sx={{ fontSize: 18, color: "text.disabled", mt: 0.25 }} />
                        <Typography variant="body2" color="text.secondary">
                          {mentor.mentoringCourseName}
                        </Typography>
                      </Box>
                    )}

                    {mentor.experience && (
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <Psychology sx={{ fontSize: 18, color: "text.disabled", mt: 0.25 }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {mentor.experience}
                        </Typography>
                      </Box>
                    )}

                    {mentor.hobbies && (
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <Interests sx={{ fontSize: 18, color: "text.disabled", mt: 0.25 }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {mentor.hobbies}
                        </Typography>
                      </Box>
                    )}
                  </Stack>

                  {mentor.programRoles && mentor.programRoles.length > 0 && (
                    <Box sx={{ mt: "auto", pt: 1 }}>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                        {mentor.programRoles.map((role) => (
                          <Chip
                            key={role}
                            label={role}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.75rem" }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {t.academicStaff?.noMentors || "No mentors available at the moment"}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AcademicStaffPage;
