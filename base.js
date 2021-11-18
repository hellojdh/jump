document.oncontextmenu=new Function('return false');

    let wheelSpinning = false;


    function windows_close(){
        var option= "left=9999, top=9999, width=10, height=10";
        window.open('about:blank', '_self',option).close();
    }


 function click(){
        if((event.button==2)||(event.button==3)){
        }
    }
    document.onmousedown=click


function sendInfo(){
    console.log("Logging!!!!");
}