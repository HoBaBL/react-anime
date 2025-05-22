import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   anime: ""
}

const SearchRedux = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        setAnime(state, action) {
            state.anime = action.payload
        }
    }
})

export const { setAnime } = SearchRedux.actions;

export default SearchRedux.reducer