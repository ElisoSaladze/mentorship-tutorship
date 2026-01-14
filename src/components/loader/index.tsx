import { Box, keyframes } from "@mui/material";

const pulse = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        zIndex: 9999,
        gap: 1,
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: "primary.main",
            animation: `${pulse} 1.4s ease-in-out infinite`,
            animationDelay: `${index * 0.16}s`,
          }}
        />
      ))}
    </Box>
  );
};

export default Loader;
