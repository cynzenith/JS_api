const API_KEY = `be38e0d410064dd3b43d39e58e44aeb4`
let newsList = []

const getLatestNews = async () => {
    // const url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines`);
    const url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
    console.log(url);
    const response = await fetch(url)
    const data = await response.json();
    newsList = data.articles
    render()
    console.log(newsList);
}

//9-1. 버튼들에 클릭이벤트 주기
const menus = document.querySelectorAll(".menus button")
// 배열 형태 출력
// console.log(menus) 
// menus(배열)을 반복 -> menu라는 매개변수를 만들어서 각 요소들이 반복되면서 클릭이벤트를 발생시키고 -> 그 이벤트가 발생시 getNewsByCategory함수를 호출한다.
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

//9-4. 사이드버튼들에 클릭이벤트 주기
const side_menus = document.querySelectorAll(".sidenav a");
// console.log(side_menus);
side_menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getNewsByCategory = async (event) => {
    // 이벤트가 발생한 요소가 'closebtn' 클래스를 가진 경우를 무시합니다.
    if (event.target.classList.contains('closebtn')) {
        return;
    }
    // 호출 테스트
    // console.log(getNewsByCategory)

    //9-2. 카테고리별 뉴스 가져오기
    const category = event.target.textContent.toLowerCase() // 중요

    // 호출 테스트
    console.log(category)
    const url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url)  // async - await
    const data = await response.json()
    console.log("ddd", data);

    //9-3. 그 뉴스를 보여주기
    newsList = data.articles;
    render();
}

// 10-1. 키워드별 검색 - 검색이벤트
const getNewsByKeyword= async() => {
    // 테스트
    // console.log("getNewsByKeyword");

    const searchInput = document.getElementById("search-input");
    const keyword = searchInput.value;
    // 테스트
    // console.log(keyword);

    // 10-2. 키워드별 뉴스 가져오기
    const url = new URL(`https://inspiring-custard-4a08a3.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    const response = await fetch(url)  // async - await
    const data = await response.json()
    // 테스트
    // console.log("keyword", data);

    //10-3. 그 뉴스를 보여주기
    newsList = data.articles;
    render();

    // 키워드 입력창 초기화
    searchInput.value = "";
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

// 10-1-1. 입력창에서 enter키 입력
function handleKeyDown(event) {
    if (event.key === "Enter") {
        getNewsByKeyword();
    }
}


//9-1. 버튼들에 클릭이벤트 주기
//9-2. 카테고리별 뉴스 가져오기
//9-3. 그 뉴스를 보여주기
//9-4. 사이드버튼들에 클릭이벤트 주기

//10-1. 키워드별 검색 - 검색이벤트
//10-2. 키워드별 뉴스 가져오기
//10-3. 그 뉴스를 보여주기
