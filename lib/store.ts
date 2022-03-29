import { createStore, action } from 'easy-peasy';

// this allows for controlling the state of player bar

export const store = createStore({
    activeSongs: [],
    activeSong: null,
    // actions will change those states
    changeActiveSongs: action((state: any, payload) => {
        state.activeSongs = payload
    }),
    changeActiveSong: action((state: any, payload) => {
        state.activeSong = payload
    }),
});