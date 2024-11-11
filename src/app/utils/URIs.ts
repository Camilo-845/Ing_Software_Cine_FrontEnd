export const API_URL = 'http://localhost:3123';

// Cliente
export const API_CLIENTE = API_URL + '/cliente';
export const API_CLIENTE_LIST = API_CLIENTE + '/getall';
export const API_CLIENTE_PAGINATION = API_CLIENTE + '/pagination';
export const API_CLIENTE_ADD = API_CLIENTE + '/add';
export const API_CLIENTE_UPDATE = API_CLIENTE + '/update';
export const API_CLIENTE_DELETE = API_CLIENTE + '/delete';
export const API_CLIENTE_LOCATIONS = API_CLIENTE + '/getLocations';


// Cartelera
export const API_CARTELERA = API_URL + '/billboard';
export const API_CARTELERA_LIST = API_CARTELERA + '/getall';
export const API_CARTELERA_PAGINATION = API_CARTELERA + '/paginacion';
export const API_CARTELERA_ADD = API_CARTELERA + '/addcito';
export const API_CARTELERA_UPDATE = API_CARTELERA + '/update';
export const API_CARTELERA_DELETE = API_CARTELERA + '/delete';
export const API_CINE_LIST_FOR_CARTELERA = API_CARTELERA_LIST + '/cine';
export const API_PELICULA_LIST_FOR_CARTELERA = API_CARTELERA_LIST + '/pelicula';

