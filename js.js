var linhas;
var lista = [];

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
                        lista.push(linhas[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z,])/g, ''));
                        //console.log(lista[i] + '\n');
                    }

                    RemoveVirgula(lista);
                    console.table(lista);
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
}

function procura(elemento)
{
    for(let i = 0; i < lista.length; i++)
    {       
        if(lista[i][0] == elemento)
        {
            return i;
        }
    }
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

//função que eu não vou usar mas to com pena de apagar
function RemoveVirgula(lista)
{

    for(let i = 0; i < lista.length; i++)
    {
        var separacoes = 1; // serve para calcular em qual posição do array adicionará o numero
            var temp = '';
            var temp2 = [] // enquanto não achar uma virgula, significa que é o msm numero, então irá adicionando aqui
        for(let j = 1; j < lista[i].length; j++)
        {
            
            if(lista[i][j] != ',')
            {
                //enquanto não acha virgula vai alimentando o temp;
                temp += lista[i][j];
                console.log(temp);            }
            else
            {
                //quando acha a virgula designa o temp para sua posição e o reinicia
                console.log("lista[" + i + "][" + separacoes + "] recebe: " + temp2);
                temp2.push(parseInt(temp));
                lista[i][separacoes] = temp2;
                separacoes++;
                temp = '';
                temp2.pop();
            }
            
        }
        //ultima designação fora do FOR pois não encontra virgula no final
  
        temp2.push(parseInt(temp));

        lista[i][separacoes] = temp2;
        console.log("lista[" + i + "][" + separacoes + "] recebe: " + lista[i][separacoes]);
        temp2.pop();
    }
}