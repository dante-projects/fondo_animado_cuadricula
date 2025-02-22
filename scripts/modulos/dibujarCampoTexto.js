import { crearElemento } from "./crearElemento.js"

export function dibujarCampoTexto() {
    const controlCampoTexto = crearElemento(controles, "div", "controlCampoTexto borderRadiusGrey", "controlCampoTexto")
    const radios = document.getElementById("radiosPreset")
    controles.insertBefore(radios, controlCampoTexto.nextSibling)

    controlCampoTexto.innerHTML = `
        <div class="contenedorCampo">
            <div class="barraTitulo">
                Texto en animación
                <span class="iconoDesplegar material-icons flexCentrado">arrow_drop_up</span>
                <input id="desplegarCampoTexto" type="checkbox"></input type="checkbox" checked>
            </div> 
        </div>
        <div class="campoTexto borderRadiusGrey" contentEditable=true spellcheck=false></div>
        <div class="contenedorOpciones">
            <div class="tamañoFuente">
                <span id="sumar" class="sumar flexCentrado material-icons">arrow_drop_up</span>
                <span id="cifra" class="cifra flexCentrado">16</span>
                <span id="restar" class="restar flexCentrado material-icons">arrow_drop_down</span>
            </div>
            <div class="opcionesTexto">
                <label class="animacion"><input type="radio" name="animacionTexto" checked>Ninguna animación</label>
                <label class="animacion"><input type="radio" name="animacionTexto">Escritura aleatorios</label>
                <label class="animacion"><input type="radio" name="animacionTexto">Desenfoque Inverso</label>
                <label class="animacion"><input type="radio" name="animacionTexto">Escritura automática</label>
            </div>
        </div>
        <div class="contenedorVelocidad">Tiempo de animación
            <label class="velocidadAnimacion">
                <input type="range" min=0 max=20 value=10>
                <span class="valorFuente flexCentrado borderRadiusGrey" id="valorFuente"></span>
            </label>
        </div>
        <div class="botones">
            <div class="boton borderRadiusGrey flexCentrado material-icons">close
                <span>Reset</span></div>
            <div class="boton borderRadiusGrey flexCentrado material-icons">check
                <span>Animar</span></div>
        </div>
    `

    let estiloCampoTexto = crearElemento(document.head, "style", "estiloCampoTexto")
    estiloCampoTexto.innerText += `
        .controlCampoTexto {
            width: 100%;
            overflow: hidden;
            margin-bottom: 20px;
            padding: 10px;
            transition: var(--transicion);

            .contenedorCampo {
                width: 100%;
                height: 30px;
                transition: var(--transicion);

                .barraTitulo {
                    position: relative;
                    top: -12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 30px;
                    padding-left: 10px;
                    
                    .iconoDesplegar {
                        aspect-ratio: 1/1;
                        font-size: 36px;
                        color: rgb(128, 128, 128, .3);
                        transition: var(--transicion);

                        &:has(+input:checked) {
                            color: var(--colorEnfasis)
                        }
                    }

                    input {
                        position: absolute;
                        appearance: none;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                }
            }
                    
            .campoTexto {
                width: 100%;
                height: 140px;
                padding: 5px;
                word-wrap: break-word;
                overflow-wrap: break-word;
                overflow-y: auto;

                &:focus {
                    outline: none;
                }
            }

            .contenedorOpciones {
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 120px;
                overflow: hidden;

                .tamañoFuente {
                    position: relative;
                    left: 6px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 30px;
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
                        width: 42px;
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
                    width: calc(100% - 60px);
                    height: 100%;

                    .animacion {
                        display: flex;
                        align-items: center;
                        width: 100%;

                        input[type="radio"] {
                            appearance: none;
                            width: 10px;
                            aspect-ratio: 1/1;
                            border-radius: 50%;
                            border: 1px solid rgb(128, 128, 128, .3);
                            margin-right: 14px;
                            cursor: pointer;

                            &:checked {
                                border-color: grey;
                                background-color: grey;
                            }
                        }
                    }
                }
            }

            &:has(#desplegarCampoTexto:checked) {
                height: 1200px;

                .iconoDesplegar {
                    transform: rotate(-180deg);
                }
            }

            &:has(#desplegarCampoTexto:not(:checked)) {
                height: 30px;
            }  
                 
            .contenedorVelocidad {
                margin-top: 20px;
            
                .velocidadAnimacion {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 32px;
                    margin: 10px 0 10px 0; 
                    
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
            }

            .botones {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 30px;
                margin-top: 12px;

                .boton {
                    width: 46%;
                    height: 100%;
                    font-size: 20px;
                    font-weight: bolder;
                    cursor: pointer;
                    transition: .3s;

                    &:hover {
                        background-color: white;
                        border-color: grey;
                        color: black
                    }

                    span {
                        margin-left: 10px;
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