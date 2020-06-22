// console.log("This is console")


// GLOBAL VARIABLES

var dataArray = [];
tableBody = document.getElementById('tableBody');
var selectedIndex = -1;
var totalArray = {};



// VALIDATION FUNCTION 
function validate(Cost, Quantity) {
    if (Cost > 0 && Quantity > 0) {
        return true
    }
    else {
        return false
    }

}


//FUNCTION TO UPDATE AND SHOW THE ENTRY
function showCards() {
    tableBody.innerHTML = ""
    if (localStorage.dataRecord) {
        dataArray = JSON.parse(localStorage.dataRecord)
        console.log("showing")

        for (var i = 0; i < dataArray.length; i++) {
            var Purpose = dataArray[i].Purpose
            var Date = dataArray[i].Date
            var Cost = dataArray[i].Cost
            var Quantity = dataArray[i].Quantity
            var total = dataArray[i].total


            addCards(Purpose, Date, Cost, Quantity, total, i)

            // console.log(dataArray, i)
        }
        // console.log(expense);

    }

}


//AFTER SUBMITING THE FORM
let expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener("submit", expenseFormSubmit);

function expenseFormSubmit(e) {
    console.log("form submitted");
    let Purpose = document.getElementById('Purpose').value;
    let Date = document.getElementById('Date').value;
    let Cost = document.getElementById('Cost').value;
    let Quantity = document.getElementById('Quantity').value;

    let total = (Cost * Quantity);


    if (validate(Cost, Quantity)) {

        var dataObj = { Purpose: Purpose, Date: Date, Cost: Cost, Quantity: Quantity, total: total };


        if (selectedIndex == -1) {
            dataArray.push(dataObj);
        }//if edit function is not called
        else {
            dataArray.splice(selectedIndex, 1, dataObj)
        }
        // console.log(dataArray)
        localStorage.dataRecord = JSON.stringify(dataArray);
        showCards();

        //clear form
        document.getElementById('Purpose').value = "";
        document.getElementById('Date').value = "";
        document.getElementById('Cost').value = "";
        document.getElementById('Quantity').value = "";
    }
    else {
        alert("invalid Cost or Qunatity")
    }
    e.preventDefault();

}


//ADD THE ENTRY TO INNER HTML
function addCards(Purpose, Date, Cost, Quantity, total, i) {
    console.log("Added")
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <th scope="row">${Date}</th>
                        <td>${Purpose}</td>
                        <td>&#x20B9 ${Cost} </td>
                        <td>${Quantity}</td>
                        <td>&#x20B9 ${total} </td>
                        <td><button  type="button" onclick="editEntry(${i})"class="btn btn-outline-warning btn-sm">Edit</button></td>
                        <td><button onclick="deleteEntry(${i})" type="button" class="btn btn-outline-danger
                         btn-sm">
                        Delete</button></td>
                    </tr>`;
    tableBody.innerHTML += uiString;



}


// Function to delete a entry
function deleteEntry(i) {

    // console.log("delting", i)
    dataArray = JSON.parse(localStorage.dataRecord)
    dataArray.splice(i, 1);
    localStorage.setItem("dataRecord", JSON.stringify(dataArray));
    showCards();
}

//Edit entry

function editEntry(i) {
    alert('scroll to add expenses')
    selectedIndex = i;
    console.log("edit", i)
    dataObj = dataArray[i]
    document.getElementById('Purpose').value = dataObj.Purpose;
    document.getElementById('Date').value = dataObj.Date;
    document.getElementById('Cost').value = dataObj.Cost;
    document.getElementById('Quantity').value = dataObj.Quantity;

}



// when check btn will be called

var checkBtn = document.getElementsByClassName('budget-btn')
checkBtn[0].addEventListener("click", addBars)
console.log("called")

function addBars() {
    var expense = 0;
    if (localStorage.dataRecord) {
        dataArray = JSON.parse(localStorage.dataRecord)
        for (var i = 0; i < dataArray.length; i++) {
            totalArray[i] = dataArray[i].total;
        }

        console.log(totalArray)
    }
    for (var i in totalArray) {
        expense += totalArray[i];
    }


    console.log("addBars called")
    budget = document.getElementById('budget').value;

    var savings = budget - expense;
    if (savings < 0) {
        savings = 0;
    }
    else {
        savings = savings;
    }

    //calucating saving and expense %
    expPer = (expense * 100) / budget
    savPer = (savings * 100) / budget
    expPer =expPer.toFixed(2);
    savPer = savPer.toFixed(2);

    console.log("budget", budget)
    console.log("saving", savings)
    console.log("expenses", expense)
    console.log(savPer, expPer)


    addPercent(savings, expense, expPer, savPer);

}


function addPercent(savings, expense, expPer, savPer) {

    sa.innerHTML = "<h6>" + "Savings:" + savings + "</h6>";
    ex.innerHTML = "<h6>" + "Expense:" + expense + "</h6>";
    expBar.innerHTML = "<h6>" + "Saving%:" + savPer + "</h6>";
    savBar.innerHTML = "<h6>" + "Expense%:" + expPer + "</h6>";
};

var sa = document.getElementById("savData");
var ex = document.getElementById("expData");



var expBar = document.getElementById("exp-number");
var savBar = document.getElementById("sav-number");


sa.addEventListener('click', function () {
    addPercent(sa);
});
ex.addEventListener('click', function () {
    addPercent(ex);
});


expBar.addEventListener('click', function () {
    addPercent(expBar);
});
savBar.addEventListener('click', function () {
    addPercent(savBar);
});

