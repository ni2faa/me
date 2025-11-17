import { render, screen, fireEvent } from '@testing-library/react'
import { SocialLinks } from '@/components/intro/SocialLinks'

describe('SocialLinks', () => {
  it('renders anchors with correct attributes', () => {
    render(<SocialLinks />)
    const linkedin = screen.getByRole('link', { name: /LinkedIn Profile/i })
    const github = screen.getByRole('link', { name: /GitHub Profile/i })
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/wongsakorn-rodngampring-1796a8152')
    expect(linkedin).toHaveAttribute('target', '_blank')
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer')
    expect(github).toHaveAttribute('href', 'https://github.com/ni2faa')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows brand icon for LinkedIn by default and toggles to white', () => {
    render(<SocialLinks />)
    const toggle = screen.getByRole('button', { name: /Toggle brand icon colors/i })
    const linkedinImg = screen.getByAltText('LinkedIn logo') as HTMLImageElement
    expect(linkedinImg.src).toContain('icons8-linkedin-48.png')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(linkedinImg.src).toMatch(/simpleicons\.org\/linkedin\/ffffff/) 
  })

  it('renders GitHub icon image', () => {
    render(<SocialLinks />)
    const githubImg = screen.getByAltText('GitHub logo') as HTMLImageElement
    expect(githubImg.src).toMatch(/simpleicons\.org\/github\/ffffff/)
  })
})