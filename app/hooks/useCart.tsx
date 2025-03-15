import { useEffect, useState } from "react";

/* Interfaces */
import { IShoppingProducts } from "@Interfaces/IShopping";

const useCart = () => {
    const [cart, setCart] = useState<IShoppingProducts[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    
    /* Add Item */
    const addToCart = (product: IShoppingProducts) => {        
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                localStorage.setItem("cart", JSON.stringify(prevCart));

                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    /* Remove Item */
    const removeFromCart = (id: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    /* Calculate Total */
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { 
        cart,
        addToCart, 
        removeFromCart, 
        total 
    };
};

export default useCart;