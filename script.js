var referencesList = ["Compare all Microsoft 365 Plans (formerly Office 365) - Microsoft store. Compare All Microsoft 365 Plans (Formerly Office 365) - Microsoft Store. (n.d.). Retrieved September 17, 2021, from https://www.microsoft.com/EN-US/microsoft-365/buy/compare-all-microsoft-365-produ cts?icid=MSCOM_QL_M365."];
var isMenuClosed = true;
var nextRow = true;
var files = [];

document.getElementById("upload").addEventListener("click", evt=>{
    document.getElementById("fileU").click();
});

document.getElementById("fileU").addEventListener("change", evt=>{
    var invalidFiles = 0; 
    Array.from(evt.target.files).forEach(file=>{
        files.push(file);
        var table = document.getElementById("fileList");
        if(nextRow){
            table.appendChild(document.createElement("tr"));
            nextRow = false;
        }else{
            nextRow = true;
        }
        var tRows = table.rows;
        var fileIcon = document.createElement("img");
        fileIcon.setAttribute('class', 'fileImage');
        switch(file.name.substring(file.name.lastIndexOf(".")+1)){
            case "txt":
                fileIcon.setAttribute('src','resources/generalFile.png');
                break;
            case "html":
                fileIcon.setAttribute('src','resources/generalFile.png');
                break;
            case "docs":
                fileIcon.setAttribute('src','resources/generalFile.png');
                break;
            case "odf":
                fileIcon.setAttribute('src','resources/generalFile.png');
                break;
            default:
                invalidFiles++;
                break;
        }
        var fileSize = document.createElement("i");
        if(file.size >= 1048678){
            fileSize.innerText = (file.size/1048576) + " MBytes";
        }else if(file.size >= 1024){
            fileSize.innerText = (file.size/1048576) + " KBytes";
        }else{
            fileSize.innerText = (file.size) + " Bytes";

        }
        var fileName = document.createElement("b");
        fileName.innerText = file.name;
        var cell = document.createElement("td");
        cell.setAttribute('class', 'file')
        cell.append(fileIcon, fileName, document.createElement("br"),fileSize);
        tRows[tRows.length - 1].appendChild(cell);
        //var tableCell = `<td class='file'><img class='fileImage' src='${fileIcon}'/><b>${fileName}</b><br/><i>${fileSize}</i></td>`;
        //var fileRows = document.getElementById("fileList").rows;
        //fileRows[fileRows.size-1].innerHTML += tableCell;
    })
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