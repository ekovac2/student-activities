function myFunction(){
    var mojDiv = document.getElementById("ispis");
    var inputGodina = document.getElementById("sGodine");
    var inputIme = document.getElementById("ime");
    var inputIndex = document.getElementById("index");

    var validacija = new Validacija(mojDiv);
    
    validacija.ime(inputIme);
    validacija.index(inputIndex);
    validacija.godina(inputGodina);


    return false;
}


function myFunction2(){
    var mojDiv = document.getElementById("ispis2");
    var inputGodina = document.getElementById("godina");
    var validacija = new Validacija(mojDiv);
    validacija.godina(inputGodina);


    return false;
}

var prethodniK="", prethodniS="";
var stringovi ="";

function ispisi(greska,x){
    if(greska==null){
        stringovi = x;
        console.log("Lista studenata:\n"+JSON.stringify(x));
    }
}

var p="";
var pomocni="";
var prethodnaGodina = "";

function pozoviBit(){
    var k = document.getElementById("key").value;
    var s = document.getElementById("secret").value;
    try{
        if((k!=prethodniK || s!=prethodniS)){
            prethodniK = k;
            prethodniS = s;

            var X = document.getElementById("sGodina");
            if(X[X.selectedIndex]!=undefined){
                var ajax1 = new XMLHttpRequest;
                ajax1.onreadystatechange = function(){
                    if(ajax1.readyState==4 && ajax1.status==200){
                        pomocni = JSON.parse(ajax1.responseText);
                        console.log(pomocni); 
                        for(var m = 0; m<pomocni.length; m++){
                            if(pomocni[m].id == X[X.selectedIndex].value){
                            var bbucket = new BitBucket(k,s).ucitaj(pomocni[m].nazivRepSpi,pomocni[m].nazivRepVje,ispisi);
                        }
                        }
                        
                    }
                }

                ajax1.open("GET","http://localhost:8080/god", true);
                ajax1.send(); 

                
                
                
            }
        }
    }
    catch(izuzetak){
        console.log(izuzetak);
    }
    document.getElementById("dugmic").disabled = false;
}


function posaljiPost(){
   
    var X = document.getElementById("sGodina");
    if(X[X.selectedIndex]!=undefined){

    var god = X[X.selectedIndex].value;
    var objekat = {godina: god, studenti: stringovi};
    var ajax1 = new XMLHttpRequest;

    ajax1.onreadystatechange = function(){
        if(ajax1.readyState === XMLHttpRequest.DONE){ 
            alert(JSON.parse(ajax1.responseText).poruka);
        }  
    }
    ajax1.open("POST","http://localhost:8080/student", true);
    ajax1.setRequestHeader('Content-Type','application/json');
    ajax1.send(JSON.stringify(objekat));  
       
    }
    return false;
}

function ucitajGodineSve(parametar){
    var godine = document.getElementById(parametar);

    var ajax1 = new XMLHttpRequest;
        
    ajax1.onreadystatechange = function(){

        if(ajax1.readyState==4 && ajax1.status==200){
            p = JSON.parse(ajax1.responseText);
            for(var i=0;i<p.length;i++){
                
                var opt = document.createElement('option');
                opt.value = p[i];
                opt.innerHTML = p[i];
                godine.appendChild(opt);
            }
        }
        
    }
    ajax1.open("GET","http://localhost:8080/nadjiGodine", true);
    ajax1.send();   
    

    return false;
}