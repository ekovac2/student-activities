var CommitTabela=(function(){

    var tabela=document.createElement('table');
    let brojKolona=[];
    let zadnjaUKoloni=[];
    var maxSirinaKolone = 2;
    var brojZ=0;

    var kreirana = 0;

var konstruktor=function(divElement,brojZadataka){

    tabela.innerHTML="";
    
    brojKolona.push(2);
    for(var i=0;i<brojZadataka+1;i++){
        brojKolona.push(1);
        zadnjaUKoloni.push(0);
    }
    brojZ=brojZadataka+1;

    for(var i=0; i<brojZ; i++){
        var tr = document.createElement('tr');
        tabela.appendChild(tr);

        if(i==0){
            var td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = "Zadaci";

            td = document.createElement('td');
            td.innerHTML = "Commiti";
            tr.appendChild(td);
            td.colSpan=maxSirinaKolone - brojKolona[i] + 1;
        }
        else{
            for(var j=0;j<brojKolona[i];j++){
            var td = document.createElement('td');
            tr.appendChild(td);

                if(j==0){
                    td.innerHTML = "Zadatak " + i;
                }
                else{
                    var a = document.createElement('a');
                    var tekst = document.createTextNode(j);
                    a.appendChild(tekst);
                    a.href = 'https://zamger.etf.unsa.ba/index.php';
                    td.appendChild(a);
                }
            }
            if(brojKolona[i]<maxSirinaKolone){
                var td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = '';
                td.colSpan=(maxSirinaKolone-brojKolona[i]);
            }
        }
    }

    kreirana=1;
    divElement.appendChild(tabela);
    
        return{
            dodajCommit:function(rbZadatka,url){

                if(rbZadatka<0 || rbZadatka>=brojZ-1 || kreirana==0) return -1;

                if(brojKolona[rbZadatka+1]==maxSirinaKolone){
                    var red = tabela.rows[rbZadatka+1];
                    var x = red.insertCell();
                    var a = document.createElement('a');
                    zadnjaUKoloni[rbZadatka+1]=zadnjaUKoloni[rbZadatka+1]+1;
                    var tekst = document.createTextNode(zadnjaUKoloni[rbZadatka+1]);
                    a.appendChild(tekst);
                    a.href = url;

                    x.appendChild(a);
                    brojKolona[rbZadatka+1] = brojKolona[rbZadatka+1] + 1;
                }
                else{
                    var red = tabela.rows[rbZadatka+1];
                    red.deleteCell(brojKolona[rbZadatka+1]);

                    var x = red.insertCell();

                    var a = document.createElement('a');
                    zadnjaUKoloni[rbZadatka+1]=zadnjaUKoloni[rbZadatka+1]+1;
                    var tekst = document.createTextNode(zadnjaUKoloni[rbZadatka+1]);
                    a.appendChild(tekst);
                    a.href = url;

                    x.appendChild(a);
                    brojKolona[rbZadatka+1] = brojKolona[rbZadatka+1] + 1;

                    if(maxSirinaKolone>brojKolona[rbZadatka+1]){
                    x = red.insertCell();
                    x.colSpan = (maxSirinaKolone-brojKolona[rbZadatka+1]);
                    x.innerHTML='';
                    }
                }


                if(brojKolona[rbZadatka+1]>maxSirinaKolone){
                    
                    for(var i=1;i<brojZ;i++){
                            if(brojKolona[i]==maxSirinaKolone){
                                x = tabela.rows[i].insertCell();
                                x.innerHTML='';
                            }
                        
                    }

                    maxSirinaKolone = brojKolona[rbZadatka+1];
                }

                for(var i=0;i<brojZ;i++){
                    if(i==0){
                        var celija = tabela.rows[0].cells[1];
                        celija.colSpan = maxSirinaKolone - brojKolona[i] + 1;
                    }
                    else{
                        if(brojKolona[i]<maxSirinaKolone){
                            var red = tabela.rows[i];
                            red.deleteCell(brojKolona[i]);

                            var x = red.insertCell();
                            x.innerHTML = '';
                            x.colSpan=(maxSirinaKolone-brojKolona[i]);

                        }
                    }
                }

            },
            editujCommit:function(rbZadatka,rbCommita,url){
                if(rbZadatka>=brojZ-1 || rbZadatka<0 || rbCommita>brojKolona[rbZadatka+1]-2 || rbCommita<0 || kreirana==0) return -1;

                    var celija = tabela.rows[rbZadatka+1].cells[rbCommita+1];
                    

                    var a = document.createElement('a');
                    var tekst = document.createTextNode(rbCommita+1);
                    a.appendChild(tekst);
                    a.href = url;
                    celija.removeChild(celija.childNodes[0]);

                    celija.appendChild(a);


            },
            obrisiCommit:function(rbZadatka,rbCommita){
                if(rbZadatka>=brojZ-1 || rbZadatka<0 || rbCommita>brojKolona[rbZadatka+1]-2 || rbCommita<0 || kreirana==0) return -1;

                if(brojKolona[rbZadatka+1]==maxSirinaKolone){
                    var red = tabela.rows[rbZadatka+1];

                    var x = red.deleteCell(rbCommita+1);

                    brojKolona[rbZadatka+1] = brojKolona[rbZadatka+1] - 1;

                    maxSirinaKolone=brojKolona[rbZadatka+1];
                    for(var i=0;i<brojZ;i++){
                        if(brojKolona[i]>maxSirinaKolone) {maxSirinaKolone=brojKolona[i];}
                    }

                    if(brojKolona[rbZadatka+1]<maxSirinaKolone){
                        x = tabela.rows[rbZadatka+1].insertCell();
                        x.colSpan = (maxSirinaKolone-brojKolona[rbZadatka+1]);
                        x.innerHTML='';
                    }
                    else{
                        for(var i=0;i<brojZ;i++){
                            if(i==0){
                                tabela.rows[0].cells[1].colSpan = maxSirinaKolone-brojKolona[0] + 1;
                            }
                            else if(i!=rbZadatka+1){
                                red = tabela.rows[i];
                                red.deleteCell(-1);
                                
                                if(brojKolona[i]<maxSirinaKolone){
                                    var x = red.insertCell();
                                    x.innerHTML = '';
                                    x.colSpan=(maxSirinaKolone-brojKolona[i]);
                                }
                            }
                        }

                    }
                }
                else{
                    var red = tabela.rows[rbZadatka+1];
                    red.deleteCell(-1);
                    var x = red.deleteCell(rbCommita+1);

                    brojKolona[rbZadatka+1] = brojKolona[rbZadatka+1] - 1;

                    x = tabela.rows[rbZadatka+1].insertCell();
                    x.colSpan = (maxSirinaKolone-brojKolona[rbZadatka+1]);
                    x.innerHTML='';

                }

                
                
                
            }
        }
       
    }

    return konstruktor;
}());
    