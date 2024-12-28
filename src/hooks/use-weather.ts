import { Coordinates } from '@/api/types';
import { weatherAPI } from '@/api/weather';
import { useQuery } from '@tanstack/react-query';

export const WEATHER_KEYS={
    weather:(coords:Coordinates)=>["weather",coords] as const,
    forecast:(coords:Coordinates)=>["forecast",coords] as const,
    location:(coords:Coordinates)=>["location",coords] as const,
} as const

export function useWeatherQuery(coordinates:Coordinates|null){
    return useQuery({
        queryKey:WEATHER_KEYS.weather(coordinates??{lat:0,lon:0}),
        queryFn:()=>(
            coordinates?weatherAPI.getCurrentWeather(coordinates):null
    ),
        enabled:!!coordinates
    })
}
export function useForcastQuery(coordinates:Coordinates|null){
    return useQuery({
        queryKey:WEATHER_KEYS.forecast(coordinates??{lat:0,lon:0}),
        queryFn:()=>(
            coordinates?weatherAPI.getForeCast(coordinates):null
    ),
        enabled:!!coordinates
    })
}
export function useReverseGeoCodeQuery(coordinates:Coordinates|null){
    return useQuery({
        queryKey:WEATHER_KEYS.location(coordinates??{lat:0,lon:0}),
        queryFn:()=>(
            coordinates?weatherAPI.reverseGeoCode(coordinates):null
        ),
        enabled:!!coordinates
    })
}
