const API_KEY = `be38e0d410064dd3b43d39e58e44aeb4`;
let newsList = [];

const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const side_menus = document.querySelectorAll(".sidenav a");
side_menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);

const getNews = async()=>{
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(response.status === 200){
            if(data.articles.length === 0){
                throw new Error("No result for this search");}
            newsList = data.articles;
            render();
            console.log(newsList);
        }
        else{
            throw new Error(data.message)
        }
    }catch(error){
            // console.log("error: " + error)
            errorRender(error.message);
    }
    
}

const getLatestNews = async () => {
    url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
    console.log(url);
    await getNews()
}

const getNewsByCategory = async (event) => {
    if (event.target.classList.contains('closebtn')) {
        return;
    }
    const category = event.target.textContent.toLowerCase();
    console.log(category);
    url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    await getNews()
}

const getNewsByKeyword = async () => {
    const searchInput = document.getElementById("search-input");
    const keyword = searchInput.value;
    url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    await getNews()
    searchInput.value = "";
}

const render = () => {
    const maxLength = 200;
    const newsHTML = newsList.map(news =>
        `<div class="row news">
            <div class="col-lg-4">          
                <img class="news-img-size"
                    src="${news.urlToImage || "https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg"}"
                    onerror="this.onerror=null;this.src='https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg';" />
            </div>
            <div class="col-lg-8">        
                <h2>${news.title}</h2>
                <p>${
                    news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > maxLength
                        ? news.description.substring(0, maxLength) + "..."
                        : news.description
                }</p>
                <div>${news.source.name || "no source"} * ${moment().startOf('day').fromNow()}</div>
            </div>
        </div>`
    ).join('');
    document.getElementById('news-board').innerHTML = newsHTML;
}

getLatestNews();
for (let i = 0; i < 5; i++) {
    console.log("after", i);
}

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

function handleKeyDown(event) {
    if (event.key === "Enter") {
        getNewsByKeyword();
    }
}

// 12-1. error render
const errorRender = (errorMessage) => {
    const errorHTML = `<div class = "alert alert-danger" role="alert">
        ${errorMessage}
    </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}