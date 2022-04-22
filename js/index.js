window.addEventListener('DOMContentLoaded', ()=> { 
    let newsDiv = document.getElementById('news_div')
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Host': 'crypto-news14.p.rapidapi.com',
    //         'X-RapidAPI-Key': '9447803cb3msh4b78e7793a969f3p1c1259jsnca270ba9c9fa'
    //     }
    // };
    // fetch('https://crypto-news14.p.rapidapi.com/news/cointelegraph', options)
    // .then(resp => resp.json())
    .then(data => {
        // default news display
        for (let i = 0; i < 5; i++){
            displayNews(data[i])
        }
        let buttons = document.getElementsByClassName("btn");
     //returns a nodelist
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                // filter top stories and editors choice manually
            if(this.innerText == 'Top Stories'){
                newsDiv.innerHTML = ''
                for (let i = 6; i < 10; i++){
                    displayNews(data[i])
                }
            }else if (this.innerText == 'Editor\'s Choice'){
                newsDiv.innerHTML = ''
                for (let i = 11; i < 15; i++){
                    displayNews(data[i])
                }        
            }
            }, 
            false);
        }
        for (let i = 16; i < data.length; i++){
            displaycards(data[i])
        }
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
            // displayCoins(coin)
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
        }else{
            price.style.color = 'green'
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
        let div = document.createElement('div')
        var divImg = document.createElement('div')
        let a = document.createElement('a')
        let img = document.createElement('img')

        img.className = 'news_img'
        a.className = 'news_link'
        divImg.className ='news_div'

        img.src = info.image
        a.href = info.url
        a.innerText = info.title
        divImg.appendChild(img)
        div.appendChild(a)
        divImg.appendChild(div)
        newsDiv.appendChild(divImg)

    }
    function displaycards(info){
        let news_cards = document.getElementById('news_cards')
        let columns = document.createElement('div')
        let div = document.createElement('div')
        let card = document.createElement('div')
        let a = document.createElement('a')
        let p = document.createElement('p')
        let img = document.createElement('img')

        img.style.width = 'auto'
        img.style.height = 'auto'
        a.className = 'news_link'
        card.className = 'card'
        columns.className = "col-lg-4 col-md-6"

        img.src = info.image
        a.href = info.url
        a.innerText = info.title
        p.innerText = info.desc
        card.appendChild(img)
        div.appendChild(a)
        div.appendChild(p)
        card.appendChild(div)
        columns.appendChild(card)
        news_cards.appendChild(columns)
    }
}) 