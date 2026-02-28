import { Avatar, CircularProgress } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { useResourceUrl } from "~/hooks/useResourceUrl";

interface Props {
  resourceId?: string;
}

const SchemeImage = ({ resourceId }: Props) => {
  const { url, isLoading } = useResourceUrl(resourceId);

  if (!resourceId) {
    return (
      <Avatar
        variant="rounded"
        sx={{ width: 48, height: 48, bgcolor: "grey.200" }}
      >
        <ImageIcon sx={{ color: "grey.400" }} />
      </Avatar>
    );
  }

  if (isLoading) {
    return (
      <Avatar
        variant="rounded"
        sx={{ width: 48, height: 48, bgcolor: "grey.100" }}
      >
        <CircularProgress size={16} />
      </Avatar>
    );
  }

  return (
    <Avatar
      variant="rounded"
      src={url || undefined}
      sx={{ width: 48, height: 48, bgcolor: "grey.200" }}
    >
      <ImageIcon sx={{ color: "grey.400" }} />
    </Avatar>
  );
};

export default SchemeImage;
