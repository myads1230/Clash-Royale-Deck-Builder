import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <p style={{ marginBottom: '0.5rem' }}>
            <span role="img" aria-label="crown">👑</span> Clash Royale Decks
          </p>
          <p style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it.
          </p>
          <p>
            Built with 💙 for the Clash Royale community | 
            <a href="https://clashroyale.com" target="_blank" rel="noopener noreferrer" className="footer-link ms-1">
              Official Website
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
