import axios from "../../utils/axios";
import { loadperson } from "../Reducers/PersonSlice";
// import {  removeperson } from "../Reducers/personSlice";
export const fetchperson= (id)=> async (dispatch,getState) =>{
    try {
        const detail= await axios.get(`/person/${id}`)
        const externalid= await axios.get(`/person/${id}/external_ids`)
        const moviecredits= await axios.get(`/person/${id}/movie_credits`)
        const combinedcredits= await axios.get(`/person/${id}/combined_credits`)
        const tvcredits= await axios.get(`/person/${id}/tv_credits`)
      
        let personDetails={
            detail: detail.data,
            externalid:externalid.data,
            combinedcredits: combinedcredits.data,
            tvcredits: tvcredits.data,
            moviecredits: moviecredits.data
            
        }
        dispatch(loadperson(personDetails))

    } catch (error) {
        console.log(error)
    }
} 
