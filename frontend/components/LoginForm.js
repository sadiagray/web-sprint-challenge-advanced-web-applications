import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({ username: '', password: '' });
  const {login} = props;

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
    validate();
  }

  const onSubmit = evt => {
    evt.preventDefault()
    login(values)
    setValues(initialFormValues);
  }

  const isDisabled = () => {
    if(values.username.trim().length >= 3 && values.password.trim().length >= 8){
      return false
    }else{
      return true
    }
  }

  const validate = () => {
    const newErrors = { username: '', password: '' };
    if (values.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    if (values.password.trim().length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    setErrors(newErrors);
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        type='username'
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
        required
      />
      {errors.username && <p>{errors.username}</p>}

      <input
        maxLength={20}
        type='password'
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
        required
      />
      {errors.password && <p>{errors.password}</p>}
      
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
