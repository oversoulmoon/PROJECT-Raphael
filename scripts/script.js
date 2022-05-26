var referencesList = [    
    "10.000+ ilustrasi fantasy &amp; fantasi gratis - pixabay.com. (n.d.). Retrieved May 26, 2022, from https://pixabay.com/id/illustrations/search/fantasy/ ",
    "Arrow Black Silhouette - free vector graphic on Pixabay. (n.d.). Retrieved May 26, 2022, from https://pixabay.com/vectors/arrow-black-silhouette-directions-39526/ ",
    "Bubble soap bullet - free vector graphic on Pixabay. (n.d.). Retrieved May 26, 2022, from https://pixabay.com/vectors/bubble-soap-bubble-bullet-round-1841301/ ",
    "Category:question marks. Wikimedia Commons. (n.d.). Retrieved May 25, 2022, from https://commons.wikimedia.org/wiki/Category:Question_marks ",
    "Download free email icons. Reshot. (n.d.). Retrieved May 25, 2022, from https://www.reshot.com/free-svg-icons/email/ ",
    "File:font awesome 5 solid at.svg. Wikimedia Commons. (n.d.). Retrieved May 25, 2022, from https://commons.wikimedia.org/wiki/File:Font_Awesome_5_solid_at.svg ",
    "Free image on Pixabay - document, Doc, Blue Doc, icon. (n.d.). Retrieved May 26, 2022, from https://pixabay.com/illustrations/document-doc-blue-doc-icon-buttons-626142/ ",
    "Icon file extension - free vector graphic on Pixabay. (n.d.). Retrieved May 26, 2022, from https://pixabay.com/vectors/icon-file-extension-document-2488093/ ",
    "Tiffany, &amp; Tiffany. (n.d.). Free svgs. Free SVGs. Retrieved May 25, 2022, from https://freesvgs.com/ ",
    "Commons:upload. Wikimedia Commons. (n.d.). Retrieved January 14, 2022, from https://commons.wikimedia.org/wiki/Commons:Upload",
    "Doc icon - download in Colored outline style. Iconscout. (n.d.). Retrieved September 17, 2021, from https://iconscout.com/icon/doc-67."];
var isMenuClosed = true;
var nextRow = true;
var files = [];

