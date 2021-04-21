const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();

   const user = data.results[0];

   const newUser = {
       name : `${user.name.first} ${user.name.last}`,
       money : Math.floor(Math.random() * 1000000)
   }
   addData(newUser);

}

//add new obj into data
function addData(obj){
    data.push(obj);

    updateDOM();
}

//double money
function doubleMoney(){
    data = data.map((user) => {
        return {...user,money : user.money *2}
    })

    updateDOM();
}

//sort by richest

function sortByRichest(){
    data.sort((a,b)=> b.money -a.money);

    updateDOM();
}
//show millionairs

function sortByMillion(){
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

//total wealth of the user
function totalWealth(){
    const wealth = data.reduce((acc,user)=> (acc += user.money),0);

    const wealthE1 = document.createElement('div');
    wealthE1.innerHTML = `<h3>Total Wealth : <strong>${formMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthE1);
}

//update dom
function updateDOM(providedData = data){
    //clear min div
    main.innerHTML = '   <h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(function(item){
        const element = document.createElement('div');
element.classList.add('person');
element.innerHTML = `<strong>${item.name}</strong> ${formMoney(item.money)}`;
main.appendChild(element);
    })
}

//form Money
function formMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionaireBtn.addEventListener('click',sortByMillion);
calculateWealthBtn.addEventListener('click',totalWealth);