import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/use-geolocation'
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react'
import { Coordinates } from '../api/types';
import { Skeleton } from '@/components/ui/skeleton';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert';

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
  if(loacationLoading){
    return <WeatherSkeleton/>
  }
  if(locationError){
    return(
      <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location error</AlertTitle>
      <AlertDescription>
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className='w-fit'>
          <MapPin className='mr-2 h-4 w-4'/>
          Enable Location
        </Button>
      </AlertDescription> 
    </Alert>
    )
  }
  if(!coordinates){
    return(
      <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription>
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className='w-fit'>
          <MapPin className='mr-2 h-4 w-4'/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
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
