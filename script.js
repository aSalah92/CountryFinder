let form = document.querySelector('form')
let myInput = document.querySelector('#country')
let myButton = document.querySelector('#searchBtn')
let countryBox = document.querySelector('#countryBox')
let flag = document.querySelector('#flag')
let name = document.querySelector('#name')
let capital = document.querySelector('#capital')
let language = document.querySelector('#language')
let region = document.querySelector('#region')
let subregion= document.querySelector('#subregion')
let population = document.querySelector('#population')
let currency = document.querySelector('#currency')
let errorMessage = document.querySelector('#errorMessage')
//============== currencies and languages functions================
let mainCurrencyName;
let mainLanguageName;
function currenciesName (data){
    let currencyName = data[0].currencies
    let entries = Object.entries(currencyName)
    for(let[key,value] of entries){
        mainCurrencyName = key
    }
}
function languagesName (data){
    let languageName = data[0].languages
    let entries = Object.entries(languageName);
    for(let [key,value] of entries){
        mainLanguageName = key
    }
}
//=============function of palestine==================
let countryArr = []
function countrySpecial(apiLink){
    
    return new Promise((resolve,reject)=>{
    let myRequest = new XMLHttpRequest()
    myRequest.open('GET',`https://restcountries.com/v3.1/name/${apiLink}`);
    myRequest.send();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let data = JSON.parse(myRequest.responseText)
            data = data[0]
            countryArr.push(data)
            if(countryArr.length === 2){
                setTimeout(()=>resolve(countryArr),1000)
            }
        }else if(this.readyState === 4 && this.status !== 200){
            reject("Invalid country name or you need to try another name for this country")
        }   
    }
    // console.log(countryArr)
}).then(data => {

    currenciesName(data);
    languagesName(data);
    errorMessage.style.opacity = 0;
    countryBox.style.opacity = 1;
    flag.innerHTML = `<img src="${data[0].flags.png}" alt="" width="60" id='flagAdded'>`
    let flagAdded = document.querySelector('#flagAdded');
    flagAdded.style.borderRadius= "40px"
    name.textContent = `Country : ${data[0].name.common}`
    capital.textContent = `Capital : ${data[1].capital[0]}`
    region.textContent = `Region : ${data[0].region}`
    subregion.textContent = `Subregion : ${data[0].subregion}`
    population.textContent = `Population : ${data[0].population}`
    currency.textContent = `Currency : ${data[0].currencies[`${mainCurrencyName}`].name} ${data[0].currencies[`${mainCurrencyName}`].symbol}`
    language.textContent = `Language : ${data[0].languages[`${mainLanguageName}`]}`
    
    countryArr.length = 0;
    setTimeout(()=>flag.style.opacity = 1,500)
    setTimeout(()=>name.style.opacity = 1,1000)
    setTimeout(()=>capital.style.opacity = 1,1500)
    setTimeout(()=>language.style.opacity = 1,2000)
    setTimeout(()=>region.style.opacity = 1,2500)
    setTimeout(()=>subregion.style.opacity = 1,3000)
    setTimeout(()=>population.style.opacity = 1,3500)
    setTimeout(()=>currency.style.opacity = 1,4000)

          
})
.catch(rejectValue=>{
    errorMessage.textContent = rejectValue
    errorMessage.style.opacity = 1
})
}
//=============function of rest countries=================
function countrySearch(apiLink){
    return new Promise((resolve,reject)=>{
        let myRequest = new XMLHttpRequest()
        myRequest.open('GET',`https://restcountries.com/v3.1/name/${apiLink}`);
        myRequest.send();

        myRequest.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                let updatedData = JSON.parse(myRequest.responseText)
                // console.log(updatedData);
                resolve(updatedData);
            }else if(this.readyState === 4 && this.status !== 200){
                reject("Invalid country name or you need to try another name for this country")
            }
        }
    }).then(data => {

        currenciesName(data);
        languagesName(data);        
        countryBox.style.opacity = 1;
        flag.innerHTML = `<img src="${data[0].flags.png}" alt="" width="60" id='flagAdded'>`
        let flagAdded = document.querySelector('#flagAdded');
        flagAdded.style.borderRadius= "40px"
        name.textContent = `Country : ${data[0].name.common}`
        capital.textContent = `Capital : ${data[0].capital[0]}`
        region.textContent = `Region : ${data[0].region}`
        subregion.textContent = `Subregion : ${data[0].subregion}`
        population.textContent = `Population : ${data[0].population}`
        currency.textContent = `Currency : ${data[0].currencies[`${mainCurrencyName}`].name} ${data[0].currencies[`${mainCurrencyName}`].symbol}`
        language.textContent = `Language : ${data[0].languages[`${mainLanguageName}`]}`
        setTimeout(()=>flag.style.opacity = 1,500)
        setTimeout(()=>name.style.opacity = 1,1000)
        setTimeout(()=>capital.style.opacity = 1,1500)
        setTimeout(()=>language.style.opacity = 1,2000)
        setTimeout(()=>region.style.opacity = 1,2500)
        setTimeout(()=>subregion.style.opacity = 1,3000)
        setTimeout(()=>population.style.opacity = 1,3500)
        setTimeout(()=>currency.style.opacity = 1,4000)
    }).catch(rejectValue=>{
        errorMessage.textContent = rejectValue
        errorMessage.style.opacity = 1
    })
}
//=============button event listener =================
myButton.addEventListener('click', function(){
    event.preventDefault();

    countryBox.style.opacity = 0;
    flag.style.opacity = 0
    name.style.opacity = 0
    capital.style.opacity = 0
    language.style.opacity = 0
    region.style.opacity = 0
    subregion.style.opacity = 0
    population.style.opacity = 0
    currency.style.opacity = 0


    let country = myInput.value
    if(country === ''){
        errorMessage.style.opacity = 1;
    }else{
    country = country.toLowerCase();
    if(country === 'palestine'){
        country = 'palestine'
        countrySpecial(country)
        country = 'israel'
        countrySpecial(country)
    }else if (country === 'israel'){
        errorMessage.textContent = 'There is no real country with this name'
        errorMessage.style.opacity = 1;
    }else if(country === 'netherlands'){
        setTimeout(()=>{
            country = 'holland'
        errorMessage.style.opacity = 0;
        countrySearch(country);
        },1000)
    }else if(country === 'china'){
        setTimeout(()=>{
            country = 'CN'
        errorMessage.style.opacity = 0;
        countrySearch(country);
        },1000)
    }else if(country === 'england'){
        setTimeout(()=>{
            country = 'britain'
        errorMessage.style.opacity = 0;
        countrySearch(country);
        },1000)
    }else if(country === 'iran'){
        setTimeout(()=>{
            country = 'Islamic Republic of Iran'
        errorMessage.style.opacity = 0;
        countrySearch(country);
        },1000)
    }
    else{
        setTimeout(()=>{
            errorMessage.style.opacity = 0;
            countrySearch(country);
        },1000)
    }
    }
})
