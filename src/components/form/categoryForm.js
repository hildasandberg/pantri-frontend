import React from "react"
import ChooseIcon from "components/form/chooseicon"
import "./form.css"

const categoryIcon = [
  "images/my-icons-collection/png/002-can.png",
  "images/my-icons-collection/png/003-cookies.png",
  "images/my-icons-collection/png/004-freezer-1.png",
  "images/my-icons-collection/png/005-freezer.png",
  "images/my-icons-collection/png/006-fruit-4.png",
  "images/my-icons-collection/png/007-food-20.png",
  "images/my-icons-collection/png/008-food-19.png",
  "images/my-icons-collection/png/009-food-18n.png",
  "images/my-icons-collection/png/010-drink-4.png",
  "images/my-icons-collection/png/011-food-17.png",
  "images/my-icons-collection/png/012-food-16.png",
  "images/my-icons-collection/png/013-bottle.png",
  "images/my-icons-collection/png/014-fruit-3.png",
  "images/my-icons-collection/png/015-fruit-2.png",
  "images/my-icons-collection/png/016-food-15.png",
  "images/my-icons-collection/png/017-food-14.png",
  "images/my-icons-collection/png/018-food-13.png",
  "images/my-icons-collection/png/019-food-12.png",
  "images/my-icons-collection/png/020-drink-3.png",
  "images/my-icons-collection/png/021-drink-2.png",
  "images/my-icons-collection/png/022-shape.png",
  "images/my-icons-collection/png/023-food-11.png",
  "images/my-icons-collection/png/024-fruit-1.png",
  "images/my-icons-collection/png/025-food-10.png",
  "images/my-icons-collection/png/026-drink-1.png",
  "images/my-icons-collection/png/027-food-9.png",
  "images/my-icons-collection/png/028-drink.png",
  "images/my-icons-collection/png/029-food-8.png",
  "images/my-icons-collection/png/030-food-7.png",
  "images/my-icons-collection/png/031-food-6.png",
  "images/my-icons-collection/png/032-food-5.png",
  "images/my-icons-collection/png/033-fruit.png",
  "images/my-icons-collection/png/034-beer.png",
  "images/my-icons-collection/png/035-food-4.png",
  "images/my-icons-collection/png/036-food-3.png",
  "images/my-icons-collection/png/037-technology.png",
  "images/my-icons-collection/png/038-food-2.png",
  "images/my-icons-collection/png/039-food-1.png",
  "images/my-icons-collection/png/040-food.png",
  "images/my-icons-collection/png/041-kitchen-1.png",
  "images/my-icons-collection/png/042-kitchen-utensils.png",
  "images/my-icons-collection/png/043-crystal.png",
  "images/my-icons-collection/png/044-french-press.png",
  "images/my-icons-collection/png/045-kitchen.png",
  "images/my-icons-collection/png/046-pepper.png",
  "images/my-icons-collection/png/047-coffee-maker.png",
  "images/my-icons-collection/png/047-fridge",
  "images/my-icons-collection/png/047-home.png",
  "images/my-icons-collection/png/001-pet-food-can.png"
]

export default class CategoryForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      addNewCategory: {
        name: "",
        icon: ""
      },
      showAddpop: false
    }
  }

  setIcon = icon => {
    const { addNewCategory } = this.state
    addNewCategory.icon = icon
    this.setState({ addNewCategory })
  }

  handleInput = event => {
    const { addNewCategory } = this.state
    addNewCategory[event.target.name] = event.target.value
    this.setState({ addNewCategory })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("https://pantriqueen.herokuapp.com/categories", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.addNewCategory)
    }).then(response => {
      console.log(response)
      const newbie = this.state.addNewCategory
      console.log("ny kategori", newbie)
      this.props.gotNewCate(newbie)
      // return response.json()
      if (response.ok) {
        console.log("Svaret OK", response.ok)
        this.setState({
          addNewCategory: {
            name: "",
            icon: ""
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
          <button className="close-btn" onClick={this.props.showCateForm}> Close </button>

          <form onSubmit={this.handleSubmit} className="item-form">
            <h3>Add category</h3>
            <div>
              Category name:
              <input
                required
                maxlength="30"
                type="text"
                name="name"
                placeholder="category name"
                value={this.state.addNewCategory.name}
                onChange={this.handleInput} />
            </div>
            {this.state.showAddpop &&
              <div className="add-popup">
                Added!
              </div>
            }
            Choose an icon:
            <div className="kategorierIkoner">
              {categoryIcon.map(catIcon => (
                <ChooseIcon
                  icon={catIcon}
                  setIcon={this.setIcon} />
              ))}
            </div>

            <div>
              <button className="submit-btn" type="submit"> Add Category </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
