import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '~/providers/language-provider'

const NotFound = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        gap: 3,
        p: 3,
      }}
    >
      <Typography variant="h1" fontWeight={700} color="primary">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        {t.notFound.message}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        size="large"
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
        }}
      >
        {t.notFound.goBack}
      </Button>
    </Box>
  )
}
export default NotFound
