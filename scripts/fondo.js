import { crearElemento } from "./modulos/crearElemento.js"
import { presets } from "../configuraciones/presets.js"
import { configuracionInputs } from "../configuraciones/inputsConfiguracion.js"

const contenedorFondo = document.getElementById("contenedorFondo")
const ancho = document.body.getBoundingClientRect().width
const alto = document.body.getBoundingClientRect().height

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

    let estiloPersonalizado = crearElemento(document.head, "style", "estiloPersonalizado")
    estiloPersonalizado.innerText += `
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
    document.head.appendChild(estiloPersonalizado)
}

function borrarEstilo() {
    if (document.head.querySelector(".estiloPersonalizado")) {
        document.head.querySelector(".estiloPersonalizado").remove()
    }
}

const seleccionFondo = Array.from(document.querySelectorAll("#seleccionFondo li .inputOculto"))
const controles = document.getElementById("controles")
function dibujarControles(par) {
    const rangos = crearElemento(controles, "div", "rangos")
    const radios = crearElemento(controles, "div", "radios borderRadiusGrey")

    const num = seleccionFondo.indexOf(par)
    configuracionInputs[num].forEach((item) => {

        let input
        if (item.type === "range") {
            const itemConfiguracion = crearElemento(rangos, "div", "bloquesConfiguracion")
            itemConfiguracion.innerText = item.funcion
            const inputBloque = crearElemento(itemConfiguracion, "div", "bloqueInput")
            input = crearElemento(inputBloque, item.elemento)
            crearElemento(inputBloque, "span", "campoValor borderRadiusGrey flexCentrado")
        }

        if (item.type === "radio") {
            input = crearElemento(radios, item.elemento, "preset borderGrey")
        }

        Object.entries(item).forEach(([key, value]) => {
            if (key !== "funcion" && key !== "elemento") {
                input.setAttribute(key, value)
            }
        })
    })
}

function buscarArray(contenedor, selector) {
    return Array.from(contenedor.querySelectorAll(selector))
}

let valores = []
function recogerValores() {
    const inputs = buscarArray(controles, "input[type='range']")
    valores = []
    inputs.forEach((item) => {
        valores.push(item.value)
    })
}

function escribirValores(input = null) {
    let elemento
    if (input) {
        const posicion = buscarArray(controles, "input[type='range']").indexOf(input)
        input.nextElementSibling.innerText = valores[posicion]
    } else {
        elemento = buscarArray(controles, "input[type='range']")
        elemento.forEach((item, num) => {
            item.nextElementSibling.innerText = valores[num]
        })
    }
}

function cambiarPreset(item = null, num = null) {
    let radio = item ? item : 0
    const presetSeleccionado = buscarArray(controles, "input[type='radio']").find(item => item.checked === true)
    const index = num ? num : buscarArray(controles, "input[type='radio']").findIndex(item => item.checked === true)

    buscarArray(controles, "input[type = 'range']").forEach((rango, num) => {
        const configuracion = Object.entries(presets[presetSeleccionado.name][index][num])
        configuracion.forEach(([clave, valor]) => {
            rango.setAttribute(clave, valor)
            if (clave === "value") {
                rango.value = valor /* devolver valores por defecto */
            }
        })
    })
}

function main() {
    dibujarControles(seleccionFondo[0])
    cambiarPreset()
    recogerValores()
    escribirValores()

    dibujarCuadricula()
    darEstilos()

    buscarArray(controles, "input[type='range']").forEach((item) => {
        item.addEventListener("change", () => {
                        borrarEstilo()
                        dibujarCuadricula()
            
            darEstilos()
        })
        item.addEventListener("input", () => {
            recogerValores()

            escribirValores(item)

            item.nextElementSibling.style.color = "greenyellow"
            item.nextElementSibling.style.transition = "color 0s"
        })
        item.addEventListener("mouseup", () => {
            item.nextElementSibling.style.color = "grey"
            item.nextElementSibling.style.transition = "color 2s"
        })
    })

    buscarArray(controles, "input[type='radio']").forEach((item, num) => {
        item.addEventListener("change", () => {
            cambiarPreset(item, num)
            recogerValores()

            escribirValores()
            borrarEstilo()

            dibujarCuadricula()
            darEstilos()
        })
    })
}

main()