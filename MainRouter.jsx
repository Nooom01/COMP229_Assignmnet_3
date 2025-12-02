import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './src/components/Layout'

// Lazy load all components except Layout
const Home = lazy(() => import('./src/Home'))
const About = lazy(() => import('./src/about'))
const Contact = lazy(() => import('./src/contact'))
const Education = lazy(() => import('./src/education'))
const Project = lazy(() => import('./src/project'))
const Services = lazy(() => import('./src/services'))
const SignUp = lazy(() => import('./src/signup'))
const SignIn = lazy(() => import('./src/signin'))
const AdminRoute = lazy(() => import('./src/admin/AdminRoute'))
const AdminDashboard = lazy(() => import('./src/admin/Dashboard'))
const ManageUsers = lazy(() => import('./src/admin/ManageUsers'))

export default function MainRouter() {
  return (
    <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}>
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
    </Suspense>
  )
}