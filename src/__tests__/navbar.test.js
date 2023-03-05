import React from 'react';
import {render, screen, cleanup, fireEvent } from '@testing-library/react'
import {Main} from "../components/Navbar/Navbar"
import SearchButton from '../components/Navbar/SearchButton';
import AuthButton from '../components/Navbar/AuthButton';
// import Auth from '../components/Navbar/Auth';

afterEach(() =>{
    cleanup();
})

test('should render navbar/dropdown components', () => {
    render(<Main/>)
    const nav = screen.getByTestId('navbar');
    const drop = screen.getByTestId('drop');
    expect(nav).toBeInTheDocument()
    expect(drop).toBeInTheDocument()

});

test('search button should call function on click', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<SearchButton onClick = {onClick}/>)
    fireEvent.click(getByTestId("search-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('auth button should call function on click', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<AuthButton onClick = {onClick}/>)
    fireEvent.click(getByTestId("auth-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
});

// test('genre nav switches to correct selection', () => {                // test that name is rererendered afte selection made
//     const handleClickMock = jest.fn();
//     const { getByTestId, rerender } = render(                           // maybe use a snapshot instead?
//     <Main>
//         <GenreNavItem>
//             <GenreDropDownItem/>
//         </GenreNavItem>    
//     </Main>
//     );
//     const button = getByTestId('genre');
  
//     fireEvent.click(button);
  
//   });