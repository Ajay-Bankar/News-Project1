

const API_KEY = "ca085dcd2c694063b7df855148090362";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("india"));

function reLoad(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url} ${query} &apikey=${API_KEY}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles);

}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
         
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    // newsSource.innerHTML = article.source;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank")
    })

}
let curSelectNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav = navItem;
    curSelectNav?.classList.add('active');
}

const searchButton = document.getElementById('search-button');

const searchtext = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectNav?.classList.remove('active');
    curSelectNav = null;
})
















