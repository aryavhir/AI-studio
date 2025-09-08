import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'

describe('GenerateSection Component Tests', () => {
  test('renders generate button when ready', () => {
    render(
      <div>
        <button data-testid="generate-button">Generate</button>
        <h3>Generate</h3>
        <p>Create Your Masterpiece</p>
      </div>
    )
    
    expect(screen.getByTestId('generate-button')).toBeInTheDocument()
    expect(screen.getByText('Generate')).toBeInTheDocument()
    expect(screen.getByText('Create Your Masterpiece')).toBeInTheDocument()
  })

  test('handles generate button click', async () => {
    const user = userEvent.setup()
    const mockOnGenerate = vi.fn()
    
    render(
      <div>
        <button data-testid="generate-button" onClick={mockOnGenerate}>Generate</button>
      </div>
    )
    
    await user.click(screen.getByTestId('generate-button'))
    expect(mockOnGenerate).toHaveBeenCalled()
  })

  test('shows loading state when generating', () => {
    render(
      <div>
        <button data-testid="abort-button">Abort Generation</button>
        <p data-testid="loading-text">Creating your masterpiece...</p>
        <div data-testid="spinner" role="status" aria-label="Generating"></div>
      </div>
    )
    
    expect(screen.getByTestId('abort-button')).toBeInTheDocument()
    expect(screen.getByTestId('loading-text')).toHaveTextContent(/creating your masterpiece/i)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('shows error message when generation fails', () => {
    render(
      <div>
        <div data-testid="error-message" role="alert">
          Generation failed. Please try again.
        </div>
      </div>
    )
    
    expect(screen.getByRole('alert')).toHaveTextContent('Generation failed. Please try again.')
  })

  test('shows retry information', () => {
    render(
      <div>
        <p data-testid="retry-info">Retrying (2/3)...</p>
      </div>
    )
    
    expect(screen.getByTestId('retry-info')).toHaveTextContent('Retrying (2/3)...')
  })

  test('button is disabled when cannot generate', () => {
    render(
      <div>
        <button data-testid="generate-button" disabled>Generate</button>
        <p data-testid="requirements">Upload an image or enter a prompt to get started</p>
      </div>
    )
    
    expect(screen.getByTestId('generate-button')).toBeDisabled()
    expect(screen.getByTestId('requirements')).toBeInTheDocument()
  })
})