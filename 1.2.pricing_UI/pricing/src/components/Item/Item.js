import React from "react";
import DrinkOptionModal from "../DrinkOptionModal/DrinkOptionModal";
import FoodOptionModal from "../FoodOptionModal/FoodOptionModal";
import coffeeImage from "../../images/coffee.png";
import { tw } from "twind";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleAddToCart = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleConfirmModal = (item) => {
    this.setState({ showModal: false });
    const { showError, errorText, ...filteredItem } = item;

    // TODO:
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const newCartItems = cartItems ? [...cartItems, item] : [item];
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    // this.props.onAddToCart(filteredItem);
  };

  render() {
    const { showModal } = this.state;
    const { item } = this.props;

    return (
      <div
        className={tw`max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden`}
      >
        {showModal && item.type === "drink" && (
          <DrinkOptionModal
            open={showModal}
            onClose={this.handleCloseModal}
            onConfirm={this.handleConfirmModal}
            item={item}
          />
        )}

        {showModal && item.type === "food" && (
          <FoodOptionModal
            open={showModal}
            onClose={this.handleCloseModal}
            onConfirm={this.handleConfirmModal}
            item={item}
          />
        )}

        <div className={tw`relative h-80 bg-gray-300`}>
          <img
            className={tw`absolute inset-0 object-cover w-full h-full transition duration-300 transform hover:scale-110`}
            src={item.image}
            alt={item.name}
          />
        </div>
        <div
          className={tw`px-6 py-4 flex flex-col md:flex-row items-center justify-between`}
        >
          <div>
            <div className={tw`font-bold text-xl mb-2`}>{item.name}</div>
            <p className={tw`text-gray-700 text-base mb-2 font-bold`}>
              Price: ${item.price}
            </p>
          </div>
          <button
            className={tw`mt-4 md:mt-0 md:ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            onClick={this.handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
