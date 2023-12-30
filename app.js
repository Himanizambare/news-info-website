const API_KEY = "73de8065a09c49e89988b2503286042d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&api${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
};

function bindData(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newstemplate=document.getElementById("template-news-card");

    cardscontainer.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardclone=newstemplate.content.cardclone(true);
        fillDataInCard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });

};

function fillDataInCard(cardclone,article){
    const newsImg=cardclone.querySelector("#news-img");
    const newTitle=cardclone.querySelector("#news-title");
    const newsSrc=cardclone.querySelector("#news-source");
    const newsDesc=cardclone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString(
       "en-us",{
        timeZone: "Asia/Jakarta",
    });

    newsSrc.innerHTML=`${article.source.name}.${data}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank")
});

};


let curselectnav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    curselectnav?.classList.remove("active");
    curselectnav=navitem;
    curselectnav.classList.add("active");

}


