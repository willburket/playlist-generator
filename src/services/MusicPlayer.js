export async function makeQueue(){
    try{
        const id_array = search.map(function(song){
            return song.id;
        });
        await music.setQueue({songs: id_array, startPlaying: false});    
       
    }
    catch(err){
        console.log(err);
    }   
}

export function play(){    
    if(search && search.length !== 0){
        if(!playing){
            music.play().catch(error => {console.log(error)});      
        }
        else{
            music.pause().catch(error => {console.log(error)});    
        }                                            
    }               
}

export function next(){
    if(search && search.length !== 0){
        music.skipToNextItem().catch(error => {
            console.log(error)
        });    
    }            
}

export function back(){
    if(search && search.length !== 0){
        music.skipToPreviousItem().catch(error => {
            console.log(error)
        });
    }
}
