var linhas;
var lista = [];
var lista1 = [];
var lista2 = [];
var lista3 = [];
var conjuntodaspartes = [];
window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('filecontents');
                    fileContents.innerText = fileReader.result;
                    
                    linhas = fileReader.result.split('\n');
                    
                    
                    for(let i = 0; i < linhas.length; i++)
                    {
                        //regex que remove todos os caracteres especiais
                        lista1.push(linhas[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z,-])/g, ''));

                    }

                    //organiza as letras em um array
                    for(let i = 0; i < lista1.length; i++)
                    {
                        lista3[i] = lista1[i].slice(0, 1);
                        lista2.push(linhas[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9,-])/g, ''));
                        
                    }
                    
                    //organiza os numeros em um array
                    for(let i = 0; i < lista2.length; i++)
                    {
                        lista.push(lista2[i].split(','));
                    }

                    //junta as letras e numeros no mesmo array, organizados ("ta pronto sorvetinho")
                    for(let i = 0; i < lista3.length; i++)
                    {
                        lista[i].unshift(lista3[i]);
                    }
                    
                    

                    //console.table(lista);

                        var table = document.getElementById("tabela");
    for(let i = 0; i < linhas.length; i++)
    {
        newLinha = document.createElement('tr');
        

        newColuna = document.createElement('td');
        var texto = document.createTextNode(linhas[i]);

        newColuna.appendChild(texto);
        newLinha.appendChild(newColuna);
        table.appendChild(newLinha);
    }
                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }


}

