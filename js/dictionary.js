class Dictionary {
    constructor() {
    }

    async fetchDictionary(word) {
        const definition = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(res => res.json()).then(res=>res).catch(err=>err)
        return definition
    }
}

