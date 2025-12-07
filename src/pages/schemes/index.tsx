import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import {
  Business,
  EmojiPeople,
  AccountBalance,
  School,
  Computer,
  PersonAdd,
  Wc,
  Flight,
  Accessible,
  Groups,
  Park,
} from "@mui/icons-material";

interface MentoringScheme {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const schemes: MentoringScheme[] = [
  {
    id: "professional",
    title: "PROFESSIONAL MENTORING",
    description:
      "The scheme is designed to bridge the gap between academic learning and real-world professional practice. It is targeted at future graduates and aims to help young people acquire the necessary competencies for further professional development. Joint projects, internships, and consultations are suggested as the primary forms of mentor-mentee interaction. Upon completion of the program, mentees are expected to have a clearer career path, become more confident and develop the competencies necessary to effectively navigate future professional challenges.",
    icon: <Business sx={{ fontSize: 40 }} />,
    color: "#1976d2",
  },
  {
    id: "idps",
    title: "MENTORING FOR IDPs",
    description:
      "The mentoring scheme is specifically designed for internally displaced and relocated university students in Ukraine and Georgia who have been compelled to relocate due to various factors. It aims to empower young people to navigate the multifaceted challenges associated with their academic, social, and psychological well-being, facilitating their successful integration into new environments. Core components of the program include social entrepreneurship and community-oriented projects, which together with consultations and training offer a holistic support system. Consequently, mentees are equipped with critical thinking, problem-solving skills, emotional intelligence, and cultural competence, empowering them to surmount their distinct challenges with efficacy.",
    icon: <EmojiPeople sx={{ fontSize: 40 }} />,
    color: "#d32f2f",
  },
  {
    id: "business",
    title: "BUSINESS AND STARTUP MENTORING",
    description:
      "The scheme is designed for senior students and university faculty who are transitioning into the job market or aiming to commercialize their research. It focuses on transforming innovative ideas into viable startup projects and equipping mentees with skills to effectively present ideas to potential investors. Participants receive advice and professional support through mentoring sessions, coaching, and collaborative startup projects, enhancing their market competitiveness. The scheme fosters personal and professional growth, nurturing confident and capable professionals adept at turning innovative concepts into investment-ready proposals.",
    icon: <Business sx={{ fontSize: 40 }} />,
    color: "#388e3c",
  },
  {
    id: "green-deal",
    title: "GREEN DEAL MENTORING",
    description:
      "The scheme provides a learning platform for exchanging knowledge and innovative practices in green technologies, including ecologization of production, agrotechnologies, transport, biodiversity, energy efficiency, decarbonization, clean energy, advanced clean technological innovations, etc. It targets senior students and professionals, focusing on the European Green Deal's implementation and development. Mentees participate in mentoring sessions and Green Deal projects to enhance their skills and career prospects in this field. The program aims to boost the mentees' confidence and understanding, equipping them to address environmental challenges and realize their professional potential effectively.",
    icon: <Park sx={{ fontSize: 40 }} />,
    color: "#2e7d32",
  },
  {
    id: "local-government",
    title: "LOCAL GOVERNMENT-LED MENTORING",
    description:
      "The scheme is designed for higher education students in law, public administration, and management, aiming to prepare them for roles in public administration and legal sectors. Through the program, mentees develop practical skills in lawmaking, law enforcement, and management, enhancing their ability to tackle complex tasks, including those related to national security. Mentees engage in various forms of practical learning including internships, practical training, joint projects, and consultations, facilitated by mentors to develop their skills, understand the legal and public administration systems, and prepare for future employment. The scheme focuses on real-world professional training, fostering the development of essential qualities and competencies for successful employment, and enhancing adaptability and decision-making skills.",
    icon: <AccountBalance sx={{ fontSize: 40 }} />,
    color: "#0288d1",
  },
  {
    id: "young-teacher",
    title: "YOUNG TEACHER MENTORING",
    description:
      "The mentoring scheme aims to develop professionals capable of adapting to societal changes and utilizing modern technologies in pedagogical activities. It focuses on creating a new generation of teachers dedicated to the holistic development of students in various educational settings. The program incorporates socially significant projects to enhance critical thinking, as well as specialized coaching and internships in diverse fields, offering practical experiences and professional growth. By the end of the program, mentees will have gained comprehensive competences, preparing them to effectively navigate and contribute to the dynamic landscape of education.",
    icon: <School sx={{ fontSize: 40 }} />,
    color: "#f57c00",
  },
  {
    id: "digital",
    title: "DIGITAL TUTORING/MENTORING",
    description:
      "The digital mentoring scheme is tailored for students, including those majoring in IT and other fields, aiming to enhance their digital skills and prepare them for the evolving job market. The program addresses challenges such as the fast-paced evolution of IT technology and the need for continuous learning to stay competitive. It offers various forms of engagement including internships, practical training, and projects, facilitated by mentors to help students navigate digital tools and trends effectively. The ultimate goal is to foster a diverse and inclusive environment, enabling mentees to become adaptable, highly skilled professionals ready for the dynamic digital landscape.",
    icon: <Computer sx={{ fontSize: 40 }} />,
    color: "#7b1fa2",
  },
  {
    id: "first-year",
    title: "FIRST-YEAR STUDENT TUTORING",
    description:
      "The scheme facilitates newcomer students in transitioning smoothly into university life, offering academic support, social integration, and personal growth. It helps them adapt to the new academic environment, develop study skills, and improve academic performance while reducing stress and anxiety. The target audience is first-year students from various backgrounds, needing support in adapting to the new educational environment, understanding academic expectations, and managing their studies. The tutoring scheme provides organizational, informational, and psychological support, promoting study skills, socialization, and independence in the new educational setting. Various forms of work, including individual consultations and group activities, are offered to enhance the students' adaptation and learning experience.",
    icon: <PersonAdd sx={{ fontSize: 40 }} />,
    color: "#c2185b",
  },
  {
    id: "gender",
    title: "GENDER MENTORING (WOMEN IN SCIENCE)",
    description:
      "The mentoring scheme aims to empower student girls to become more goal-oriented and actively participate in scientific events, enhancing their professionalism and career advancement while promoting gender equality in education. The collaboration between mentor and mentee is focused on skill and confidence development for professional growth, raising awareness on gender issues, and implementing preventive measures against gender discrimination. Various forms of work, including project development, research design, presentations, and discussions, are incorporated to facilitate learning and awareness. Interaction with accomplished women scientists through meetings and debates provides students with real-life examples and insights on overcoming challenges and achieving success in their careers.",
    icon: <Wc sx={{ fontSize: 40 }} />,
    color: "#e91e63",
  },
  {
    id: "internationalization",
    title: "INTERNATIONALIZATION TUTORING FOR OUTGOING STUDENTS",
    description:
      "The aim of the scheme is to provide guidance, support, and resources to students who are planning to study or engage in educational experiences abroad. They will acquire skills in CV writing, effective communication, and project and grant applications. Tutors focus on disseminating information about international opportunities and preparing students for the challenges of living and studying in a foreign environment. The scheme includes individual and group activities, seminars, and projects to equip students with the necessary skills and knowledge for successful international academic engagement.",
    icon: <Flight sx={{ fontSize: 40 }} />,
    color: "#00796b",
  },
  {
    id: "disabilities",
    title: "MENTORING FOR STUDENTS WITH DISABILITIES",
    description:
      "The mentoring scheme is designed to support students with disabilities and is focused on inclusivity and empowerment. It provides both individual assistance and team collaboration, aiming to forge opportunities for the development of essential skills in the academic and professional fields, while fostering an inclusive and nurturing environment for these students. Various engagement methods, including internships, training, consultations, and joint projects, are employed to meet the unique needs and unlock the potential of each mentee with disabilities. This comprehensive approach ensures that students receive not only academic support but also preparation and the ability to confidently and competently address professional tasks in the future.",
    icon: <Accessible sx={{ fontSize: 40 }} />,
    color: "#5e35b1",
  },
  {
    id: "buddy",
    title: "BUDDY TUTORING",
    description:
      "The mentoring scheme is designed to support for international students, particularly those from diverse cultural and religious backgrounds, as they adapt to a new country. The scheme centers around international students who are assisted by local students in navigating various aspects of life in their new environment. This approach focuses on language assistance, campus navigation, overcoming cultural shock, social integration, and more. Buddy tutoring aims to create an environment where international students can comfortably settle into their new surroundings while building lasting connections with local peers.",
    icon: <Groups sx={{ fontSize: 40 }} />,
    color: "#ff6f00",
  },
];

const SchemesPage = () => {
  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            T&M Mentoring Schemes
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Explore our comprehensive mentoring and tutoring programs designed
            to support students and professionals in various aspects of their
            academic and career development
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
          }}
        >
          {schemes.map((scheme) => (
            <Card
              key={scheme.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: scheme.color,
                      color: "white",
                      borderRadius: 2,
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {scheme.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    fontWeight={600}
                    sx={{ flex: 1 }}
                  >
                    {scheme.title}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    textAlign: "justify",
                  }}
                >
                  {scheme.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            For more information about any of these schemes, please contact our
            mentoring coordinator or visit the program office.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SchemesPage;
