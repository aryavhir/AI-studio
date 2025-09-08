import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import StyleSelector, { StyleOption } from '../StyleSelector'

const mockOptions: StyleOption[] = [
  { id: 'editorial', name: 'Editorial', description: 'Clean, professional photography style' },
  { id: 'streetwear', name: 'Streetwear', description: 'Urban, contemporary fashion style' },
  { id: 'vintage', name: 'Vintage', description: 'Classic, retro-inspired aesthetic' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean design approach' },
  { id: 'artistic', name: 'Artistic', description: 'Creative, expressive interpretation' }
]

describe('StyleSelector', () => {
  const mockOnChange = vi.fn()
  const mockOnEnterKey = vi.fn()
  
  beforeEach(() => {
    mockOnChange.mockClear()
    mockOnEnterKey.mockClear()
  })

  test('renders style selector with label', () => {
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Style')).toBeInTheDocument()
  })

  test('displays default option when no value selected', () => {
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByDisplayValue('Choose a style...')).toBeInTheDocument()
  })

  test('displays all style options', () => {
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByRole('option', { name: /editorial/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /streetwear/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /vintage/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /minimalist/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /artistic/i })).toBeInTheDocument()
  })

  test('calls onChange when style is selected', async () => {
    const user = userEvent.setup()
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'editorial')
    
    expect(mockOnChange).toHaveBeenCalledWith('editorial')
  })

  test('shows selected value', () => {
    render(<StyleSelector value="vintage" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByDisplayValue(/vintage/i)).toBeInTheDocument()
  })

  test('shows description when style is selected', () => {
    render(<StyleSelector value="editorial" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByText('Clean, professional photography style')).toBeInTheDocument()
  })

  test('shows keyboard shortcut hint when onEnterKey is provided and value is selected', () => {
    render(
      <StyleSelector 
        value="editorial" 
        onChange={mockOnChange} 
        options={mockOptions} 
        onEnterKey={mockOnEnterKey} 
      />
    )
    
    expect(screen.getByText('(Enter to generate)')).toBeInTheDocument()
  })

  test('calls onEnterKey when Enter is pressed with value selected', async () => {
    const user = userEvent.setup()
    render(
      <StyleSelector 
        value="editorial" 
        onChange={mockOnChange} 
        options={mockOptions} 
        onEnterKey={mockOnEnterKey} 
      />
    )
    
    const select = screen.getByRole('combobox')
    await user.type(select, '{Enter}')
    
    expect(mockOnEnterKey).toHaveBeenCalled()
  })
})