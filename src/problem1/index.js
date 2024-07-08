// sum_to_n.js

// Using a for loop
function sum_to_n_for(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Using recursion
function sum_to_n_recursion(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_recursion(n - 1);
}

// Using arithmetic progression formula
function sum_to_n_formula(n) {
    return n * (n + 1) / 2;
}

// Get the result and display it on the webpage
document.addEventListener('DOMContentLoaded', function() {
    const resultContainer = document.getElementById('resultContainer');
    const n = 5; // Example: Calculate sum_to_n(5)

    const result1 = sum_to_n_for(n);
    const result2 = sum_to_n_recursion(n);
    const result3 = sum_to_n_formula(n);

    // Display results in the container
    resultContainer.innerHTML = `
        <p>Using for loop: ${result1}</p>
        <p>Using recursion: ${result2}</p>
        <p>Using formula: ${result3}</p>
    `;
});
