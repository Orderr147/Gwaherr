import * as comp from "./navbar.js";

document.getElementById("main_navbar").innerHTML = comp.mainNavbar();



// Code to Enable Search Functunality in any page Starts here..................

document.getElementById("search_bar").addEventListener("keypress" , ()=>{
    if(event.key == "Enter") {
        localStorage.setItem("search" , document.getElementById("search_bar").value);
        window.location.href = "./search.html"
    }
});

document.getElementById("search_bar").addEventListener("input" , (e)=>{

    if(e.keyCode == 13 || e.key == "Enter") {
        alert("Enter found");
    }
    
    let search_key = document.getElementById("search_bar").value;

    if(search_key == '') {
        document.getElementById("debounce_search_results").style.display = "none";
    }
    getSearchData(search_key);

    if(search_key.length == '') {
        document.getElementById("debounce_search_results").style.display = "none";
    }else {
        document.getElementById("debounce_search_results").style.display = "block";
    }
})


async function getSearchData(user_key) {

    document.getElementById("search_append").innerHTML = "";


    let res = await fetch("https://mr-raaz.github.io/NetmedsClone_data/data.json");
    let data = await res.json();

    let search_results  = data.products;

    search_results.map((elem)=>{
        let prod_name = elem.prod_name;
        let str = prod_name.toLowerCase();
        let search_val = user_key.toLowerCase();

        if(str.includes(search_val)){
            let li = document.createElement("li");
            li.innerText = prod_name;

            li.addEventListener("click" , ()=>{
                localStorage.setItem("clicked" , JSON.stringify(elem));
                window.location.href = "./productDetails.html";
            })
            document.getElementById("search_append").append(li);
        }
    });
}


// Ends here...............



// countDown timer function........................

function countDown(){
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

var x = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


document.getElementById("countTimer").innerHTML = `<i class="fa-solid fa-clock"></i> <p>${hours}h : ${minutes}m : ${seconds}s  remaining</p>`;

  if (distance < 0) {
    countDown();
  }
}, 1000);
}


countDown();
// countDown timer function ends here.....................
