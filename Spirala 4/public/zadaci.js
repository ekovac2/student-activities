function myFunction(){
    var mojDiv = document.getElementById("ispis");
    var inputIme = document.getElementById("studentcic");
    var validacija = new Validacija(mojDiv);
    validacija.ime(inputIme);

    return false;
}