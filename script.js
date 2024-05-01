'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Mohammad Armaan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2024-04-21T21:31:17.178Z',
    '2024-04-25T07:42:02.383Z',
    '2024-04-26T09:15:04.904Z',
    '2024-04-26T10:17:24.185Z',
    '2024-04-26T14:11:59.604Z',
    '2024-04-27T17:01:17.194Z',
    '2024-04-28T23:36:17.929Z',
    '2024-04-30T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account2 = {
  owner: 'Cristiano Ronaldo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2024-04-25T13:15:33.035Z',
    '2024-04-25T09:48:16.867Z',
    '2024-04-26T06:04:23.907Z',
    '2024-04-26T14:18:46.235Z',
    '2024-04-26T16:33:06.386Z',
    '2024-04-27T14:43:26.374Z',
    '2024-04-27T18:49:59.371Z',
    '2024-04-28T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Karim Benzema',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2024-04-25T13:15:33.035Z',
    '2024-04-26T09:48:16.867Z',
    '2024-04-27T06:04:23.907Z',
    '2024-04-27T14:18:46.235Z',
    '2024-04-26T16:33:06.386Z',
    '2024-04-28T14:43:26.374Z',
    '2024-04-28T18:49:59.371Z',
    '2024-04-30T12:01:20.894Z',
    '2024-05-1T12:00:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2024-04-19T21:31:17.178Z',
    '2024-04-21T07:42:02.383Z',
    '2024-04-23T09:15:04.904Z',
    '2024-04-22T10:17:24.185Z',
    '2024-04-24T14:11:59.604Z',
  ],
  currency: 'GBP',
  locale: 'en-UK',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');


const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const footer = document.querySelector("footer");


const formatMovemenDate = function(date, locale){
  const calcDaysPassed = (date1, date2) =>
     Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if(daysPassed === 0) return "Today";
  if(daysPassed === 1) return "Yesterday";
  if(daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);

}

const formattedCurr = function(value, locale, currency){
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format((value));
}
console.log(formattedCurr(1000, account1.locale, account2.currency))



const displayMovements = function(acc, sort = false){
  containerMovements.innerHTML = '';      //Remove old elements
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements; 

  
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovemenDate(date, acc.locale);

    const formattedMov = formattedCurr((mov).toFixed(2), acc.locale, acc.currency);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// displayMovements(account1.movements);

const createUserName = function(accs){
  accs.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
  });
}
createUserName(accounts);
console.log(accounts);


const calcAndDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formattedCurr((acc.balance).toFixed(2), acc.locale, acc.currency)}`
}


const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formattedCurr((incomes).toFixed(2), acc.locale, acc.currency)}`;

  const out = acc.movements.filter((mov) => mov < 0).reduce((acc,mov) => acc + mov, 0);
  labelSumOut.textContent = `${formattedCurr(Math.abs((out).toFixed(2)), acc.locale, acc.currency)}`;

  const interest = acc.movements.filter((mov) => mov > 0)
    .map((deposit) => deposit * acc.interestRate / 100)
    .filter((interest, i, arr) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${formattedCurr((interest).toFixed(2), acc.locale, acc.currency)}`;
}


const updateUI = function(acc){
  // Display Movements
  displayMovements(acc);

  // Display Balnce
  calcAndDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
}


const startLogOutTimer = function(){

  const tick = function(){
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;



    // When 0 seconds, stop timer and log out user
    if(time === 0){
      clearInterval(timer)
      labelWelcome.textContent = `Login in to get started`;
    
      containerApp.style.opacity = 0;
  
    }
    // Decrease each second
    time--;

  }
  // Set Time to 5 Minutes
  let time = 300;

  // Call the timer every seconds
  tick();
  const timer = setInterval(tick, 1000);


  return timer;
}

/////////////////////////////////////////////////////////
// Event Handlers
let currentAccount;
let timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function(e){
  // Prevent from submitting of page
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.userName === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner}`;
    // labelWelcome.textContent = `Welcome Back, ${currentAccount.owner?.split(' ')[0]}`;
    
    containerApp.style.opacity = 100;


    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    
    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if(timer) clearInterval(timer);
    timer = startLogOutTimer();
    
    // Update UI
    updateUI(currentAccount)
  }

});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find((acc) => acc.userName === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.userName !== currentAccount.userName ){
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount)

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(Math.floor(inputLoanAmount.value));
  if(amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)){
    setTimeout( function(){
          // Add the movement
        currentAccount.movements.push(amount);

        // Add Loan Date
        currentAccount.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);

        // Reset Timer
        clearInterval(timer);
        timer = startLogOutTimer();

      }, 2500);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex((acc) => acc.userName === currentAccount.userName)
    
    // Delete Account
    accounts.splice(index, 1);
    console.log('DELETE');

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Footer
const year = new Date().getFullYear();
footer.innerHTML = `<footer class="footer">
<p class="copywright">Copywright &copy; <span class="year">${year}</span> by Mohammad Armaan Inc. All rights reserverd</p>
</footer>`
