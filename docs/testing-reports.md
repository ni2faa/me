# Responsive Testing Reports

Devices
- Mobile: iPhone SE/13 Pro, Pixel 5
- Tablet: iPad Air, Galaxy Tab S7
- Desktop: 1440p and 4K monitors

Results
- Minimalist: layout adapts at 960px and 640px; no horizontal scroll
- Terminal: form grid collapses at 640px; readable line lengths maintained
- Cards: tiles reflow 3→2→1 columns; tap targets ≥44px
- Timeline: rail and markers remain visible; headings wrap gracefully
- Dark/Light: theme toggle reachable and persists; contrast passes AA
- Skills Animated: bars animate once with motion‑reduction honored

Accessibility
- Keyboard navigation works across links and form controls
- Visible focus outlines and aria‑live messaging on form status
- Color palette meets AA for text and controls in both themes

Performance
- No external fonts; CSS under 10KB per layout
- Fast first render; expected Lighthouse ≥90 on modern browsers
- Images simulated with gradients; production will use optimized formats