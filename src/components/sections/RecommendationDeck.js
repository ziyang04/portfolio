import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import '../../assets/css/RecommendationDeck.css';

const RECOMMENDATIONS = [
  {
    initials: 'TT',
    name: 'Tony Tong',
    role: 'Founder & CEO · Zonic',
    date: 'Sep 2, 2026',
    highlight: 'both a senior software engineer and a systems engineer',
    excerpt:
      '…he consistently demonstrated the capabilities of both a senior software engineer and a systems engineer.',
    paragraphs: [
      'I had the pleasure of working with Zi Yang at Zonic during the summer of 2026. Throughout that time, he consistently demonstrated the capabilities of both a senior software engineer and a systems engineer.',
      'Zi Yang is a talented yet remarkably humble professional. He learns quickly and systematically, approaching complex challenges with structure, curiosity, and sound judgment. He is an excellent problem solver, highly responsive, and someone the team can always rely on.',
      'Beyond his individual contributions, Zi Yang provided thoughtful guidance to others and took the lead on several projects. What impressed me most was that, despite his strong technical abilities and leadership, he always remained humble, collaborative, and trustworthy.',
      'I have come to regard Zi Yang not only as an outstanding engineer, but also as a trusted partner. I would strongly recommend him as a capable, dependable, and thoughtful technical leader.',
    ],
  },
  {
    initials: 'VF',
    name: 'Vincent Fung',
    role: 'Managing Consultant · Comptify Analytics',
    highlight: 'remarkable technical skills, a strong work ethic',
    excerpt:
      'Zi Yang demonstrated remarkable technical skills, a strong work ethic, and an eagerness to learn and grow.',
    paragraphs: [
      'Zi Yang demonstrated remarkable technical skills, a strong work ethic, and an eagerness to learn and grow. His contributions not only benefited our team but also showcased his potential as a valuable asset in any professional setting.',
      'I wholeheartedly recommend Pang Zi Yang for any future opportunities he pursues. I am confident that he will bring the same level of dedication and innovation to any organisation.',
    ],
  },
];

// Matches the card fly-out transition in RecommendationDeck.css
const FLY_MS = 380;
// A drag past this distance, or a quick flick, sends the card away
const FLING_PX = 100;
const FLICK_SPEED = 0.5; // px per ms
// Past this distance the card leaves without waiting for the release
const COMMIT_PX = 180;
// How far the card must travel before the one beneath is fully revealed
const REVEAL_PX = 140;

// Bold the key phrase of a recommendation wherever it appears
const withHighlight = (text, phrase) => {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="rec-hl">{phrase}</strong>
      {text.slice(at + phrase.length)}
    </>
  );
};

// 0 → 1 as the top card moves away; the card beneath straightens with it
const revealOn = (deck, value) => deck?.style.setProperty('--reveal', value);

