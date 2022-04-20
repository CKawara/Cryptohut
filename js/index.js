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
        console.log(info.url)
        displayNews(info)
    });
})

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
