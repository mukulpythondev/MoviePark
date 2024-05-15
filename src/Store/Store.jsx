import { configureStore } from '@reduxjs/toolkit'
import movieReducer  from "../Store/Reducers/MovieSlice"
import tvReducer  from "../Store/Reducers/TvSlice"
import personReducer  from "../Store/Reducers/PersonSlice"
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
})