const RecommendationDeck = () => {
  // order[0] is the card on top of the deck
  const [order, setOrder] = useState(() => RECOMMENDATIONS.map((_, i) => i));
  const [flying, setFlying] = useState(null); // { index, dir } while a card is leaving
  const [inView, setInView] = useState(false);
  const [nudging, setNudging] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const wrapRef = useRef(null);
  const deckRef = useRef(null);
  const dialogRef = useRef(null);
  const flyTimer = useRef(null);
  const drag = useRef(null);
  const endDragRef = useRef(null);

  // Deal the deck in once it scrolls into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Once dealt in, wiggle the top card once to hint that it can be dragged
  useEffect(() => {
    if (!inView) return undefined;
    const start = setTimeout(() => setNudging(true), 900);
    return () => clearTimeout(start);
  }, [inView]);

  useEffect(
    () => () => {
      clearTimeout(flyTimer.current);
      drag.current?.detach();
    },
    []
  );

  // Reset the reveal only once the new order is in the DOM, so the next card doesn't jump
  useLayoutEffect(() => revealOn(deckRef.current, 0), [order]);

  // Show the native dialog whenever a recommendation is opened
  useEffect(() => {
    const dialog = dialogRef.current;
    if (openIndex !== null && dialog && !dialog.open) dialog.showModal();
  }, [openIndex]);

  // Send the top card off in `dir` (1 = right, -1 = left), then tuck it in at the back
  const fling = (dir) => {
    if (flying !== null) return;
    setNudging(false);
    revealOn(deckRef.current, 1);
    setFlying({ index: order[0], dir });
    flyTimer.current = setTimeout(() => {
      setOrder((current) => [...current.slice(1), current[0]]);
      setFlying(null);
    }, FLY_MS);
  };

  const onPointerDown = (e) => {
    // Leave the "Read full recommendation" button clickable
    if (flying !== null || e.button !== 0 || e.target.closest('button')) return;
    const card = e.currentTarget;
    card.setPointerCapture(e.pointerId);

    // Backstop: the card can miss the release (let go outside the window, app switch,
    // trackpad drag lock), so also listen on the window and always end the drag
    const release = (ev) => endDragRef.current?.(ev);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    window.addEventListener('blur', release);
    const detach = () => {
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('blur', release);
    };

    drag.current = {
      card,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: e.timeStamp,
      dx: 0,
      detach,
    };
    deckRef.current.classList.add('is-dragging');
    setNudging(false);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointerId) return;
    // The button is no longer held, so the release was missed: end the drag now
    if ((e.buttons & 1) === 0) {
      endDrag(e);
      return;
    }
    d.dx = e.clientX - d.startX;
    const dy = (e.clientY - d.startY) * 0.2;
    d.card.style.transform = `translate(${d.dx}px, ${dy}px) rotate(${-1.5 + d.dx * 0.06}deg)`;
    revealOn(deckRef.current, Math.min(Math.abs(d.dx) / REVEAL_PX, 1));
    if (Math.abs(d.dx) > COMMIT_PX) endDrag(e);
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    d.detach();
    if (d.card.hasPointerCapture(d.pointerId)) d.card.releasePointerCapture(d.pointerId);
    deckRef.current.classList.remove('is-dragging');
    // Clearing the inline transform lets the card transition from where it was dropped
    d.card.style.transform = '';

    const speed = Math.abs(d.dx) / Math.max(e.timeStamp - d.startTime, 1);
    if (Math.abs(d.dx) > FLING_PX || (speed > FLICK_SPEED && Math.abs(d.dx) > 30)) {
      fling(Math.sign(d.dx));
    } else {
      revealOn(deckRef.current, 0);
    }
  };

  endDragRef.current = endDrag;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') fling(1);
    if (e.key === 'ArrowLeft') fling(-1);
  };

  const closeDialog = () => dialogRef.current?.close();

  const open = openIndex !== null ? RECOMMENDATIONS[openIndex] : null;

  return (
    <div ref={wrapRef} className={`rec-deck-wrap ${inView ? 'is-in' : ''}`}>
      <div
        ref={deckRef}
        className="rec-deck"
        role="group"
        aria-roledescription="carousel"
        aria-label="Recommendations from managers"
        aria-describedby="rec-deck-help"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {RECOMMENDATIONS.map((rec, i) => {
          const position = order.indexOf(i);
          const isTop = position === 0;
          const isFlying = flying?.index === i;
          return (
            <figure
              className={`rec-card ${isFlying ? 'is-flying' : ''} ${
                isTop && nudging ? 'is-nudging' : ''
              }`}
              style={isFlying ? { '--dir': flying.dir } : undefined}
              data-pos={position}
              key={rec.name}
              aria-hidden={!isTop}
              inert={!isTop}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? endDrag : undefined}
              onPointerCancel={isTop ? endDrag : undefined}
              onLostPointerCapture={isTop ? endDrag : undefined}
              onDragStart={(e) => e.preventDefault()}
              onAnimationEnd={() => setNudging(false)}
            >
              <div className="rec-mark" aria-hidden="true">
                “
              </div>
              <blockquote className="rec-quote">
                <p>{withHighlight(rec.excerpt, rec.highlight)}</p>
                <button type="button" className="rec-more" onClick={() => setOpenIndex(i)}>
                  Read full recommendation
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </blockquote>
              <figcaption className="rec-from">
                <span className="rec-avatar" aria-hidden="true">
                  {rec.initials}
                </span>
                <span>
                  <span className="rec-name">{rec.name}</span>
                  <span className="rec-role">{rec.role}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="rec-nav">
        <div className="rec-dots" aria-hidden="true">
          {RECOMMENDATIONS.map((rec, i) => (
            <span className={order[0] === i ? 'is-on' : ''} key={rec.name}></span>
          ))}
        </div>
        <span className="visually-hidden" id="rec-deck-help">
          Drag or swipe the card, or use the left and right arrow keys, to see the next
          recommendation.
        </span>
        <button type="button" className="rec-hint" onClick={() => fling(1)}>
          <i className="fas fa-hand-pointer" aria-hidden="true"></i>
          <span className="rec-hint-mouse">Drag for next</span>
          <span className="rec-hint-touch">Swipe for next</span>
          <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="rec-dialog"
        aria-labelledby="rec-dialog-name"
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          // Clicking the backdrop closes the dialog
          if (e.target === e.currentTarget) closeDialog();
        }}
      >
        {open && (
          <>
            <div className="rec-dialog-head">
              <span className="rec-avatar" aria-hidden="true">
                {open.initials}
              </span>
              <div>
                <p className="rec-name" id="rec-dialog-name">
                  {open.name}
                </p>
                <p className="rec-role">
                  {open.role}
                  {open.date && ` · ${open.date}`}
                </p>
              </div>
              <button
                type="button"
                className="rec-dialog-close"
                onClick={closeDialog}
                aria-label="Close recommendation"
              >
                <i className="fas fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <blockquote className="rec-bubble">
              {open.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{withHighlight(paragraph, open.highlight)}</p>
              ))}
            </blockquote>
          </>
        )}
      </dialog>
    </div>
  );
};

export default RecommendationDeck;
