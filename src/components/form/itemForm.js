import React from "react"
import "./form.css"

const units = ["Choose a unit", "pcs", "g", "hg", "kg", "l", "dl", "ml", "bag", "bottle"]

export default class ItemForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      // categories: cate,
      addNewItem: {
        name: "",
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

  handleCheck = event => {
    console.log("The item was checked ", event.target.name)
    const { addNewItem } = this.state
    addNewItem[event.target.name] = !addNewItem[event.target.name]
    this.setState({ addNewItem })
    // , () => {
    //   this.props.checkItem(this.props.id, this.state.done)
    // }
  }

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
        <div className="item-form-container">
          <button className="close-btn" onClick={this.props.showItemForm}> Close </button>

          <form onSubmit={this.handleSubmit} className={`form-container ${this.props.type}`}>
            <div>
              Name:
              <input
                type="text"
                name="name"
                placeholder="Item name"
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

            Amount:
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

            <div className="form-item-status">
              <div className="home-container">
                <label className="home-label">
                  <input
                    className="home-input"
                    name="got"
                    type="checkbox"
                    checked={this.state.addNewItem.got}
                    onChange={this.handleCheck} />
                  <i className="fas fa-home" />
                </label>
              </div>

              <div className="shop-container">
                <label className="shop-label">
                  <input
                    className="buy-input"
                    name="buy"
                    type="checkbox"
                    checked={this.state.addNewItem.buy}
                    onChange={this.handleCheck} />
                  <i className="fas fa-shopping-cart" />
                </label>
              </div>
            </div>

            <div>
              <button className="submit-btn" type="submit"> Add item </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
