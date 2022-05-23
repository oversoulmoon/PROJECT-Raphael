var referencesList = ["Compare all Microsoft 365 Plans (formerly Office 365) - Microsoft store. Compare All Microsoft 365 Plans (Formerly Office 365) - Microsoft Store. (n.d.). Retrieved September 17, 2021, from https://www.microsoft.com/EN-US/microsoft-365/buy/compare-all-microsoft-365-produ cts?icid=MSCOM_QL_M365."];
var isMenuClosed = true;
var nextRow = true;
var files = [];

function draw(){
    document.getElementById("littleGame").getContext("2d").fillRect(50,50,50,50);
}

document.getElementById("upload").addEventListener("click", evt=>{
    document.getElementById("fileU").click();
});

document.getElementById("fileU").addEventListener("change", evt=>{
    var invalidFiles = 0; 
    var fileIcon = document.createElement("img");
    Array.from(evt.target.files).forEach(file=>{
        var isInvalid = false; 
        switch(file.name.substring(file.name.lastIndexOf(".")+1)){
            case "txt":
                fileIcon.setAttribute('src','resources/generalFile.png');
                break;
            case "html":
                fileIcon.setAttribute('src','resources/html.png');
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
            draw();
        }
        document.getElementById("menu").style.transform += "translateX(150px)";
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
    var table = document.getElementById("referencesData");
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var para = document.createElement("p");
    para.innerText = referencesList[0];
    cell.appendChild(para);
    row.appendChild(cell);
    table.appendChild(row);
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