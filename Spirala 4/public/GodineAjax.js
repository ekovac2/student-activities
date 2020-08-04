//Zadatak 6
var GodineAjax = (function(){
        var konstruktor = function(divSadrzaj){
            var ajax1 = new XMLHttpRequest;
            
            ajax1.onreadystatechange = function(){

                if(ajax1.readyState==4 && ajax1.status==200){
                    
                    var parpar = JSON.parse(ajax1.responseText);
                    for(var i=0;i<parpar.length;i++){
                        var item = document.createElement('div');
                        item.classList.add("item");
                        item.innerHTML = parpar[i].nazivGod + "<br>" + parpar[i].nazivRepVje + "<br>" + parpar[i].nazivRepSpi + "<br>";
                        divSadrzaj.appendChild(item);
                    }
                }
                
            }
            ajax1.open("GET","http://localhost:8080/godine", true);
            ajax1.send();
           
        return {
                osvjezi:function(){
                    
                    if(ajax1.readyState<4) ajax1.abort();

                    divSadrzaj.innerHTML='';
                    
                    var ajax = new XMLHttpRequest;
                    ajax.onreadystatechange = function(){
        
                        if(ajax.readyState==4 && ajax.status==200){
                            
                            var parpar = JSON.parse(ajax.responseText);
                            for(var i=0;i<parpar.length;i++){
                                var item = document.createElement('div');
                                item.classList.add("item");
                                item.innerHTML = parpar[i].nazivGod + "<br>" + parpar[i].nazivRepVje + "<br>" + parpar[i].nazivRepSpi + "<br>";
                                divSadrzaj.appendChild(item);
                            }
                        }
                        
                    }
                    ajax.open("GET","http://localhost:8080/godine", true);
                    ajax.send();
                    
                    
                }
            }
            
        } 
        return konstruktor;
    }
());
