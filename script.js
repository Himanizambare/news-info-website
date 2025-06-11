const API_KEY = "73de8065a09c49e89988b2503286042d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() { //when we click on logo it will get back on home page
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); // card ke sare divs use honge
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone); //template me card ke sare dalo
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank") //when we click in any card it will open url in new tab(_blank meand new tab)

    });


}
//when we click on ilp ,finanace and search we can get that news code as follows-
let curselectnav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curselectnav?.classList.remove('active'); // when we have not  clicked on aother nav section  items then active ko band krdo 
    curselectnav=navItem; //cur cursor jispr hai usko active krdo
    curselectnav.classList.add('active');//curr wala active hoga

}

//search box

const searchbutton=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');

searchbutton.addEventListener('click',()=>{
   const query=searchtext.value; //user ne jo bi  search me likha woh query me aa jayega
   if(!query) return; //user ne search button me kuch bhi nahi dala so return
   fetchNews(query);
   //when we are searching something so remove active class from prev jo hame oehle select kiya tha usme se blur color hat jayega
   curselectnav?.classList.remove('active');
   curselectnav=null;
})

//upload

