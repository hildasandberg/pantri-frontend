import React from "react"
import "./item.css"

export default class ItemForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showHomepop: false,
      showBuypop: false
    }
  }

  // Change information about an item
  changeItem = (item, event) => {
    this.props.showItemChangeForm(item)
  }

  // Change the value of got or buy to the opposite, change in app and change in server
  handleCheck = event => {
    const item = this.props.item
    const keyToUpdate =  event.target.name
    item[event.target.name] = !item[event.target.name]
    const identity = this.props.item._id
    this.props.itemCheck(identity, item, keyToUpdate)
    if (event.target.name === "got" && item[event.target.name]) {
      this.setState({
        showHomepop: true
      }, () => {
        setInterval(() => {
          this.setState({
            showHomepop: false
          })
        }, 2000)
      })
    } else if (event.target.name === "buy" && item[event.target.name]) {
      this.setState({
        showBuypop: true
      }, () => {
        setInterval(() => {
          this.setState({
            showBuypop: false
          })
        }, 2000)
      })
    }
  }

  // <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  // <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

  render() {
    return (
      <div className="one-item">
        <div className="item-summary">
          <div className="item-name"  onClick={(e) => this.changeItem(this.props.item, e)} >
            {this.props.item.name}
          </div>
          <div className="item-amount">
            <div>{this.props.item.amount} {this.props.item.unit}</div>
          </div>
        </div>

        <div className="item-status">

          <div className="home-container">
            <label className="home-label">
              {this.state.showHomepop &&
                <div className="home-popup">
                  Added to home list
                </div>
              }
              <input
                className="home-input"
                name="got"
                type="checkbox"
                checked={this.props.item.got}
                onChange={this.handleCheck} />
              <i className="fas fa-home" />
            </label>
          </div>

          <div className="shop-container">
            <label className="shop-label">
              {this.state.showBuypop &&
                <div className="buy-popup">
                  Added to shopping list
                </div>
              }
              <input
                className="buy-input"
                name="buy"
                type="checkbox"
                checked={this.props.item.buy}
                onChange={this.handleCheck} />
              <i className="fas fa-shopping-cart" />
            </label>
          </div>

        </div>
      </div>
    )
  }
}
