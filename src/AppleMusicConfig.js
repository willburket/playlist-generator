import React, { useEffect, useState } from 'react';

class AppleMusicConfig extends React.Component{
  constructor (props){
    super(props);
    this.state = {data: null};
  }

  componentDidMount(){
    fetch('/jwt')
      .then(response => response.json())
      .then(data => {
        this.setState({data})
        try{
          window.MusicKit.configure({
            developerToken: data.token,
            app: {
              name: 'PlaylistGenerator',
              build: '1',
            },
          });
        console.log("configuration success")
        }
        catch(err){
          console.log(err)
        }
      }).then(() => {
        var music = window.MusicKit.getInstance()
        music.authorize()
        const storefront = 'us'
        const search_term = 'dance'
        const genre = 'dance'
        const data = music.api.music('v1/catalog/{storefront}/search?term={search_term}&genre={genre}');
        // console.log(data.toString())
        music.unauthorize()
      }
      );
    ;
  }

  render(){
      if (!this.state.data) {
        return <p>Loading...</p>;
      }
      else{  
        return (
            <div>
              <p>Received data {this.state.data.token} </p>
            </div>
          );
      }
  }
}

function AppleMusicAuth(){
  const [isAuthorized, setIsAuthorized] = useState(false)
  var music = window.MusicKit.getInstance()
        
  function handleStatusChange(){
    if (isAuthorized == false){
      music.authorize()
    }
    else{
      music.unauthorize()
    }
    setIsAuthorized(!isAuthorized)
  }
  

  return(
    <div>
      <button onClick = {handleStatusChange}>
        Authorize
      </button>
    </div>
  );
}

export {AppleMusicConfig, AppleMusicAuth};


      