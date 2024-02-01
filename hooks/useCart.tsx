import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

type CartProductType = {
    id: string;
    // Add other properties of CartProductType as needed
    quantity: number;
    price: number;
    // ...
};

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: ()=> void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val:string | null) => void;
};

export const CartContent = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
    const [cartTotalQty, setCartTotalQty] = useState(10);
    const [cartTotalAmount, setCartTotalAmount]= useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

const [paymentIntent, setPaymentIntent]= useState<string | null >(null)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('importSalesItems');
        const cartProducts: CartProductType[] | null = JSON.parse(cartItems);
        const eccommercesalesPaymentIntent: any = localStorage.getItem('eccommercesalesPaymentIntent')
        const paymentIntent: string | null = JSON.parse(eccommercesalesPaymentIntent)

        setCartProducts(cartProducts);
        setPaymentIntent(paymentIntent)
    }, []);
    useEffect(()=>{
        const getTotals= ()=>{
            if(cartProducts){
                const {total, qty} = cartProducts?.reduce((acc, item)=>{
                    const itemTotal= item.price * item.quantity
    
                    acc.total+= itemTotal
                    acc.qty+= item.quantity
    
                    return acc
                },{
                    total:0,
                    qty:0
                })
           setCartTotalQty(qty)
           setCartTotalAmount(total)
            }
         
        }
        getTotals()
    },[cartProducts])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCartt;
            if (prev) {
                updatedCartt = [...prev, { ...product, quantity: 1 }];
            } else {
                updatedCartt = [{ ...product, quantity: 1 }];
                toast.success('Producto agregado al carrito');
            }
            localStorage.setItem('importSalesItems', JSON.stringify(updatedCartt));
            return updatedCartt;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
            setCartProducts(filteredProducts);
            toast.success('Producto eliminado del carrito');
            localStorage.setItem('importSalesItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        if (product.quantity === 99) {
            return toast.error('Ooops Cantidad maxima de compra');
        }

        if (cartProducts) {
            const updatedCart = [...cartProducts];
            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
            
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1;
            }
            setCartProducts(updatedCart)
            localStorage.setItem('importSalesItems', JSON.stringify(updatedCart))
                 }
    }, [cartProducts]);

const handleSetPaymentIntent = useCallback(
    (val:string | null) => {
    setPaymentIntent(val);
    localStorage.setItem('ecommercesalesPaymentIntent', JSON.stringify(val))
    },
    [paymentIntent]
    );

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        if (product.quantity === 1) {
            return toast.error('Ooops Cantidad minima de compra');
        }

        if (cartProducts) {
            const updatedCart = [...cartProducts];
            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
            
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1;
            }
            setCartProducts(updatedCart)
            localStorage.setItem('importSalesItems', JSON.stringify(updatedCart))
                 }
    }, [cartProducts]);

    const  handleClearCart= useCallback(()=>{
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('importSalesItems', JSON.stringify(null))
    },[cartProducts])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent
    }
    return <CartContent.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContent);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};
