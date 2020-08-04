var Validacija=(function(){
     
    
    var konstruktor=function(divElementPoruke){ 
        var validni = [1,1,1,1,1,1,1];
        var polja = ["ime","godina","naziv","index","naziv","password","url"];

    return{ 
    ime:function(inputElement){

        var regex = /^('?[A-Z]'?([a-z]'?)+(\s|-)){0,3}('?[A-Z]'?([a-z]'?)+)$/;

        var s = inputElement.value;
   

        if(s.match(regex)){
            validni[0]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[0]=0;
        }

        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
                
                divElementPoruke.innerHTML+=polja[i]; 
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
                
            }
            
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }
    
    },
    godina:function(inputElement){
        console.log("uđe");
        var s=inputElement.value;
        var regex = /20\d{2}\/20\d{2}/;
        if(s.match(regex) && (parseInt(s.substring(0,4)) + 1 == parseInt(s.substring(5, 9))))
        {
            validni[1]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[1]=0;
        }


        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
                
                divElementPoruke.innerHTML+="godina"; 
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
                
            }
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }

        return validni[1];
    },
    repozitorij:function(inputElement,regex){

        var s=inputElement.value;

        if(s.match(regex))
        {
            validni[2]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[2]=0;
        }


        
        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
               
                divElementPoruke.innerHTML+=polja[i];
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
            }
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }

        return validni[2];
    },
    index:function(inputElement){

        var regex = /((1[4-9])|(20))\d{3}/;

        var s=inputElement.value;

        if(s.match(regex) && s.length==5)
        {
            validni[3]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[3]=0;
        }


        
        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
                
                divElementPoruke.innerHTML+=polja[i];
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
            }
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }

    },
    naziv:function(inputElement){
        regex = /(^([A-Z]|[a-z]))([\da-zA-Z\-\/\\"'!?:;,])+([a-z]|\d)$/;
        var s=inputElement.value;

        if(s.match(regex))
        {
            validni[4]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[4]=0;
        }

        
        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
                
                divElementPoruke.innerHTML+=polja[i]; 
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
            }
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }

        return validni[4]

    },
    password:function(inputElement){
        var regex1 = /(^([0-9]+[A-Z]+|[A-Z]+[0-9]+)[A-Z0-9]*)/;
        var regex2 = /(^([0-9]+[a-z]+|[a-z]+[0-9]+)[a-z0-9]*)/;
        var regex3 = /(^([a-z]+[A-Z]+|[A-Z]+[a-z]+)[A-Za-z]*)/;
        var regex4 = /(^([0-9]+[A-Z]+[a-z]+|[A-Z]+[0-9]+[a-z]+)[A-Z0-9a-z]*)/;

        var s=inputElement.value;

        if((s.match(regex1) || s.match(regex2) || s.match(regex3) || s.match(regex4)) && s.length>=8)
        {
            validni[5]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[5]=0;
        }

        
        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
                
                divElementPoruke.innerHTML+=polja[i]; 
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
            }
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }
    },
    url:function(inputElement){
       
    
        var s=inputElement.value;
        var regex = /(^((http|https|ftp|ssh):\/\/))([0-9a-z]{1,}(\b[0-9\-a-z]{0,}\b)[0-9a-z]{0,})((\.[0-9a-z]{1,}(\b[0-9\-a-z]{0,}\b)[0-9a-z]{0,}){0,})(((\/)[0-9a-z]{1,}(\b[0-9a-z\-]{0,}\b)[0-9a-z]{0,}(\/?)){0,})(\?[0-9a-z]{1,}(\b[0-9\-a-z]{0,}\b)[0-9a-z]{0,}=[0-9a-z]{1,}(\b[0-9\-a-z]{0,}\b)[0-9a-z]{0,}(&[0-9a-z]{1,}(\b[0-9\-a-z]{0,}\b)[0-9a-z]{0,}=[0-9a-z]{1,}(\b[0-9\-a-z]{0,}\b)[0-9a-z]{0,}){1,})$/;
        if(s.match(regex))
        {
            validni[6]=1;
            inputElement.style.backgroundColor = "white";
        }
        else{
            inputElement.style.backgroundColor = "orangered";
            validni[6]=0;
        }

        
        var broji=0,b=0;
        for(var i=0;i<7;i++){
            if(validni[i]==0) broji++;
        }

        if(broji!=0){

        divElementPoruke.innerHTML="Sljedeća polja nisu validna: "; 

        for(var i=0;i<7;i++){
            if(validni[i]==0){
                
                divElementPoruke.innerHTML+=polja[i]; 
                if(b!=broji-1) divElementPoruke.innerHTML+=", ";
                b++;
            }
        }

        divElementPoruke.innerHTML+="!";
        }
        else{
            divElementPoruke.innerHTML='';
        }
       
    }
    }
    }
    return konstruktor;
}());