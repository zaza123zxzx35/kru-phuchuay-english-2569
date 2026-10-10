import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Info from './pages/Info'
import Plan from './pages/Plan'
import Quiz from './pages/Quiz'
import Notes from './pages/Notes'
import Videos from './pages/Videos'
import Timetable from './pages/Timetable'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/info" element={<Info />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}
