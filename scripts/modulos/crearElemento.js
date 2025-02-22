export function crearElemento(contenedor, elemento, clases = null, id = null) {
    if (!contenedor || !elemento) {console.log("Faltan parametros en funcion crearElemento")}
    const nuevoElemento = document.createElement(elemento)
    contenedor.appendChild(nuevoElemento)
    if (clases) { nuevoElemento.className = clases }
    if (id) { nuevoElemento.id = id }
    return nuevoElemento
}