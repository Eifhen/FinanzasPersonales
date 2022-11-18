import { indexObj } from '../interfaces/indexObj.interface';


/*
    esta funcion nos permite saber si un determinado objeto es
    una implementación de la interfaz T
    para mas información:
    ver https://www.technicalfeeder.com/2021/02/how-to-check-if-a-object-implements-an-interface-in-typescript/
*/

export default function interfaceOf<T>(object:any) : object is T {
    return (object as T) !== undefined;
}