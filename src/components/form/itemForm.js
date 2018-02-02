import React from "react"
import "./form.css"

export default class ItemForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      addNewItem: {
        name: "",
        category: props.initialCategory,
        amount: "",
        unit: "",
        got: false,
        buy: false
      },
      showAddpop: false
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
  }

  handleSubmit = event => {
    console.log("Submittar form och vill skicka", this.state.addNewItem)
    event.preventDefault()
    fetch("https://pantriqueen.herokuapp.com/items", {
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
      if (response.ok) {
        this.setState({
          addNewItem: {
            name: "",
            category: "",
            amount: "",
            unit: "",
            got: false,
            buy: false,
          },
          showAddpop: true
        }, () => {
          setInterval(() => {
            this.setState({
              showAddpop: false
            })
          }, 2000)
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
            <h3>Add item</h3>
            <div>
              Name:
              <input
                required
                maxlength="25"
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
                  <option
                    selected={this.props.initialCategory === item.name}
                    value={item.name}
                    key={item._id} >{item.name}
                  </option>)
                }
              </select>
            </div>

            {this.state.showAddpop &&
              <div className="add-popup">
                Added!
              </div>
            }

            Amount:
            <input
              maxlength="25"
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
                {this.props.units.map(item =>
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
