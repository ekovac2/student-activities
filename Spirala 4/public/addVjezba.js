function myFunction(){
    var mojDiv = document.getElementById("ispis");
    var inputGod = document.getElementById("sGodine");
    var inputVjezba = document.getElementById("sVjezbe");
    var validacija = new Validacija(mojDiv);
   
    v1 = validacija.godina(inputGod);
    v2 = validacija.naziv(inputVjezba);
   
    return (v1 != 0 && v2!=0 );
}

function myFunction2(){
    var mojDiv = document.getElementById("ispis2");
    var inputGod = document.getElementById("sGodine2");
    var inputVjezba = document.getElementById("VjezbaX");
    var inputZadatak = document.getElementById("sZadatak");
    var validacija = new Validacija(mojDiv);
    validacija.godina(inputGod);
    validacija.naziv(inputVjezba);
    validacija.naziv(inputZadatak);
 
    return false;
}

var funkcijaOnLoad = (function(){
    var konstruktor = function(){

        var zadaci = document.getElementById("zadaci");
        var ajax1 = new XMLHttpRequest;
 
        ajax1.onreadystatechange = function(){

            if(ajax1.readyState==4 && ajax1.status==200){
                var p = JSON.parse(ajax1.responseText);
                console.log("ušlo");
                for(var i=0;i<p.length;i++){
                    var opt = document.createElement('option');
                    opt.value = p[i];
                    opt.innerHTML = p[i];
                    zadaci.appendChild(opt);
                   
                }
            }
            
        }
        ajax1.open("GET","http://localhost:8080/vratiZadatke", true);
        ajax1.send();   
        }   

        return konstruktor;
        
    }
());


function ucitajVjezbeSve(){
    var vjezbe = document.getElementById("sVjezbe");

    var ajax1 = new XMLHttpRequest;
        
    ajax1.onreadystatechange = function(){

        if(ajax1.readyState==4 && ajax1.status==200){
            var p = JSON.parse(ajax1.responseText);
            for(var i=0;i<p.length;i++){
                
                var opt = document.createElement('option');
                opt.value = p[i];
                opt.innerHTML = p[i];
                vjezbe.appendChild(opt);
            }
        }
        
    }
    ajax1.open("GET","http://localhost:8080/nadjiVjezbe", true);
    ajax1.send();   
    

    return false;
}

function ucitajGodineSve(parametar){
    var godine = document.getElementById(parametar);

    var ajax1 = new XMLHttpRequest;
        
    ajax1.onreadystatechange = function(){

        if(ajax1.readyState==4 && ajax1.status==200){
            var p = JSON.parse(ajax1.responseText);
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


var ucitajVjezbe = (function(){
    var konstruktor = function(){
        var vjezbe = document.getElementById("vjezbe");
        var ajax1 = new XMLHttpRequest;
        
        ajax1.onreadystatechange = function(){

            if(ajax1.readyState==4 && ajax1.status==200){
                var p = JSON.parse(ajax1.responseText);
                for(var i=0;i<p.length;i++){
                    
                    var opt = document.createElement('option');
                    opt.value = p[i];
                    opt.innerHTML = p[i];
                    vjezbe.appendChild(opt);
                }
            }
            
        }
        ajax1.open("GET","http://localhost:8080/nadjiVjezbe", true);
        ajax1.send();   
        }   

        return konstruktor;
        
    }
());

function napraviPost(){

    var vjezbe = document.getElementById("vjezbe");
    var indeks = vjezbe[vjezbe.selectedIndex].value;

    var zadaci = document.getElementById("zadaci");
    var indeksZ = zadaci[zadaci.selectedIndex].value;

    var objekat = {sZadatak: indeksZ};

    var ajax1 = new XMLHttpRequest;
    ajax1.onreadystatechange = function(){

        if(ajax1.readyState==4 && ajax1.status==200){
        }
        
    }
    ajax1.open("POST","http://localhost:8080/vjezba/" + indeks + "/zadatak" , true);
    ajax1.setRequestHeader('Content-Type','application/json');
    ajax1.send(JSON.stringify(objekat));  

}


var zadaciNaIndeks = (function(){
    var konstruktor = function(){
        var vjezbe = document.getElementById("vjezbe");
        var zadaci = document.getElementById("zadaci");

        var indeks = vjezbe[vjezbe.selectedIndex].value;

        var ajax1 = new XMLHttpRequest;


        ajax1.onreadystatechange = function(){

            if(ajax1.readyState==4 && ajax1.status==200){
                var p = JSON.parse(ajax1.responseText);
                
                while(zadaci.firstChild){
                    zadaci.removeChild(zadaci.firstChild);
                }

                for(var i=0;i<p.length;i++){
                    
                    var opt = document.createElement('option');
                    opt.value = p[i];
                    opt.innerHTML = p[i];
                    zadaci.appendChild(opt);
                }
            }
            
        }
        ajax1.open("GET","http://localhost:8080/vjezbeIZadatak?indeks=" + indeks, true);
        ajax1.send();   
        }   

        return konstruktor;
        
    }
());
