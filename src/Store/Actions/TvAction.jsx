import axios from "../../utils/axios";
import { loadtv } from "../Reducers/TvSlice";
// import {  removemovie } from "../Reducers/MovieSlice";
export const fetchtv= (id)=> async (dispatch,getState) =>{
    try {
        const detail= await axios.get(`/tv/${id}`)
        const externalid= await axios.get(`/tv/${id}/external_ids`)
        const similar= await axios.get(`/tv/${id}/similar`)
        const recommendations= await axios.get(`/tv/${id}/recommendations`)
        const video= await axios.get(`/tv/${id}/videos`)
        const watchproviders= await axios.get(`/tv/${id}/watch/providers`)
        let tvDetails={
            detail: detail.data,
            externalid:externalid.data,
            similar:similar.data.results,
            recommendation:recommendations.data.results,
            video: video.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN
        }
        dispatch(loadtv(tvDetails))

    } catch (error) {
        console.log(error)
    }
} 
