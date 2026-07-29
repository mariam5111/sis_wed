import { useState, useEffect } from 'react'

interface Props { onClose: () => void }

type Answer = 'yes' | 'no' | ''

export default function RSVPModal({ onClose }: Props) {
  const [name, setName]           = useState('')
  const [answer, setAnswer]       = useState<Answer>('')
  const [guests, setGuests]       = useState('1')
  const [message, setMessage]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible]     = useState(false)

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && answer) setSubmitted(true)
  }

  const field: React.CSSProperties = {
    width: '100%',
    padding: '11px 15px',
    borderRadius: '12px',
    border: '1px solid rgba(184,144,64,0.28)',
    background: 'rgba(253,248,241,0.7)',
    color: '#2e1f10',
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) handleClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 8px 0',
        background: `rgba(46,31,16,${visible ? 0.48 : 0})`,
        backdropFilter: visible ? 'blur(6px)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: '24px 24px 0 0',
          background: 'linear-gradient(170deg, #fdf8f1 0%, #f5ead8 100%)',
          boxShadow: '0 -20px 60px rgba(46,31,16,0.2)',
          transform: visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
        }}
      >
        {/* Gold handle bar */}
        <div style={{ padding: '14px 0 8px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px',
            background: 'linear-gradient(90deg, #b89040, #d4af62, #b89040)' }} />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(184,144,64,0.25)',
            background: 'rgba(253,248,241,0.8)',
            color: '#a08070',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close RSVP"
        >✕</button>

        <div style={{ padding: '0 24px 32px' }}>
          {submitted ? (
            <div className="anim-fade-up flex flex-col items-center gap-4 py-8 text-center">
              <div style={{
                width: '72px', height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f2e0d5 0%, #c9927a 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(201,146,122,0.3)',
              }}>
                {answer === 'yes' ? '🌸' : '💌'}
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#2e1f10', marginBottom: '6px' }}>
                  Thank you, {name}
                </h2>
                <p style={{ fontFamily: 'var(--font-sub)', fontStyle: 'italic', fontSize: '1rem', color: '#6b5040', lineHeight: 1.6 }}>
                  {answer === 'yes'
                    ? "We are overjoyed you'll be joining us to celebrate our love. See you on September 14th!"
                    : "We'll cherish your warmth and miss you deeply. Thank you for your kind reply."}
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  padding: '12px 40px',
                  borderRadius: '100px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #7a5c18, #b89040)',
                  color: '#fdf8f1',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '0.78rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#2e1f10', marginBottom: '4px' }}>RSVP</h2>
                <p style={{ fontFamily: 'var(--font-sub)', fontStyle: 'italic', color: '#b89040', fontSize: '0.95rem' }}>
                  Kindly reply by August 1st, 2025
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 300,
                    fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#a08070', marginBottom: '7px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    style={field}
                    required
                  />
                </div>

                {/* Attendance */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 300,
                    fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#a08070', marginBottom: '10px' }}>
                    Will you attend?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {(['yes', 'no'] as const).map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswer(opt)}
                        style={{
                          padding: '14px 8px',
                          borderRadius: '14px',
                          border: answer === opt
                            ? '1.5px solid #b89040'
                            : '1px solid rgba(184,144,64,0.25)',
                          background: answer === opt
                            ? 'linear-gradient(135deg, rgba(184,144,64,0.12), rgba(201,146,122,0.1))'
                            : 'rgba(253,248,241,0.5)',
                          fontFamily: 'var(--font-sub)',
                          fontStyle: 'italic',
                          fontSize: '0.95rem',
                          color: answer === opt ? '#7a5c18' : '#6b5040',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest count */}
                {answer === 'yes' && (
                  <div className="anim-fade-up">
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 300,
                      fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: '#a08070', marginBottom: '7px' }}>
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                      style={{ ...field, cursor: 'pointer' }}
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 300,
                    fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#a08070', marginBottom: '7px' }}>
                    A note for the couple
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Share your wishes and warm thoughts…"
                    rows={3}
                    style={{ ...field, resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!name || !answer}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '100px',
                    border: 'none',
                    background: (!name || !answer)
                      ? 'rgba(184,144,64,0.35)'
                      : 'linear-gradient(135deg, #7a5c18 0%, #b89040 40%, #d4af62 50%, #b89040 60%, #7a5c18 100%)',
                    backgroundSize: '200% auto',
                    color: '#fdf8f1',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.78rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    cursor: (!name || !answer) ? 'not-allowed' : 'pointer',
                    transition: 'background 0.3s, transform 0.2s',
                    marginTop: '6px',
                  }}
                >
                  Send My Reply
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
