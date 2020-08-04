function myFunction(){
    var mojDiv = document.getElementById("ispis");
    var inputIme = document.getElementById("zadacic");
    
    var validacija = new Validacija(mojDiv);
    v = validacija.naziv(inputIme)
    return (v != 0);

    
}