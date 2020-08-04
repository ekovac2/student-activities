const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');
const app = express();
var path = require('path')
var multer = require('multer')
var url = require('url')

var upload = multer({dest: "uploads/"});
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let postavi = "addZadatak.html";


var mysql = require('mysql');
const db = require('./db.js')
db.sequelize.sync();
//{force:true}

//Zadatak 4
app.post('/addGodina',function(req,res){

    let tijelo = req.body;

    if(tijelo['nazivGod']=="" || tijelo['nazivRepVje']=="" || tijelo['nazivRepSpi']==""){

        let poruka = "Nisu uneseni svi parametri!";
        let link = "addGodina.html";
        res.render("greska",{pokusaj:{poruka:poruka, link:link}});

    }
    else{
        
            var god = tijelo['nazivGod'];
            db.godina.findOne({where:{nazivGod:god}}).then(function(zad){
                if(zad){
                    let link = "addGodina.html";
                    let poruka = "Godina već postoji!";
                    res.render("greska",{pokusaj:{poruka:poruka,link:link}});
                }
                else{
                    db.godina.create({nazivGod:god, nazivRepSpi: tijelo['nazivRepSpi'], nazivRepVje: tijelo['nazivRepVje']});

                    let dodaj = tijelo['nazivGod'] + "," + tijelo['nazivRepVje'] + "," + tijelo['nazivRepSpi'] + "\n";
                    fs.appendFile("godine.csv", dodaj, function(err){
                        if(err) throw err;
                        console.log("Dodan!");
                    });
                    res.redirect("http://localhost:8080/addGodina.html");
                }

            });

        }

});

//Zadatak 5
app.get('/godine',function(req,res){


    db.godina.findAll().then(function(zad){
        
        db.godina.count().then(brGodina => {

            niz = [];
            for(i = 0; i<brGodina; i++){
                var objekat = {nazivGod: zad[i].nazivGod, nazivRepVje: zad[i].nazivRepVje, nazivRepSpi:zad[i].nazivRepSpi};
                niz.push(objekat);
            }
            res.writeHead(200, {'Content-Type': "application/json"});
            res.end(JSON.stringify(niz));

        });
    });

    
});

//Zadatak 3
app.get('/zadatak',function(req,res){
    let ime = req.query.naziv;
    db.zadatak.findOne({where:{naziv:ime}}).then(function(zad){
            if(zad){
                res.redirect(zad.postavka);
            }
            else{
                let link = "#";
                let poruka = "File sa unesenim imenom ne postoji!";
                res.render("greska",{pokusaj:{poruka:poruka,link:link}});
            }
    }); 

});


app.get("/:zadatak.pdf", function(req, res) { 
    res.sendFile(__dirname + "/public/downloads/" + req.params.zadatak + ".pdf");
});


//Zadatak 2
app.post('/addZadatak', upload.single('postavka'), function(req,res){
    let tijelo = req.body;
    var naziv = tijelo['naziv'];

    var fajl = req.file;

    if(naziv == "" || fajl == undefined){
        let link = "addZadatak.html";
        let poruka = "Nisu uneseni naziv ili postavka!";
        res.render("greska",{pokusaj:{poruka:poruka,link:link}});
    }
    else{

        db.zadatak.findOne({where:{naziv:naziv}}).then(function(zad){
            if(zad) {
                console.log("Postoji već zadatak!");
                
                let link = "addZadatak.html";
                let poruka = "Zadatak sa unesenim imenom već postoji!";
                res.render("greska",{pokusaj:{poruka:poruka,link:link}});
            }
            else{

                var regex = "pdf";
                var tipFilea = req.file.mimetype.match(regex);
                var objekat = {naziv: naziv, postavka:"http://localhost:8080/" + naziv + ".pdf"};   

                if(tipFilea == "pdf"){

                    console.log("Dodan novi zadatak!");
                    db.zadatak.create({naziv:naziv, postavka:"http://localhost:8080/" + naziv + ".pdf"});

                    fs.readFile("./uploads/" + req.file.filename, function(err, content){
                        fs.writeFile("./public/downloads/" + naziv + ".pdf", content , function (err) {
                            if(err) throw err;
                        });
                    });

                    fs.writeFile("./public/downloads/" + naziv + "Zad.json", JSON.stringify(objekat), function (err) {
                        if(err) throw err;
                    });
                    res.end(JSON.stringify(objekat));
                }
                else{
                        let link = "addZadatak.html";
                        let poruka = "Tip filea nije pdf!";
                        res.render("greska",{pokusaj:{poruka:poruka,link:link}});
                }
             }
                
            });      
        }  
        
});


