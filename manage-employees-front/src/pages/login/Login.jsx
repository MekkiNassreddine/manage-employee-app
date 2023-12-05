import './login.scss';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { queryApi } from "../../utils/queryApi";
import * as Yup from 'yup';

const Login = () => {
  const [error, setError] = useState({ visible: false, message: '' });
  const [badCredential, setBadCredential] = useState("")

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      try {
          
           const [userData, err] = await queryApi("login", values, "POST", false);  
        
        if (!userData) {
          setBadCredential("Bad Credential")
          setError({
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          });
        } else { 

          const { response, token } = userData;

           const user = {
            id: response.id_employee,
            full_name: response.full_name,
            email: response.email,
            id_card: response.id_card,
            role: response.role,
            nb_leaves: response.nb_leaves,
            state: response.state,
            token: token,
          };

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(user.token));
          console.log(user)
          window.location = "/home";
       };
        
      } catch (error) {
        setError({ visible: true, message: 'An error occurred during login.' });
      }
    },
  });

  return (
    <div className="login">
      <div className="loginContainer">
     
        <div className="loginBottom">
        <img src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg" alt="" className='imgage'/>
          <div className="loginRight">

            <form onSubmit={formik.handleSubmit} className="loginform">
            
              <div className="loginformInput">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="inputClass" 
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="errorText">{formik.errors.email}</div>
                )}
              </div>

              <div className="loginformInput">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className='inputClass' 
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="errorText">{formik.errors.password}</div>
                )}
              </div>
              {badCredential === "Bad Credential" && 
                <div className='divError'>
                  <h1 className='error'> Invalid credentials. Please try again.</h1>
                </div> 
                 }
              <button type="submit" className="buttonClass">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const yupSchema = Yup.object({
  email: Yup.string().required('Champs requis!'),
  password: Yup.string().required('Champs requis!'),
});

export default Login;
