import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { PromptInput } from '../PromptInput'

describe('PromptInput', () => {
  const mockOnChange = vi.fn()
  
  beforeEach(() => {
    mockOnChange.mockClear()
  })

  test('renders prompt input', () => {
    render(<PromptInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Prompt')).toBeInTheDocument()
  })

  test('displays character count', () => {
    render(<PromptInput value="Hello world" onChange={mockOnChange} />)
    
    expect(screen.getByText('11/500')).toBeInTheDocument()
  })

  test('calls onChange when user types', async () => {
    const user = userEvent.setup()
    render(<PromptInput value="" onChange={mockOnChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Beautiful sunset')
    
    expect(mockOnChange).toHaveBeenCalled()
  })
})