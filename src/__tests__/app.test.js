import React from 'react';
import { render, screen, cleanup, fireEvent, getByTestId } from '@testing-library/react'

afterEach(() =>{
    cleanup();
});

test('search button should call function on click', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<SearchButton onClick = {onClick}/>)
    fireEvent.click(getByTestId("search-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
});

