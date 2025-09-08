import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import PromptInput from '../PromptInput'

describe('PromptInput', () => {
  const mockOnChange = vi.fn()
  const mockOnEnterKey = vi.fn()
  
  beforeEach(() => {
    mockOnChange.mockClear()
    mockOnEnterKey.mockClear()
  })

  test('renders prompt input with label', () => {
    render(<PromptInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Prompt')).toBeInTheDocument()
  })

  test('displays character count correctly', () => {
    render(<PromptInput value="Hello world" onChange={mockOnChange} />)
    
    expect(screen.getByText('11/500')).toBeInTheDocument()
  })

  test('calls onChange when user types', async () => {
    const user = userEvent.setup()
    render(<PromptInput value="" onChange={mockOnChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Beautiful sunset')
    
    expect(mockOnChange).toHaveBeenCalled()
    expect(mockOnChange).toHaveBeenLastCalledWith('Beautiful sunset')
  })

  test('shows keyboard shortcut hint when onEnterKey is provided', () => {
    render(<PromptInput value="" onChange={mockOnChange} onEnterKey={mockOnEnterKey} />)
    
    expect(screen.getByText('(Ctrl+Enter to generate)')).toBeInTheDocument()
  })

  test('calls onEnterKey when Ctrl+Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<PromptInput value="test" onChange={mockOnChange} onEnterKey={mockOnEnterKey} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, '{Control>}{Enter}')
    
    expect(mockOnEnterKey).toHaveBeenCalled()
  })

  test('shows warning when approaching character limit', () => {
    const longText = 'A'.repeat(460) // 92% of 500 characters
    render(<PromptInput value={longText} onChange={mockOnChange} />)
    
    expect(screen.getByText("You're approaching the character limit")).toBeInTheDocument()
  })

  test('respects maxLength prop', () => {
    render(<PromptInput value="test" onChange={mockOnChange} maxLength={100} />)
    
    expect(screen.getByText('4/100')).toBeInTheDocument()
  })
})