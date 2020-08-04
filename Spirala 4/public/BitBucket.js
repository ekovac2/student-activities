var k = '3Y2McuB9p5vUq9JaXG';
var s = 'acMEzPT2UeFUknznzkbJW7vNsKmACEU3';

var BitBucket = (function(){
    var konstruktor = function(key,secret){
            var ajax = new XMLHttpRequest();
            var token = new Promise(function(resolve,reject){
                 
                ajax.onreadystatechange = function() {
                    if (ajax.readyState == 4 && ajax.status == 200){ 
                        var prviToken = JSON.parse(ajax.responseText).access_token;
                        resolve(prviToken);}
                    else if (ajax.readyState == 4){ 
                        var poruka = "Neispravan token";
                        reject(poruka);
                    }
                }
            });
    
            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ":" + secret));
            ajax.send("grant_type="+encodeURIComponent("client_credentials"));

    return {
            ucitaj:function(nazivRepSpi,nazivRepVje,callback){     
                token.then(function(result) {
                    var ajax1 = new XMLHttpRequest();
                    ajax1.onreadystatechange = function(){
                        if (ajax1.readyState == 4 && ajax1.status == 200)
                            {
                                var podaci = JSON.parse(ajax1.responseText);
                                var niz = [];

                                for(var i=0;i<podaci.values.length;i++){

                                    var pomocni = podaci.values[i].name;
                                    var ime = podaci.values[i].owner.username;
                                    var indeks = pomocni.substr(pomocni.length - 5);

                                    var b = 0;
                                    for(var k = 0; k<niz.length; k++){
                                        if(indeks == niz[k].index) b++;
                                    }
                                    if(b==0){
                                        var objekat = {imePrezime: ime, index: indeks};
                                        niz.push(objekat);
                                    }

                                }
                                console.log(niz);
                                stingovi = niz;
                                callback(null, niz);
                            }
                        else if (ajax1.readyState == 4)
                            console.log(ajax1.status);
                    }
                    
                
                    var uslov1 = "&q=name+%3D+%22"+ nazivRepVje + "%22";
                    var uslov2 = "+OR+name+%3D+%22" + nazivRepSpi + "%22";

                    ajax1.open("GET", "https://api.bitbucket.org/2.0/repositories?role=member" + uslov1 + uslov2);
                    ajax1.setRequestHeader("Authorization", 'Bearer ' + result);
                    ajax1.send();

                }).catch(function(error){
                    callback(error, null);
                });
            }
        }
    } 
    return konstruktor;
}
());




 