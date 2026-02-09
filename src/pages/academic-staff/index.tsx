import { useState } from "react";
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
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Email,
  Work,
  School,
  Psychology,
  Interests,
  Star,
  Close,
  CalendarMonth,
  Tag,
  EmojiObjects,
  RateReview,
  MenuBook,
  Description,
} from "@mui/icons-material";
import { TextArea } from "~/components/form/basic/text-area";
import { useQuery } from "@tanstack/react-query";
import { getMentors } from "~/api/users/api";
import { keys } from "~/api/keys";
import { useLanguage } from "~/providers/language-provider";
import { useResourceUrl } from "~/hooks/useResourceUrl";

const MentorAvatar = ({ mentor, size = 56 }: { mentor: TYPES.UserResponse; size?: number }) => {
  const { url } = useResourceUrl(mentor.data?.[0]);

  return (
    <Avatar
      src={url || undefined}
      sx={{
        width: size,
        height: size,
        fontSize: size > 60 ? "1.75rem" : "1.25rem",
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

const InfoRow = ({
  icon,
  label,
  value,
  multiline,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  multiline?: boolean;
}) => {
  if (!value) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
      <Box sx={{ color: "text.disabled", mt: 0.25 }}>{icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.disabled" sx={{ display: "block", mb: 0.25 }}>
          {label}
        </Typography>
        {multiline ? (
          <TextArea
            value={value}
            multiline
            rows={3}
            disabled
            fullWidth
            size="small"
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
          />
        ) : (
          <Typography variant="body2">{value}</Typography>
        )}
      </Box>
    </Box>
  );
};

const AcademicStaffPage = () => {
  const { t } = useLanguage();
  const [selectedMentor, setSelectedMentor] = useState<TYPES.UserResponse | null>(null);

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
                onClick={() => setSelectedMentor(mentor)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 4,
                    borderColor: "primary.light",
                    transform: "translateY(-2px)",
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
                      {mentor.rating != null && mentor.rating > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                          <Rating
                            value={mentor.rating}
                            precision={0.5}
                            size="small"
                            readOnly
                            icon={<Star fontSize="inherit" sx={{ color: "#faaf00" }} />}
                            emptyIcon={<Star fontSize="inherit" sx={{ opacity: 0.3 }} />}
                          />
                          <Typography variant="caption" color="text.secondary">
                            ({mentor.rating})
                          </Typography>
                        </Box>
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
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <School sx={{ fontSize: 18, color: "text.disabled" }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {mentor.mentoringCourseName}
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
          <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
            <Typography variant="h6" color="text.secondary">
              {t.academicStaff?.noMentors || "No mentors available at the moment"}
            </Typography>
          </Box>
        )}
      </Container>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: { xs: 2, sm: 3 }, m: { xs: 2, sm: 3 } } }}
      >
        {selectedMentor && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                pb: 1,
                px: { xs: 2, sm: 3 },
                pt: { xs: 2, sm: 3 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MentorAvatar mentor={selectedMentor} size={72} />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedMentor.name} {selectedMentor.surname}
                  </Typography>
                  {selectedMentor.workingPosition && (
                    <Typography variant="body2" color="text.secondary">
                      {selectedMentor.workingPosition}
                    </Typography>
                  )}
                  {selectedMentor.rating != null && selectedMentor.rating > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                      <Rating
                        value={selectedMentor.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                        icon={<Star fontSize="inherit" sx={{ color: "#faaf00" }} />}
                        emptyIcon={<Star fontSize="inherit" sx={{ opacity: 0.3 }} />}
                      />
                      <Typography variant="caption" color="text.secondary">
                        ({selectedMentor.rating})
                      </Typography>
                    </Box>
                  )}
                  {selectedMentor.programRoles && selectedMentor.programRoles.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                      {selectedMentor.programRoles.map((role) => (
                        <Chip key={role} label={role} size="small" color="primary" variant="outlined" />
                      ))}
                    </Stack>
                  )}
                </Box>
              </Box>
              <IconButton onClick={() => setSelectedMentor(null)} size="small">
                <Close />
              </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
              <Stack spacing={2}>
                <InfoRow icon={<Email sx={{ fontSize: 20 }} />} label={t.register?.email || "Email"} value={selectedMentor.email} />
                <InfoRow icon={<Work sx={{ fontSize: 20 }} />} label={t.register?.workplace || "Workplace"} value={selectedMentor.workingPlace} />
                <InfoRow icon={<School sx={{ fontSize: 20 }} />} label={t.register?.mentoringCourseName || "Mentoring Course"} value={selectedMentor.mentoringCourseName} />
                <InfoRow icon={<Description sx={{ fontSize: 20 }} />} label={t.register?.courseDescription || "Course Description"} value={selectedMentor.courseDescription} multiline />
                <InfoRow icon={<CalendarMonth sx={{ fontSize: 20 }} />} label={t.register?.educationalProgram || "Year / Program"} value={selectedMentor.year} />
                <InfoRow icon={<Psychology sx={{ fontSize: 20 }} />} label={t.register?.experience || "Experience"} value={selectedMentor.experience} multiline />
                <InfoRow icon={<EmojiObjects sx={{ fontSize: 20 }} />} label={t.register?.strengths || "Strengths"} value={selectedMentor.strengths} multiline />
                <InfoRow icon={<MenuBook sx={{ fontSize: 20 }} />} label={t.register?.motivation || "Motivation"} value={selectedMentor.motivation} multiline />
                <InfoRow icon={<Tag sx={{ fontSize: 20 }} />} label={t.register?.keywords || "Keywords"} value={selectedMentor.keywords} />
                <InfoRow icon={<Interests sx={{ fontSize: 20 }} />} label={t.register?.hobbies || "Hobbies"} value={selectedMentor.hobbies} multiline />
                <InfoRow icon={<RateReview sx={{ fontSize: 20 }} />} label={t.register?.expectations || "Expectations"} value={selectedMentor.expectations} multiline />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 1 }}>
              <Button
                onClick={() => setSelectedMentor(null)}
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none", minHeight: 44 }}
              >
                {t.common?.cancel || "Close"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AcademicStaffPage;
