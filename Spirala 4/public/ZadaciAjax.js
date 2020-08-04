var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){

        var poziv = 0;
        return {

            dajXML:function(){
                if(poziv == 1){
                    let odgovor = JSON.stringify({greska:"Već ste uputili zahtjev"});
                    callbackFn(odgovor);

                }
                else if(poziv == 0){
                    poziv = 1;
                    var ajax = new XMLHttpRequest();
                    ajax.onreadystatechange = function(){

                        if(ajax.readyState==4 && ajax.status==200){
                            callbackFn(ajax.responseText);
                            poziv = 0;
                        }
                        
                    }
                    ajax.open("GET","http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/xml');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                
            },
            dajCSV:function(){
                if(poziv == 1){
                    let odgovor = JSON.stringify({greska:"Već ste uputili zahtjev"});
                    callbackFn(odgovor);
                }
                else if(poziv == 0){
                    poziv = 1;
                    var ajax = new XMLHttpRequest();
                    ajax.onreadystatechange = function(){

                        if(ajax.readyState==4 && ajax.status==200){
                            callbackFn(ajax.responseText);
                            poziv=0;
                        }
                        
                    }
                    ajax.open("GET","http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'text/csv');
                    ajax.timeout = 2000;
                    ajax.send();
                }
            },
            dajJSON:function(){
                if(poziv == 1){
                    let odgovor = JSON.stringify({greska:"Već ste uputili zahtjev"});
                    callbackFn(odgovor);
                }
                else if(poziv == 0){
                    poziv = 1;
                    var ajax = new XMLHttpRequest();
                    ajax.onreadystatechange = function(){

                        if(ajax.readyState==4 && ajax.status==200){
                            callbackFn(ajax.responseText);
                            poziv=0;
                        }
                        
                    }
                    ajax.open("GET","http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/json');
                    ajax.timeout = 2000;
                    ajax.send();
                }
            }
        }
    }
    return konstruktor;
}());
