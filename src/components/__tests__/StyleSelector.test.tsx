import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { StyleSelector, StyleOption } from '../StyleSelector'

const mockOptions: StyleOption[] = [
  { id: 'editorial', name: 'Editorial', description: 'Clean, professional photography style' },
  { id: 'streetwear', name: 'Streetwear', description: 'Urban, contemporary fashion style' },
  { id: 'vintage', name: 'Vintage', description: 'Classic, retro-inspired aesthetic' }
]

describe('StyleSelector', () => {
  const mockOnChange = vi.fn()
  
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  test('renders style selector', () => {
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Style')).toBeInTheDocument()
  })

  test('displays options', () => {
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    expect(screen.getByRole('option', { name: /editorial/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /streetwear/i })).toBeInTheDocument()
  })

  test('calls onChange when style is selected', async () => {
    const user = userEvent.setup()
    render(<StyleSelector value="" onChange={mockOnChange} options={mockOptions} />)
    
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'editorial')
    
    expect(mockOnChange).toHaveBeenCalledWith('editorial')
  })
})