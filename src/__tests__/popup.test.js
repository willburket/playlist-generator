import React from 'react';
import { render, screen, cleanup, fireEvent, getByTestId } from '@testing-library/react'
import PopUp from '../components/Error/PopUp';

afterEach(() =>{
    cleanup();
});

test('pop up should work as intended', () => {
    // snapshot? 
});
