// projeto pegar cep com API

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}


// Como fazer varias requisições ao mesmo tempo com Promise>
    // let ceps = ['01001000','01001000'];
    // let cjCeps = ceps.map(valores => buscaEndereco(valores));
    // Promise.all(cjCeps).then(respostas => console.log(respostas));

let cep = document.getElementById('cep');

//focusout - evento de clique fora do campo
cep.addEventListener('focusout', () => buscaEndereco(cep.values));

buscaEndereco();