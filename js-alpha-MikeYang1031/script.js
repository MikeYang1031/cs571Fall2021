// author: Zonglin Yang
// course: CS571 HW JS alpha
// credit: /

let hasLoadedFamilyPlanPaymentsData = false;

function showMessageForm() {
	let mes = document.getElementById('messageArea');
	mes.style.visibility = 'visible';
}

function sendMessage() {
	let send = document.getElementById("messageField").value;
    console.log(send);
}

function addPizzazz() {
	let piz = document.getElementsByName("flashSale")[0];
	piz.style.color = "red";
	piz.style.font = "italic bold 32px arial,serif";
	piz.style.fontVariant = "small-caps";}

function saveBalance() {
	let inputBal = document.getElementById("balanceInput").value.trim();

	if (isNaN(inputBal) || inputBal === ''){
		console.log("Cannot update balance, syntax error!");
	} 
	else{
	document.getElementById("balance").innerHTML = inputBal;
	}
}

function printBalance() {
	let bal = document.getElementById("balance").innerHTML;
	console.log("You have " + bal + " in your account!");}

function alertBalance() {
    let bal = document.getElementById("balance").innerHTML;

	if (bal < 0){ alert("We have a special offer for you! Reload your balance now and earn back 10% bonus rewards."); }
	else if (bal <= 100 && bal >= 0){ alert("Your current balance is {BALANCE_AMOUNT}. Customers with balance greater than 100 becomes a VIP member and gets a special discount!"); }
	else { alert("You are our VIP member! You get a 10% discount on every purchase."); }}

function loadFamilyPlanPaymentsData() {

	if (hasLoadedFamilyPlanPaymentsData) {
		return;
	} else {
		hasLoadedFamilyPlanPaymentsData = true;
	}
	let familyPlanPaymentsData = [
		{
			name: "haha",
			amountDue: -2.00
		},
		{
			name: "heihei",
			amountDue: 21.00
		},
		{
			name: "wawa",
			amountDue: 1.98
		},
		{
			name: "lala",
			amountDue: 141.21
		}
	];
    for (let i = 0;i < familyPlanPaymentsData.length;i++){
    	let name = familyPlanPaymentsData[i].name;
    	let amountDue = familyPlanPaymentsData[i].amountDue;

    	if (amountDue > 20){
    		let t = '<tr style="color:' + 'red' + ';">' + "<td>" + name + "</td>" + "<td>" + amountDue + "</td>" + "</tr>"
    		$("#familyPlanAmountDue").append(t);
    	}
    	else{
    		let t = "<tr>" + "<td>" + name + "</td>" + "<td>" + amountDue + "</td>" + "</tr>"
    		$("#familyPlanAmountDue").append(t);
    	}
    } 
}

function addOrderRows() {
	var url = "http://cs571.cs.wisc.edu:53706/api/badgershop/order"

    for (let i = 0;i<4;i++){
        fetch(url)
          .then(response => response.json())
          .then(data => {

        console.log(data);

        let date = data.date;
        let productName = data.productName;
        let amount = data.amount;

        // console.log(date);
        // console.log(productName);
        // console.log(amount);

        let tr = "<tr>" + "<td>" + date + "</td>" + "<td>" + productName + "</td>" + "<td>" + amount + "</td>" + "</tr>";
        $("#myOrders").append(tr);

        })
        .catch(error => console.error(error))
    }}

function clearOrderRows() {
	let table = document.getElementById("myOrders");
	let length = table.rows.length - 1;
	for(let i = 0;i < length;i++){
		table.deleteRow(1);
	}}
