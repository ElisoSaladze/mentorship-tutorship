import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { getProgramSchemeById } from "~/api/program-scheme/api";

type Props = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

const ProgramSchemeDetails = ({ id, isOpen, onClose }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["programScheme", id],
    queryFn: () => getProgramSchemeById(id),
    enabled: isOpen && !!id,
  });

  const handleJoin = () => {
    // Implement join logic here
    console.log("Joining program scheme:", id);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          Program Scheme Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={300}
          >
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load program scheme details. Please try again.
          </Alert>
        )}

        {data && (
          <Stack spacing={3}>
            {/* Title Section */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="600">
                {data.title || "Program Scheme"}
              </Typography>
              {/* <Chip
                label={data.status || "Active"}
                color={data.status === "Active" ? "success" : "default"}
                size="small"
              /> */}
            </Box>

            {/* Description */}
            {data.description && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Description
                </Typography>
                <Typography variant="body1">{data.description}</Typography>
              </Box>
            )}

            <Divider />

            {/* Info Cards */}
            {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <CalendarMonth color="primary" fontSize="small" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                </Stack>
                <Typography variant="body1" fontWeight="500">
                  {data.duration || "12 weeks"}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <People color="primary" fontSize="small" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Participants
                  </Typography>
                </Stack>
                <Typography variant="body1" fontWeight="500">
                  {data.participants || "25 enrolled"}
                </Typography>
              </Box>
            </Stack> */}

            {/* Benefits/Features */}
            {/* {data.features && data.features.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Key Features
                </Typography>
                <Stack spacing={1} mt={1}>
                  {data.features.map((feature, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1}
                      alignItems="flex-start"
                    >
                      <CheckCircle
                        color="success"
                        fontSize="small"
                        sx={{ mt: 0.5 }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )} */}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleJoin}
          variant="contained"
          color="primary"
          disabled={isLoading || !!error}
        >
          Join Program
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgramSchemeDetails;
