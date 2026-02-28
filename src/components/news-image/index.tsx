import { Box, CardMedia, CircularProgress } from "@mui/material";
import { memo } from "react";
import { useResourceUrl } from "~/hooks/useResourceUrl";

const NewsImage = memo(({ resourceId }: { resourceId?: string }) => {
  const { url, isLoading } = useResourceUrl(resourceId);

  if (!resourceId || (!url && !isLoading)) return null;

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <CardMedia
      component="img"
      image={url || undefined}
      alt=""
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
});


export default NewsImage;