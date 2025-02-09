import { crearElemento } from "./modulos/crearElemento.js"

const contenedorFondo = document.getElementById("contenedorFondo")
const ancho = document.body.getBoundingClientRect().width
const alto = document.body.getBoundingClientRect().height
const configuracionInputs = [
    [
        { funcion: "Tamaño cuadrícula", elemento: "input", type: "range", min: 20, max: 100, value: 60 },
        { funcion: "Tamaño elemento", elemento: "input", type: "range", min: 1, max: 100, value: 70 },
        { funcion: "Grosor del borde", elemento: "input", type: "range", min: 0, max: 20, value: 1 },
        { funcion: "Redondeo", elemento: "input", type: "range", min: 0, max: 50, value: 20 },
        { funcion: "Desenfoque", elemento: "input", type: "range", min: 0, max: 20, value: 4 },
        { funcion: "Transparencia", elemento: "input", type: "range", min: 0, max: 100, value: 40 }
    ]
]


function calcularNumItems() {
    const itemsFila = Math.floor(ancho / valores[0])
    const numFilas = Math.floor(alto / valores[0])
/*     console.log("Items por fila: " + itemsFila)
    console.log("Filas: " + numFilas)
 */    return [itemsFila, numFilas]
}

function dibujarCuadricula() {
    const valoresCalculados = calcularNumItems()
    const items = valoresCalculados[0]
    const filas = valoresCalculados[1]
    contenedorFondo.innerHTML = ""

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
    if (document.head.querySelector(".estilo1")) {
        document.head.querySelector(".estilo1").remove()
        console.log("removido")
    }
    console.log(valores)

    let estilo = crearElemento(document.head, "style", "estilo1")
    estilo.innerText += `
    .fila {
        display: flex;
        width: 100%;

        .celda {
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${valores[0]}px;
            height: ${valores[0]}px;

            &:hover .cuadrado {
                background-color: white;
                transition: .1s;
            }

            .cuadrado {
                width: ${valores[1]}%;
                aspect-ratio: 1/1;
                border: ${valores[2]}px solid grey;
                border-radius: ${valores[3]}%;
                filter: blur(${valores[4]}px);
                opacity: calc(${valores[5]} / 100);
                transition: 2s;
            }
        }
    }
    `
    document.head.appendChild(estilo)
}

const seleccionFondo = Array.from(document.querySelectorAll("#seleccionFondo li .inputOculto"))
function dibujarControles(par) {
    const controles = document.getElementById("controles")
    const num = seleccionFondo.indexOf(par)
    configuracionInputs[num].forEach((item) => {

        const itemConfiguracion = crearElemento(controles, "div", "bloquesConfiguracion")
        itemConfiguracion.innerText = item.funcion
        const inputBloque = crearElemento(itemConfiguracion, "div", "bloqueInput")
        const input = crearElemento(inputBloque, item.elemento)
        crearElemento(inputBloque, "span", "borderRadiusGrey flexCentrado")

        Object.entries(item).forEach(([key, valor]) => {
            if (key !== "funcion" && key !== "elemento") {
                input.setAttribute(key, valor)
            }
        })
    })
}

function identificarInputs() {
    return Array.from(document.querySelectorAll("#controles input[type='range'"))
}

let valores = []
function recogerValores() {
    const inputs = identificarInputs()
    valores = []
    inputs.forEach((item) => {
        valores.push(item.value)
    })
}

function escribirValores(input = null) {
    let elemento
    if (input) {
        const posicion = identificarInputs().indexOf(input)
        input.nextElementSibling.innerText = valores[posicion]
    } else {
        elemento = identificarInputs()
        elemento.forEach((item, num) => {
            item.nextElementSibling.innerText = valores[num]
        })
    }
}

function main() {
    dibujarControles(seleccionFondo[0])
    recogerValores()
    escribirValores()
    dibujarCuadricula()
    darEstilos()

    identificarInputs().forEach((item) => {
        item.addEventListener("input", () => {
            recogerValores()
            escribirValores(item)
            dibujarCuadricula()
            darEstilos()
            item.nextElementSibling.style.color = "greenyellow"
            item.nextElementSibling.style.transition = "color 0s"
        })
        item.addEventListener("mouseup", () => {
            item.nextElementSibling.style.color = "grey"
            item.nextElementSibling.style.transition = "color .5s"
        })
    })

}

main()