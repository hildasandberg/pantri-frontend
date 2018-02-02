import React from "react"
import "./form.css"

export default class ChangeItemForm extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      changeItem: {
        _id: props.changeItem._id,
        name: props.changeItem.name,
        category: props.changeItem.category,
        amount: props.changeItem.amount,
        unit: props.changeItem.unit,
        got: props.changeItem.got,
        buy: props.changeItem.buy
      }
    }
  }

  handleInput = event => {
    const { changeItem } = this.state
    changeItem[event.target.name] = event.target.value
    this.setState({ changeItem })
  }

  handleCheck = event => {
    console.log("The item was checked ", event.target.name)
    const { changeItem } = this.state
    changeItem[event.target.name] = !changeItem[event.target.name]
    this.setState({ changeItem })
  }

  deleteItem = () => {
    console.log("The item shall be deleted ", this.props.changeItem._id)
    this.props.deleteItem(this.props.changeItem._id)
  }

  handleSubmit = event => {
    console.log("Submittar form och vill skicka", this.state.changeItem)
    event.preventDefault()
    this.props.updateItem(this.state.changeItem, this.state.changeItem._id)
    this.setState({
      changeItem: {
        id: "",
        name: "",
        category: "",
        amount: "",
        unit: "",
        got: "",
        buy: ""
      }
    })
  }

  render() {
    return (
      <div className="page-darker">
        <div className="item-form-container">
          <div className="red-buttons">
            <button className="delete-btn" onClick={this.deleteItem}>
              <i className="fas fa-trash-alt" />
            </button>
            <button className="close-btn" onClick={this.props.showChangeItemForm}> Close </button>
          </div>
          <form onSubmit={this.handleSubmit} className={`form-container ${this.props.type}`}>
            <h3>Change item</h3>
            <div>
              Name:
              <input
                required
                maxlength="25"
                type="text"
                name="name"
                placeholder={this.state.changeItem.name}
                value={this.state.changeItem.name}
                onChange={this.handleInput} />
            </div>

            <div
              className="inputCategory"
              value={this.state.changeItem.category} >
              Category:
              <select
                onChange={this.handleInput}
                className="selectCategory"
                name="category"
                defaultValue={this.props.changeItem.category} >
                {this.props.dbCategories.map(item =>
                  <option
                    selected={this.props.changeItem.category === item.name}
                    value={item.name}
                    key={item._id} >
                    {item.name}
                  </option>)
                }
              </select>
            </div>

            Amount:
            <input
              type="text"
              name="amount"
              maxlength="25"
              placeholder={this.props.changeItem.amount}
              value={this.state.changeItem.amount}
              onChange={this.handleInput} />

            <div
              className="inputUnit"
              value={this.state.changeItem.unit} >
              Unit:
              <select
                onChange={this.handleInput}
                className="selectUnit"
                name="unit"
                defaultValue={this.props.changeItem.unit} >
                {this.props.units.map(item =>
                  <option
                    selected={this.props.changeItem.unit === item}
                    key={item}
                    value={item}>
                    {item}
                  </option>)
                }
              </select>
            </div>

            <div className="form-item-status">
              <div className="home-container">
                <label className="home-label">
                  <input
                    className="home-input"
                    name="got"
                    type="checkbox"
                    checked={this.state.changeItem.got}
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
                    checked={this.state.changeItem.buy}
                    onChange={this.handleCheck} />
                  <i className="fas fa-shopping-cart" />
                </label>
              </div>
            </div>

            <div>
              <button className="submit-btn" type="submit"> Change item </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
