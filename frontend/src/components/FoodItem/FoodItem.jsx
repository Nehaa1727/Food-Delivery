// import React, { useContext } from 'react'
// import './FoodItem.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContextProvider.jsx';

// const FoodItem = ({ image, name, price, desc , id }) => {

//     const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

//     return (
//         <div className='food-item'>
//             <div className='food-item-img-container'>
//                 <img className='food-item-image' src={url+"/images/"+image} alt="" />
//                 {!cartItems[id]
//                 ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
//                 :<div className="food-item-counter">
//                         <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
//                         <p>{cartItems[id]}</p>
//                         <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
//                     </div>
//                 }
//             </div>
//             <div className="food-item-info">
//                 <div className="food-item-name-rating">
//                     <p>{name}</p> <img src={assets.rating_starts} alt="" />
//                 </div>
//                 <p className="food-item-desc">{desc}</p>
//                 <p className="food-item-price">{currency}{price}</p>
//             </div>
//         </div>
//     )
// }

// export default FoodItem


import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContextProvider.jsx';

const FoodItem = ({ image, name, price, description, id }) => {
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    const quantity = cartItems?.[id] || 0; // ✅ safe access

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={url + "/images/" + image} alt={name} />

                {quantity === 0 ? (
                    <img
                        className='add'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="add"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            src={assets.remove_icon_red}
                            onClick={() => removeFromCart(id)}
                            alt="remove"
                        />
                        <p>{quantity}</p>
                        <img
                            src={assets.add_icon_green}
                            onClick={() => addToCart(id)}
                            alt="add"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
