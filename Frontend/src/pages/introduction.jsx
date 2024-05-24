import { Box, Typography } from '@mui/material'
import { IMG } from '../utils/contants';
import Button from '@mui/material/Button';
import Search from '../components/search';
import { useNavigate } from 'react-router-dom';
function Introduction() {
  const navigage = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${IMG.BACKGROUND})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 12,
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          borderRadius: 12,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', width: '100%', marginBottom: '8px' }}>
          Welcome to my TSFlix website. <br />
          There are many interesting things waiting for you to explore.
        </Typography>
        <Search />
        <Button
          variant="contained"
          sx={{ width: '30%', marginTop: '8px' }}
          onClick={() => navigage('/home')}
        >Go to the home</Button>
        <Box 
          sx={
            {
              width: '100%',
              color: 'white',
              marginTop: '24px',
              textAlign: 'center',
              padding: '12px',
              borderRadius: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }
          }
        >
          <p>
            Xin chào! Chúng tôi là một đội ngũ chuyên gia với nhiều kinh nghiệm trong việc xây dựng các ứng dụng web và phát triển giao diện người dùng. Chúng tôi cam kết cung cấp những giải pháp sáng tạo và chất lượng cao để đáp ứng nhu cầu của bạn.
          </p>
          <p>
            Website của chúng tôi cung cấp một loạt các dịch vụ và sản phẩm phong phú, từ thiết kế giao diện đến phát triển ứng dụng web và tư vấn kỹ thuật. Chúng tôi tin rằng sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi và chúng tôi sẽ nỗ lực hết mình để mang lại giá trị và trải nghiệm tốt nhất cho bạn.
          </p>
          <p>
            Hãy khám phá website của chúng tôi và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào hoặc muốn biết thêm thông tin chi tiết. Chúng tôi rất mong được hợp tác với bạn và xây dựng những dự án tuyệt vời cùng nhau.
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default Introduction;