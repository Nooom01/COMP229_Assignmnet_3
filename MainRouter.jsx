import { Routes, Route } from 'react-router-dom'
import Layout from './src/components/Layout'  // Changed path - added /src
import Home from './src/home'
import About from './src/about'
import Contact from './src/contact'
import Education from './src/education'
import Project from './src/project'
import Services from './src/services'
import SignUp from './src/signup'
import SignIn from './src/signin'
import AdminRoute from './src/admin/AdminRoute'
import AdminDashboard from './src/admin/Dashboard'
import ManageUsers from './src/admin/ManageUsers'

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="education" element={<Education />} />
        <Route path="projects" element={<Project />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        
        <Route path="admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }>
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>
    </Routes>
  )
}