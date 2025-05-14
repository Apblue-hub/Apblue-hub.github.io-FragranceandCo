import { useState } from 'react';
import { create } from 'zustand';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Zustand store for cart management
const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item => item.id === id ? { ...item, quantity } : item)
  })),
}));

export default function Cart() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();

  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 },
    { id: 3, name: "Headphones", price: 200 }
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid gap-4">
        {products.map(product => (
          <Card key={product.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <span>{product.name} - ${product.price}</span>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-6">Shopping Cart <ShoppingCart className="inline" /></h2>
      <div className="mt-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <Card key={item.id} className="mb-2">
              <CardContent className="p-4 flex justify-between items-center">
                <span>{item.name} - ${item.price} x {item.quantity}</span>
                <div>
                  <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                  <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button onClick={() => removeFromCart(item.id)} className="ml-2" variant="destructive">Remove</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
