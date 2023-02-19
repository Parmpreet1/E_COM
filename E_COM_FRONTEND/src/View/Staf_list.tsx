
import React, { Component } from 'react'

export default class Staf_list extends Component {
    constructor(props) {
        super(props);
        
        this.doSomething = this.doSomething.bind(this)
        this.onchange = this.onchange.bind(this)
      }
    state={
        message:"parm",
        name:"parm sohi",
        password:"gsjsgdjks"
    }
    doSomething(){
        this.setState({
            message:"Sohi"
        })
    }
    onchange(e){
        const {name,value}=e.target
        this.setState({
            ...this.state,[name]:value
        })

    }
  render() {
    return (
      <div className="bg-light"><h1>Welcome to class based components</h1>
      <h2>{this.state.message}</h2>
      <button onClick={this.doSomething}>click me</button>
      <form action="">
        Name:
        <input type="text" value={this.state.name} onChange={this.onchange} />
        password:
        <input type="text" value={this.state.password} onChange={this.onchange}/>
        <input type="submit" />
      </form>
      </div>
    )
  }
}