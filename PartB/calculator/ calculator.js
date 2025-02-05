let calculator = document.getElementById('calculator');

function handleSubmit(event) {
    event.preventDefault();
    
    let mortgage = document.getElementById('mortgage').value.trim();
    let interest = document.getElementById('interest').value.trim();
    let years = document.getElementById('years').value.trim();
    let postalCode = document.getElementById('postalCode').value.trim();
    let postalCodeLength = postalCode.length;

    let errors = [];
    let was_errors = false;

    let output = document.getElementById('output');

    // Check if any fields is empty
    let arrayForm = 
    [
        {
            text: "Mortgage",
            input: mortgage,
        },
        {
            text: "Interest",
            input: interest,
        },
        {
            text: "Loan Length",
            input: years,
        },
        {
            text: "Postal Code",
            input: postalCode,
        }
    ]
    for (let i = 0; i < arrayForm.length; i++) {
        if (arrayForm[i].input === "") {
            errors.push(`${arrayForm[i].text} field is empty!`);
            was_errors = true;
        }
    }

    // Check if numbers are over 0 for mortgage, interest and years
    let numberForm =         
    [
        {
            text: "Mortgage",
            input: mortgage,
        },
        {
            text: "Interest",
            input: interest,
        },
        {
            text: "Loan Length",
            input: years,
        }
    ]
    for (let i = 0; i < numberForm.length; i++) {
        if (numberForm[i].input < 0 || isNaN(numberForm[i].input)) {
            errors.push(`${numberForm[i].text} must be a positive number!`);
            was_errors = true;
            // numberForm[i].input.classList.add('success');
            // numberForm[i].input.classList.remove('error');
        }
    }

    // Check if numbers are between 5-30 for loan years
    if (years < 5 || years > 30) {
        errors.push(`${numberForm[2].text} must be between 5-30 years!`);
        was_errors = true;
    }

    // Check if postal code is 7 characters long and starts with L
    if (postalCodeLength < 7) {
        errors.push("Postal Code must be 7 characters long!");
        was_errors = true;
    }
    if (Array.from(postalCode)[0] !== "L") {
        errors.push("Must be located in Hamilton!");
        was_errors = true;
    }

    // Check if there are any errors and then append to list of errors if there are any
    if (was_errors)
    {
        let error_list = "<ul>";

        for (let i = 0; i < errors.length; i++)
        {
        error_list += "<li>" + errors[i] + "</li>";
        }

        error_list += "</ul>";

        output.classList.add('alert')
        output.classList.add('alert-danger')
        output.innerHTML = error_list;
    }
    else
    {
        // let monthlyPayment = calculator.calculateMonthlyPayment(mortgage, interest, years);
        // output.innerHTML = `Your monthly payment is $${monthlyPayment.toFixed(2)}`;
        output.innerHTML = "Success!"
        output.classList.remove('alert-danger');
        output.classList.add('alert');
        output.classList.add('alert-success');
    }
}

// Reset the form
function handleReset(event) {
    calculator.reset();
    let output = document.getElementById('output');
    output.innerHTML = "";
    output.classList.remove('alert');
    output.classList.remove('alert-danger');

    // for (let i = 0; i < numberForm.length; i++) {
    //     numberForm[i].input.classList.remove('success');
    //     numberForm[i].input.classList.remove('error');
    // }
}

calculator.addEventListener('submit', handleSubmit);
calculator.addEventListener('reset', handleReset);