import React from 'react';
import { render, screen, cleanup, fireEvent, getByTestId } from '@testing-library/react'
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { PlayButton, DisplayButton } from '../components/MusicPlayer/PlayerButtons';

afterEach(() =>{
    cleanup();
})

test('should render musicplayer component', () => {
    render(<MusicPlayer/>)
    const player = screen.getByTestId('player');
    expect(player).toBeInTheDocument()
});

test('play button should call function on click', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<PlayButton onClick = {onClick}/>)
    fireEvent.click(getByTestId("play-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('back/next button should call function on click', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<DisplayButton onClick = {onClick}/>)
    fireEvent.click(getByTestId("display-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
});