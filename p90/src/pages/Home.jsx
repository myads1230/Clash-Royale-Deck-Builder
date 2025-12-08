import { Link } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import { cards } from '../data/cards'
import { topDecks } from '../data/decks'

function Home() {
  const features = [
    {
      icon: '🏆',
      title: 'Top Decks',
      description: 'Browse the highest win-rate decks used by top players worldwide.',
      link: '/top-decks'
    },
    {
      icon: '🃏',
      title: 'Card Decks',
      description: 'Find the best decks featuring your favorite cards.',
      link: '/card-decks'
    },
    {
      icon: '🔨',
      title: 'Deck Builder',
      description: 'Create and customize your own unique battle decks.',
      link: '/deck-builder'
    }
  ]

  const stats = [
    { value: cards.length + '+', label: 'Cards' },
    { value: topDecks.length + '+', label: 'Top Decks' },
    { value: '50M+', label: 'Players Worldwide' },
    { value: '24/7', label: 'Updated Stats' }
  ]

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1 className="hero-title animate-fade-in">
            Master Your Clash Royale Battles
          </h1>
          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover winning deck strategies, build custom decks, and dominate the arena 
            with data-driven insights from top players around the world.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/top-decks" className="btn btn-gold">
              Explore Top Decks
            </Link>
            <Link to="/deck-builder" className="btn btn-outline-royal">
              Build Your Deck
            </Link>
          </div>
          
          <div className="hero-stats animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <div className="section-header">
            <h2>Your Path to Victory</h2>
            <p className="section-subtitle">
              Everything you need to climb the ladder and dominate your opponents
            </p>
          </div>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={4}>
                <Link to={feature.link} style={{ textDecoration: 'none' }}>
                  <div className="feature-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="feature-icon">{feature.icon}</span>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Quick Stats Section */}
      <section className="py-5">
        <Container>
          <div className="section-header">
            <h2>Featured Archetypes</h2>
            <p className="section-subtitle">
              Popular deck strategies dominating the meta
            </p>
          </div>
          
          <Row className="g-4">
            {[
              { name: 'Hog Cycle', icon: '🐗', winRate: 54.2, description: 'Fast-paced cycling decks that outcycle opponent counters' },
              { name: 'Log Bait', icon: '🪵', winRate: 52.8, description: 'Bait out spells to punish with goblin barrel' },
              { name: 'Beatdown', icon: '🦎', winRate: 51.5, description: 'Build massive pushes behind tanky units' },
              { name: 'Bridge Spam', icon: '⚡', winRate: 53.7, description: 'Pressure both lanes with fast aggressive units' },
              { name: 'Siege', icon: '🏰', winRate: 50.8, description: 'Lock buildings on tower for chip damage' },
              { name: 'Control', icon: '🎯', winRate: 52.3, description: 'Defensive play style with counter-push potential' }
            ].map((archetype, index) => (
              <Col key={index} sm={6} lg={4}>
                <div 
                  className="cr-card animate-fade-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cr-card-body d-flex align-items-center gap-3">
                    <span style={{ fontSize: '2.5rem' }}>{archetype.icon}</span>
                    <div>
                      <h4 className="mb-1" style={{ fontSize: '1.1rem' }}>{archetype.name}</h4>
                      <p className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>
                        {archetype.description}
                      </p>
                      <span className={`win-rate-badge ${archetype.winRate >= 52 ? 'high' : 'medium'}`}>
                        {archetype.winRate}% Win Rate
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <div 
            className="cr-card text-center py-5 px-4"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.2) 0%, rgba(123, 31, 162, 0.2) 100%)',
              border: '2px solid var(--cr-blue)'
            }}
          >
            <h2 className="mb-3">Ready to Dominate the Arena?</h2>
            <p className="text-secondary mb-4" style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Start building your perfect deck today and climb to the top of the leaderboards!
            </p>
            <Link to="/deck-builder" className="btn btn-gold btn-lg">
              🔨 Start Building Now
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Home
