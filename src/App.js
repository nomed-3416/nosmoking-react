import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ns from './nosmoking';


class App extends Component{
state = {
  addr:'',
  count:'',
  last:'',
  nosmoking:''
 
};

async componentDidMount(){
  const addr = await ns.methods.addr().call();  
   
  const nosmoking = await ns.methods.noSmoking().call();
  const count = await ns.methods.count().call();
  const last = await ns.methods.last().call();
  const cost = await ns.methods.cost().call();
  
  //_ethAccounts._provider.selectedAddress;
  
  this.setState({ addr, count , cost,last, nosmoking });
}


onClick = async (event) => {
  event.preventDefault(); 
  const accounts = await web3.eth.getAccounts();
  this.setState({message:'Waiting on transaction success.'});

  await ns.methods.setCount().send({from:accounts[0]});
  await ns.methods.countCost().send({from:accounts[0]});
  
 
  
  this.setState({message:'You are true smoker!'});
};


render() {
  return(
    <div>
      <h2>Nosmoking Contract</h2>
      <p>This contract is managed by {this.state.addr} </p>

      <p>I smoked {this.state.count} cigarettes.</p>

      <p>I can buy ¥{this.state.cost} car. </p>

      <p>I don't smoke for  {this.state.nosmoking} seconds.</p>
      
    <hr />
    <form >
      <h4>I smoke every day..</h4>
      <div>
        <label>here comes....</label>
        <button onClick={this.onClick}>enter</button>
      </div>
      <hr />
      <h1>
        {this.state.message}
      </h1>
    </form>
    </div>
  );
}
}

export default App;