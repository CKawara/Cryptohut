const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
		'X-RapidAPI-Key': '9447803cb3msh4b78e7793a969f3p1c1259jsnca270ba9c9fa'
	}
};
fetch('https://crypto-news-live3.p.rapidapi.com/news', options)
.then(resp => resp.json())
.then(data => {
    data.forEach(info => { 
        displayNews(info)
    });
})
const baseUrl = 'https://api.coinranking.com/v2/coins?_limit=5'
   // to avoid cors error
const proxyUrl ='https://cors-anywhere.herokuapp.com/'
const apky = 'coinrankingdb49bc8ef3d0298669ef651205be3bed2954f3c4a87a37fa' 


fetch(`${proxyUrl}${baseUrl}`,{
    method: 'GET',
    Headers: {
        'Content-type': 'application/json',
        'x-access-token': `${apky }`,
        'Access-Control-Allow-origin': '*'
    }
}).then(resp => {
    if(resp.ok){
        resp.json()
        .then(data => {
        data.data.coins.forEach(coin => {
        displayCoins(coin)
    })
    })
    .catch((console.error()))
}
    
})


function displayCoins(coin){
   let coinsDiv = document.querySelector('.crypto') 
   let div = document.createElement('div')
   let img = document.createElement('img')
   let p = document.createElement('span')
   let price = document.createElement('p')

   coinsDiv.id = 'coin_list' 
   img.className = 'coinIcon'
   div.className = 'coins'
   

   img.src = coin.iconUrl
   p.innerText = coin.symbol
   price.innerText = `${coin.change}%`
   div.appendChild(img)
   div.appendChild(p)
   div.appendChild(price)
   coinsDiv.appendChild(div)

   if(price.innerText.includes('-')){
       price.style.color = 'red'
   }else if (price.innerText.includes('+')){
       price.style.color = 'green'
   }else{
       price.style.color = 'white'
   }

}


function displayNews(info){
    let newsDiv = document.getElementById('coin_news')
    let div = document.createElement('div')
    let a = document.createElement('a')
    let source = document.createElement('p')

    a.className = 'news_link'
    div.className = 'news_div'

    a.href = info.url
    a.innerText = info.title
    source.innerText = info.source
    div.appendChild(a)
    div.appendChild(source)
    newsDiv.appendChild(div)
}
