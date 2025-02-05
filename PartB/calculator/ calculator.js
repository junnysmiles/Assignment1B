let calculator = document.getElementById('calculator');

// Calculate the mortgage
function calculateMortgage(mortgage, interest, years) {
    let monthlyInterest = interest / 100 / 12;
    let numberOfPayments = years * 12;
    let monthlyPayment = mortgage * monthlyInterest * (1 + monthlyInterest) ^ numberOfPayments / (1 + monthlyInterest) ^ numberOfPayments - 1;
    return monthlyPayment;
}

// Handle the form submission
function handleSubmit(event) {
    event.preventDefault();
    
    let mortgage = document.getElementById('mortgage')
    let interest = document.getElementById('interest')
    let years = document.getElementById('years')
    let postalCode = document.getElementById('postalCode')
    let postalCodeLength = postalCode.value.trim().length;

    let errors = [];
    let was_errors = false;

    let output = document.getElementById('output');

    // Check if any fields is empty - i tried to use this to loop through and make code shorter but for some reason wont work
    // let arrayForm = 
    // [
    //     {
    //         text: "Mortgage",
    //         input: mortgage.value.trim(),
    //     },
    //     {
    //         text: "Interest",
    //         input: interest.value.trim(),
    //     },
    //     {
    //         text: "Loan Length",
    //         input: years.value.trim(),
    //     },
    //     {
    //         text: "Postal Code",
    //         input: postalCode.value.trim(),
    //     }
    // ]

    // HERE IS WHERE I TRIED TO LOOP THROUGH THE FORM TO CHECK IF EMPTY - DIDNT WORK BECAUSE CLASSLIST DIDNT LIKE ARRAYS
    // for (let i = 0; i < arrayForm.length; i++) {
    //     if (arrayForm[i].input === "") {
    //         errors.push(`${arrayForm[i].text} field is empty!`);
    //         was_errors = true;
    //     }
    // }

    // Check if numbers are over 0 for mortgage, interest and years - i tried to use this to loop through and make code shorter but for some reason wont work
    let numberForm =         
    [
        {
            text: "Mortgage Amount",
            input: mortgage.value.trim(),
        },
        {
            text: "Percentage Rate",
            input: interest.value.trim(),
        },
        {
            text: "Loan Length",
            input: years.value.trim(),
        }
    ]

    // for (let i = 0; i < numberForm.length; i++) {
    //     if (numberForm[i].input < 0 || isNaN(numberForm[i].input)) {
    //         errors.push(`${numberForm[i].text} must be a positive number!`);
    //         was_errors = true;
    //     } else {
    //         mortgage.classList.remove('is-invalid');
    //         interest.classList.remove('is-invalid');
    //         years.classList.remove('is-invalid');
    //     }
    // }

    // Check for mortgage values
    if (mortgage.value.trim() < 0 || isNaN(mortgage.value.trim())) {
        mortgage.classList.add('is-invalid');
        errors.push("Mortgage Amount must be a number!");
        was_errors = true;
    } else if (mortgage.value.trim() === "") {
        mortgage.classList.add('is-invalid');
        errors.push("Mortgage Amount field is empty!");
        was_errors = true;
    }else {
        mortgage.classList.remove('is-invalid');
    }

    // Check for interest values
    if (interest.value.trim() < 0 || isNaN(interest.value.trim())) {
        interest.classList.add('is-invalid');
        errors.push("Percentage Rage must be a number!");
        was_errors = true;
    } else if (interest.value.trim() === "") {
        interest.classList.add('is-invalid');
        errors.push("Percentage Rate field is empty!");
        was_errors = true;
    } else {
        interest.classList.remove('is-invalid');
    }

    // Check for loan length values
    if (years.value.trim() < 0 || isNaN(years.value.trim())) {
        years.classList.add('is-invalid');
        errors.push("Loan Length must be a number!");
        was_errors = true;
    } else if (years.value.trim() === "") {
        years.classList.add('is-invalid');
        errors.push("Loan Length field is empty!");
        was_errors = true;
    } else if (years.value.trim() < 5 || years.value.trim() > 30) {
        years.classList.add('is-invalid');
        errors.push(`${numberForm[2].text} must be between 5-30 years!`);
        was_errors = true;
    } else {
        years.classList.remove('is-invalid');
    }

    // Check if postal code is 7 characters long and starts with L
    if (postalCodeLength < 7) {
        postalCode.classList.add('is-invalid');
        errors.push("Postal Code must be 7 characters long!");
        was_errors = true;
    }
    if (Array.from(postalCode.value.trim())[0] !== "L") {
        postalCode.classList.add('is-invalid');
        errors.push("Must be located in Hamilton!");
        was_errors = true;
    } else {
        postalCode.classList.remove('is-invalid');
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

        output.innerHTML = error_list;
        output.classList.add('alert', 'alert-danger')
    }
    else
    {   
        let monthlyPayment = calculateMortgage(mortgage.value, interest.value, years.value);
        output.innerHTML = `Your monthly payment is $${monthlyPayment.toFixed(2)}`;

        mortgage.classList.remove('is-invalid');
        interest.classList.remove('is-invalid');
        years.classList.remove('is-invalid');
        postalCode.classList.remove('is-invalid');

        output.classList.remove('alert-danger');
        output.classList.add('alert', 'alert-success');
    }
}

// Reset the form
function handleReset() {
    calculator.reset();
    let output = document.getElementById('output');
    output.innerHTML = "";

    mortgage.classList.remove('is-invalid');
    interest.classList.remove('is-invalid');
    years.classList.remove('is-invalid');
    postalCode.classList.remove('is-invalid');

    output.classList.remove('alert', 'alert-danger');
}

calculator.addEventListener('submit', handleSubmit);
calculator.addEventListener('reset', handleReset);