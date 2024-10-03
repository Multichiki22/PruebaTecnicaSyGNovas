const dateExtractor = (fecha)=>{
    
    if (fecha == null || fecha== undefined || fecha =="") return fecha
    fecha = new Date(fecha)
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    
    if (mes < 10) {
        mes = '0' + mes;
    }
    
    if (dia < 10) {
        dia = '0' + dia;
    }
    
    return `${año}-${mes}-${dia}`;
    }
    
    export default dateExtractor