class Game{
    canvas;
    width;
    height;
    ctx;
    background;
    bubbles;
    score;
    prompt;
    pText;
    pInput;
    windowAnimationStart;
    firstRound;
    constructor(canvas, prompt){
        this.prompt = prompt;
        this.pText = this.prompt.getElementsByTagName("span")[0];
        this.pInput = this.prompt.getElementsByTagName("input")[0];
        this.score = 0;
        this.prompt.style.position = "absolute";
        this.prompt.style.top = (canvas.getBoundingClientRect()).top;
        this.prompt.style.height = canvas.offsetHeight + "px";
        this.pText.innerText = "Would you like to play a game?";
        this.pInput.value = "Start";
        this.firstRound = true;
        this.pInput.addEventListener("click", (evt)=>{
            this.startGame();
        })

        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.background = new Image();
        this.background.src = "resources/gameBackground.jpg";
        this.bubbles = [new Bubble(this.canvas), new Bubble(this.canvas), new Bubble(this.canvas)];
        this.canvas.addEventListener("click", (evt)=>{
            var mouseX = (evt.clientX - (evt.target.getBoundingClientRect()).left) * (this.width/(evt.target.getBoundingClientRect()).width);
            var mouseY = (evt.clientY - (evt.target.getBoundingClientRect()).top )* (this.height/(evt.target.getBoundingClientRect()).height);
            this.bubbles.forEach((bubble)=>{
                var radi = bubble.size;
                var xMid = bubble.x+ radi;
                var yMid = bubble.y+ radi;
                if(mouseX <= (xMid + radi) && mouseX >= (xMid - radi) && mouseY <= (yMid + radi) && mouseY >= (yMid-radi)){
                    bubble.pop();
                    this.score++;
                }
            });
        });
    }
    draw(){
        this.ctx.clearRect(0,0,this.width, this.height);
        this.background.onload = (evt)=>{
            this.ctx.drawImage(this.background,0,0,this.width,this.height);
        }
        this.ctx.drawImage(this.background,0,0,this.width,this.height);

        this.bubbles.forEach((bubble)=>{
            bubble.draw();
        })
        if(window.innerWidth >= 320 && window.innerWidth <= 640){
            this.ctx.font = "4vw Arial";
            this.ctx.fillText("Score: " + this.score,0,20);
        }else if(window.innerWidth >=641){
            this.ctx.font = "1vw Arial";
            this.ctx.fillText("Score: " + this.score,10,30);
        }
        this.ctx.fillStyle = "#FFFFFF";
        this.windowAnimationStart = window.requestAnimationFrame(()=>this.draw());
    }
    end(){
        this.prompt.style.position = "absolute";
        this.prompt.style.top = (this.canvas.getBoundingClientRect()).top;
        this.prompt.style.height = this.canvas.offsetHeight + "px";
        this.ctx.clearRect(0,0,this.width, this.height);
        window.cancelAnimationFrame(this.windowAnimationStart);
        this.prompt.style.display = "block";
        this.pText.innerText = `Score: ${this.score} | Play Again?`
        this.pInput.value = "Yes";
        this.score =0;

    }
    startGame(){
        if(this.firstRound){
            this.pInput.style.display = "none";
            this.pText.innerText = "Pop as many bubbles as possible in 30 seconds";
            this.firstRound = false;
            setTimeout(()=>{
                this.pText.style.display="block";
                this.pInput.style.display ="block"
                this.prompt.style.display = "none";
                this.draw();
                setTimeout(()=>{
                    this.end();
                },30000)
            },3000);
        }else{
            this.prompt.style.display = "none";
            this.draw();
            setTimeout(() => {
                this.end();
            }, 30000);
        }
    }
}
class Bubble{
    x;
    y;
    vy;
    vx;
    image;
    canvas;
    width;
    height;
    ctx; 
    size;
    constructor(canvas){
        this.canvas = canvas; 
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src="resources/bubble.png";
        this.vx = 0;
        this.vy = (- Math.random());
        this.size = this.width * 0.09;
        this.randomizeSpawn();
        this.y = this.height;
    }
    draw(){
        if(this.y <= 0-this.size){
            this.y = this.height;
            this.randomizeSpawn();
        }
        this.image.onload = (evt)=>{
            this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.size,this.size);
        this.x += this.vx;
        this.y += this.vy;

    }
    randomizeSpawn(){
        this.x = (Math.random()*(this.width-4*this.size)) + 2*this.size;
        this.vy = (- Math.random());
        
    }
    pop(){
        this.y = this.height;
        this.randomizeSpawn();
        this.draw();
    }
}
document.getElementById("upload").addEventListener("click", evt=>{
    document.getElementById("fileU").click();
});
(Array.from(document.getElementById("dashboard").children)).forEach(panel=>{
    panel.addEventListener("click",(evt)=>{
        Array.from(document.getElementsByClassName("tab")).forEach(container =>{
            container.style.display = "none";
        });
        var name = evt.target.id.substring(0,evt.target.id.length-1);
        if(name=="convert"){
            document.getElementById(name).style.display = "grid";
        }else{
            document.getElementById(name).style.display = "block";
        }
        if(name=="about"){
            new Game(document.getElementById("littleGame"), document.getElementById("prompt"));
        }
    });
});
document.getElementById("fileU").addEventListener("change", evt=>{
    var invalidFiles = 0; 
    Array.from(evt.target.files).forEach(file=>{
        var fileIcon = document.createElement("img");
        var isInvalid = false; 
        switch(file.name.substring(file.name.lastIndexOf(".")+1)){
            case "txt":
                fileIcon.setAttribute('src','resources/generalFile.png');
                break;
            case "html":
                fileIcon.setAttribute('src','resources/html.png');
                console.log("this ran");
                break;
            case "css":
                fileIcon.setAttribute('src','resources/css.png');
                break;
            case "js":
                fileIcon.setAttribute('src','resources/js.png');
                break;
            default:
                invalidFiles++;
                isInvalid = true; 
                break;
        }
        if(!isInvalid){
            files.push(file);
            var table = document.getElementById("fileList");
            if(nextRow){
                table.appendChild(document.createElement("tr"));
                nextRow = false;
            }else{
                nextRow = true;
            }
            var tRows = table.rows;
            fileIcon.setAttribute('class', 'fileImage');
            var fileSize = document.createElement("i");
            if(file.size >= 1048678){
                var size = "" + (file.size/1048576);
                size.substring(0,size.lastIndexOf('.')+2);
                fileSize.innerText = size.substring(0,size.lastIndexOf('.')+2) + " MBytes";
            }else if(file.size >= 1024){
                var size = "" + (file.size/1024);
                size.substring(0,size.lastIndexOf('.')+2);
                fileSize.innerText = size.substring(0,size.lastIndexOf('.')+2) + " KBytes";
            }else{
                fileSize.innerText = (file.size) + " Bytes";
            }
            var fileName = document.createElement("b");
            fileName.innerText = file.name;
            var cell = document.createElement("td");
            cell.setAttribute('class', 'file')
            cell.append(fileIcon, fileName, document.createElement("br"),fileSize);
            tRows[tRows.length - 1].appendChild(cell);
        }
    });
    if(invalidFiles > 0){
        window.alert(`Removed ${invalidFiles} invalid files from selection`);
    }
});
document.getElementById("convertB").addEventListener("click", evt =>{
    files.forEach(file =>{
        var name = file.name.substring(0,file.name.lastIndexOf("."));
        var down = document.createElement("a");
        var reader = new FileReader();
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body><pre>";
        var postHtml = "</pre></body></html>";
    
        down.setAttribute("download", `${name}.doc`);
        down.style.display = "none";
        down.id = "download" + file.name;
        reader.readAsText(file);
        reader.onload = () =>{
            var content = reader.result;
            var html = preHtml + content + postHtml;
            down.href = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
            document.getElementsByTagName("body")[0].appendChild(down);
            document.getElementById("download" + file.name).click();
            document.getElementsByTagName("body")[0].removeChild(down);
        }
    });
});
Array.from(document.getElementById("menu").children).forEach(element => {
    element.addEventListener("click", evt =>{ 
        Array.from(document.getElementsByClassName("tab")).forEach(container =>{
            container.style.display = "none";
        });
        var name = evt.target.innerText.toLowerCase();
        if(name=="convert"){
            document.getElementById(evt.target.innerText.toLowerCase()).style.display = "grid";
        }else{
            document.getElementById(evt.target.innerText.toLowerCase()).style.display = "block";
        }
        if(name=="about"){
            new Game(document.getElementById("littleGame"), document.getElementById("prompt"));
        }
        if(window.innerWidth<640){
            document.getElementById("menu").style.transform += "translateX(150px)";
        }
        isMenuClosed = true;
        document.removeEventListener("click", exitListiner);
    })
});

