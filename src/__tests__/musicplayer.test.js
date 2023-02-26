import React from 'react';
import {render, screen, cleanup } from '@testing-library/react'
import { MusicPlayer } from '../components/MusicPlayer';

afterEach(() =>{
    cleanup();
})

test('should render musicplayer component', () => {
    render(<MusicPlayer/>)
    const play = screen.getByTestId('player');
    expect(play).toBeInTheDocument()
});