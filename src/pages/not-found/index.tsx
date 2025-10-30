import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Typography>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} size="large">
        Go Back
      </Button>
    </Box>
  )
}
export default NotFound
