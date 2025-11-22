import { Routes, Route } from 'react-router-dom'
import Layout from './src/components/Layout.jsx'
import Home from './src/Home.jsx'
import About from './src/about.jsx'
import Contact from './src/contact.jsx'
import Education from './src/education.jsx'
import Project from './src/project.jsx'
import Services from './src/services.jsx'
import SignUp from './src/signup.jsx'
import SignIn from './src/signin.jsx'
import AdminRoute from './src/admin/AdminRoute.jsx'
import AdminDashboard from './src/admin/Dashboard.jsx'
import ManageUsers from './src/admin/ManageUsers.jsx'

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