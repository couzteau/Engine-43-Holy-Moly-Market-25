import ImageGallery from './components/ImageGallery'
import './App.css'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div className="app">
      <ImageGallery />
      <SpeedInsights />
    </div>
  )
}

export default App
