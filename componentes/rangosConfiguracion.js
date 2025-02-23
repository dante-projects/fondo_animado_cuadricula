class rangoPersonalizable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.innerHTML = `
            <div class="contenedorComponente">
                <div class="cajaIzq">
                    <span id="titulo" class="titulo"></span>
                    <input id="rango">
                </div>
                <div class="cajaDer borderRadiusGrey">
                    <span id="cajaValor" class="cajaValor flexCentrado"></span>
                </div>
            </div>
        `
        const estiloRangos = document.createElement("style")
        estiloRangos.textContent = `
            @import url("estilos/clasesPredefinidas.css");

            * {
                box-sizing: border-box;
            }
            
            .contenedorComponente {
                position: relative;
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 44px;
                margin-bottom: 50px;

                .cajaIzq {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 74%;
                    height: 100%;

                    input[type="range"] {
                        width: 100%;
                        background: transparent;
                        cursor: pointer;

                        &:hover::-moz-range-thumb {
                            border-color: var(--grisTexto);
                            transition: .2s;
                        }

                        &::-moz-range-track {
                            height: 2px;
                            border: 1px solid var(--grisClaro);
                            border-radius: 4px;
                            background-color: transparent;
                        }

                        &::-moz-range-thumb {
                            box-sizing: border-box;
                            width: 24px;
                            height: 12px;
                            border: 3px solid var(--grisClaro);
                            border-radius: 3px;
                            background-color: white;
                            transition: .6s;
                        }
                    }

                    &:has(input:active) + .cajaDer {
                        background-color: var(--colorEnfasis_2);
                        transition: .2s;

                        & .cajaValor {
                            color: white;
                            transform: scale(130%);
                            transition: .2s;
                        }
                    }
                }

                .cajaDer {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 50px;
                    height: 35px;
                    border-radius: var(--borderRadius);
                    transition: .6s;

                    .cajaValor {
                        width: 100%;
                        height: 100%;
                        transition: .2s;
                    }    
                }
            }
        `
        this.shadowRoot.appendChild(estiloRangos)
    }

    connectedCallback() {
        const titulo = this.shadowRoot.getElementById("titulo")
        titulo.innerText = titulo.getAttribute("titulo")
        const rango = this.shadowRoot.getElementById("rango")
        const cajaValor = this.shadowRoot.getElementById("cajaValor")
        cajaValor.innerText = rango.value
        
        rango.addEventListener("input", () => {
            cajaValor.innerText = rango.value
        })
    }
}
customElements.define("rango-personalizado", rangoPersonalizable)