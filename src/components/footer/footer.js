import React from "react"
import { Link } from "react-router-dom"
import "./footer.css"

class Footer extends React.Component {

  filterItems = event => {
    // console.log("trying to search for", event.target.value)
    this.props.filterItems(event.target.value)
  }

  changeMode = event => {
    this.props.toggleAppBackground(event.target.className)
  }

  render() {
    return (
      <div className={`footer-container ${this.props.backgroundHome ? "footer-home-mode" : "footer-shop-mode"} `}>
        <Link to="/">
          <button
            onClick={this.changeMode}
            className="home-mode">
            Home
          </button>
        </Link>

        <input
          type="text"
          className="search-items"
          placeholder="Search..."
          onChange={this.filterItems} />

        <Link to="/shopping-mode">
          <button
            onClick={this.changeMode}
            className="shop-mode"> Shop
          </button>
        </Link>
      </div>
    )
  }
}
export default Footer
