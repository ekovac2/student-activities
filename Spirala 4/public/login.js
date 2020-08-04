function myFunction(){
    var mojDiv = document.getElementById("ispis");
    var inputIme = document.getElementById("username");
    var pass = document.getElementById("password");
    var validacija = new Validacija(mojDiv);
    validacija.ime(inputIme);
    validacija.password(pass);
}