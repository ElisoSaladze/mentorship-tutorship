import { JSX, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Fade,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  School,
  EmojiEvents,
  Groups,
} from "@mui/icons-material";

// Placeholder images with different categories
const galleryImages = [
  {
    id: 1,
    url: "https://via.placeholder.com/1200x600/03a9f3/ffffff?text=BSU+Campus+View",
    title: "BSU Campus",
    category: "Campus",
    description: "Beautiful view of our university campus",
  },
  {
    id: 2,
    url: "https://via.placeholder.com/1200x600/2E7D32/ffffff?text=Students+Studying",
    title: "Study Sessions",
    category: "Academic",
    description: "Students engaged in collaborative learning",
  },
  {
    id: 3,
    url: "https://via.placeholder.com/1200x600/FF9800/ffffff?text=Graduation+Ceremony",
    title: "Graduation Day",
    category: "Events",
    description: "Celebrating our graduates' achievements",
  },
  {
    id: 4,
    url: "https://via.placeholder.com/1200x600/9C27B0/ffffff?text=Research+Lab",
    title: "Research Laboratory",
    category: "Academic",
    description: "State-of-the-art research facilities",
  },
  {
    id: 5,
    url: "https://via.placeholder.com/1200x600/F44336/ffffff?text=Student+Activities",
    title: "Student Life",
    category: "Campus",
    description: "Vibrant student community activities",
  },
  {
    id: 6,
    url: "https://via.placeholder.com/1200x600/00BCD4/ffffff?text=Library",
    title: "University Library",
    category: "Campus",
    description: "Modern learning resources and study spaces",
  },
];

const additionalImages = [
  {
    id: 7,
    url: "https://via.placeholder.com/400x300/4CAF50/ffffff?text=Mentorship+Program",
    title: "Mentorship Sessions",
    category: "Programs",
  },
  {
    id: 8,
    url: "https://via.placeholder.com/400x300/E91E63/ffffff?text=Tutoring+Center",
    title: "Tutoring Center",
    category: "Programs",
  },
  {
    id: 9,
    url: "https://via.placeholder.com/400x300/673AB7/ffffff?text=Workshop",
    title: "Student Workshops",
    category: "Events",
  },
  {
    id: 10,
    url: "https://via.placeholder.com/400x300/FF5722/ffffff?text=Sports+Day",
    title: "Sports Events",
    category: "Events",
  },
  {
    id: 11,
    url: "https://via.placeholder.com/400x300/009688/ffffff?text=Computer+Lab",
    title: "Computer Lab",
    category: "Academic",
  },
  {
    id: 12,
    url: "https://via.placeholder.com/400x300/795548/ffffff?text=Cafeteria",
    title: "Campus Cafeteria",
    category: "Campus",
  },
];

const categoryIcons: Record<string, JSX.Element> = {
  Campus: <School />,
  Academic: <School />,
  Events: <EmojiEvents />,
  Programs: <Groups />,
};

const GalleryPage = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const filteredImages = selectedCategory
    ? additionalImages.filter((img) => img.category === selectedCategory)
    : additionalImages;

  const categories = Array.from(new Set(additionalImages.map((img) => img.category)));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>

      {/* Carousel Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: theme.palette.mode === "dark"
              ? "0 12px 40px rgba(0, 0, 0, 0.6)"
              : "0 12px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Carousel Images */}
          <Box sx={{ position: "relative", height: { xs: 300, sm: 400, md: 500 } }}>
            {galleryImages.map((image, index) => (
              <Fade key={image.id} in={currentSlide === index} timeout={600}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: currentSlide === index ? "block" : "none",
                  }}
                >
                  <Box
                    component="img"
                    src={image.url}
                    alt={image.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                      color: "white",
                      p: { xs: 2, sm: 4 },
                    }}
                  >
                    <Chip
                      icon={categoryIcons[image.category]}
                      label={image.category}
                      size="small"
                      sx={{
                        mb: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {image.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {image.description}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrevSlide}
            sx={{
              position: "absolute",
              left: { xs: 8, sm: 16 },
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <ArrowBackIos sx={{ ml: 0.5 }} />
          </IconButton>
          <IconButton
            onClick={handleNextSlide}
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 16 },
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>

          {/* Dots Indicator */}
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}
          >
            {galleryImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: currentSlide === index ? 32 : 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: currentSlide === index
                    ? "white"
                    : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Grid Section */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: "center",
            color: theme.palette.text.primary,
          }}
        >
          აღმოაჩინეთ მეტი
        </Typography>

        {/* Category Filter */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 4, flexWrap: "wrap" }}>
          <Chip
            label="All"
            onClick={() => setSelectedCategory(null)}
            color={selectedCategory === null ? "primary" : "default"}
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          {categories.map((category) => (
            <Chip
              key={category}
              icon={categoryIcons[category]}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? "primary" : "default"}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          ))}
        </Box>

        {/* Image Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              sx={{
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.palette.mode === "dark"
                    ? "0 12px 32px rgba(0, 0, 0, 0.6)"
                    : "0 12px 32px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={image.url}
                alt={image.title}
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  {categoryIcons[image.category]}
                  <Chip
                    label={image.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {image.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default GalleryPage;
