import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import GenerateSection from '../GenerateSection'

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

  test('renders section title and description', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={false}
        error={null}
        canGenerate={true}
      />
    )
    
    expect(screen.getByText('Generate')).toBeInTheDocument()
    expect(screen.getByText('Create Your Masterpiece')).toBeInTheDocument()
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

  test('shows abort button when generating', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={true}
        error={null}
        canGenerate={true}
      />
    )
    
    expect(screen.getByText('Abort Generation')).toBeInTheDocument()
  })

  test('calls onAbort when abort button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={true}
        error={null}
        canGenerate={true}
      />
    )
    
    await user.click(screen.getByRole('button'))
    expect(mockOnAbort).toHaveBeenCalled()
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
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('button is disabled when canGenerate is false', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={false}
        error={null}
        canGenerate={false}
      />
    )
    
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('shows generating progress when isGenerating is true', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={true}
        error={null}
        canGenerate={true}
      />
    )
    
    expect(screen.getByText(/creating your masterpiece/i)).toBeInTheDocument()
  })

  test('shows retry information when retryAttempt is provided', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={true}
        error={null}
        canGenerate={true}
        retryAttempt={2}
      />
    )
    
    expect(screen.getByText('Retrying (2/3)...')).toBeInTheDocument()
  })

  test('shows requirements message when cannot generate', () => {
    render(
      <GenerateSection
        onGenerate={mockOnGenerate}
        onAbort={mockOnAbort}
        isGenerating={false}
        error={null}
        canGenerate={false}
      />
    )
    
    expect(screen.getByText(/Ready to create?/)).toBeInTheDocument()
    expect(screen.getByText(/Upload an image or enter a prompt/)).toBeInTheDocument()
  })
})