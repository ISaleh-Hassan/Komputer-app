const laptops = [
    { 
        "name": "CHUWI Herobook Pro 14.1",
        "features": "14.1 inch Windows 10 Intel N4000 Dual Core 8GB RAM 256GB ROM Notebook,Thin and Lightweight Laptop,BT4.0",
        "image": "images/image 1.jpg",
        "Price": 2000
    },
    {   
        "name": "ASUS Laptop L406",
        "features": "Thin and Light Laptop, 14” HD Display, Intel Celeron N4000 Processor, 4GB RAM, 64GB eMMC Storage, Wi-Fi 5, Windows 10, Microsoft 365, Slate Gray, L406MA-WH02",
        "image": "images/image 3.jpg",
        "Price": 2200
    },
    {
        "name": "Acer Aspire 5 Slim Laptop",
        "features": "Slim Laptop, 15.6 inches Full HD IPS Display, AMD Ryzen 3 3200U, Vega 3 Graphics, 4GB DDR4, 128GB SSD, Backlit Keyboard, Windows 10 in S Mode, A515-43-R19L, Silver",
        "image": "images/image 1.jpg",
        "Price": 2300
    },
    {
        "name": "Lenovo - IdeaPad 3",
        "image": "images/image 3.jpg",
        "features": "Intel Core i3-1005G1-8GB Memory - 256GB SSD - Platinum Grey -",
        "Price": 2500
    }
]

function Customer(name,payBalance){
    this.name = name;
    this.payBalance= payBalance; 
}

Customer.prototype.workToGetBalance= function(){
    this.payBalance+=100;
}
Customer.prototype.transferMoney= function(){
    this.payBalance=0;
}

//Bank
function BankAccount(owner,balance){
    this.owner=owner;
    this.balance=balance;
}

BankAccount.prototype.setBankBalance= function(amount){
    this.balance+=amount
}

BankAccount.prototype.getLoan= function(amount){   
    if(amount< this.balance*2){
        this.balance+=amount;
    }
    else{
        alert("We can't give you this amount");
    }
}

let customer = new Customer("John", 0);
let bankAccount = new BankAccount(customer.name,0);


function payToBank(){
    if(customer.payBalance>0){
        bankAccount.setBankBalance(customer.payBalance);
        customer.transferMoney();
    }
    else{
        alert("You need to work more to be able to transfer money!")
    }
}

document.getElementById("workBtn").addEventListener("click", function() {
    customer.workToGetBalance();
    document.getElementById("payBalanceLabel").innerHTML = customer.payBalance + " SEK"
  });

  document.getElementById("payToBankBtn").addEventListener("click", function() {
    payToBank()
    document.getElementById("bankBalanceLabel").innerHTML = bankAccount.balance + " SEK"
    document.getElementById("payBalanceLabel").innerHTML = customer.payBalance + " SEK"
  });

  document.getElementById("buyLaptopBtn").addEventListener("click", function() {
    buyLaptop()
    document.getElementById("bankBalanceLabel").innerHTML = bankAccount.balance + " SEK"
  });

 //Get loan btn should be disabled after giving loan. 
  document.getElementById("getLoanBtn").addEventListener("click", function() {
        let promptMsg = prompt("Enter an amount you want to loan?");
        if(isNumeric(promptMsg)){
            let loanAmount= stringNumberToInt(promptMsg);
            getLoan(loanAmount);
            document.getElementById("bankBalanceLabel").innerHTML = bankAccount.balance + " SEK"
            let getLoanBtn =  document.getElementById("getLoanBtn");
            getLoanBtn.setAttribute="disabled"
        }
        else{
            alert("Please enter a valid number!");
        }  
  });

  function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && 
           !isNaN(parseFloat(str)) 
  }

function getLoan(amount){
    bankAccount.getLoan(amount);
}

function buyLaptop(){
    const laptopOptions= document.querySelector("#chooseLaptop");
    let laptopToBuy   =laptopOptions.value-1;
    if(laptops[laptopToBuy].Price<=bankAccount.balance){
        bankAccount.setBankBalance(-laptops[laptopToBuy].Price)
        console.log("Now you can buy it")
    }
    else{
        alert("Try to get a better a loan or choose a cheaper komputer!")
    }
}
const showLaptopOptions=()=>{
    const laptopOptions= document.querySelector("#chooseLaptop");
    countValue=0;
    for (i = 0; i < laptops.length; i++) {
        countValue++;
        const newLaptopOption = document.createElement("option");
        newLaptopOption.value=countValue;
        newLaptopOption.innerHTML= laptops[i].name;

        laptopOptions.appendChild(newLaptopOption)

      }         
}

const chooseLaptop=()=> {
    const selectLaptop = document.querySelector('#chooseLaptop');
    let choosenLaptop=  selectLaptop.value;

    showLaptopInfoInCard(stringNumberToInt(choosenLaptop)-1)
    showHideLaptopInfoCard(stringNumberToInt(choosenLaptop)-1)
  }

  const stringNumberToInt=(stringNumber)=> {
        try{
           return parseInt(stringNumber);
        }
        catch{
            console.log("The given value is not a number")
        }
  }

  const showLaptopInfoInCard=(selectedLaptop)=> {  
    const laptopFeaturesInBox = document.querySelector('#laptop-features-label');
    const laptopNameInCard = document.querySelector('#laptop-name');
    const laptopFeaturesInCard = document.querySelector('#laptop-features');
    const laptopPriceInCard = document.querySelector('#laptop-price');
    const laptopImgInCard = document.querySelector('#laptop-image');  

    laptopFeaturesInBox.innerHTML= laptops[selectedLaptop].features;
    laptopNameInCard.innerHTML= laptops[selectedLaptop].name;
    laptopFeaturesInCard.innerHTML= laptops[selectedLaptop].features;
    laptopPriceInCard.innerHTML= laptops[selectedLaptop].Price + " SEK"
    laptopImgInCard.src= laptops[selectedLaptop].image;

  }

  const showHideLaptopInfoCard=(selectedLaptop)=> {
    const laptopInfoCard = document.querySelector('#laptop-info-card');
  }

  showLaptopOptions()
  
 //fetch("../services/contributors.JSON")
//.then(res => res.json())
//.then(data => console.log(data))