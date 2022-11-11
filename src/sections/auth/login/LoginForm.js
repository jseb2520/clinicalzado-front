import * as Yup from 'yup';
import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();
  const { translate } = useLocales();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(translate('app.auth.login.error.email'))
      .required(translate('app.auth.login.error.emailRequired')),
    password: Yup.string().required(translate('app.auth.login.error.password')),
  });

  const defaultValues = {
    email: 'johanseb2520@gmail.com',
    password: 'Admin123',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label={translate('app.auth.login.emailInput')} />

        <RHFTextField
          name="password"
          label={translate('app.auth.login.passwordInput')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} style={{marginTop: '15px'}}>
        {translate('app.auth.login.button')}
      </LoadingButton>
    </FormProvider>
  );
}
