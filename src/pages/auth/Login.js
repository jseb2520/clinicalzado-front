import { useEffect } from 'react';
import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';
import ChangeLanguaje from '../../components/ChangeLanguaje';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, isAuthenticated } = useAuth();
  const { translate } = useLocales();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  useEffect(()=> {
    if (isAuthenticated) {
      window.location.href = '/dashboard/app';
    }
  }, [])

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          <Box sx={{ ml: 2 }}>
            <ChangeLanguaje />
          </Box>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {translate('app.auth.login.greetings')}
            </Typography>
            <Image visibleByDefault disabledEffect src="/assets/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {translate('app.auth.login.title')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{translate('app.auth.login.subtitle')}</Typography>
              </Box>

              <Tooltip title={capitalCase(method)} placement="right">
                <>
                  <Image
                    disabledEffect
                    src={`https://minimal-assets-api-dev.vercel.app/assets/icons/auth/ic_${method}.png`}
                    sx={{ width: 32, height: 32 }}
                  />
                </>
              </Tooltip>
            </Stack>

            <LoginForm />

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
