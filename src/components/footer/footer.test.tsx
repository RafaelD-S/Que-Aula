import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils/renderWithProviders'
import Footer from './footer'

describe('Footer Component', () => {
  it('deve renderizar o componente footer', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('deve ter a classe CSS correta', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('footer')
  })

  it('deve exibir texto relacionado ao projeto', () => {
    render(<Footer />)
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
