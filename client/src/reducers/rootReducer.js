import { 
    GET_ALL_DOGS, 
    GET_DOGS_FOR_NAME, 
    GET_DESCRIPTION,
    ORDER_ASC,
    ORDER_DES,
    DESDE_API,
    DESDE_DB, 
    DESDE_TODOS,
    ORDER_PESO_MIN,
    ORDER_PESO_MAX,
    GET_ALL_TEMPERAMENT,
    FILTRAR_TEMPERAMENT,
    // -----------------------------
    ADD_FAVORITES,
    REMOVE_FAVORITES,
    MODE_NOCTURNE,
  
} 
from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [],
    dogsFilter: [],
    dogDescription: {},
    temperaments: [],
    favoritesDogs: [],
    modeNocturne: false,
}


// Reducer
const rootReducer = (state = initialState, action) => {
    let arrayAux = [];
    let arrayAux2 = [];
    switch(action.type){
        // Obtener todos los dogs tanto de la api como la base de datos
        case GET_ALL_DOGS:
            arrayAux = action.payload;
            return {
                ...state,
                allDogs: action.payload,
                dogsFilter: arrayAux
            }

        case GET_DOGS_FOR_NAME:
            // obtener todos las razas que coincidan con el nombre escrito en el buscador
            arrayAux = state.allDogs.filter(dogName => {
                if(dogName.nombre.includes(action.payload)) return dogName;
            })

            // console.log(arrayAux)
            return {
                ...state,
                dogsFilter: arrayAux
            }
            

        case GET_DESCRIPTION:
            // obtener la descripcion de cada raza seleccionada
            return{
                ...state,
                dogDescription: state.allDogs.find(dog => dog.id == action.payload)
            }

        case GET_ALL_TEMPERAMENT:
            return{
                ...state,
                temperaments: action.payload
            }

        // --------------------------------------------------------------------------

        // Ordenamiento
        case ORDER_ASC:
            arrayAux = state.allDogs.sort((a, b) => {
                if(a.nombre < b.nombre) return -1;
                if(a.nombre > b.nombre) return 1;
                return 0;
            })
            arrayAux2 = arrayAux.map(dog => dog)
            return{
                ...state,
                dogsFilter: arrayAux2
            }

        case ORDER_DES:
            arrayAux = state.dogsFilter.sort((a, b) => {
                if(a.nombre > b.nombre) return -1;
                if(a.nombre < b.nombre) return 1;
                return 0;
            })
            arrayAux2 = arrayAux.map(dog => dog)
            return{
                ...state,
                dogsFilter: arrayAux2
            }



        case ORDER_PESO_MIN:
            arrayAux = state.dogsFilter.sort((a, b) => {
                if(Number(a.pesoMin) < Number(b.pesoMin)) return -1;
                if(Number(a.pesoMin) > Number(b.pesoMin)) return 1;
                return 0;
            })
            arrayAux2 = arrayAux.map(dog => dog)
            return{
                ...state,
                dogsFilter: arrayAux2
            }


        case ORDER_PESO_MAX:
            arrayAux = state.dogsFilter.sort((a, b) => {
                if(Number(a.pesoMin) > Number(b.pesoMin)) return -1;
                if(Number(a.pesoMin) < Number(b.pesoMin)) return 1;
                return 0;
            })
            arrayAux2 = arrayAux.map(dog => dog)
            return{
                ...state,
                dogsFilter: arrayAux2
            }

        // ------------------------------------------------------------


        case DESDE_API:
            arrayAux = state.allDogs.filter(dog => dog.proviene === "API");
            arrayAux.sort()
            return{
                ...state,
                dogsFilter: arrayAux
            }


        case DESDE_DB:
            arrayAux = state.allDogs.filter(dog => dog.proviene === "DB");
            arrayAux.sort()
            return{
                ...state,
                dogsFilter: arrayAux
            }


        case DESDE_TODOS:
            arrayAux = state.allDogs.map(dog => dog);
            return{
                ...state,
                dogsFilter: arrayAux
            }

        case FILTRAR_TEMPERAMENT:
            arrayAux = state.allDogs.filter(dog => {
                if(!dog.temperamento) return undefined;
                return dog.temperamento.includes(action.payload)
            })
            
            return{
                ...state,
                dogsFilter: arrayAux
            }


        // ---------------------------------------------------------------
        // Funcionalidades extras agregadas por mi
        case ADD_FAVORITES:
            if(state.favoritesDogs.length === 0){
                return {
                    ...state,
                    favoritesDogs: state.favoritesDogs.concat(action.payload)
                }
            }

            if(state.favoritesDogs.length > 0){
                const existeElDog = state.favoritesDogs.find(fav => fav.id === action.payload.id);
                if(!existeElDog){
                    return {
                        ...state,
                        favoritesDogs: state.favoritesDogs.concat(action.payload)
                    }
                }
            }

        // Remove Favorites
        case REMOVE_FAVORITES:
            console.log(action.payload)
            return {
                ...state,
                favoritesDogs: state.favoritesDogs.filter(dog => dog.id !== action.payload)
            }

        
        // Mode Nocturne
        case MODE_NOCTURNE:
            return {
                ...state,
                modeNocturne: !state.modeNocturne
            }



        default:
            return state;
    }
}


export default rootReducer;