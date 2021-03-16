import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import client from '../../../services/graphql/client'
const createUserMutation = loader('../../graphql/createUser.graphql')

const SignUp = () => {
  const [createUser] = useMutation(createUserMutation, { client })

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Required')
  })

  return (
      <div>
        <h1>Signup form</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={ (values, { setSubmitting }) => {
            createUser({ variables: { input: values } })
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (<div>{errors.firstName}</div>) : null}
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>) : null}
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
  )
}

export default SignUp
