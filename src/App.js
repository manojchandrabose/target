import React from 'react';
import "./App.css";
import jsonData from './data.json';

const listNav = ['Butterfly', 'Cars', 'Cellphone', 'Office']

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      activeCate: listNav[0],
      data: [],
      error: false,
      imgOpacity: null,
      opacityFlg: false
    }
  }
  componentDidMount() {
    this.timer = null;
    this.setState({data: jsonData[listNav[0]]})
  }
  showProds = (prod) => {
    this.setState({activeCate: prod, data: jsonData[prod]})
  }
  handleChange = (e) => {
    clearTimeout(this.timer);
    this.setState({ value: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }
  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
        clearTimeout(this.timer);
        this.triggerChange();
    }
  }
  triggerChange = () => {
      const { value } = this.state;
      if (value && listNav.indexOf(value) !== -1) {
        this.setState({error: false, activeCate: value, data: jsonData[value]})
      } else {
        this.setState({error: true})
      }
  }
  addOpacity = (e) => {
    this.setState({imgOpacity: e.target.value})
  }
  updateOpacity = () => {
    this.setState({opacityFlg: true})
  }
  render() {
    return (
        <div className='app'>
          <div className='header'>
            <div className='logo'><h3>{/*logo*/}</h3></div>
            <div className='search'>
              <input type='text' placeholder='Search & Enter' className='inputsearch'
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              />
            </div>
          </div>
          <div className='container'>
            <div className='sidebar'>
              <ul style={{'display': 'inline'}}>
              {listNav.map((item, index) => (
                  <li key={index} className={this.state.activeCate === item ? 'active listItem' : 'listItem'} onClick={() => this.showProds(item)}>{item}</li>
                ))}
              </ul>
              <div className='opacityinput'>
                <input type='text' placeholder='opacity' onChange={this.addOpacity} />
                <button onClick={this.updateOpacity}>opacity</button>
              </div>
            </div>
            <div className='maincontent'>
            {!this.state.error ? 
              <div className="row product-list">
                {this.state.data.map((item, index) => (
                <div className="col-md-4" key={index}>
                    <section className="panel">
                        <div className="pro-img-box">
                            <img src={item.image} alt="" style={{'opacity' : (this.state.opacityFlg) ? this.state.imgOpacity : 1}} className='prodImg'/>
                        </div>
                        <div className="panel-body text-center">
                            <h4><a href="#" className="pro-title">{item.text}</a></h4>
                        </div>
                    </section>
                </div>
                ))}
              </div>
            : 
              <p style={{'padding': '0 1rem'}}>No Search Found!!</p>
            }
            </div>
          </div>
        </div>
    )
  }
}
