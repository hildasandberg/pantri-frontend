import React from "react"
import "./form.css"

const units = ["pcs", "g", "hg", "kg", "l", "dl", "ml", "bag", "bottle"]

export default class ChangeItemForm extends React.Component {

  constructor(props) {
    super(props)

    if (this.props.gotChangeItem) {
      console.log("halloooo", this.props.gotChangeItem)
    }

    this.state = {
      // categories: cate,
      addNewItem: {
        name: this.props.gotChangeItem.name,
        category: "",
        amount: "",
        unit: "",
        got: false,
        buy: false
      }
    }
  }

  handleInput = event => {
    const { addNewItem } = this.state
    addNewItem[event.target.name] = event.target.value
    this.setState({ addNewItem })
  }

  // Ändra denna till en put.
  handleSubmit = event => {
    console.log("Submittar form och vill skicka", this.state.addNewItem)
    event.preventDefault()
    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.addNewItem)
    }).then(response => {
      console.log(response)
      const newbie = this.state.addNewItem
      this.props.gotNewItem(newbie)
      // return response.json()
      if (response.ok) {
        this.setState({
          addNewItem: {
            name: "",
            category: "",
            amount: "",
            unit: "",
            got: false,
            buy: false
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="page-darker">
        <div className="category-form-container">
          <button className="close-btn" onClick={this.props.showChangeItemForm}> Close </button>

          <form onSubmit={this.handleSubmit} className={`form-container ${this.props.type}`}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Add you item here"
                value={this.state.addNewItem.name}
                onChange={this.handleInput} />
            </div>

            <div
              className="inputCategory"
              value={this.state.addNewItem.category}
              onChange={this.handleInput}>
              Category:
              <select className="selectCategory" name="category">
                {this.props.dbCategories.map(item =>
                  <option value={item.name} key={item._id} >{item.name}</option>)
                }
              </select>
            </div>

            <input
              type="text"
              name="amount"
              placeholder="How much"
              value={this.state.addNewItem.amount}
              onChange={this.handleInput} />

            <div
              className="inputUnit"
              value={this.state.addNewItem.unit}>
              Unit:
              <select className="selectUnit" name="unit" onChange={this.handleInput}>
                {units.map(item =>
                  <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            Got this at home?
            <input
              className="gotAtHome"
              name="got"
              type="checkbox"
              checked={this.state.addNewItem.got}
              onChange={this.handleCheck} />

            Need to buy?
            <input
              className="toBuy"
              name="buy"
              type="checkbox"
              checked={this.state.addNewItem.buy}
              onChange={this.handleCheck} />

            <div>
              <input className="submit-btn" type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
