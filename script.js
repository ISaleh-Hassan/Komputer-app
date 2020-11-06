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

function BankAccount(owner,balance){
    this.owner=owner;
    this.balance=balance;
}

BankAccount.prototype.setBankBalance= function(amount){
    this.balance+=amount
}

BankAccount.prototype.getLoan= function(amount){   
    if(amount<= this.balance*2){
        this.balance+=amount;
        return true;
    }
    else{
        alert("We can't give you this amount");
        return false;
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

  document.getElementById("getLoanBtn").addEventListener("click", function() {
        let promptMsg = prompt("Enter an amount you want to loan?");
        if(isNumeric(promptMsg)){
            let loanAmount= stringNumberToInt(promptMsg);
           if(getLoan(loanAmount)){
            document.getElementById("bankBalanceLabel").innerHTML = bankAccount.balance + " SEK"
             let getLoanBtn =  document.getElementById("getLoanBtn");
             getLoanBtn.style.display= "none";
           }
        }
        else{
            alert("Please enter a valid number!");
        }  
  });
  
  function getLoan(amount){
    return bankAccount.getLoan(amount);
 }

  function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && 
           !isNaN(parseFloat(str)) 
  }

function buyLaptop(){
    const laptopOptions= document.querySelector("#chooseLaptop");
    let laptopToBuy   =laptopOptions.value-1;
    if(laptops[laptopToBuy].Price<=bankAccount.balance){
        bankAccount.setBankBalance(-laptops[laptopToBuy].Price);
        let getLoanBtn =  document.getElementById("getLoanBtn");
        getLoanBtn.style.display= "block";
        alert("congratulations! You own "+ laptops[laptopToBuy].name + " now!")
    }
    else{
        alert("Your balance is not enough to buy this laptop!")
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
    if(choosenLaptop>0){
        showLaptopInfoInCard(stringNumberToInt(choosenLaptop)-1)
        showLaptopInfoInBox(stringNumberToInt(choosenLaptop)-1)
    } 
    else if(choosenLaptop==="Choose laptop..."){
        const readMore = document.querySelector('#read-more');
        readMore.style.display ="none";
    } 
  }

  const stringNumberToInt=(stringNumber)=> {
        try{
           return Number(stringNumber);
        }
        catch{
           alert("The given value is not a number!")
        }
  }

  const showLaptopInfoInCard=(selectedLaptop)=> {  
    const laptopNameInCard = document.querySelector('#laptop-name');
    const laptopFeaturesInCard = document.querySelector('#laptop-features');
    const laptopPriceInCard = document.querySelector('#laptop-price');
    const laptopImgInCard = document.querySelector('#laptop-image');  

    laptopNameInCard.innerHTML= laptops[selectedLaptop].name;
    laptopFeaturesInCard.innerHTML= laptops[selectedLaptop].features;
    laptopPriceInCard.innerHTML= laptops[selectedLaptop].Price + " SEK"
    laptopImgInCard.src= laptops[selectedLaptop].image;

  }

  const showLaptopInfoInBox=(selectedLaptop)=> {  
    const laptopFeaturesInBox = document.querySelector('#laptop-features-label');
    const readMore = document.querySelector('#read-more');

    laptopFeaturesInBox.innerHTML= laptops[selectedLaptop].features;
    readMore.style.display="block"

  }

  showLaptopOptions()
  
 //fetch("../services/contributors.JSON")
//.then(res => res.json())
//.then(data => console.log(data))