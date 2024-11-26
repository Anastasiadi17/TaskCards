const url = "tasks.json";
let numberCardsOnOnePage = 15;
let currentBtn = "all";
let currentPage = 1;
let lastPageAll = null;
let lastPageCompleted = null;
let lastPageUncompleted = null;

const btn_all = document.querySelector(".all");
const btn_completed = document.querySelector(".completed");
const btn_uncompleted = document.querySelector(".uncompleted");

let page_one = null
let page_two = null;
let page_three = null;

let cont = document.querySelector(".cont");
let pages = document.querySelector(".pages");

async function getPosts() {
  const data = await fetch(url)
  return await data.json()
}

async function start() {
  const cards_all = await getPosts();
  cards_completed = [];
  cards_uncompleted = [];
  cards_all.forEach(element => {
    if(element.status == true) cards_completed.push(element);
    else cards_uncompleted.push(element);
  });

  lastPageAll = Math.trunc(cards_all.length/numberCardsOnOnePage)+1;
  lastPageCompleted = Math.trunc(cards_completed.length/numberCardsOnOnePage)+1;
  lastPageUncompleted = Math.trunc(cards_uncompleted.length/numberCardsOnOnePage)+1;

  showCards(currentBtn, currentPage); //Делаю первые 15 карточек при загрузке
  showPages(currentBtn, currentPage); //Делаю первые три кнопки при загрузке
  
  page_one = document.querySelector(".one");
  page_two = document.querySelector(".two");
  page_three = document.querySelector(".three");
  console.log(page_one, page_two, page_three);

  function showCards(currentBtn, currentPage){
    cont.innerHTML = "";
    let firstIndex = (currentPage - 1)*numberCardsOnOnePage;

    if(currentBtn == "all" && currentPage == lastPageAll){
      for(let i=firstIndex; i < cards_all.length; i++){
        const cont_elem = document.createElement("div");
        cont_elem.innerHTML = `
          <p>id: ${cards_all[i].id}</p><br/>
          <p>title: ${cards_all[i].title}</p><br/>
          <p>status: ${cards_all[i].status}</p><br/>
          <div class="cont_elem--${cards_all[i].status}"><div>
          `;
        cont_elem.className = "cont__elem";
        cont.appendChild(cont_elem);
      }
    }
    
    else if(currentBtn == "completed" && currentPage == lastPageCompleted){
      for(let i=firstIndex; i < cards_completed.length; i++){
        const cont_elem = document.createElement("div");
        cont_elem.innerHTML = `
          <p>id: ${cards_completed[i].id}</p><br/>
          <p>title: ${cards_completed[i].title}</p><br/>
          <p>status: ${cards_completed[i].status}</p><br/>
          <div class="cont_elem--${cards_completed[i].status}"><div>
          `;
        cont_elem.className = "cont__elem";
        cont.appendChild(cont_elem);
      }
    }

    else if(currentBtn == "uncompleted" && currentPage == lastPageUncompleted){
      for(let i=firstIndex; i < cards_uncompleted.length; i++){
        const cont_elem = document.createElement("div");
        cont_elem.innerHTML = `
          <p>id: ${cards_uncompleted[i].id}</p><br/>
          <p>title: ${cards_uncompleted[i].title}</p><br/>
          <p>status: ${cards_uncompleted[i].status}</p><br/>
          <div class="cont_elem--${cards_uncompleted[i].status}"><div>
          `;
        cont_elem.className = "cont__elem";
        cont.appendChild(cont_elem);
      }
    }

    else{
      for(let i=firstIndex; i < firstIndex + numberCardsOnOnePage; i++){
        const cont_elem = document.createElement("div");
        if(currentBtn == "all"){
          cont_elem.innerHTML = `
          <p>id: ${cards_all[i].id}</p><br/>
          <p>title: ${cards_all[i].title}</p><br/>
          <p>status: ${cards_all[i].status}</p><br/>
          <div class="cont_elem--${cards_all[i].status}"><div>
          `;
        }
        else if(currentBtn == "completed"){
          cont_elem.innerHTML = `
          <p>id: ${cards_completed[i].id}</p><br/>
          <p>title: ${cards_completed[i].title}</p><br/>
          <p>status: ${cards_completed[i].status}</p><br/>
          <div class="cont_elem--${cards_completed[i].status}"><div>
          `;
        }
        else if(currentBtn == "uncompleted"){
          cont_elem.innerHTML = `
          <p>id: ${cards_uncompleted[i].id}</p><br/>
          <p>title: ${cards_uncompleted[i].title}</p><br/>
          <p>status: ${cards_uncompleted[i].status}</p><br/>
          <div class="cont_elem--${cards_uncompleted[i].status}"><div>
          `;
        }
        
        cont_elem.className = "cont__elem";
        cont.appendChild(cont_elem);
      }
    }
  
  }

  function showPages(currentBtn, currentPage){

    let lastP = null;
    if(currentBtn == "all") lastP = lastPageAll;
    else if(currentBtn == "completed") lastP = lastPageCompleted;
    else if(currentBtn == "uncompleted") lastP = lastPageUncompleted;

    if(currentPage == 1) pages.innerHTML = `
      <div class="pages__page one currentPage">${currentPage}</div>
      <div class="pages__page two">${currentPage+1}</div>
      <div class="pages__page three">${currentPage+2}</div>
    `;
    else if(currentPage == lastP) pages.innerHTML = `
      <div class="pages__page one">${currentPage-2}</div>
      <div class="pages__page two">${currentPage-1}</div>
      <div class="pages__page three currentPage">${currentPage}</div>
    `;
    else pages.innerHTML = `
      <div class="pages__page one">${currentPage-1}</div>
      <div class="pages__page two currentPage">${currentPage}</div>
      <div class="pages__page three">${currentPage+1}</div>
    `;
  }

  btn_all.addEventListener("click", ()=>{
    if(currentBtn != "all"){
      cont.innerHTML = "";
      currentBtn = "all";
      currentPage = 1;
      showCards(currentBtn, currentPage);
      showPages(currentBtn, currentPage);
    }
  });

  btn_completed.addEventListener("click", ()=>{
    if(currentBtn != "completed"){
      cont.innerHTML = "";
      currentBtn = "completed";
      currentPage = 1;
      showCards(currentBtn, currentPage);
      showPages(currentBtn, currentPage);
    }
  });

  btn_uncompleted.addEventListener("click", ()=>{
    if(currentBtn != "uncompleted"){
      cont.innerHTML = "";
      currentBtn = "uncompleted";
      currentPage = 1;
      showCards(currentBtn, currentPage);
      showPages(currentBtn, currentPage);
    }
  });

  pages.addEventListener("click", (e)=>{
    if (e.target.classList.contains("pages__page")) {
      const pageNumber = Number(e.target.textContent);
      if (currentPage !== pageNumber) {
        currentPage = pageNumber;
        showCards(currentBtn, currentPage);
        showPages(currentBtn, currentPage);
      }
    }
  });

 


}


start();