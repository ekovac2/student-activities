function myFunction(){
    var mojDiv = document.getElementById("ispis");
    var inputGod = document.getElementById("nazivv");
    var inputVjezba = document.getElementById("rvjezbe");
    var inputSpirala = document.getElementById("rspiral");
    var validacija = new Validacija(mojDiv);
    v1 = validacija.godina(inputGod);
    v2 = validacija.naziv(inputVjezba);
    v3 = validacija.repozitorij(inputSpirala,/(^([A-Z]|[a-z]))([\da-zA-Z\-\/\\"'!?:;,])+([a-z]|\d)$/);

    return (v1 != 0 && v2!=0 && v3!=0);
}