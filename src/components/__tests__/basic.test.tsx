import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Simple test to verify testing setup works
describe('Testing Setup', () => {
  test('testing framework is working', () => {
    expect(true).toBe(true)
  })

  test('can render a simple div', () => {
    render(<div data-testid="test-div">Hello Testing!</div>)
    expect(screen.getByTestId('test-div')).toBeInTheDocument()
    expect(screen.getByText('Hello Testing!')).toBeInTheDocument()
  })

  test('mock functions work', () => {
    const mockFn = vi.fn()
    mockFn('test')
    expect(mockFn).toHaveBeenCalledWith('test')
  })
})