import './App.css'
import Body from './components/body/Body'
import Header from './components/header/Header'
import Upload from './components/upload/Upload'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
