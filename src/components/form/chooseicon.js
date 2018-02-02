import React from "react"
import "./form.css"

export default class ChooseIcon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectIcon: ""
    }
  }

  changeSymbol = event => {
    this.setState({
      selectIcon: event.target.value
    }, () => {
      this.props.setIcon(this.state.selectIcon)
    })
  }

  render() {
    return (
      <label className="radiolabel">
        <input className="radioinput" type="radio" name="icon" onChange={this.changeSymbol} value={this.props.icon} />
        <img className="category-icon" src={this.props.icon} alt="" />
      </label>
    )
  }
}
