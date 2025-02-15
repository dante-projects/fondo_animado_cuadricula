import { crearElemento } from "./crearElemento.js"

export function dibujarCampoTexto() {
    const controlCampoTexto = crearElemento(controles, "div", "controlCampoTexto ", "controlCampoTexto")
    const radios = document.getElementById("radiosPreset")
    controles.insertBefore(radios, controlCampoTexto.nextSibling)

    controlCampoTexto.innerHTML = `
        <div class="contenedorCampo borderRadiusGrey">
            <div class="barraTitulo flexCentrado">Escribe algo</div>
            <div class="campoTexto"></div>
        </div>
        <div class="contenedorOpciones">
            <div class="tamañoFuente">
                <span id="sumar" class="sumar flexCentrado material-icons">arrow_drop_up</span>
                <span id="cifra" class="cifra flexCentrado">16</span>
                <span id="restar" class="restar flexCentrado material-icons">arrow_drop_down</span>
            </div>
            <div class="opcionesTexto">
                <label>
                    <input type="range" min=0 max=20 value=10>
                    <span class="valorFuente flexCentrado borderRadiusGrey" id="valorFuente"></span>
                </label>
                <label><input type="radio" name="animacionTexto">Sin animación</label>
                <label><input type="radio" name="animacionTexto">Caracteres aleatorios</label>
                <label><input type="radio" name="animacionTexto">Desenfoque Inverso</label>
                <label><input type="radio" name="animacionTexto">Escritura automática</label>
            </div>
        </div>
    `

    let estiloCampoTexto = crearElemento(document.head, "style", "estiloCampoTexto")
    estiloCampoTexto.innerText += `
        .controlCampoTexto {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 260px;

            .contenedorCampo {
                width: 100%;
                height: 110px;

                .barraTitulo {
                    width: 100%;
                    height: 30px;
                }
    
                .campoTexto {
                    width: 100%;
                    height: 80px;
                }
            }

            .contenedorOpciones {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 140px;

                .tamañoFuente {
                    position: relative;
                    top: 6px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 40px;
                    height: 100%;

                    .sumar,
                    .restar {
                        width: 100%;
                        height: 30px;
                        font-size: 36px;
                        font-weight: bolder;
                        color: rgb(128, 128, 128, .3);
                        cursor: pointer;

                        &:hover {
                            color: greenyellow;
                        }
                    }

                    .cifra {
                        height: 50px;
                        aspect-ratio: 1/1;
                        border: 1px solid rgb(128, 128, 128, .3);
                        border-radius: 50%;
                    }
                }

                .opcionesTexto {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    width: calc(100% - 70px);
                    height: 100%;

                    label:first-of-type {
                        display: flex;
                        justify-content: space-between;

                        input {
                            appearance: none;
                            width: calc(100% - 60px);
                            background: transparent;

                            &:hover::-moz-range-thumb {
                                background-color: greenyellow;
                            }

                            &::-moz-range-track {
                                height: 12px;
                                border: 1px solid rgba(128, 128, 128, 0.2);
                                border-radius: 4px;
                                background-color: transparent;
                            }

                            &::-moz-range-thumb {
                                width: 22px;
                                height: 12px;
                                border: none;
                                border-radius: 4px;
                                background-color: var(--colorEnfasis);
                                transition: .5s;
                            }
                        }
                        
                        .valorFuente {
                            width: calc(var(--cuadrado) + 10px);
                            height: 32px;
                        }
                    }

                    label:not(first-of-type) {
                        display: flex;
                        align-items: center;
                        width: 100%;

                        input[type="radio"] {
                            appearance: none;
                            width: 15px;
                            aspect-ratio: 1/1;
                            border-radius: 50%;
                            border: 1px solid rgb(128, 128, 128, .3);
                            margin-right: 10px;
                            cursor: pointer;

                            &:checked {
                                border-color: var(--colorEnfasis);
                                background-color: var(--colorEnfasis);
                            }
                        }
                    }
                }
            }
        }
    `
    const sumarRestar = [document.getElementById("sumar"), document.getElementById("restar")]
    const cifra = document.getElementById("cifra")

    sumarRestar.forEach((item) => {
        item.addEventListener("mousedown", () => {
            let valor = Number(cifra.innerText)
            valor = item === sumar ? valor + 1 : valor - 1
            cifra.innerText = valor
            cifra.style.color = "greenyellow"
            cifra.style.transition = "color 0s"
        })
        item.addEventListener("mouseup", () => {
            cifra.style.color = "grey"
            cifra.style.transition = "color 2s"
        })    
    })
}