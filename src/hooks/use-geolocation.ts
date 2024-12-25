import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeoLocationState{
    coordinates:Coordinates|null
    error: string|null
    isLoading:boolean
}

export function useGeolocation(){
    //initial state
    const [locationData,setLocationData]=useState<GeoLocationState>({
        coordinates:null,
        error:null,
        isLoading:true
    })
    const getLocation=()=>{
        setLocationData((prev)=>({...prev,isLoading:true,error:null}))
        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,
                error:"Geolocation is not supported by your browser",
                isLoading:false
            })
            return
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                },
                error:null,
                isLoading:false,
            })
        },(error)=>{
            let errorMessage:string
            switch(error.code){
                case error.PERMISSION_DENIED:errorMessage=
                    "Loaction permission denies, please enable location access"
                    break;
                case error.POSITION_UNAVAILABLE:errorMessage=
                    "Loaction information is unavailable"
                    break;
                case error.TIMEOUT:errorMessage=
                    "Loaction request Timeout"
                    break;
                default:
                    errorMessage="An unknown error occured"
    
        }
        setLocationData({
            coordinates:null,
            error:errorMessage,
            isLoading:false
        })
    },{
      enableHighAccuracy:true,
      timeout:5000,
      maximumAge:0
    })
    }
    useEffect(()=>{
        getLocation()
    },[])
    return{
        ...locationData,
        getLocation,
    }
    
} 