const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const clearDataBtn = document.getElementById("clearData");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const searchInput = document.getElementById("search");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        title: titleInput.value,
        amount: Number(amountInput.value),
        type: typeInput.value,
        category: categoryInput.value,
        date: dateInput.value
    };

    transactions.push(transaction);

    saveTransactions();

    displayTransactions();
    
    updateSummary();

    transactionForm.reset();

});

clearDataBtn.addEventListener("click", function () {

    localStorage.removeItem("transactions");

    transactions = [];

    displayTransactions();

    updateSummary();

});

searchInput.addEventListener("input", function () {

    displayTransactions();

});

function displayTransactions() {

    transactionList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filteredTransactions = transactions.filter(function (transaction) {
        return transaction.title.toLowerCase().includes(searchText);
    });

    filteredTransactions.forEach(function (transaction) {

        const div = document.createElement("div");

        div.className = "transaction";

        div.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.title}</strong>
                <small>${transaction.category} | ${transaction.date}</small>
            </div>

            <div class="${transaction.type === "Income" ? "income" : "expense"}">
                ${transaction.type === "Income" ? "+" : "-"}₹${transaction.amount}
            </div>
        `;

        transactionList.appendChild(div);

    });

}

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "Income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expense").textContent = `₹${expense}`;
    document.getElementById("balance").textContent = `₹${income - expense}`;

}

displayTransactions();
updateSummary()