import './new.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik';
import { queryApi } from "../../utils/queryApi";
import * as Yup from 'yup';

const New = ({ title }) => {
  const [error, setError] = useState({ visible: false, message: '' });
  const formik = useFormik({
    initialValues: {
      full_name:'',
      email: '',
      password: '',
      id_card: '',
    },
    validationSchema: yupSchema,
    onSubmit: async (values,  { resetForm }) => {
      try {
          console.log(values)
           const [userData, err] = await queryApi("employees/register", values, "POST", false);
        
        if (!userData) {
          setError({
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          });
          toast.error('Failed to register employee', { position: toast.POSITION.TOP_RIGHT });
        } else { 
          toast.success('Employee added successfully', { position: toast.POSITION.TOP_RIGHT });
          resetForm();
       };
        
      } catch (error) {
        setError({ visible: true, message: 'An error occurred during login.' });
        toast.error('An error occurred', { position: toast.POSITION.TOP_RIGHT });
      }
    },
  });


  const [file, setFile] = useState("");
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
         
          <div className="right">
            <form onSubmit={formik.handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>                
              <div className="formInput">
                  <label>Name and surname</label>
                  <input 
                  id="full_name"
                  type="text" 
                  name="full_name"
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ali Saleh" />
                   {formik.touched.full_name && formik.errors.full_name && (
                  <div className="errorText">{formik.errors.full_name}</div>
                )}
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input 
                  id="email"
                  type="email" 
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ali@gmail.com" />
                   {formik.touched.email && formik.errors.email && (
                  <div className="errorText">{formik.errors.email}</div>
                )}
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input 
                  id="password"
                  type="password" 
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                   {formik.touched.password && formik.errors.password && (
                  <div className="errorText">{formik.errors.password}</div>
                )}
                </div>
                <div className="formInput">
                  <label>National ID card</label>
                  <input 
                  id="id_card"
                  type="text" 
                  name="id_card"
                  value={formik.values.id_card}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="123456789" />
                   {formik.touched.id_card && formik.errors.id_card && (
                  <div className="errorText">{formik.errors.id_card}</div>
                )}
                </div>
              <button type="submit">Send</button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const yupSchema = Yup.object({
  full_name: Yup.string()
    .required('Champs requis!')
    .test('two-words', 'Full name must be composed of two words (name and surname)', (value) => {
      const words = value.trim().split(' ');
      return words.length === 2;
    }),
  email: Yup.string().required('Champs requis!').email('Format d\'email incorrect'),
  password: Yup.string().required('Champs requis!'),
  id_card: Yup.string()
    .required('Champs requis!')
    .matches(/^[0-9]+$/, 'ID card must contain only numbers')
    .length(5, 'ID card must be exactly 5 characters long'),
});

export default New