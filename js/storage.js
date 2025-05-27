class Storage {
    constructor() {
        this.add_card = document.querySelector('.card-add')
    }

    getWords() {
        for (let item = 0; item < localStorage.length; item++) {
            const english = localStorage.key(item)
            const persian = localStorage.getItem(localStorage.key(item))
            const card = new Card(english,persian)
            this.add_card.insertAdjacentElement('beforebegin', card)
        }
    }

    removeWord(item){
        localStorage.removeItem(item)
    }

    setWord(key,value) {
        localStorage.setItem(key, value)
    }

}