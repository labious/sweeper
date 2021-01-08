var arr = new Array();
let shrinked = new Array();
var dayArr = new Array();
var dayCount = 0;
var days = ['monday','tuesday','wednesday','thursday','friday'];
var tDate = document.getElementById('tDate');

function init(){
    if(localStorage.getItem('testObject')){
        testObject = JSON.parse(localStorage.getItem('testObject'));
        return testObject;
    }else {
        dayArr = [false,false,false,false,false];
         var testObject = dayObject(dayArr);
        localStorage.setItem('testObject', JSON.stringify(testObject));
        return testObject; 
    }
}
let weekHistory = () => {
    let data = init();
    arr[0]  = data.monday; 
    arr[1]  = data.tuesday; 
    arr[2]  = data.wednesday; 
    arr[3]  = data.thursday; 
    arr[4]  = data.friday; 
    return arr;
}
var dayId  = (e) => {
    let pound = '#';
    let result;
    switch(e){
        case 0 : result = pound + 'monday';
        break;
        case 1 : result = pound + 'tuesday';
        break;
        case 2 : result = pound + 'wednesday';
        break;
        case 3 : result = pound + 'thursday';
        break;
        case 4 : result = pound + 'friday';
        break;
    }
    return result;
}


let shrink = (arr) => {
    daycount = JSON.parse(localStorage.getItem('dayCount'));
    for(let i in arr){
         if(arr[i]){
             shrinked.push(days[i])
             daycount++;
        }
    }
    //tDate.innerHTML =  dayCount + ' days this week - says shrink';
    return dayCount;
}

let updateUi = () => {
    arr = weekHistory();
    dayCount = shrink(arr);
    for(let i in shrinked){
        $(`#${shrinked[i]}`).click();
        $(`#${shrinked[--i]}`).prop('disabled', true);
        dayCount++;
    }
    tDate.innerHTML =  dayCount + ' days this week';
}

function daypicker() {
    var date = new Date();
        date = date.getDay();
        return date;
}

function dayObject(e){
    var testObject = { 'monday': e[0],
                        'tuesday': e[1],
                        'wednesday': e[2],
                        'thursday':e[3],
                        'friday':e[4] };
                        return testObject;
}

let dateCheck = (e) => {
    let today = parseInt(`${daypicker()}`); //3
    arr = weekHistory(); //false
    let dayValue = parseInt(`${e.value}`); // 3
    let name = e.name;
    let result = '#'+ name;

    if(dayValue == today && !arr[dayValue] ){  
        arr[--dayValue] = true;
        //console.log('registered for ' + e.name + ' at ' + dayValue);
        $(`${result}`).prop('disabled', true);
        daycount = (shrink() + 1);
        tDate.innerHTML =  daycount + ' days this week';
        }
        else if(arr[--dayValue]){
            //console.log(dayValue + ' is dayValue and today is ' + today)
            //tDate.innerHTML =  dayCount + ' days this week';
            $(`${result}`).prop("checked", true);
            $(`${result}`).prop('disabled', true);
        }
        else{
            $(`${result}`).prop("checked", false);
        }
    

    daycount = JSON.parse(localStorage.getItem('dayCount'));
    //tDate.innerHTML =  dayCount + ' days this week';

    testObject = dayObject(arr);
    // Put the object into storage
    localStorage.setItem('testObject', JSON.stringify(testObject)); 
}

$(document).ready(() => {
    if(daypicker() === 0){
        localStorage.clear();
    }
    updateUi();
    var tDate = document.getElementById('tDate');
    //retrive local storage
    daycount = JSON.parse(localStorage.getItem('dayCount'));
    //tDate.innerHTML =  dayCount + ' days this week';
});