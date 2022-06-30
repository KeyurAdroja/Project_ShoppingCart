import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function App() {
  /* start with 1 useState and with name of initial variable name Items and pass initial values in useState Hook*/

  const [items, setItems] = useState([
    { itemName: "Item 1", quantity: 1, isSelected: false },
    { itemName: "Item 2", quantity: 3, isSelected: false },
    { itemName: "Item 3", quantity: 7, isSelected: true },
  ]);
  // this usestate is for holding a input value so we can add it in existing Array
  const [inputValue, setInputValue] = useState("");

  const [totalItemCount, setTotalItemCount] = useState(11);

  // this is a method called from input tag with the new text(item name) so adding it through this click handler
  const handleAddButtonClick = () => {
    // new item object variable with new text value for Item name but rest we set default
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    // pushing that new item value into existing Array and dump it at the bottom of existing Array
    const newItems = [...items, newItem];
    //updating the state of Items variable with adding new item in it
    totalCount();
    setItems(newItems);

    //item added
    alert("Item Added");
    // now clear the input field value back to normal
    setInputValue("");
    totalCount();
  };
  // this methos is for increasing qty we are passing an index value from click event to make sure which item is increased
  const handleQuantityIncrease = (index) => {
    // bringing all old Array value down here
    const newItems = [...items];
    // increasing the qty of specific item using Array index value
    newItems[index].quantity++;
    //updating the state of the variable using setitem()
    setItems(newItems);
    totalCount();
  };

  const handleQuantityDecrease = (index) => {
    const newItem = [...items];
    if (newItem[index].quantity <= 0) {
      newItem[index].quantity = 0;
    } else {
      newItem[index].quantity--;
    }


    setItems(newItem);
    totalCount();
  };

  const toggleSelected = (index) => {
    const newItem = [...items];
    newItem[index].isSelected = !newItem[index].isSelected;
    setItems(newItem);
  };

  const totalCount = () => {
    const totalItemCount = items.reduce((total, items) => {
      return total + items.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  };
  return (
    <div className="app-background">
      <div className="main-container">
        {/* input field with plus icon */}
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => {
              handleAddButtonClick();
            }}
          />
        </div>
        {/* List items starting from here */}
        <div className="item-list">
          {items.map((items, index) => {
            return (
              <div className="item-container">
                <div
                  className="item-name"
                  onClick={() => {
                    toggleSelected(index);
                  }}
                >
                  {/* HINT: replace false with a boolean indicating the item has been completed or not */}
                  {items.isSelected ? (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span className="completed">{items.itemName}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCircle} />
                      <span>{items.itemName}</span>
                    </>
                  )}
                </div>

                {/* Quantity of cart */}

                <div className="quantity">
                  <button>
                    <FontAwesomeIcon
                      onClick={() => {
                        handleQuantityDecrease(index);
                      }}
                      icon={faChevronLeft}
                    />
                  </button>
                  <span> {items.quantity} </span>
                  <button>
                    <FontAwesomeIcon
                      onClick={() => {
                        handleQuantityIncrease(index);
                      }}
                      icon={faChevronRight}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
}

export default App;
