const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

let transactions = [];

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

    transactionForm.reset();

});

function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {

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