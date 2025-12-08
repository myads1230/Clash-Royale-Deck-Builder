import { useState, useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DeckCard from '../components/DeckCard'
import { topDecks } from '../data/decks'

function TopDecks() {
  const [filterArchetype, setFilterArchetype] = useState('All')
  const [sortBy, setSortBy] = useState('winRate')

  const archetypes = ['All', 'Cycle', 'Bait', 'Beatdown', 'Bridge Spam', 'Siege', 'Control']
  
  const sortOptions = [
    { value: 'winRate', label: 'Win Rate' },
    { value: 'usage', label: 'Usage Rate' },
    { value: 'wins', label: 'Total Wins' },
    { value: 'avgElixir', label: 'Elixir Cost' }
  ]

  const filteredAndSortedDecks = useMemo(() => {
    let filtered = filterArchetype === 'All' 
      ? topDecks 
      : topDecks.filter(deck => deck.archetype === filterArchetype)
    
    return filtered.sort((a, b) => {
      if (sortBy === 'avgElixir') return a[sortBy] - b[sortBy] // Ascending for elixir
      return b[sortBy] - a[sortBy] // Descending for others
    })
  }, [filterArchetype, sortBy])

  return (
    <div className="page-container">
      <Container>
        {/* Header */}
        <div className="section-header mb-5">
          <h1>🏆 Top Meta Decks</h1>
          <p className="section-subtitle">
            The most successful decks being used by top players right now
          </p>
        </div>

        {/* Filters */}
        <div className="cr-card mb-4">
          <div className="cr-card-body">
            <Row className="align-items-center g-3">
              <Col md={8}>
                <label className="text-muted mb-2 d-block" style={{ fontSize: '0.875rem' }}>
                  Filter by Archetype
                </label>
                <div className="filter-pills mb-0">
                  {archetypes.map(archetype => (
                    <button
                      key={archetype}
                      className={`filter-pill ${filterArchetype === archetype ? 'active' : ''}`}
                      onClick={() => setFilterArchetype(archetype)}
                    >
                      {archetype}
                    </button>
                  ))}
                </div>
              </Col>
              <Col md={4}>
                <label className="text-muted mb-2 d-block" style={{ fontSize: '0.875rem' }}>
                  Sort by
                </label>
                <select 
                  className="search-input" 
                  style={{ paddingLeft: '1rem' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </div>
        </div>

        {/* Stats Summary */}
        <Row className="g-3 mb-4">
          <Col xs={6} md={3}>
            <div className="stat-item">
              <div className="stat-value">{filteredAndSortedDecks.length}</div>
              <div className="stat-label">Decks Found</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="stat-item">
              <div className="stat-value">
                {filteredAndSortedDecks.length > 0 
                  ? Math.max(...filteredAndSortedDecks.map(d => d.winRate)).toFixed(1) + '%'
                  : '-'
                }
              </div>
              <div className="stat-label">Best Win Rate</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="stat-item">
              <div className="stat-value">
                {filteredAndSortedDecks.length > 0 
                  ? (filteredAndSortedDecks.reduce((sum, d) => sum + d.avgElixir, 0) / filteredAndSortedDecks.length).toFixed(1)
                  : '-'
                }
              </div>
              <div className="stat-label">Avg Elixir</div>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="stat-item">
              <div className="stat-value">
                {filteredAndSortedDecks.length > 0 
                  ? (filteredAndSortedDecks.reduce((sum, d) => sum + d.wins, 0) / 1000000).toFixed(1) + 'M'
                  : '-'
                }
              </div>
              <div className="stat-label">Total Wins</div>
            </div>
          </Col>
        </Row>

        {/* Deck List */}
        <div className="deck-list">
          {filteredAndSortedDecks.map((deck, index) => (
            <div 
              key={deck.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <DeckCard deck={deck} />
            </div>
          ))}
        </div>

        {filteredAndSortedDecks.length === 0 && (
          <div className="cr-card text-center py-5">
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3 className="mt-3">No decks found</h3>
            <p className="text-muted">Try adjusting your filters</p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default TopDecks
