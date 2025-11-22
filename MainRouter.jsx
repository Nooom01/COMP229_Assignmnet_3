import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './src/components/Home'
import About from './src/about'
import Contact from './src/contact'
import Education from './src/education'
import Project from './src/project'
import Services from './src/services'
import Layout from './src/components/Layout'
import SignIn from './src/signin'
import SignUp from './src/signup'
import AdminDashboard from './src/admin/Dashboard'
import ManageContacts from './src/admin/ManageContacts'
import ManageProjects from './src/admin/ManageProjects'
import ManageQualifications from './src/admin/ManageQualifications'
import PrivateRoute from './src/components/PrivateRoute'
import AdminRoute from './src/components/AdminRoute'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="education" element={<Education />} />
        <Route path="project" element={<Project />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        
        <Route path="admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="admin/contacts" element={
          <AdminRoute>
            <ManageContacts />
          </AdminRoute>
        } />
        <Route path="admin/projects" element={
          <AdminRoute>
            <ManageProjects />
          </AdminRoute>
        } />
        <Route path="admin/qualifications" element={
          <AdminRoute>
            <ManageQualifications />
          </AdminRoute>
        } />
      </Route>
    </Routes>
  )
}

export default MainRouter
