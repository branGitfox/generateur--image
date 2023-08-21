const access_key = 'WkanpIdpmKb3wwjOtaypQ_tQ5ZUH_aQZnr2TrI8-870'

const form = document.querySelector('form')
const input = document.getElementById("search-champs")
const submit = document.getElementById('search-btn')

const results_cont = document.querySelector('.results-container')
const showMore = document.getElementById("show-more-button")

let page = 1
 let inputData = ""

async function searchImages () {
    inputData = input.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    console.log(results)
    if(page=== 1){  
        results_cont.innerHTML = ""
    }
    if(results.length == 0){
        results_cont.innerHTML = "<p>Aucune image trouvé</p>"
    }
       if(inputData == ""){
        results_cont.innerHTML = "<p>Aucune image trouvé</p>"
       }
            results.map((result) => {
                const div = document.createElement('div')
                div.classList.add('result')
                const img = document.createElement('img')
                img.src = result.urls.small
                const a = document.createElement('a') 
                a.href = result.urls.full
                a.target = "_blank"
                a.textContent = result.alt_description
                div.appendChild(img)
                div.appendChild(a)
                results_cont.appendChild(div)
            })
      

    page++

    if(page > 1) {
        showMore.style.display = "block"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    page = 1
    searchImages()
})

showMore.addEventListener("click", () => {
    searchImages()
})