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
            let updatedCart;

            if (existingItem) {
                updatedCart = prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: 1 } : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
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
    const total = cart.reduce((sum, item) => sum + item.price * 1, 0);

    /* Clean shopping cart  */
    const removeCart = () => {
        setCart((prevCart) => {
            localStorage.removeItem('cart');
            return [];
        });
    }

    return { 
        cart,
        addToCart, 
        removeFromCart, 
        total,
        removeCart
    };
};

export default useCart;