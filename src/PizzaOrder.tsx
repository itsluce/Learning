import {pizzaData} from "./Data/dummy_data";
import {Image} from "primereact/image";
import {Button} from "primereact/button";
import React, {useState} from "react";

const PizzaOrder = () => {
    const [quantities, setQuantities] = useState({});
    const [cart, setCart] = useState([]);
    const [orderNumber, setOrderNumber] = useState(1);
console.log({cart});
    const updateQuantity = (itemId, change) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) + change)
        }));
    };

    const addToCart = (item) => {
        const quantity = quantities[item.id] || 0;

        if (quantity === 0) {
            alert('Please select a quantity before adding to cart!');
            return;
        }

        const cartItem = {
            ...item,
            quantity,
            orderNumber: orderNumber,
            cartId: `${item.id}-${orderNumber}-${Date.now()}`
        };

        setCart(prev => [...prev, cartItem]);
        setOrderNumber(prev => prev + 1);

        setQuantities(prev => ({
            ...prev,
            [item.id]: 0
        }));

        alert(`Added ${quantity} ${item.title}(s) to cart! Order #${orderNumber}`);
    };

    const getQuantity = (itemId) => {
        return quantities[itemId] || 0;
    };

    return (
        <div>
            <h2>Pizza Page</h2>

            {cart.length > 0 && (
                <div style={{
                    backgroundColor: '#f0f0f0',
                    padding: '1rem',
                    margin: '1rem 0',
                    borderRadius: '8px'
                }}>
                    <h3>Cart Summary ({cart.length} items)</h3>
                    <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                        {cart.map((cartItem) => (
                            <div key={cartItem.cartId} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem',
                                borderBottom: '1px solid #ddd'
                            }}>
                                <span>Order #{cartItem.orderNumber}: {cartItem.title}</span>
                                <span>Qty: {cartItem.quantity} × ${cartItem.price}</span>
                                <span><strong>${(cartItem.quantity * cartItem.price).toFixed(2)}</strong></span>
                            </div>
                        ))}
                    </div>
                    <div style={{textAlign: 'right', marginTop: '1rem'}}>
                        <strong>Total: ${cart.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}</strong>
                    </div>
                </div>
            )}

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
            }}>
                {pizzaData.map((item) => {
                    const currentQuantity = getQuantity(item.id);

                    return (
                        <div key={item.id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '1rem',
                            minWidth: '250px'
                        }}>
                            <div>
                                <Image src={item.image}/>
                                <h4>Title: {item.title}</h4>
                                <h4>Price: ${item.price}</h4>
                                <h4>Category: {item.category}</h4>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '1rem',
                                justifyContent: 'center',
                                margin: '1rem 0'
                            }}>
                                <Button
                                    size={'small'}
                                    icon="pi pi-minus"
                                    rounded
                                    severity="danger"
                                    disabled={currentQuantity === 0}
                                    onClick={() => updateQuantity(item.id, -1)}
                                />
                                <h2 style={{minWidth: '40px', textAlign: 'center'}}>{currentQuantity}</h2>
                                <Button
                                    size={'small'}
                                    icon="pi pi-plus"
                                    rounded
                                    severity="success"
                                    onClick={() => updateQuantity(item.id, 1)}
                                />
                            </div>

                            <div style={{textAlign: 'center'}}>
                                <Button
                                    icon={'pi pi-shopping-cart'}
                                    label={'Add To Cart'}
                                    severity={currentQuantity > 0 ? 'info' : 'secondary'}
                                    onClick={() => addToCart(item)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PizzaOrder;