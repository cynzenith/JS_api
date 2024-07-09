const API_KEY = `be38e0d410064dd3b43d39e58e44aeb4`
let news = []
const getLatestNews = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`; 
        // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
        const url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines`); 
        console.log(url);
        const response = await fetch(url)
        const data = await response.json();
        news = data.articles
        console.log(news);
}

getLatestNews()
for (let i = 0; i < 5; i++) {
    console.log("after", i);
}
