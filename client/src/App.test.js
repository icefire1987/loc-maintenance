import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Header-Title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Wartungsübersicht/i);
    expect(linkElement).toBeInTheDocument();
});
