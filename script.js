const calculadora = document.querySelector('#calc')
const visor = document.querySelector('#visor')
const btnIgual = document.querySelector('#btn-igual')

const botonesAux = ['mr', 'ac']
const botonesOperacionBasica = ['-','+','*','/','=']
const botonesOperacionExpRaiz = ['x-!', 'x-2','x-3','x-n','raiz','raiz-3','raiz-n']

let primeraOperacion = true
let nuevaOperacion = true

let numeros = []
let subtotal = []
let operaciones = []

const operacion = {
    op: '',
    estado: false
}

const resultado = {
    subTotal: 0,
    total: 0
}

const numero = {
    numero: '',
    estado: false
}

eventListeners()

function eventListeners() {

    calculadora.addEventListener('click', botonSeleccionado)

}

function botonSeleccionado(e) {
    
    if(nuevaOperacion) resetValores()

    nuevaOperacion = false

    const botonSeleccionado = e.target

    if(botonSeleccionado.classList.contains('visible')) {
        valorEntrada = e.target.textContent

        mostrarVisor(valorEntrada)

    }
    
    determinarIsNumero(botonSeleccionado)

    determinarOperacion(botonSeleccionado)
    
}

function mostrarVisor(valorEntrada) {
    const ultimoElemento = visor.firstElementChild.textContent[visor.firstElementChild.textContent.length - 1]
    
    const resultado = verificarOperacion(valorEntrada)
    if(resultado != '' &&  resultado != undefined) {
        
        if (resultado !== ultimoElemento && botonesOperacionBasica.includes(resultado) && isNaN(ultimoElemento) ) {
            console.log(ultimoElemento)
            const reemplazo = visor.firstElementChild.textContent.replace(ultimoElemento, resultado )
            console.log(reemplazo)
            visor.firstElementChild.textContent = reemplazo
            
        } else {
            visor.firstElementChild.textContent+= resultado
        }
    }
}

function verificarOperacion(op) {
    
    let entrada = ''
    
    if(op == visor.firstElementChild.textContent[visor.firstElementChild.textContent.length-1] && botonesOperacionBasica.includes(op)) {
        console.log('son iguales')
        return
    } 
    //if(op !== visor.firstElementChild.textContent[visor.firstElementChild.textContent.length-1]) 
    
    entrada = op
    
    console.log(entrada)
    return entrada

}

function determinarIsNumero(boton) {

    if(!isNaN(boton.textContent) || boton.textContent == '.') {
        numero.numero += boton.textContent 
        return
    }
}

function determinarOperacion(boton) {

    if (isNaN(boton.textContent)) {
        
        if(botonesAux.includes(boton.id)) {
            
        }
        
        if(botonesOperacionBasica.includes(boton.id)) {

            if(primeraOperacion) {
                console.log('1ra operacion')
                
                resultado.subTotal = Number(numero.numero)
                numero.estado = true
                numeros = [...numeros, {...numero}]
                console.log(numero)
                operacion.op = boton.textContent
                operaciones = [...operaciones, {...operacion}]
                primeraOperacion = false
                numero.numero = ''
                return
            }
            
            if(boton.id == '=') {
                numero.estado = false
                numeros = [...numeros, {...numero}]
                console.log(numeros)
                realizarOperacion()
                mostrarResultado()
                operaciones = []
                numeros = []
                numero.numero = ''
                operacion.op = ''
                resultado.subTotal = 0
                primeraOperacion = true
                nuevaOperacion = true
                console.log(numero)
                console.log(operacion)
                return
            }

            operacion.op = boton.textContent
            numero.estado = false
            numeros = [...numeros, {...numero}]
            console.log(numeros)
            operaciones = [...operaciones, {...operacion}]
            console.log(operaciones)

            realizarOperacion()
            numero.numero = ''
        }
    }
}

function realizarOperacion() {
    
    operaciones.forEach( el => {
        console.log(el)
        let { op, estado } = el
        if(numeros.length > 1 && !estado) {
            numeros.forEach( (numero, i) => {           
                if(!numero.estado) {
                    switch (op) {
                        case '-':
                            resultado.subTotal -= Number(numero.numero) 
                            el.estado = true
                            
                            numero.estado = true
                            visor.lastElementChild.textContent = resultado.subTotal
                            console.log(resultado.subTotal)
                            break
                        case '+':
                            resultado.subTotal += Number(numero.numero) 
                            el.estado = true
                            numero.estado = true
                            visor.lastElementChild.textContent = resultado.subTotal
                            break
                        case '*':
                            resultado.subTotal *= Number(numero.numero) 
                            el.estado = true
                            numero.estado = true
                            visor.lastElementChild.textContent = resultado.subTotal
                            break
                        case '/':
                            resultado.subTotal /= Number(numero.numero) 
                            el.estado = true
                            numero.estado = true
                            visor.lastElementChild.textContent = resultado.subTotal
                            break
                        default:   
                            break
                    }                      
                }                
            } )               
        }        
    })

    console.log(resultado.subTotal)
    console.log(operaciones)
}

function mostrarResultado() {
    visor.firstElementChild.textContent= resultado.subTotal
    visor.lastElementChild.textContent= ''
}
        
function resetValores() {
    visor.firstElementChild.textContent= ''
    visor.lastElementChild.textContent= ''
    operaciones = []
    numeros = []
    resultado.subTotal = 0
}