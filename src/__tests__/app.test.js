import React from 'react';
import { render, screen, cleanup, fireEvent, getByTestId } from '@testing-library/react'
import { App } from '../App';

afterEach(() =>{
    cleanup();
});

test('app should call configure', () => {
    const { getByTestId} = render(<App data-testid = "app"/>);
    expect(getByTestId("app")).toBeInTheDocument();
    // snapshot? 
});

