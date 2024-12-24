import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/use-geolocation'
import { RefreshCcw } from 'lucide-react'
import { Coordinates } from '../api/types';

const WeatherDashboard = () => {
  const {
    coordinates,
    error:locationError,
    getLocation,
    isLoading:loacationLoading
  }=useGeolocation()
  console.log(coordinates)
  const handleRefresh=()=>{
    getLocation()
    if(coordinates){
      //reload weather data
    }
  }

  return (
    <div>
      {/* Fav Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'
        >My loactions</h1>
        <Button
        variant={"outline"}
        size={"icon"}
         onClick={handleRefresh}
        // disabled={}
        >
          <RefreshCcw className='h-4 w-4'/>
        </Button>
      </div>
      {/* Current and Hourly weather */}
    </div>
  )
}

export default WeatherDashboard
