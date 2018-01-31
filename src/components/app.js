import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { CSSTransitionGroup } from "react-transition-group"
import ItemForm from "components/form/itemForm.js"
import CategoryForm from "components/form/categoryForm.js"
import ChangeItemForm from "components/form/changeItemForm"
import ItemList from "components/itemList/itemList.js"
import Footer from "components/footer/footer"
import Header from "components/header/header"

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      categoriesLength: 0,
      items: [],
      itemFormActive: false,
      cateFormActive: false,
      changeItemFormActive: false,
      filterVariable: "",
      searchTerm: "",
      itemToChange: "",
      homeMode: true
    }
  }

  // Fetches items and categories from the server
  componentDidMount() {
    fetch("http://localhost:8080/items").then(response => {
      return response.json()
    }).then(json => {
      this.setState({ items: json })
    })
    fetch("http://localhost:8080/categories").then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        categories: json,
        categoriesLength: json.length
      })
    })
  }

  // // Toggles mode of app from home to shop and background from green to gray
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
  showItemForm = () => {
    this.setState({
      itemFormActive: !this.state.itemFormActive
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

  sorting = (a,b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name ) {
      return 1
    }
    return 0
  }

// const sortedItems = items.sort(sorting)


  // Don't know if this makes sense or not... Seems to be working...
  itemCheck = (itemIdentity, keyToUpdate) => {
    // console.log("tjena", itemIdentity, keyToUpdate)
    const foundItem = this.state.items.find(item => item._id === itemIdentity)
    // const foundItemIndex = this.state.items.findIndex(item => item._id === itemIdentity)
    const foundItemIndex = this.state.items.indexOf(foundItem)
    // console.log("denna blev checkad", foundItem, foundItem[keyToUpdate])
    // console.log("den har index", foundItemIndex)
    const itemsCopy = this.state.items
    itemsCopy[foundItemIndex][keyToUpdate] = foundItem[keyToUpdate]
    // debugger
    this.setState({
      items: itemsCopy
    }, () => {
      console.log(this.state.items)
    })
  }

  // Den här funktionen behöver uppdateras
  categoryClick = (cate, cateIndex) => {
    this.setState({
      filterVariable: cate
    })
  }

  // // Den här funktionen behöver uppdateras
  // categoryClick = (cate, cateIndex) => {
  //   this.setState({
  //     filterVariable: cate
  //   })
  //   if (cateIndex > 2) {
  //     this.setState({
  //       filterVariable: cate,
  //       sliceStart: this.state.sliceStart + 1
  //     })
  //   } else if (cateIndex < 2) {
  //     if (this.state.sliceStart === 0) {
  //       this.setState({
  //         sliceStart: this.state.categoriesLength
  //       })
  //     }
  //     this.setState({
  //       filterVariable: cate,
  //       sliceStart: this.state.sliceStart - 1
  //     })
  //   }
  // }

  // Callback function from filter input in Footer to be passed into ItemList
  filterItems = search => {
    this.setState({
      searchTerm: search
    })
  }

  toggleEnterState = () => {
    this.setState({ in: true });
  }

  render() {
    // let fiveCategories = []
    // if (this.state.categoriesLength) {
    //   if (this.state.categoriesLength >= 5) {
    //     fiveCategories = this.state.categories.slice(
    //       this.state.sliceStart,
    //       this.state.sliceStart + this.state.sliceEnd
    //     )
    //     console.log("fem kategorier", fiveCategories)
    //   }
    // }
    return (
      <BrowserRouter>
        <div className={`app-container ${this.state.homeMode ? "app-home-mode" : "app-shop-mode"} `}>
          <Header
            dbCategories={this.state.categories}
            // fiveCategories={fiveCategories}
            showCateForm={this.showCateForm}
            categoryClick={this.categoryClick}
            backgroundHome={this.state.homeMode} />

          <div className={this.state.cateFormActive ? "active" : "inactive"}>
            <CategoryForm
              gotNewCate={this.addNewCate}
              showCateForm={this.showCateForm} />
          </div>

          {/* <CSSTransitionGroup> */}
            {/* <div className={this.state.itemFormActive ? "active" : "inactive"}> */}
            {this.state.itemFormActive && <ItemForm
                dbCategories={this.state.categories}
                gotNewItem={this.addNewItem}
                showItemForm={this.showItemForm} />
              }
            {/* </div> */}
          {/* </CSSTransitionGroup> */}

          <div className={this.state.changeItemFormActive ? "active" : "inactive"}>
            <ChangeItemForm
              dbCategories={this.state.categories}
              gotChangeItem={this.state.itemToChange}
              showChangeItemForm={this.showChangeItemForm} />
          </div>

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
