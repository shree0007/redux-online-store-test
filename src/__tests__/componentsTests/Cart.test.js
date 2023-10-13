import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Cart from '../../components/Cart';
import { cartItems } from '../../testData/cartData';

const mockStore = configureStore([]);

describe("Cart initialization:", () => {
    it("Test should pass:", () => {
        expect(true).toBe(true)
    });

    it("Test should be empty when the cart is empty:", () => {
        const store = mockStore({
            cart: { cart: [] }
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()

    });

    it("Should render a list of products from the cart;", () => {
        const store = mockStore({
            cart: {
                cart: cartItems
            }
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByTestId("Individual_Product_Component")).toHaveLength(2);
    })

    it("Should render the total price of the cart:", () => {
        const store = mockStore({
            cart: {
                cart: cartItems
            }
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
        const expectedPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        expect(screen.getByText(`${expectedPrice} €`)).toBeInTheDocument()
    })
})