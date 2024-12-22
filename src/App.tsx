import Layout from "./components/Layout"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import { ThemeProvider } from "./context/theme-provider"
import WeatherDashboard from "./pages/weather-dashboard"
import City from "./pages/city"




function App() {
 
  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
    <Layout>
      <Routes>
        <Route path="/"element={<WeatherDashboard/>}/>
        <Route path="/city/:cityName"element={<City/>}/>
      </Routes>
    </Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
