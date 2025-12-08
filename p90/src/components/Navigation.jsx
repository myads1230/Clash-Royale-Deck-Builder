import { NavLink } from 'react-router'
import { Container, Nav, Navbar } from 'react-bootstrap'

function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
          <span role="img" aria-label="crown">👑</span>
          Clash Royale Decks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'var(--border-color)' }}>
          <span style={{ color: 'var(--text-primary)' }}>☰</span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
              end
            >
              🏠 Home
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/top-decks" 
              className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
            >
              🏆 Top Decks
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/card-decks" 
              className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
            >
              🃏 Card Decks
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/deck-builder" 
              className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
            >
              🔨 Deck Builder
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
