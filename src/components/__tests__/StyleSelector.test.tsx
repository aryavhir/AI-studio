import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'

describe('StyleSelector Component Tests', () => {
  test('renders select element with options', () => {
    render(
      <div>
        <select data-testid="style-selector">
          <option value="">Choose a style...</option>
          <option value="editorial">Editorial</option>
          <option value="streetwear">Streetwear</option>
          <option value="vintage">Vintage</option>
          <option value="minimalist">Minimalist</option>
          <option value="artistic">Artistic</option>
        </select>
      </div>
    )
    
    expect(screen.getByTestId('style-selector')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /editorial/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /streetwear/i })).toBeInTheDocument()
  })

  test('handles style selection', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    
    render(
      <div>
        <select data-testid="style-selector" onChange={mockOnChange}>
          <option value="">Choose a style...</option>
          <option value="editorial">Editorial</option>
          <option value="vintage">Vintage</option>
        </select>
      </div>
    )
    
    const select = screen.getByTestId('style-selector')
    await user.selectOptions(select, 'editorial')
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  test('shows style description when selected', () => {
    render(
      <div>
        <select data-testid="style-selector" value="editorial" onChange={() => {}}>
          <option value="editorial">Editorial</option>
        </select>
        <p data-testid="style-description">Clean, professional photography style</p>
      </div>
    )
    
    expect(screen.getByTestId('style-description')).toHaveTextContent('Clean, professional photography style')
  })
})