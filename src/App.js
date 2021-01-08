import React from 'react'
 

class App extends React.Component{
  
  
  constructor(props){
    super(props);
    this.state={
      query:"",
      weather:{},
      api : {
        key:"YOUR API KEY",
        base:"API BASE URL"
      }
    }
  }
  
  


  search = (evt) => {
    if(evt.key === "Enter"){
      var url = `${this.state.api.base}weather?q=${this.state.query}&units=metric&APPID=${this.state.api.key}`;
      fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState({weather:result});
        this.setState({query:""});
        console.log(this.state.weather);
      })
    }
  }
  



  dateBuilder(d){
    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }





  weatherType = ()=>{

    if(typeof this.state.weather.main != "undefined")
    {
      switch(this.state.weather.weather[0].main)
      {
        case 'Haze':
          return 'app haze';
          
        case 'Clouds':
          return 'app cloud';

        case 'Clear':
          return "app clear";
        
        case "Rain":
          return "app rain";

        case "Thunderstorm":
          return "app thunder"

        default:
          return 'app'
      }
    }else {
      return 'app'
    }
  }


  render(){
    return (
      <div className={this.weatherType()} >
        <main>
          <div className="search-box">
            <input 
            type="text" 
            className="search-bar" 
            placeholder="Search" 
            onChange={e=>this.setState({query:e.target.value})}
            value={this.state.query}
            onKeyPress={this.search} 
            />
          </div>
          {(typeof this.state.weather.main!= "undefined") ? (
          <div>
              <div className="location-box">
                <div className="location">{this.state.weather.name}, {this.state.weather.sys.country}</div>
                <div className="date">{this.dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {this.state.weather.main.temp}
                </div>
              <div className="weather">
                {this.state.weather.weather[0].description}
              </div>
            </div>
          </div>
          ) : ('')
    }
        </main>
      </div>
    );
  }
}

export default App