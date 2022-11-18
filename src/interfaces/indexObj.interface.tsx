
/*
    Esta interfaz nos permite definir el index key de un objeto
    en js podemos acceder a las propiedades de un objeto de 3 formas
    
    1) objeto.propiedad
    2) objeto["propiedad"]
    3) { propiedad } = objeto

    para acceder a un objeto de la forma 3 ( objeto["propiedad"] )
    necesitamos mapear el tipo de la key ya que en javascript 
    las keys de un objeto pueden ser de distintos tipos
    Ej: números, strings, etc 
      {
        1: "hola mundo",
        nombre: "Juana"
      }

    con la interfaz indexObj<T> estamos diciendo que podremos acceder a las
    keys del objeto <T> mediante un estring 
    Ej:
      objeto["propiedad"]
     

    ver https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    ver https://www.youtube.com/watch?v=Sgp90HzEEsI
*/

export interface indexObj<T> {
    [key:string]: any;
};