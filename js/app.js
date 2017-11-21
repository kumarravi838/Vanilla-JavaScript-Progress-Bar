
var responseData;
var selectedValue;
function progressBarSelection() {
    selectedValue = myDropdownItem.options[myDropdownItem.selectedIndex].value;
}
function load() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://pb-api.herokuapp.com/bars", true);
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            responseData = JSON.parse(e.currentTarget.response);
            console.log(responseData);
            responseData.buttons.forEach(addButtons);
            responseData.bars.forEach(addProgressBar);
        }
    }
    myButtons = document.getElementById("my_buttons");
    myProgressBar = document.getElementById("my_progress");
    myDropdownItem = document.getElementsByClassName("btnClick")[0];
    function addButtons(item, index) {
        myButtons.innerHTML = myButtons.innerHTML + "<button class='btnClick' onclick='editProgressBar(selectedValue,\"" + item + "\")'>" + item + "</button>";
    }

    function addProgressBar(item, index) {
        index = index + 1;
        myProgressBar.innerHTML = myProgressBar.innerHTML + "<br><div class='my_progress'><div class='progress-txt'>" + item + "%</div><div class='myBar' id='Progress" + index + "' style='width:" + item + "%'></div></div>";
        myDropdownItem.innerHTML = myDropdownItem.innerHTML + "<option>Progress" + index + "</option>";
    }
}
function editProgressBar(progressBarType, buttonId) {
    if (progressBarType != undefined) {
        var str = document.getElementById(progressBarType);
        if (Number(buttonId) < 0 && Number(str.style.width.replace("%", "")) <= Number(buttonId) * -1) {
            document.getElementById(progressBarType).style.width = "0%";
            str.previousSibling.innerHTML = "0%";
        } else {
            document.getElementById(progressBarType).style.width = Number(str.style.width.replace("%", "")) + Number(buttonId) + "%";
            str.previousSibling.innerHTML = Number(str.previousSibling.innerHTML.replace("%", "")) + Number(buttonId) + "%";
            // str.className += " red-progress";
        }
        if (Number(str.style.width.replace("%", "")) > 100) {
            str.className += " red-progress";
        }
        else {
            str.classList.remove("red-progress");
        }
    }
    else{
        alert("Please select one progress bar.");
    }
}


