function isValidDate(d: any) {
  //@ts-ignore
  return d instanceof Date && !isNaN(d);
}

export function parseDate(date: string) {
  let a = new Date(date);
  if (isValidDate(a)) {
    return a.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  return "--";
}

/**
 * Ordena por fecha por mayor
 * @param a fecha 1
 * @param b fecha 2
 * @returns
 */
export function sortByDate(a: any, b: any) {
  let dateA = new Date(a?.fecha);
  let dateB = new Date(b?.fecha);

  //@ts-ignore
  return dateB - dateA;
}

export function sortByDateTwo(a: any, b: any) {
  let dateA = new Date(a);
  let dateB = new Date(b);

  //@ts-ignore
  return dateB - dateA;
}

export function getFechaActa(
  data: { fecha: any }[],
  elemento: "ultima" | "antigua"
) {
  const aux = data.sort(function (a, b) {
    return sortByDate(a, b);
  });

  if (elemento === "ultima") {
    return aux[0];
  } else if (elemento === "antigua") {
    return aux[aux.length - 1];
  }
}
