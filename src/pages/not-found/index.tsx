import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '~/providers/language-provider'

const NotFound = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <Box>
      <Typography>
        {t.notFound.message}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} size="large">
        {t.notFound.goBack}
      </Button>
    </Box>
  )
}
export default NotFound