//Zadatak 7
app.get('/zadaci',function(req,res){


    var prihvata = req.headers.accept;
        
    res.setHeader('Content-Type', "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');


    db.zadatak.findAll().then(function(zad){
        
        db.zadatak.count().then(brZad => {

            niz = [];
            for(i = 0; i<brZad; i++){
                objekat = {naziv:zad[i].naziv, postavka: zad[i].postavka};
                niz.push(objekat);
            }


            if(niz.length==0){
            
                if(prihvata.indexOf('json') != -1){
                    res.setHeader('Content-Type', "application/json");
                    res.end(JSON.stringify(niz));
                }
                else if(prihvata.indexOf('xml') != -1){
                    res.setHeader('Content-Type', "application/xml");
                    var ispis = "";
                    ispis+=`<?xml version=\"1.0\" encoding=\"UTF-8\"?>`;
                    ispis+=`
    <zadaci>`;
                        ispis+=`
        <zadatak>`;
                        ispis+=`
        </zadatak>`;
                    
                    ispis+=`
    </zadaci>`;
                    res.end(ispis);
                }
                else if(prihvata.indexOf('csv') != -1){
                    res.setHeader('Content-Type', "text/csv");
                    ispis=" ";
                    res.end(ispis);
                }
            }
            else{

                if(prihvata.indexOf('json') != -1){
                    res.setHeader('Content-Type', "application/json");
                    res.end(JSON.stringify(niz));
                }
                else if(prihvata.indexOf('xml') != -1){
                    res.setHeader('Content-Type', "application/xml");
                    var ispis = "";
                    ispis+=`<?xml version=\"1.0\" encoding=\"UTF-8\"?>`;
                    ispis+=`
<zadaci>`;
                    for(var i=0;i<niz.length;i++){
                        ispis+=`
<zadatak>`;
                        ispis+=`
<naziv>` + niz[i].naziv + `</naziv>`;
                        ispis+=`
<postavka>` + niz[i].postavka + `</postavka>`;
                        ispis+=`
</zadatak>`;
                    }
                    ispis+=`
</zadaci>`;
                    res.end(ispis);
                }
                else if(prihvata.indexOf('csv') != -1){
                    res.setHeader('Content-Type', "text/csv");
                    ispis="";
                
                    for(var i=0;i<niz.length;i++){
                        ispis+= niz[i].naziv + ","+ niz[i].postavka + "\n";
                    }
                    res.end(ispis);
                }
            
            

            }

            

        });
    });

});



//Spirala 4

//Zadatak 2.a, 2.b
app.post('/addVjezba', function(req,res){
    let tijelo = req.body;
    var sgodina = tijelo.sGodine;
    var svjezba = tijelo.sVjezbe;

    var vjezbas = tijelo['naziv'];
    var sspirala = tijelo.spirala;

    if(vjezbas!=undefined){

        if(vjezbas=="" || sgodina==undefined){
            let link="";
            let poruka = "Nisu uneseni svi parametri!";
            res.render("greska",{pokusaj:{poruka:poruka, link:link}});
        }
        else{
            db.vjezba.findOne({where:{naziv:vjezbas}}).then(function(vje){
                if(vje){
                    let link = "addVjezba.html";
                    let poruka = "Već postoji vježba sa unesenim imenom!";
                    res.render("greska",{pokusaj:{poruka:poruka,link:link}});
                }
                else{
                if(sspirala == "on"){ 
                            
                            db.godina.findOne({where:{id:sgodina}}).then(function(god){
                                if(god){
                                    db.vjezba.create({naziv:vjezbas, spirala: true}).then(function(vje){
                                                vje.addGodine([god]);
                                    });
                                    res.redirect("http://localhost:8080/addVjezba.html");
                                }
                                else{
                                    console.log("problem");
                                    let link = "addVjezba.html";
                                    let poruka = "Godina sa unesenim id-em ne postoji";
                                    res.render("greska",{pokusaj:{poruka:poruka,link:link}});
                                }
                            });
                    }
                else {
                        db.godina.findOne({where:{id:sgodina}}).then(function(god){
                            if(god){
                                db.vjezba.create({naziv:vjezbas, spirala: false}).then(function(vje){
                                                vje.addGodine([god]);
                                        });
                                res.redirect("http://localhost:8080/addVjezba.html");
                            }
                            else{
                                console.log("problem");
                                let link = "addVjezba.html";
                                let poruka = "Godina sa unesenim id-em ne postoji";
                                res.render("greska",{pokusaj:{poruka:poruka,link:link}});
                            }
                    });
                } 
                }
            });
        } 
    }
    else{
            if(sgodina==undefined || svjezba==undefined){
                link="";
                let poruka = "Nisu uneseni svi podaci!";
                res.render("greska",{pokusaj:{poruka:poruka, link:link}});
            }
            else{
                db.godina.findOne({where:{id:sgodina}}).then(function(god){
                    if(god){
                        db.vjezba.findOne({where:{id:svjezba}}).then(function(vje){
                            if(vje){
                                god.addVjezbe([vje]);
                                res.redirect("http://localhost:8080/addVjezba.html");
                            }
                            else{
                                link="";
                                let poruka = "Vjezba sa unesenim id-em ne postoji!";
                                res.render("greska",{pokusaj:{poruka:poruka, link:link}});
                            }
                        });
                        
                    }
                    else{
                        console.log("Ne postoji godina!");
                        link="";
                        let poruka = "Godina sa unesenim id-em ne postoji!";
                        res.render("greska",{pokusaj:{poruka:poruka, link:link}});
                    }
                       
                    
                });

                

            }
}

});


//Zadatak 2.c
app.post('/vjezba/:idVjezbe/zadatak', function(req,res){
    let tijelo = req.body;
    let tt = req.url;
    var sgodina = tijelo['sZadatak'];
    var pom = tt.split('/');
    var svjezba = pom[2];

    console.log(svjezba);
    console.log(sgodina);

    if(sgodina==undefined || svjezba==undefined){
        let poruka = "Nisu uneseni svi parametri!";
        var link="addVjezba.html";
        res.render("greska",{pokusaj:{poruka:poruka, link:link}});
    }
    else{
        db.zadatak.findOne({where:{id:sgodina}}).then(function(god){
            if(god){
                db.vjezba.findOne({where:{id:svjezba}}).then(function(vje){
                    if(vje){
                        god.addVjezbe([vje]);
                        res.redirect("http://localhost:8080/addVjezba.html");
                    }
                    else{
                        console.log("greška");
                    }
                });
            }
            else{
                console.log("greška");
            }
            
        });
    }
});

app.get('/vratiZadatke',function(req,res){
            db.vjezba.findOne({where:{id:1}}).then(function(vje){
                if(vje){
                    vje.getZadaci().then(function(godineVjezbe){
                        db.zadatak.findAll().then(function(sveGodine){

                            var niz = [];
                            for(var i=0;i<sveGodine.length;i++){
                                var brojac=0;
                                for( var j=0;j<godineVjezbe.length;j++){
                                    if(sveGodine[i].id != godineVjezbe[j].id) brojac++;
                                }
                                if(brojac == godineVjezbe.length) niz.push(sveGodine[i].id);
                            }
                            res.end(JSON.stringify(niz));

                        }); 
                    });
                }
                else{
                    console.log("Baza nema vjezbe");
                }
            });

});

app.get('/vjezbeIZadatak',function(req,res){
    let i = parseInt(req.query.indeks);
    db.vjezba.findOne({where:{id:i}}).then(function(vje){
        if(vje){
            vje.getZadaci().then(function(godineVjezbe){
                db.zadatak.findAll().then(function(sveGodine){
                    var niz = [];
                    
                    for(var i=0;i<sveGodine.length;i++){
                        var brojac=0;
                        for( var j=0;j<godineVjezbe.length;j++){
                            if(sveGodine[i].id != godineVjezbe[j].id) brojac++;
                        }

                        if(brojac == godineVjezbe.length) niz.push(sveGodine[i].id);
                    }                
                    res.end(JSON.stringify(niz));

                }); 
            });
        }
    });

});

app.get('/nadjiVjezbe',function(req,res){

            db.vjezba.findAll().then(function(vje){
                if(vje){
                    var niz = [];
                    for(var i=0;i<vje.length;i++){
                        niz.push(vje[i].id);
                    }
                    res.end(JSON.stringify(niz));
                }
            });

});

app.get('/nadjiGodine',function(req,res){

    db.godina.findAll().then(function(vje){
        if(vje){
            var niz = [];
            for(var i=0;i<vje.length;i++){
                niz.push(vje[i].id);
            }
            res.end(JSON.stringify(niz));
        }
    });

});

app.get('/god',function(req,res){

    db.godina.findAll().then(function(vje){
        if(vje){
            var niz = [];
            for(var i=0;i<vje.length;i++){
                niz.push(vje[i]);
            }
            res.end(JSON.stringify(niz));
        }
    });

});


app.post('/student',function(req,res){
    var god = req.body.godina;
    var stu = req.body.studenti;
    var n=0, m=0;
    var brojac = 0;
    var brojacUpdatea = 0;
    db.godina.findOne({where:{id: god}}).then(function (g) {
        if(g){
            db.student.findAll().then(function(ss){
                if (ss.length != 0){
                    for(var i = 0; i < stu.length; i++){

                        var ind = stu[i].index;
                        var im = stu[i].imePrezime;

                        var zapamtiUpdateovane = [];
                        for(var j = 0; j < ss.length; j++){
                            if(ss[j].index == stu[i].index){
                                brojac++;
                                zapamtiUpdateovane.push(j);
                                db.student.update({studentGod: god},{where: {index: ss[j].index}});
                                m++;
                            }
                        }

                        if(brojac == 0){
                            db.student.create({imePrezime:im, index: ind, studentGod: god});
                            n++; m++;
                        }
                        brojac = 0;
                    }
                }
                else if(ss.length==0) { 
                    for(var i = 0; i < stu.length; i++){
                        var ind = stu[i].index;
                        var im = stu[i].imePrezime;

                        db.student.create({imePrezime:im, index: ind, studentGod: god});
                        m++; n++;
                    }
                }            
                var dh = 0;
                for(var p=0; p<ss.length; p++){
                    if(zapamtiUpdateovane[dh]!=p && ss[p].studentGod == god) {m++; console.log(dh);}
                    else dh++;
                }
                    var alert1 = {poruka:"Dodano je "+ n +" novih studenata i upisano "+ m +" na godinu "+ g.nazivGod};
                    res.json(alert1);

            });
        }
    });

});



   
app.listen(8080)