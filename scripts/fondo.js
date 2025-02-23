import { crearElemento } from "./modulos/crearElemento.js"
import { configuracion } from "../configuraciones/configuracion.js"
import { dibujarCampoTexto } from "./modulos/dibujarCampoTexto.js"
import { presets } from "../configuraciones/presets.js"

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
                border-width: ${valores[2]}px;
                border-style: solid;
                border-color: rgba(128, 128, 128, ${valores[3]}%);
                border-radius: ${valores[4]}%;
                filter: blur(${valores[5]}px);
                opacity: calc(${valores[6]} / 100);
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

// const seleccionFondo = Array.from(document.querySelectorAll("#seleccionFondo li .inputOculto"))
const seccionesConfiguracion = Array.from(document.querySelectorAll("fieldset"))
console.log(seccionesConfiguracion)
function dibujarSeccionesConfiguracion(par) {

    Object.entries(configuracion[par]).forEach((key, num) => {
        const seccionActiva = seccionesConfiguracion[num].querySelector(".controlesConfiguracion")

        if (key[0] === "rangos") {
            Object.entries(configuracion[par][key[0]]).forEach((item) => {
                const componente = document.createElement("rango-personalizado")

                Object.entries(item[1]).forEach(([clave, valor]) => {
                    if (clave !== "titulo") {
                        componente.shadowRoot.getElementById("rango").setAttribute(clave, valor)
                    } else {
                        componente.shadowRoot.getElementById("titulo").setAttribute(clave, valor)
                    }
                })
                seccionActiva.appendChild(componente)
            })
        }
    })
}

let inputsConfiguracion = []
function actualizarValores(inputActivado = null) {
    const secciones = document.querySelectorAll("fieldset")
    if (!inputActivado) {
        secciones.forEach((seccion) => {
            seccion.querySelectorAll("input").forEach((input) => {
                inputsConfiguracion.push(input)
                input.parentElement.parentElement.querySelector(".valorInput").innerText = input.value
            })
        })    
    } else {
        inputActivado.parentElement.querySelector(".valorInput").innerText = inputActivado.value
    }
}

function cambiarPreset(item = null, num = null) {
    const radiosPreset = buscarEnArray(controles, "input[dataFuncion='presets']")
    const presetSeleccionado = radiosPreset.find(item => item.checked === true)
    const index = radiosPreset.findIndex(item => item === presetSeleccionado)
    const configuracion = presets[presetSeleccionado.name][index]
    const rangos = buscarEnArray(controles, "input[dataFuncion='control'")

    rangos.forEach((item, num) => {
        Object.entries(configuracion[num]).forEach(([clave, valor]) => {
            item.setAttribute(clave, valor)
        })
    })
}

function main() {
    dibujarSeccionesConfiguracion("fondo_1")
    // actualizarValores()

    // dibujarCampoTexto()
    // cambiarPreset()
    // dibujarCuadricula()
    // darEstilos()

    inputsConfiguracion.forEach((item) => {
        item.addEventListener("change", () => {
            borrarEstilo()
            // dibujarCuadricula()
            // darEstilos()
        })

        if (item.type === "range") {
            const valor = item.parentElement.nextSibling.querySelector(".valorInput")

            item.addEventListener("input", () => {
                actualizarValores()
            })
        } 
    })

    // buscarEnArray(controles, "input[type='radio']").forEach((item, num) => {
    //     item.addEventListener("change", () => {
    //         cambiarPreset(item, num)
    //         recogerValores()

    //         escribirValores()
    //         borrarEstilo()

    //         dibujarCuadricula()
    //         darEstilos()
    //     })
    // })
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})
