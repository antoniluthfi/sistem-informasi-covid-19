import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

// helper
import Helper from './Helper';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { input, changeHandler, Register } = Helper();

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email harus valid')
                .max(255)
                .required('Email is required'),
              nama: Yup.string()
                .max(255)
                .required('Nama wajib diisi'),
              password: Yup.string()
                .max(255)
                .required('Password wajib diisi'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={() => Register(navigate)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  // error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  // helperText={touched.firstName && errors.firstName}
                  label="Nama"
                  margin="normal"
                  name="nama"
                  onBlur={handleBlur}
                  onChange={changeHandler}
                  value={input.nama}
                  variant="outlined"
                />
                <TextField
                  // error={Boolean(touched.email && errors.email)}
                  fullWidth
                  // helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={changeHandler}
                  type="email"
                  value={input.email}
                  variant="outlined"
                />
                <TextField
                  // error={Boolean(touched.password && errors.password)}
                  fullWidth
                  // helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={changeHandler}
                  type="password"
                  value={input.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
