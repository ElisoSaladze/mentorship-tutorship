import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
export default Loader
