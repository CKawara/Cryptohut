window.addEventListener('DOMContentLoaded', ()=> { 
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
    const proxyUrl ='https://api.allorigins.win/raw?url='
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
        let i = document.createElement('span')

        coinsDiv.id = 'coin_list' 
        img.className = 'coinIcon'
        div.className = 'coins'
        

        img.src = coin.iconUrl
        p.innerText = coin.symbol
        price.innerText = `${coin.change}%`
        i.innerHTML = '<i class="fa-solid fa-star"></i>'
        div.appendChild(img)
        div.appendChild(p)
        div.appendChild(price)
        div.appendChild(i)
        coinsDiv.appendChild(div)

        if(price.innerText.includes('-')){
            price.style.color = 'red'
        }else if (price.innerText.includes('+')){
            price.style.color = 'green'
        }else{
            price.style.color = 'white'
        }

        i.addEventListener('click', ()=>{
            if(i.className != 'starred'){
                i.className = 'starred'
            }else{
                i.classList.remove('starred')
            }
            
        })

    }



    function displayNews(info){
        let picArray = [
            'assets/126_generated.jpg',
            'assets/dylan-calluy-JpflvzEl5cg-unsplash.jpg',
            'assets/jeremy-bezanger-9opiHRPIvR0-unsplash.jpg',
            'assets/Project_55-02_prev_ui.png',
            'assets/r1985.jpg',
            'assets/revenue-icons-vector.png',
            'assets/Stock_market_or_forex_trading_and_graph_on_smartphone.jpg'
        ]
        let newsDiv = document.getElementById('coin_news')
        let div = document.createElement('div')
        let divImg = document.createElement('div')
        let a = document.createElement('a')
        let source = document.createElement('p')
        let img = document.createElement('img')

        img.className = 'news_img'
        a.className = 'news_link'
        divImg.className = 'news_div'

        document.querySelectorAll('.news_img').forEach(function(img) {
            const randomPic = Math.floor((Math.random() * picArray.length));
          img.src = picArray[randomPic];
        });

        a.href = info.url
        a.innerText = info.title
        source.innerText = info.source
        divImg.appendChild(img)
        div.appendChild(a)
        div.appendChild(source)
        divImg.appendChild(div)
        newsDiv.appendChild(divImg)

    }
}) 