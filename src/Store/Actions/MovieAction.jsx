import axios from "../../utils/axios";
import { loadmovie } from "../Reducers/MovieSlice";
// import {  removemovie } from "../Reducers/MovieSlice";
export const fetchmovie= (id)=> async (dispatch,getState) =>{
    try {
        const detail= await axios.get(`/movie/${id}`)
        const externalid= await axios.get(`/movie/${id}/external_ids`)
        const similar= await axios.get(`/movie/${id}/similar`)
        const recommendations= await axios.get(`/movie/${id}/recommendations`)
        const video= await axios.get(`/movie/${id}/videos`)
        const watchproviders= await axios.get(`/movie/${id}/watch/providers`)
        let MovieDetails={
            detail: detail.data,
            externalid:externalid.data,
            similar:similar.data.results,
            recommendation:recommendations.data.results,
            video: video.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN
        }
        dispatch(loadmovie(MovieDetails))

    } catch (error) {
        console.log(error)
    }
} 