document.getElementById("title").addEventListener("click", evt=>{
    if(isMenuClosed){
        Array.from(document.getElementsByClassName("tab")).forEach(container =>{
            container.style.display = "none";
        });
        document.getElementById("dashboard").style.display = "grid";
    }
});

window.onload = function(){
    referencesList.forEach(citations=>{
        var table = document.getElementById("referencesData");
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var para = document.createElement("p");
        para.innerText = citations;
        cell.appendChild(para);
        row.appendChild(cell);
        table.appendChild(row);
    })
};
document.getElementById("navicon").addEventListener("click", function(e){
    var navbar = document.getElementById("menu");
    navbar.style.display = "block";
    navbar.style.transform += "translateX(-150px)";
    isMenuClosed = false;
    document.addEventListener("click", exitListiner);
});
function exitListiner(evt, isChange = false){
    if(evt.target.tagName != "UL" && evt.target.id != "navicon" && evt.target.tagName != "LI"){
        document.getElementById("menu").style.transform += "translateX(150px)";
        isMenuClosed = true;
        document.removeEventListener("click", exitListiner);
    }
}
(document.querySelector("div#table main div#contact input[type='button']")).addEventListener("click", (evt)=>{
    var form = document.forms["contactForm"];
    var mail = "mailto:ttrungnguyenhp.2017@gmail.com"
                + "&subject=" + encodeURIComponent(form.elements["subject"])
                + "&body=" + encodeURIComponent(form.elements["cEmail"].value + " " + form.elements["content"]);
    window.location.href = mail;
})