const API_KEY = `be38e0d410064dd3b43d39e58e44aeb4`
let news = []
const getLatestNews = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`; 
        // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
        const url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines`); 
        console.log(url);
        const response = await fetch(url)
        const data = await response.json();
        newsList = data.articles
        render()
        console.log(newsList);
}

const render=()=>{
    const maxLength = 200;
    const newsHTML = newsList.map(news=>
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
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                }</p>
                <div>${news.source.name || "no source"} * ${moment().startOf('day').fromNow()}</div>
            </div>
        </div>`).join('');
    document.getElementById('news-board').innerHTML = newsHTML
}

getLatestNews()
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


