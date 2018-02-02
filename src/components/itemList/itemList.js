import React from "react"
import Item from "components/item/item.js"
import "./itemList.css"

class ItemList extends React.Component {

  handleAddClick = () => {
    this.props.showItemForm(this.props.filterVariable)
  }

  checkItem = (identity, item, keyToUpdate) => {
    this.props.checkItem(identity, item, keyToUpdate)
  }

  render() {
    let itemsToRender = this.props.listItems

    // Filter the ones that have buy = true
    if (this.props.mode === "shopping-mode") {
      itemsToRender = itemsToRender.filter(item =>
        item.buy)
      // Filter category
      if (this.props.filterVariable) {
        itemsToRender = itemsToRender.filter(item =>
          item.category === this.props.filterVariable)
      }
      // Filter on searchterm
      if (this.props.searchTerm) {
        const searchFor = this.props.searchTerm.toUpperCase()
        itemsToRender = itemsToRender.filter(item =>
          item.name.toUpperCase().includes(searchFor))
      }
    } else {
      // Filter on category
      if (this.props.filterVariable) {
        itemsToRender = itemsToRender.filter(item =>
          item.category === this.props.filterVariable)
      }
      // Filter on searchterm
      if (this.props.searchTerm) {
        const searchFor = this.props.searchTerm.toUpperCase()
        itemsToRender = itemsToRender.filter(item =>
          item.name.toUpperCase().includes(searchFor))
      }
    }

    return (
      <div className="item-in-list">
        {this.props.filterVariable && <h3>{this.props.filterVariable}</h3>}
        {itemsToRender.map(item =>
          <Item
            key={item._id}
            item={item}
            itemCheck={this.checkItem}
            showItemChangeForm={this.props.showItemChangeForm} />)}
        <button className="add-item-button" onClick={this.handleAddClick}><i className="fas fa-plus" /></button>
      </div>
    )
  }
}

export default ItemList
