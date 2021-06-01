function isValidDate(d: any) {
  //@ts-ignore
  return d instanceof Date && !isNaN(d);
}

export function parseDate(date: string) {
  let a = new Date(date);
  if(isValidDate(a)){
    return a.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  return ("--")
}

export function sortByDate(a: any, b: any){
  let dateA = new Date(a.fecha);
  let dateB = new Date(b.fecha);
  //@ts-ignore
  return  dateB - dateA;
}
