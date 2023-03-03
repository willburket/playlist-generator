import React from 'react';
import { render, screen, cleanup,fireEvent, queryByTestId, getByTestId } from '@testing-library/react'
import { MusicPlayer, PlayButton, DisplayButton} from '../components/MusicPlayer/MusicPlayer';

afterEach(() =>{
    cleanup();
})

test('should render musicplayer component', () => {
    render(<MusicPlayer/>)
    const player = screen.getByTestId('player');
    expect(player).toBeInTheDocument()
});

test('should render/click play button component', () => {
    const handleClick = jest.fn();
    const {getByTestId} = render(<MusicPlayer>
        <PlayButton onClick = {handleClick} data-testid = "play-button"/>
    </MusicPlayer>);
    fireEvent.click(getByTestId("play-button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
});