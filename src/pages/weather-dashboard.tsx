import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/use-geolocation'
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react'
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert';
import { useForcastQuery, useReverseGeoCodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { CurrentWeather } from '@/components/current-weather';
import { HourlyTemperature } from '@/components/hourly-temprature';
import WeatherDetails from '@/components/weather-details';
import { WeatherForecast } from '@/components/weather-forecast';


const WeatherDashboard = () => {
  const {
    coordinates,
    error:locationError,
    getLocation,
    isLoading:loacationLoading
  }=useGeolocation()

  const weatherQuery=useWeatherQuery(coordinates)
  const forecastQuery=useForcastQuery(coordinates)
  const locationQuery=useReverseGeoCodeQuery(coordinates)

  console.log(locationQuery)



  const handleRefresh=()=>{
    getLocation()
    if(coordinates){
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
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
  
  const locationName = locationQuery.data?.[0];

  console.log(locationName)

  if(weatherQuery.error||forecastQuery.error){
    return(
      <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle> error</AlertTitle>
      <AlertDescription>
        <p>Failed to fetch weather data please try</p>
        <Button onClick={getLocation} variant={"outline"} className='w-fit'>
          <RefreshCcw className='mr-2 h-4 w-4'/>
          Retry
        </Button>
      </AlertDescription> 
    </Alert>
    )
  }
  if(!forecastQuery.data|| !weatherQuery.data){
    return(
      <WeatherSkeleton/>
    )
  }

  return (
    <div className='space-x-4'>
      {/* Fav Cities */}
     
      {/* current weather */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'
        >My loactions</h1>
        <Button
        variant={"outline"}
        size={"icon"}
         onClick={handleRefresh}
         disabled={weatherQuery.isFetching||forecastQuery.isFetching}
        >
          <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`}/>
        </Button>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
        <CurrentWeather data={weatherQuery.data}
        locationName={locationName}
        />
        {/* hourly temprature */}
        <HourlyTemperature data={forecastQuery.data} />
        

        </div>
      
        <div className='grid gap-6 md:grid-cols-2 items-start'>
        {/* details */}
        <WeatherDetails data={weatherQuery.data}/>
         <WeatherForecast data={forecastQuery.data}/> 
        {/* forecast */}
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard
