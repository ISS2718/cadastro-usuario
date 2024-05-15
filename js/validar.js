// Seleciona os elementos do formulário
const nome = document.querySelector("#inputName");
const nomeHelp = document.querySelector("#inputNameHelp");
const ano = document.querySelector("#inputYear");
const anoHelp = document.querySelector("#inputYearHelp");
const email = document.querySelector("#inputEmail");
const emailHelp = document.querySelector("#inputEmailHelp");
const senha = document.querySelector("#inputPassword");
const senhaHelp = document.querySelector("#inputPasswordHelp");

const sendButton = document.querySelector("#send-btn");

// Adiciona um ouvinte de evento ao campo de nome que é acionado quando o campo perde o foco
nome.addEventListener('focusout', () => { 
    // Declara a expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    const nomeTrimado = nome.value.trim();
    
    //console.log(nome.value);
   
    // Verifica se o nome corresponde à expressão regular
    if(nomeTrimado.match(regexNome)==null){
        // Muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido."; 
        nomeHelp.style.color = "red";
    }else if(nomeTrimado.replace(" ", "").length <= 6){
        // Muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "O nome deve possuír mais de 6 caracteres."; 
        nomeHelp.style.color = "red";
    } else {
        nomeHelp.textContent = "";
    }       
});

// Adiciona um ouvinte de evento ao campo de ano que é acionado quando o campo perde o foco
ano.addEventListener('focusout', () => {
    // Declara a expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim();
    
    //console.log(ano.value);

    // Verifica se o ano corresponde à expressão regular
    if(anoTrimado.match(regexAno)==null){
        // Muda o conteúdo e o estilo do objeto anoHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido.";
        anoHelp.style.color = "red";
    }
    else{
        // Verifica se o ano é maior que 2022 ou menor que 1900
        if(parseInt(anoTrimado) > 2022){
            anoHelp.textContent = 'Ano inválido. O ano não pode ser maior que 2022.';
            anoHelp.style.color="red";
        }
        else if(parseInt(anoTrimado) < 1900){
            anoHelp.textContent = 'Ano inválido. O ano não pode ser menor que 1900.';
            anoHelp.style.color = "red";
        }
        else{
            anoHelp.textContent = "";
        }        
        
    }
});

// Adiciona um ouvinte de evento ao campo de email que é acionado quando o campo perde o foco
email.addEventListener('focusout', () => {
    // Declara a expressão regular para definir o formato de um email válido
    const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+(\.[a-z]{2,4})+$/;
    const emailTrimado = email.value.trim();
    
    //console.log(email.value);

    // Função para verificar o domínio do email
    function teste_depois_do_ponto(s) {
        let depois_do_ponto = s.substring(s.lastIndexOf('.'));
        switch(depois_do_ponto) {
            case ".com":
            case ".net":
            case ".org":
            case ".br":
                return true;
            default:
                return false;
        }
    }

    // Verifica se o email corresponde à expressão regular
    if(emailTrimado.match(regexEmail)==null){
        emailHelp.textContent = "Formato de email inválido.";
        emailHelp.style.color="red";
    } else if(teste_depois_do_ponto(emailTrimado)==false) {
        emailHelp.textContent = "Email inválido.";
        emailHelp.style.color = "red";
    } else {
        emailHelp.textContent = "";
    }
});

// Adiciona um ouvinte de evento ao campo de senha que é acionado quando o campo perde o foco
senha.addEventListener('focusout', () => {
    // Declara a expressão regular para definir o formato de uma senha válida
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%&!+])[A-Za-z\d@#%&!+]{6,20}$/;
    const senhaTrimado = senha.value.trim();
    
    //console.log(senha.value);

    // Separa o nome e o sobrenome
    const nome_cortado = nome.value.trim().split(" ")[0];
    const sobreNome_cortado = nome.value.trim().split(" ")[1];

    // Função para verificar a força da senha
    function verificaSenha(s) {
        let especial= 0;
        let maiuscula = 0;
        let minuscula = 0;
        let numero = 0;
        
        // Conta o número de caracteres especiais, maiúsculos, minúsculos e números na senha
        for (let element of s) {
            if(element.match(/[@#%&!+]/)) {
                especial++;
                
                //console.log("especial: " + especial);
            } else if(element.match(/[A-Z]/)) {
                maiuscula++;
                
                //console.log("maiuscula: " + maiuscula);
            } else if(element.match(/[a-z]/)) {
                minuscula++;
                
                //console.log("minuscula: " + minuscula);
            } else if(element.match(/[0-9]/)) {
                numero++;
                
                //console.log("numero: " + numero);
            }
        }

        return [especial, maiuscula, minuscula, numero];
    }    

    // Verifica a força da senha
    const estatistica = verificaSenha(senhaTrimado);
    
    //console.log("especial: " + estatistica[0] + "; maiuscula: " + estatistica[1] + "; minuscula: " + estatistica[2] + "; numero: " + estatistica[3] + ".");
    if(senhaTrimado.match(regexSenha)==null) {
        // Verifica se a senha tem entre 6 e 20 caracteres
        if(!(senhaTrimado.length > 6 && senhaTrimado.length < 20)) {
            senhaHelp.textContent = "A senha deve ter de 6 a 20 caracteres.";
            senhaHelp.style.color = "red";
        } else if(estatistica[0] == 0) {
            senhaHelp.textContent = "A senha deve ter ao menos um caracter especial.";
            senhaHelp.style.color = "red";
        } else if(estatistica[1] == 0) {
            senhaHelp.textContent = "A senha deve ter ao menos uma letra maiúscula.";
            senhaHelp.style.color = "red";
        } else if(estatistica[2] == 0) {
            senhaHelp.textContent = "A senha deve ter ao menos uma letra minúscula.";
            senhaHelp.style.color="red";
        } else if(estatistica[3] == 0) {
            senhaHelp.textContent = "A senha deve ter ao menos um número.";
            senhaHelp.style.color = "red";
        } else {
            senhaHelp.textContent = "A senha contem caracteres especiais não permitidos.";
            senhaHelp.style.color = "red";
        }
    } else if(senhaTrimado.toLowerCase().includes(nome_cortado.toLowerCase()) || (sobreNome_cortado != undefined && senhaTrimado.toLowerCase().includes(sobreNome_cortado.toLowerCase()))) {
        senhaHelp.textContent = "A Senha não pode conter seu nome ou sobre nome.";
        senhaHelp.style.color = "red";
    } else if(senhaTrimado.includes(ano.value.trim())){
        senhaHelp.textContent = "A Senha não pode conter seu ano de nascimento.";
        senhaHelp.style.color = "red";
    }else {
        // Classifica a força da senha
        if(senhaTrimado.length < 8 && estatistica[0] >= 1 && estatistica[3] >= 1) {
            senhaHelp.textContent = "Senha Fraca";
            senhaHelp.style.color = "red";
        } else if(senhaTrimado.length >= 8 && senhaTrimado.length <= 12  && estatistica[0] >= 1 && estatistica[1] >= 1 && estatistica[3] >= 1) {
            senhaHelp.textContent = "Senha Média";
            senhaHelp.style.color = "yellow";
        } else if(senhaTrimado.length > 12 && estatistica[0] >= 1 && estatistica[1] >= 1 && estatistica[3] >= 1) {
            senhaHelp.textContent = "Senha Forte";
            senhaHelp.style.color = "green";
        } else {
            senhaHelp.textContent = "Não sei o que aconteceu.";
            senhaHelp.style.color = "purple";
        }
    }
});

sendButton.addEventListener('click', () => {
    if(nomeHelp.textContent != "" || anoHelp.textContent != "" || emailHelp.textContent != "" || (senhaHelp.textContent != "Senha Fraca" && senhaHelp.textContent != "Senha Média" && senhaHelp.textContent != "Senha Forte" && senhaHelp.textContent != "")) {
        alert("Formulário inválido. Por favor, preencha os campos corretamente.");
    } else {
        alert("Formulário válido. Dados enviados com sucesso.");
    }
});
