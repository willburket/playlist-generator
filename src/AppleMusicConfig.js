import React from 'react';

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
        console.log("success")
        }
        catch(err){
          console.log(err)
        }
        
      const music = window.MusicKit.getInstance()
      // music.authorize()
      // const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
      // const result = music.api.music(`/v1/catalog/{{storefrontId}}/activities`, queryParameters);
      // console.log(result)

      });
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

export default AppleMusicConfig;

// const music = window.MusicKit.getInstance()
      // // await music.authorize();
  
      // // testing music
      
  
      // const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
      // const result = await music.api.music(`/v1/catalog/{{storefrontId}}/activities`, queryParameters);
      // console.log(result)
      