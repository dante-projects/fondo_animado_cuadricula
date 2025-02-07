const itemSize = 60
const contenedorFondo = document.getElementById("contenedorFondo")
const ancho = document.body.getBoundingClientRect().width
const alto = document.body.getBoundingClientRect().height

function calcularNumItems() {
    const itemsFila = Math.floor(ancho / itemSize)
    const numFilas = Math.floor(alto / itemSize)
    console.log("Items por fila: " + itemsFila)
    console.log("Filas: " + numFilas)
    return [itemsFila, numFilas]
}

function dibujarCuadricula() {
    const valoresCalculados = calcularNumItems()
    const items = valoresCalculados[0]
    const filas = valoresCalculados[1]

    for (let y = 0; y <= filas; y++) {
        const nuevaFila = document.createElement("div")
        nuevaFila.classList.add("fila")

        for (let x = 0; x <= items; x++) {
            const nuevoItem = document.createElement("div")
            nuevoItem.classList.add("celda")
            nuevaFila.appendChild(nuevoItem)

            const cuadrado = document.createElement("div")
            cuadrado.classList.add("cuadrado")
            nuevoItem.appendChild(cuadrado)
        }
        contenedorFondo.appendChild(nuevaFila)
    }
}

function darEstilos() {
    let estilo = document.createElement("style")
    estilo.innerText += `
    .fila {
        display: flex;
        width: 100%;

        .celda {
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${itemSize}px;
            aspect-ratio: 1/1;

            &:hover .cuadrado {
                background-color: white;
                transition: .1s;
            }

            .cuadrado {
                width: 70%;
                aspect-ratio: 1/1;
                border: 3px solid rgb(128, 128, 128, .1);
                border-radius: 10px;
                transition: 2s;
            }
        }
    }
    `
    document.head.appendChild(estilo)
}

function main() {
    dibujarCuadricula()
    darEstilos()
}

main()