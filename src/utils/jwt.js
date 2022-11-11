import jwtDecode from 'jwt-decode';
// routes
// import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   const currentTime = Date.now();

//   // Test token expires after 10s
//   // const timeLeft = currentTime + 10000 - currentTime; // ~10s
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(() => {
//     // eslint-disable-next-line no-alert
//     alert('Token expired');

//     localStorage.removeItem('accessToken');

//     // window.location.href = PATH_AUTH.login;
//   }, timeLeft);
// };

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export { isValidToken, setSession };
