import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import MainRouter from '../MainRouter'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App