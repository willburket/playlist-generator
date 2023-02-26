import React from 'react';
import {render, screen, cleanup } from '@testing-library/react'
import {Main} from "../components/Navbar"

afterEach(() =>{
    cleanup();
})

test('should render navbar component', () => {
    render(<Main/>)
    const nav = screen.getByTestId('navbar');
    const drop = screen.getByTestId('drop');
    expect(nav).toBeInTheDocument()
    expect(drop).toBeInTheDocument()

});