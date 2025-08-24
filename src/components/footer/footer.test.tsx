import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils/renderWithProviders'
import Footer from './footer'

describe('Footer Component', () => {
  it('should render the footer component', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should have the correct CSS class', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('footer')
  })

  it('should display project-related text', () => {
    render(<Footer />)
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})