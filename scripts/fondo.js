import {crearElemento} from "./modulos/crearElemento.js"

const itemSize = 60
const contenedorFondo = document.getElementById("contenedorFondo")
const ancho = document.body.getBoundingClientRect().width
const alto = document.body.getBoundingClientRect().height
const configuracionInputs = [
    [
        { funcion: "Tamaño cuadrícula", elemento: "input", type: "range", min: 20, max: 200, value: 60 },
        { funcion: "Tamaño elemento", elemento: "input", type: "range", min: 50, max: 100, value: 70 },
        { funcion: "Grosor del borde", elemento: "input", type: "range", min: 20, max: 200, value: 50 },
    ],
    [
        { funcion: "", tipo: "range", min: 20, max: 200, value: 50 },
        { funcion: "Tamaño Cuadrícula", tipo: "range", min: 20, max: 200, value: 50 },
        { funcion: "Tamaño Cuadrícula", tipo: "range", min: 20, max: 200, value: 50 },
    ]
]


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

const seleccionFondo = Array.from(document.querySelectorAll("#seleccionFondo li .inputOculto"))
function dibujarControles(item) {
    const controles = document.getElementById("controles")
    const num = seleccionFondo.indexOf(item)
    configuracionInputs[num].forEach((item) => {
        const itemConfiguracion = crearElemento(controles, "div", "bloquesConfiguracion")
        itemConfiguracion.innerText = item.funcion
        const inputBloque = crearElemento (itemConfiguracion, "div", "bloqueInput")
        const input = crearElemento (inputBloque, item.elemento)
        const valor = crearElemento (inputBloque, "span", "borderRadiusGrey flexCentrado")
        
        Object.entries(item).forEach(([key, valor]) => {
            if (key !== "funcion" && key !== "elemento") {
                input.setAttribute(key, valor)
            }
        })
    })
}

function escribirValores() {
    const cajasValores = 0 

}

function main() {
    dibujarControles(seleccionFondo[0])
    dibujarCuadricula()
    darEstilos()
}

main()