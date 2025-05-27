class Card {
    constructor(english, persian) {
        this.color = "white"
        this.cardHTML =
            `<h2 class="english-w">${english}</h2>
        <hr>
        <p contenteditable="true" class="persian-w">${persian}</p>
        <button class="delete-button"> &#10006; <span>Delete item</span></button>
        `
        this.card = document.createElement('div')
        this.big_card = document.querySelector('.big-card')
        this.card.classList.add('card')
        this.card.insertAdjacentHTML('afterbegin', this.cardHTML)
        this.card.querySelector('.delete-button').addEventListener('click', (evt) => {
            evt.stopPropagation()
            storage.removeWord(english)
            this.card.remove()
        })
        this.card.addEventListener('click', async () => {
            const api = new Dictionary()
            const defination_screen = document.querySelector('.definition-screen')
            defination_screen.classList.toggle('active')
            this.dictionary_entry = await api.fetchDictionary(this.card.querySelector('.english-w').textContent).then(res => res)
            if (this.dictionary_entry.title !== "No Definitions Found") {
                defination_screen.querySelector('h1.word').textContent = this.dictionary_entry.find(key => "word" in key).word
                defination_screen.querySelector('h2.phonetic').textContent = this.dictionary_entry[0]["phonetics"].find(key => "text" in key).text
                defination_screen.querySelector('audio').src = this.dictionary_entry[0]["phonetics"].find(key => "audio" in key).audio
                this.dictionary_entry[0]['meanings'].forEach(meaning => {
                    let meanings_block_template = `<div class="meanings-container">
                    <h2 class="part-of-speech">${meaning['partOfSpeech']}</h2>`
                    if (meaning['synonyms'].length > 0){
                        meanings_block_template += `<div class="all-synonyms"><p>Synonyms:</p>`
                        meaning['synonyms'].forEach(synonym=>{
                            meanings_block_template += `<button class="all-synonyms">${synonym}</button>`
                        })
                        meanings_block_template += `</div>`
                    }
                    if (meaning['antonyms'].length > 0){
                        meanings_block_template += `<div class="all-antonyms"><p>Antonyms:</p>`
                        meaning['antonyms'].forEach(antonym=>{
                            meanings_block_template += `<button class="all-antonyms">${antonym}</button>`
                        })
                        meanings_block_template += `</div>`
                    }
                    meanings_block_template += `<ol>`
                    meaning['definitions'].forEach(defenition=>{
                        meanings_block_template += `<li><p>${defenition.definition}</p>`
                        if (defenition['example'] !== undefined){
                            meanings_block_template +=  `<div class="example">
                            <p>"${defenition['example']}"</p>
                        </div>`
                        }
                        if (defenition['synonyms'].length > 0){
                            meanings_block_template += `<div class="synonyms"><p>Synonyms:</p>`
                            meaning['synonyms'].forEach(synonym=>{
                                meanings_block_template += `<button>${synonym}</button>`
                            })
                            meanings_block_template += `</div>`
                        }
                        if (defenition['antonyms'].length > 0){
                            meanings_block_template += `<div class="antonyms"><p>Antonyms:</p>`
                            meaning['antonyms'].forEach(antonym=>{
                                meanings_block_template += `<button>${antonym}</button>`
                            })
                            meanings_block_template += `</div>`
                        }
                    })
                    meanings_block_template += `</li><hr></ol></div>` 
                    console.log(meanings_block_template)
                    document.querySelector('.definition-screen-wrapper').insertAdjacentHTML('beforeend',meanings_block_template)     
                })

            }
            else {
                const alert = new Alert()
                alert.show("Invalid word. No dictionary entry found for this word!")
                this.card.style.outline = "2px dashed red"
                this.card.style.backgroundColor = "hsla(0deg,100%,90%,.5)"
                console.log("there is no entry for this word!")
            }
        })
        return this.card
    }
}

const add_card_btn = document.querySelector('.add-button')
const add_card = document.querySelector('.card-add')
const form = document.getElementById('form')

const storage = new Storage()
storage.getWords()

add_card_btn.addEventListener('click', () => {
    const english = form.elements['english'].value
    const persian = form.elements['persian'].value
    if (english !== "" && persian !== "") {
        const card = new Card(english, persian)
        add_card.insertAdjacentElement('beforebegin', card)
        storage.setWord(english, persian)
    }
    else {
        const alert = new Alert()
        alert.show("Please fill the inputs. You can't add empty words!")
    }
})
