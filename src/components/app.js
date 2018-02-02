import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import ItemForm from "components/form/itemForm.js"
import CategoryForm from "components/form/categoryForm.js"
import ChangeItemForm from "components/form/changeItemForm"
import ItemList from "components/itemList/itemList.js"
import Footer from "components/footer/footer"
import Header from "components/header/header"

const units = ["pcs", "g", "hg", "kg", "l", "dl", "ml", "bag", "jar", "bottle"]

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      items: [],
      itemFormActive: false,
      cateFormActive: false,
      changeItemFormActive: false,
      filterVariable: "",
      searchTerm: "",
      itemToChange: {},
      homeMode: true
    }
  }

  // Fetches items and categories from the server
  componentDidMount() {
    fetch("https://pantriqueen.herokuapp.com/items/").then(response => {
      return response.json()
    }).then(json => {
      this.setState({ items: json })
    })
    fetch("https://pantriqueen.herokuapp.com/categories").then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        categories: json
      })
    })
  }

  // Toggles mode of app from home to shop and background from green to gray
  toggleAppMode= mode => {
    if (mode === "home-mode") {
      this.setState({
        homeMode: true
      })
    } else if (mode === "shop-mode") {
      this.setState({
        homeMode: false
      })
    }
  }

  // Toggles visibility of the form for adding items
  showItemForm = category => {
    this.setState({
      itemFormActive: !this.state.itemFormActive,
      itemFormCategory: category
    })
  }

  // Toggles visibility of the form for adding categories
  showCateForm = () => {
    this.setState({
      cateFormActive: !this.state.cateFormActive
    })
  }

  // Toggles visibility of the form for changing items
  showItemChangeForm = item => {
    this.setState({
      itemToChange: item
      // changeItemFormActive: !this.state.changeItemFormActive
    }, () => {
      console.log("denna ska ändras i app", this.state.itemToChange)
      this.setState({
        changeItemFormActive: !this.state.changeItemFormActive
      })
    })
  }

  // Add new item to state
  addNewItem = itemObject => {
    // console.log("new item to add to app state", itemObject)
    this.setState({
      items: [...this.state.items, itemObject]
    })
  }

  // Add new category to state
  addNewCate = itemObject => {
    console.log("new category to add to app state", itemObject)
    this.setState({
      categories: [...this.state.categories, itemObject]
    })
  }

  // Alphabetical sorting
  sorting = (a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  }

  // Buy sorting
  buySorting = (a, b) => {
    // true values first returns 0
    if (a.buy === b.buy) {
      return 0
    } else if (a.buy) {
      return 1
    } else return -1
  }

  // Home sorting
  homeSorting = (a, b) => {
    // true values first returns 0
    if (a.got === b.got) {
      return 0
    } else if (a.got) {
      return -1
    } else return 1
  }

  // Changes the value of buy and home both in state and server.
  itemCheck = (itemIdentity, itemToChange, keyToUpdate) => {
    const foundItem = this.state.items.find(item => item._id === itemIdentity)
    const foundItemIndex = this.state.items.indexOf(foundItem)
    const itemsCopy = this.state.items
    itemsCopy[foundItemIndex][keyToUpdate] = itemToChange[keyToUpdate]
    this.setState({
      items: itemsCopy
    }, () => {
      fetch(`https://pantriqueen.herokuapp.com/items/${itemIdentity}`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(itemToChange)
      }).then(response => response.json())
    })
  }

  // Changes the value of item both in state and server.
  updateItem = (changedItem, itemIdentity) => {
    console.log(itemIdentity)
    const foundItem = this.state.items.find(item => item._id === itemIdentity)
    const foundItemIndex = this.state.items.indexOf(foundItem)
    const itemsCopy = this.state.items
    itemsCopy[foundItemIndex] = changedItem
    this.setState({
      items: itemsCopy,
      changeItemFormActive: false
    }, () => {
      fetch(`https://pantriqueen.herokuapp.com/items/${itemIdentity}`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(changedItem)
      }).then(response => response.json())
    })
  }

  // Den här funktionen behöver uppdateras
  categoryClick = (cate, cateIndex) => {
    this.setState({
      filterVariable: cate
    })
  }

  // Callback function from filter input in Footer to be passed into ItemList
  filterItems = search => {
    this.setState({
      searchTerm: search
    })
  }

  deleteItem = itemIdentity => {
    console.log("Got an item to delete", itemIdentity)
    const foundItem = this.state.items.find(item => item._id === itemIdentity) // Hittar den i state
    const foundItemIndex = this.state.items.indexOf(foundItem) // tar ut index
    const itemsCopy = this.state.items // Gör en kopia
    itemsCopy.splice(foundItemIndex, 1) // splicear bort den ur kopian
    this.setState({
      items: itemsCopy
    }, () => {
      console.log("nu är den borttagen", this.state.items)
      fetch(`https://pantriqueen.herokuapp.com/items/${itemIdentity}`, {
        method: "DELETE"
      })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className={`app-container ${this.state.homeMode ? "app-home-mode" : "app-shop-mode"} `}>
          <Header
            dbCategories={this.state.categories}
            showCateForm={this.showCateForm}
            categoryClick={this.categoryClick}
            backgroundHome={this.state.homeMode} />

          {this.state.cateFormActive &&
            <CategoryForm
              gotNewCate={this.addNewCate}
              showCateForm={this.showCateForm} />}

          {this.state.itemFormActive &&
            <ItemForm
              dbCategories={this.state.categories}
              gotNewItem={this.addNewItem}
              showItemForm={this.showItemForm}
              initialCategory={this.state.itemFormCategory}
              units={units} />
          }

          {this.state.changeItemFormActive &&
            <ChangeItemForm
              dbCategories={this.state.categories}
              changeItem={this.state.itemToChange}
              showChangeItemForm={this.showItemChangeForm}
              units={units}
              deleteItem={this.deleteItem}
              updateItem={this.updateItem} />
          }

          <Route
            exact
            path="/"
            render={routeProps =>
              <ItemList
                {...routeProps}
                mode="home-mode"
                listItems={this.state.items.sort(this.sorting)}
                showItemForm={this.showItemForm}
                showItemChangeForm={this.showItemChangeForm}
                filterVariable={this.state.filterVariable}
                searchTerm={this.state.searchTerm}
                checkItem={this.itemCheck} />
            } />

          <Route
            exact
            path="/shopping-mode"
            render={routeProps =>
              <ItemList
                {...routeProps}
                mode="shopping-mode"
                listItems={this.state.items.sort(this.sorting)}
                showItemForm={this.showItemForm}
                showItemChangeForm={this.showItemChangeForm}
                filterVariable={this.state.filterVariable}
                searchTerm={this.state.searchTerm}
                checkItem={this.itemCheck} />
            } />

          <Footer
            filterItems={this.filterItems}
            toggleAppBackground={this.toggleAppMode}
            backgroundHome={this.state.homeMode} />

        </div>
      </BrowserRouter>
    )
  }

}

export default App
