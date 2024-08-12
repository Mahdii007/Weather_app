import { createRoot } from 'react-dom/client'
import './index.css'
import WeatherApp from './WeatherApp'

createRoot(document.getElementById('root')!).render(
    <WeatherApp />
)