function calcula()
{
    var elemento1 = document.getElementById("elemento1").value;
    var operacao = document.getElementById("operacao").value;
    var elemento2 = document.getElementById("elemento2").value;
    var indexConjunto1 = procura(elemento1);
    var indexConjunto2 = procura(elemento2);

    switch(operacao)
    {
        case '1':
            if(pertence(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "verdadeiro, o elemento '" + lista[indexConjunto1][0] + "' pertence ao conjunto " + lista[indexConjunto2][0];
            }
            else if(!pertence(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "falso, o elemento '" + lista[indexConjunto1][0] + "' não pertence ao conjunto " + lista[indexConjunto2][0];
            }
            else
            {
                document.getElementById('resultado').textContent = pertence(indexConjunto1, indexConjunto2);
            }
            
            break;
        
        case '2':
            if(pertence(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "falso, o elemento '" + lista[indexConjunto1][0] + "' pertence ao conjunto " + lista[indexConjunto2][0];
            }
            else if(!pertence(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "verdadeiro, o elemento '" + lista[indexConjunto1][0] + "' não pertence ao conjunto " + lista[indexConjunto2][0];
            }
            else
            {
                document.getElementById('resultado').textContent = pertence(indexConjunto1, indexConjunto2);
            }

            break;

        case '3':
            if(contido(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "verdadeiro, o conjunto " + lista[indexConjunto1][0] + " está contido ou é igual ao conjunto " + lista[indexConjunto2][0];
            }
            else if(!contido(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "falso, o conjunto " + lista[indexConjunto1][0] + " não está contido nem é igual ao conjunto " + lista[indexConjunto2][0];
            }
            else
            {
                document.getElementById('resultado').textContent = contido(indexConjunto1, indexConjunto2);
            }

            break;

        case '4':
            if(contido(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "falso, o conjunto " + lista[indexConjunto1][0] + " está contido ou é igual conjunto " + lista[indexConjunto2][0];
            }
            else if(!contido(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "verdadeiro, o conjunto " + lista[indexConjunto1][0] + "não está contido nem é igual ao conjunto " + lista[indexConjunto2][0];
            }
            else
            {
                document.getElementById('resultado').textContent = contido(indexConjunto1, indexConjunto2);
            }

            break;

        case '5':
            if(contidoPropriamente(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "verdadeiro, o conjunto " + lista[indexConjunto1][0] + " está contido propriamente no conjunto " + lista[indexConjunto2][0];
            }
            else if(!contidoPropriamente(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "falso, o conjunto " + lista[indexConjunto1][0] + " não está contido propriamente no conjunto " + lista[indexConjunto2][0];
            }
            else
            {
                document.getElementById('resultado').textContent = contidoPropriamente(indexConjunto1, indexConjunto2);
            }
        
            break;

        case '6':
            if(contidoPropriamente(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "falso, o conjunto " + lista[indexConjunto1][0] + " está contido propriamente no conjunto " + lista[indexConjunto2][0];
            }
            else if(!contidoPropriamente(indexConjunto1, indexConjunto2))
            {
                document.getElementById('resultado').textContent = "verdadeiro, o conjunto " + lista[indexConjunto1][0] + " não está contido propriamente no conjunto " + lista[indexConjunto2][0];
            }
            else
            {
                document.getElementById('resultado').textContent = contidoPropriamente(indexConjunto1, indexConjunto2);
            }

            break;

        case '7':
            document.getElementById('resultado').textContent =  lista[indexConjunto1][0] + " união " + lista[indexConjunto2][0] + " = {" + uniao(indexConjunto1, indexConjunto2) + "}";

            break;
        
        case '8':
            document.getElementById('resultado').textContent = lista[indexConjunto1][0] + " interseção com " + lista[indexConjunto2][0] + " = {" +  interseção(indexConjunto1, indexConjunto2) + "}";

            break;

        case '9':
            document.getElementById('resultado').textContent = lista[indexConjunto1][0] + " X " + lista[indexConjunto2][0] + " = {" + produtoCartesiano(indexConjunto1, indexConjunto2) + "}";

            break;

        case '10':

            for(let subconjunto of conjuntoPartes(lista[indexConjunto1]))
            {
                let arrayzin = "(" + subconjunto + ")";
                conjuntodaspartes.push(arrayzin);
                
            }
            
            console.table(conjuntodaspartes);
            document.getElementById('resultado').textContent = " P(" + lista[indexConjunto1][0] + ") = " + conjuntodaspartes;
            break;

        case '11':
            document.getElementById('resultado').textContent = lista[indexConjunto1][0] + " - " + lista[indexConjunto2][0] + " = " + diferenca(indexConjunto1, indexConjunto2);

            break;
        default:
            document.getElementById('resultado').textContent = "ERRO, TENTE NOVAMENTE";
            
            break;
    }

    /*
    for(let i = 0; i < linhas.length; i++)
    {
        newLinha = document.createElement('tr');
        

        newColuna = document.createElement('td');
        var texto = document.createTextNode(linhas[i]);

        newColuna.appendChild(texto);
        newLinha.appendChild(newColuna);
        table.appendChild(newLinha);
    }
    */

    newp = document.createElement('p');
    var texto = document.create
}

function replace(array)
{
    for(let i = 0; i < array.length; i++)
    {
        if(array[i] == '(')
        {
            array[i+1] = '';
        }
        else if(array[i] == ')')
        {
            array[i-1] = '';
        }
    }
}
function contido(index1, index2)
{
    if(lista[index1].length <= 2 || lista[index2].length <= 2)
    {
        return "somente podemos fazer essa operação com 2 conjuntos e uma ou mais opções não são compatíveis";
    }
    
    for(let i = 1; i < lista[index1].length; i++)
    {
        if(lista[index2].indexOf(lista[index1][i]) == -1)
        {
            return false;
        }
    }
    return true;
}

function contidoPropriamente(index1, index2)
{
    if(lista[index1].length <= 2 || lista[index2].length <= 2)
    {
        return "somente podemos fazer essa operação com 2 conjuntos e uma ou mais opções não são compatíveis";
    }

    if(contido(index1, index2) && lista[index1].length < lista[index2].length)
    {
        return true;
    }
    return false;
}

function pertence(index1, index2)
{
    if(lista[index2].length <= 2 || lista[index2].length <= 0)
    {
        return "segunda opção não é válida";
    }
    if(lista[index1].length <= 0 || lista[index1].length > 2)
    {
        return "primeira opção não é válida"
    }
    
    for(let i = 1; i < lista[index2].length; i++)
    {
        if(lista[index1][1] === lista[index2][i])
        {
            return true;
        }
    }
    return false;
}

function uniao(index1, index2)
{
    let uniao = [];
    let copia = lista[index1].slice();

    for(let i = 1; i < lista[index2].length; i ++)
    {
        let buscarPor = lista[index2][i];
        
        let indice = copia.indexOf(buscarPor);

        while(indice >= 0)
        {
            copia.splice(indice, 1);
            indice = lista.indexOf(buscarPor);
        }
    }

    for(let i = 1; i < copia.length; i++)
    {
        uniao.push(copia[i]);
    }
    for(let i = 1; i < lista[index2].length; i++)
    {
        uniao.push(lista[index2][i]);
    }
    
    return uniao;
}

function interseção(index1, index2)
{
    let intersecao = [];

    for(let i = 1; i < lista[index1].length; i++)
    {
        for(let j = 1; j < lista[index2].length; j++)
        {
            if(lista[index1][i] == lista[index2][j])
            {
                intersecao.push(lista[index1][i]);
            }
        }
    }
    return intersecao;
}

function produtoCartesiano(index1, index2)
{
    var produto = [];

    for(let i = 1; i < lista[index1].length; i++)
    {
        for(let j = 1; j < lista[index2].length; j++)
        {
            let temp = "(" + lista[index1][i] + ", " + lista[index2][j] + ")";
            produto.push(temp);
        }
        
    }
    return produto;
}

function diferenca(index1, index2)
{
    let diferenca = [];

    for(let i = 1; i < lista[index1].length; i++)
    {
        if(lista[index2].indexOf(lista[index1][i]) < 0)
        {
            diferenca.push(lista[index1][i]);
        }
    }
    return diferenca;
}

function* conjuntoPartes(array, partida = 1)
{
    while(partida < array.length)
    {
        let first = array[partida++];
        for(let subconjunto of conjuntoPartes(array, partida))
        {
            subconjunto.push(first);
            yield subconjunto;
           
        }
    }
    yield [];
}

function procura(elemento)
{
    for(let i = 0; i < lista1.length; i++)
    {       
        if(lista1[i][0] == elemento)
        {
            return i;
        }
    }
    return -1;
}

function conjuntoElemento(elemento)
{
    if(elemento.indexOf(",") == -1)
    {
        return false;
    }
    else
    {
        return true;
    }
}