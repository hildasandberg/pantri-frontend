import React from "react"
import Slider from "react-slick"
import "./header.css"

class Header extends React.Component {

  handleAddClick = () => {
    this.props.showCateForm()
  }

  handleCategoryClick = event => {
    console.log("index på den klickade komponenten", event.target.dataset.message)
    this.props.categoryClick(event.target.name, event.target.dataset.message)
  }

  render() {

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      swipeToSlide: true,
      adaptiveHeight: true,
      initialSlide: 3,
      responsive: [
        { breakpoint: 460,
          settings: { slidesToShow: 5 }
        },
        { breakpoint: 680,
          settings: { slidesToShow: 7 }
        },
        { breakpoint: 10000,
          settings: { slidesToShow: 7 }
        }
        ,
        { breakpoint: 100000,
          settings: 'unslick'
        }
      ]
    }

    return (
      <div className="header-container">
        <div className={`app-name ${this.props.backgroundHome ? "header-home-mode" : "header-shop-mode"} `}> Pantri </div>
        <div className="header-cate-container">
          <Slider {...settings}>
            {this.props.dbCategories.map((item, index) =>
              <div key={item._id} className="one-cate">
                <div className="one-cate-image">
                  <img
                  onClick={this.handleCategoryClick}
                  name={item.name}
                  alt={item.name}
                  src={item.icon}
                  data-message={index} />
                </div>
                <p className={`header-p ${this.props.backgroundHome ? "header-p-home-mode" : "header-p-shop-mode"} `}>{item.name}</p>
              </div>)
            }
          </Slider>
        </div>
        <div className="header-button-container">
          <button className="clear-cate-button" onClick={this.handleCategoryClick} name="" >Show all</button>
          <button className="add-cate-button" onClick={this.handleAddClick}> Add category </button>
        </div>
      </div>
    )
  }
}

export default Header
