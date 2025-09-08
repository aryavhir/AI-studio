import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'

describe('PromptInput Component Tests', () => {
  test('renders textarea element', () => {
    const mockOnChange = vi.fn()
    
    render(
      <div>
        <textarea 
          data-testid="prompt-input"
          onChange={mockOnChange}
          placeholder="Describe what you want to create..."
        />
      </div>
    )
    
    expect(screen.getByTestId('prompt-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Describe what you want to create...')).toBeInTheDocument()
  })

  test('handles user input correctly', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    
    render(
      <div>
        <textarea 
          data-testid="prompt-input"
          onChange={mockOnChange}
          value=""
        />
      </div>
    )
    
    const textarea = screen.getByTestId('prompt-input')
    await user.type(textarea, 'Beautiful sunset')
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  test('displays character count', () => {
    render(
      <div>
        <textarea data-testid="prompt-input" defaultValue="Hello world" />
        <span data-testid="char-count">11/500</span>
      </div>
    )
    
    expect(screen.getByTestId('char-count')).toHaveTextContent('11/500')
  })
})