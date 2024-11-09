export const API_URL = 'http://localhost:3123';

// Cliente
export const API_CLIENTE = API_URL + '/cliente';
export const API_CLIENTE_LIST = API_CLIENTE + '/getall';
export const API_CLIENTE_PAGINATION = API_CLIENTE + '/pagination';
export const API_CLIENTE_ADD = API_CLIENTE + '/add';
export const API_CLIENTE_UPDATE = API_CLIENTE + '/update';
export const API_CLIENTE_DELETE = API_CLIENTE + '/delete';

//Reservaciones
export const API_RESERVACIONES = API_URL + '/reservation';
export const API_RESERVACIONES_LIST = API_RESERVACIONES + '/getall';
export const API_RESERVACIONES_PAGINATION = API_RESERVACIONES + '/pagination';
export const API_RESERVACIONES_DELETE = API_RESERVACIONES + '/delete';
export const API_RESERVACIONES_ADD = API_RESERVACIONES + '/add';

//Comidas
export const API_COMIDAS = API_URL + '/food';
export const API_COMIDAS_LIST = API_COMIDAS + '/getall';
export const API_COMIDAS_ADD = API_COMIDAS + '/add';
export const API_COMIDAS_UPDATE = API_COMIDAS + '/update';
export const API_COMIDAS_DELETE = API_COMIDAS + '/delete';
export const API_COMIDAS_GET_BY_ID = API_COMIDAS + '/get/';