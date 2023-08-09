export function shuffle(search){
    let currentIndex = search.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [search[currentIndex], search[randomIndex]] = [
        search[randomIndex], search[currentIndex]];
    }
    return search;
}