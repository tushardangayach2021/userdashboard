import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Calendar, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import SimpleBreadcrumbs from '../components/breadcrumbs/Breadcrumbs'
import { ROUTES } from '../helpers/constants'
import { get, isEmpty, mapStateWithData } from '../helpers/utils'
import useStyles from '../styles/user.style'
import UploadImg from '../assets/images/upload.png'
const initialState = {
  first_name: '',
  last_name: '',
  dob: '',
  email: '',
  avatar: '',
}
function EditUser({ user, masterData, searchStates, states, editUser }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const breadcrumbData = [
    {
      title: "Dasgboard" || t('breadcrumbSIS'),
      href: ROUTES.DASHBOARD,
    },
    {
      title: "User" || "t('breadcrumbUserManagement')",
      href: ROUTES.ALLUSERS,
    },
    {
      title: "User Detail" || "t('breadcrumbUser')",
      href: ROUTES.ALLUSERS,
    },
    {
      title: "Edit User",
      href: '',
    },
  ]
  const onSubmit = function (values, { setErrors }) {
    editUser(values, {
      setErrors,
      callback: () => {},
    })
  }
  if (isEmpty(user)) {
    // return <UserDetailsSkeleton />
  }
  return (
    <Box mt={2} mb={2}>
      <Formik
        onSubmit={onSubmit}
        initialValues={mapStateWithData(user.attributes || {}, initialState)}
        // validationSchema={AGMSchema.editAGMUser}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <Box pt={10}>
                <SimpleBreadcrumbs data={breadcrumbData} />
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12} sm="auto">
                    <Typography
                      component="h4"
                      align="left"
                      variant="h5"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="700">
                        {/* {t('editProfile')} */}
                        Edit Profile
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Box
                      mt={{ xs: 1, sm: 0 }}
                      display="flex"
                      alignItems="center"
                      justifyContent={{
                        xs: 'flex-start',
                        sm: 'flex-end',
                        md: 'space-between',
                      }}
                    >
                      <Button
                        className="custom-default-button text-transform-none"
                        size="large"
                        variant="contained"
                        disableElevation
                      >
                        {t('cancel')}
                      </Button>
                      <Box ml={2}>
                        <Button
                          className="text-transform-none"
                          size="large"
                          variant="contained"
                          disableElevation
                          color="primary"
                          type="submit"
                        >
                          {t('save')}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Paper rounded={true} elevation={1} className="paper-round">
                <Box px={{ xs: 2, lg: 4 }} py={{ xs: 2, lg: 4 }}>
                  {/* <Box pb={3}>
                    <Typography
                      component="p"
                      align="left"
                      variant="body2"
                      color="Primary"
                      className="bg-color-surface"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('personalDetails')}
                      </Box>
                    </Typography>
                  </Box> */}
                  {/* personal */}
                  <Grid container spacing={3} 
                //   direction="row-reverse"
                  >
                    <Grid item xs={12} md={4} lg={4}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={3}
                        flexDirection="column"
                      >
                        <Box
                          className="user-profile"
                          height={{ xs: 100, sm: 150, md: 200, xl: 200 }}
                          width={{ xs: 100, sm: 150, md: 200, xl: 200 }}
                        >
                          <img
                            src={
                              typeof values?.avatar === 'object'
                                ? URL.createObjectURL(values?.avatar)
                                : user.attributes?.avatar_full || UploadImg
                            }
                          />
                        </Box>
                        <Box
                          mt={1}
                          component="div"
                          fontWeight="600"
                          fonSize="14px"
                          align="center"
                          width="100%"
                          color="primary"
                          className="upload-link-text"
                        >
                          <input
                            onChange={(e) => {
                              let reader = new FileReader()
                              let file = e.currentTarget.files[0]
                              if (!file || !reader.readAsDataURL) {
                                return
                              }
                              reader.onloadend = () => {
                                setFieldValue('avatar', file)
                                // editLogo(file)
                              }
                              reader.readAsDataURL(file)
                            }}
                            accept="image/jpeg,image/png,image/"
                            id="contained-button-file"
                            type="file"
                            title=""
                            hidden
                          />
                          <Box display="flex" justifyContent="center">
                            <label className="link-color-text" htmlFor="contained-button-file">
                              {t('fields:editUpload')}
                            </label>
                            <Box ml={2} zIndex="9">
                              <Tooltip title={t('fields:uploadYourLatestPhoto')} placement="top">
                                <HelpCircle width={20} height={20} className="help-icon" />
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <ErrorMessage name="avatar">
                        {(msg) => (
                          <span className="error text-center" tabIndex={0}>
                            {t(msg, { field: t('fields:avatar') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  {/* personal */}
                  <Box py={3}>
                    <Typography
                      component="p"
                      align="left"
                      variant="body2"
                      color="Primary"
                      className="bg-color-surface"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('contactDetails')}
                      </Box>
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:emailAddress')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="email"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="email"
                          readOnly
                          autoComplete="email"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconEmailAddress')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                            readOnly: true,
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:emailAddress')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconEmailAddress')})
                            </span>
                          }
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:emailAddress') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

EditUser.propTypes = {
  user: PropTypes.object,
  masterData: PropTypes.object,
  searchStates: PropTypes.func,
  states: PropTypes.array,
  editUser: PropTypes.func,
  // editLogo: PropTypes.func,
}

EditUser.defaultProps = {
  user: {},
  masterData: {},
  searchStates: () => {},
  states: [],
  editUser: () => {},
  // editLogo: () => {},
}

export default EditUser
