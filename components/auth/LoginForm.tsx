import React from 'react'
import CardWrapper from './CardWrapper'

const LoginForm = () => {
  return (
    <CardWrapper header='Login' label='Create an account' backButtonHref='/auth/register' backButtonLabel="Don't have an account? Register here.">
      <div>
        Card Children from Login Form
      </div>
    </CardWrapper>
  )
}

export default LoginForm
