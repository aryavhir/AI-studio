import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { GenerateSection } from '../GenerateSection'

describe('GenerateSection', () => {
  const mockOnGenerate = vi.fn()
  const mockOnAbort = vi.fn()
  
  beforeEach(() => {
    mockOnGenerate.mockClear()
    mockOnAbort.mockClear()
  })

  test('renders generate button when not generating', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={false}
        error={null}
        canGenerate={true}
      />
    )
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Generate')).toBeInTheDocument()
  })

  test('calls onGenerate when generate button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={false}
        error={null}
        canGenerate={true}
      />
    )
    
    await user.click(screen.getByRole('button'))
    expect(mockOnGenerate).toHaveBeenCalled()
  })

  test('shows error message when error prop is provided', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={false}
        error="Generation failed"
        canGenerate={true}
      />
    )
    
    expect(screen.getByText('Generation failed')).toBeInTheDocument()
  })
})