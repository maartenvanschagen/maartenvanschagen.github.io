var command = "";
var websitePath = "website"

//
//     Display 
//

document.addEventListener("keypress", event => {
    event.preventDefault();
    addToTerm(String.fromCharCode(event.keyCode), true);
});

document.addEventListener("keydown", event => { //for keys keypress can't detect
    switch(event.which){
        case 13: //enter
            event.preventDefault();
            addToTerm('\n');
            execute(command);
            addToTerm("\n~ $ ");
            command = "";
            break;
        case 8: //backspace
            event.preventDefault();
            if(command.length > 0){
                addToTerm(""); //set cursor state to typing
                document.getElementById("terminal").innerHTML = document.getElementById("terminal").innerHTML.slice(0, -2) + "_";
                command = command.slice(0, -1);
            }
            break;
    }
});

function addToTerm(c, userInput= false){
    if(userInput) command += c.replace("\r", "");
    if(!cursor){
        toggleCursor();
    }
    resetCursorTimer();
    document.getElementById("terminal").innerHTML = document.getElementById("terminal").innerHTML.slice(0, -1) + c + "_"; 
    document.getElementById("bottom").scrollIntoView();
}

//
//      Cursor
//

var cursor = false;

var cursorTimer = setInterval(toggleCursor, 600);

function resetCursorTimer(){
    window.clearTimeout(cursorTimer);
    cursorTimer = setInterval(toggleCursor, 600);
}

function toggleCursor(){
    cursor = !cursor;
    if(cursor){
        document.getElementById("terminal").innerHTML += "_";
    }else{
        document.getElementById("terminal").innerHTML = document.getElementById("terminal").innerHTML.slice(0, -1);
    }
}

function clearScreen(){
    document.getElementById("terminal").innerHTML = "";
    cursor = false;
}

//
//      Command execute
//

function execute(command){
    command = command.toLowerCase(); //Make terminal more user friendly
    command = command.split(" ");
    switch(command[0]){
        case "cat":
            cat(command);
            break;
        case "ls":
            ls(command);
            break;
        case "clear":
            clear(command);
            break;
        case "viewer":
            viewer(command);
            break;
        case "help":
            help(command);
            break;
        case "home":
            home(command);
            break;
        default:
            addToTerm("besh: command not found, type 'help' when in doubt.");
            break;
    }
}

function cat(args, clear = true){
    var result = null;
    try{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./" + websitePath + "/" + args[1], false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
            result = xmlhttp.responseText;
        }
        if(result !== null){
            if(clear) clearScreen();
            addToTerm(result);
        }else{
            addToTerm("cat: please specify the page you want to view.\n    Example: 'cat contact'");
        }
    }catch{
        addToTerm("cat: Page does not exist.");
    }
}

function ls(args){
    args[1] = 'ls'
    cat(args, false);
}

function clear(args){
    clearScreen();
}

function viewer(args){
    window.location.href = "standard/index.html";
}

function help(args){
    args[1] = 'help';
    cat(args, false);
}

function home(args){
    args[1] = 'home';
    cat(args, true);
}
