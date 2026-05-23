/*
importa o formulario
input do formulario
os cards de resultado de biogas e energia gerados
*/
const valor = document.querySelector("#valor");
const formulario = document.querySelector("#card-calculadora");
const energiaEstimada = document.querySelector("#energiaEstimada");
const biogasGerado = document.querySelector("#biogasGerado");

// mostrar o erro quando o usuario inserir um numerio invalido ou nao inserir nada
function mostrarErro(campo, idElementoErro, mensagem) {
    const elementoErro = document.getElementById(idElementoErro);
    campo.classList.add("is-invalid");
    elementoErro.textContent = mensagem;
}

// limpar o erro quando o usuario arruma ele
function limparErro(campo, idElementoErro) {
    const elementoErro = document.getElementById(idElementoErro);
    campo.classList.remove("is-invalid");
    elementoErro.textContent = "";
}

// funcao pra validar se o input do usuario esta certo ou nao (define a mensagem de nulo/invalido)
function validarFormulario() {

    let formularioValido = true;

    if(valor.value.trim() === "") {
        mostrarErro(valor, "erro-valor", "Informe a quantidade que deseja calcular.");
        
        formularioValido = false;
    } else if(Number(valor.value) <= 0){
        mostrarErro(valor, "erro-valor", "Informe um valor válido.")

        formularioValido = false;
    } else {
        limparErro(valor, "erro-valor");
    }

    return formularioValido;
}

/*
listener que escuta o envio do formulario,
chama a funcao pra validar ele 
calcula as equacoes de acordo com o input do usuario,
prevendDefault para nao deixar enviar o formulario quando ele nao for válido e nao recarregar a pagina quando o formulario é enviado 
*/
formulario.addEventListener("submit", (evento) => {

    const estaValido = validarFormulario();

    if(!estaValido) {
        evento.preventDefault();

        return;
    }

    evento.preventDefault();

    let toneladas = Number(valor.value);

    let kg = toneladas * 1000;

    let biogas = kg * 0.04;

    let energia = biogas * 6;

    biogasGerado.innerHTML = `${biogas.toFixed(2)} m³/dia`

    energiaEstimada.innerHTML = `${energia.toFixed(2)} kWh`
});

// importa o botao, icone e define localStorage de mudanca de tema com toggle 
const botaoModo = document.querySelector("#btn-mode");
const iconeModo = document.querySelector("#icone-tema");
const temaSalvo = localStorage.getItem("tema");

// verifica qual foi a ultima atualizacao do site (se estava em dark fica dark, se estava light fica light)
if(temaSalvo === "dark") {

    document.body.classList.add("dark");
    iconeModo.src = "imagens/sol.png";
} else {

    iconeModo.src = "imagens/lua.png";
}

// funcao que escuta o click do botao de mudar o tema e define se ele esta selecionado ou nao, mudando também o icone do botao
botaoModo.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")) {

        iconeModo.src = "imagens/sol.png";
        localStorage.setItem("tema", "dark");
    } else {

        iconeModo.src = "imagens/lua.png";
        localStorage.setItem("tema", "light");
    }
});

// qr code com os repositórios
const qrCode = document.getElementById("qrCode");

const pageUrl = window.location.href;

qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(pageUrl)}`;
