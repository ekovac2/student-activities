var tabela='';
 
function Kreiraj(){
    var mojDiv = document.getElementById("mojDiv");
    var brZ = document.getElementById('brojRedova');
    
   
    tabela = new CommitTabela(mojDiv,parseInt(brZ.value));
        
    return false;
}

function DodajCom(){
    var brZ = document.getElementById('redniBr');
    var url = document.getElementById("urlic");
    tabela.dodajCommit(parseInt(brZ.value),url.value);
    return false;
}

function EditujCom(){
    var brZ = document.getElementById('redniBrZ');
    var brC = document.getElementById('redniBrC');
    var url = document.getElementById("urlic2");
    tabela.editujCommit(parseInt(brZ.value), parseInt(brC.value),url.value);
    return false;
}

function ObrisiCom(){
    var brZ = document.getElementById('redniBrZZ');
    var brC = document.getElementById('redniBrCC');
    tabela.obrisiCommit(parseInt(brZ.value), parseInt(brC.value));
    return false;
}

		