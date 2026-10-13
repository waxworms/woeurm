(() => {
  const SCRIPT_BUILD = '2026-07-31.39';
  const MIRRORED_LAYOUT = true;

  // CSS lol
  const CSS = `
* {
  box-sizing: border-box;
}

:root {
  --can-width: 87px;
  --can-height: 96px;
}

.worm-can-menu {
  position: absolute;
  left: 1.75rem;
  bottom: 1.75rem;
  width: var(--can-width);
  height: var(--can-height);
  user-select: none;
  z-index: 1000;
}

.worm-can-menu.is-mirrored {
  left: auto;
  right: 0.5rem;
}

.can-shell {
  position: absolute;
  left: 0;
  bottom: 0;
  width: var(--can-width);
  height: var(--can-height);
  transform-origin: 100% 100%;
  transform: rotate(0deg);
  transition: transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
}

.worm-can-menu.is-mirrored .can-shell {
  transform-origin: 0% 100%;
}

.can-shell--back {
  z-index: 0;
  pointer-events: none;
  filter:
    drop-shadow(0.2rem 0 0 white)
    drop-shadow(-0.2rem 0 0 white)
    drop-shadow(0 0.2rem 0 white)
    drop-shadow(0 -0.2rem 0 white);
}

.can-shell--front {
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  z-index: 2;
  
}

.can-shell--front:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.can-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  image-rendering: pixelated;
}

.can-image--back {
  z-index: 0;
}

.can-image--front {
  z-index: 3;
}

.can-image--top {
  z-index: 2;
  transform-origin: 100% 0%;
  transform: rotate(0deg);
  transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1); 
  filter:
    drop-shadow(0.2rem 0 0 white)
    drop-shadow(-0.2rem 0 0 white)
    drop-shadow(0 0.2rem 0 white)
    drop-shadow(0 -0.2rem 0 white);
}

.worm-can-menu.is-open .can-shell {
  transform: translateX(calc(-1 * var(--can-width))) rotate(90deg);
}

.worm-can-menu.is-mirrored.is-open .can-shell {
  transform: translateX(var(--can-width)) rotate(-90deg);
}

.worm-can-menu.is-open .can-image--top {
  transform: rotate(90deg);
}

.worm-can-menu.is-mirrored .can-image--top {
  transform-origin: 0% 0%;
}

.worm-can-menu.is-mirrored.is-open .can-image--top {
  transform: rotate(-90deg);
}

.worm-track {
  position: relative;
  height: 80px;
  width: min(60vw, 480px);
  display: flex;
  align-items: flex-end;
  pointer-events: auto;
  z-index: 1;
  position: absolute;
  left: calc(var(--can-width) + 12px);
  bottom: 30px;
}

.worm-can-menu.is-mirrored .worm-track {
  left: auto;
  right: calc(var(--can-width) + 12px);
}

.worm-track::before {
  content: '';
  position: absolute;
  left: -18px;
  right: 60%;
  bottom: 6px;
  height: 12px;
  border-radius: 999px;
  background: none;
  filter: none;
  opacity: 0;
  transition: none;
}

.worm-can-menu.is-mirrored .worm-track::before {
  left: 60%;
  right: -18px;
}

.worm-track[data-worm-visible='true']::before {
  right: 0;
  opacity: 1;
}

.worm-can-menu.is-mirrored .worm-track[data-worm-visible='true']::before {
  left: 0;
  right: -18px;
}

.worm {
  position: absolute;
  left: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  gap: 0;
  touch-action: none;
  transform-origin: 0% 100%;
  height: 44px;
  transform: translateX(calc(-1 * var(--can-width))) translateY(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 420ms cubic-bezier(0.22, 1.3, 0.36, 1);
}

.worm::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #222222;
  clip-path: path('M 0,6 C 60,-2 190,14 250,6 C 310,-2 440,14 500,6 C 560,-2 690,14 750,6 C 810,-2 940,14 1000,6 L 1000,38 C 930,46 810,30 750,38 C 680,46 560,30 500,38 C 430,46 310,30 250,38 C 180,46 70,30 0,38 Z');
  pointer-events: none;
  z-index: 0;
}

.worm::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #ffcccc;
  clip-path: path('M 0,8 C 60,0 190,16 250,8 C 310,0 440,16 500,8 C 560,0 690,16 750,8 C 810,0 940,16 1000,8 L 1000,36 C 930,44 810,28 750,36 C 680,44 560,28 500,36 C 430,44 310,28 250,36 C 180,44 70,28 0,36 Z');
  pointer-events: none;
  z-index: 1;
}

.worm-can-menu.is-mirrored .worm {
  left: auto;
  right: 0;
  transform-origin: 100% 100%;
  transform: translateX(var(--can-width)) translateY(0);
}

.worm[data-state='visible'] {
  opacity: 1;
  pointer-events: auto;
  animation: worm-burst 650ms cubic-bezier(0.22, 1.3, 0.36, 1) forwards;
}

.worm.dragging {
  transition: none;
  cursor: grabbing;
  animation: none !important;
}

.worm.exiting {
  pointer-events: none;
  animation: worm-exit 650ms cubic-bezier(0.22, 1.3, 0.36, 1) forwards;
}

.worm-segment {
  position: relative;
  z-index: 2;
  min-width: 52px;
  padding: 0.3rem 0.8rem;
  border-radius: 0;
  border: none;
  background: none;
  color: #000;
  font-family: Pixeloid;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  line-height: 1;
  transform: none;
  transition: none;
}

.worm-segment + .worm-segment {
  margin-left: 0;
}

.worm-segment + .worm-segment::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18%;
  bottom: 18%;
  width: 1.5px;
  background: #222222;
  transform: translateX(-0.75px);
  pointer-events: none;
}

.worm-segment.head {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: 1rem;
}

.worm-segment.head::before {
  content: '';
  position: absolute;
  left: -17px;
  top: -6px;
  width: 18px;
  height: 30px;
  border: 3.5px solid #222222;
  border-right: 0;
  background: #ffcccc;
  border-radius: 16px 0 0 16px;
  clip-path: path('M 18,1 C 10,-1 4,5 2,11 C 0,16 0,22 2,27 C 4,33 10,31 18,29 L 18,1 Z');
  pointer-events: none;
}

.worm-segment.tail {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding-right: 1rem;
}

.worm-segment.tail::after {
  content: '';
  position: absolute;
  right: -18px;
  top: -6px;
  width: 18px;
  height: 30px;
  border: 3.5px solid #222222;
  border-left: 0;
  background: #ffcccc;
  border-radius: 0 16px 16px 0;
  clip-path: path('M 0,1 C 8,-1 14,5 16,11 C 18,16 18,22 16,27 C 14,33 8,31 0,29 L 0,1 Z');
  pointer-events: none;
}

.worm-segment span {
  display: inline-block;
}

.worm-segment:focus-visible {
  outline: 2px solid #111827;
  outline-offset: 2px;
}

.worm-segment:hover {
}

.worm-segment.head:hover::before,
.worm-segment.tail:hover::after {
  opacity: 1;
}

.worm-segment:active {
}

.worm-segment.head:active::before,
.worm-segment.tail:active::after {
  opacity: 1;
}

@keyframes worm-burst {
  0% {
    transform: translateX(calc(-1 * var(--can-width)));
  }
  60% {
    transform: translateX(18px);
  }
  100% {
    transform: translateX(10px);
  }
}

@keyframes worm-exit {
  100% {
    transform: translateX(120vw);
  }
}

.worm-can-menu.is-mirrored .worm[data-state='visible'] {
  animation: worm-burst-mirrored 650ms cubic-bezier(0.22, 1.3, 0.36, 1) forwards;
}

.worm-can-menu.is-mirrored .worm.exiting {
  animation: worm-exit-mirrored 650ms cubic-bezier(0.22, 1.3, 0.36, 1) forwards;
}

@keyframes worm-burst-mirrored {
  0% {
    transform: translateX(var(--can-width));
  }
  60% {
    transform: translateX(18px);
  }
  100% {
    transform: translateX(14px);
  }
}

@keyframes worm-exit-mirrored {
  100% {
    transform: translateX(-120vw);
  }
}

@media (max-width: 600px) {
  .worm-track {
    width: min(75vw, 420px);
  }
}
  `;

  function initWormMenu() {
    // inject CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // find or create menu container
    let menuContainer = document.querySelector('[data-worm-menu]');
    if (!menuContainer) {
      menuContainer = document.createElement('div');
      menuContainer.setAttribute('data-worm-menu', '[]');
      document.body.appendChild(menuContainer);
    }

    // parse menu items from data attribute
    let menuItems = [];
    try {
      const dataAttr = menuContainer.getAttribute('data-worm-menu');
      if (dataAttr) {
        menuItems = JSON.parse(dataAttr);
      }
    } catch (e) {
      console.error('Failed to parse data-worm-menu attribute:', e);
    }

    // build HTML structure
    const menuHTML = `
      <div class="worm-can-menu" aria-label="Main navigation" role="navigation">
        <div class="can-shell can-shell--back">
          <img src="assets/can/can_back.png" alt="" class="can-image can-image--back" />
        </div>

        <div class="worm-track" data-worm-visible="false">
          <div class="worm">
            ${menuItems.map((item, idx) => `
              <button class="worm-segment" data-url="${item.url || '#'}">
                <span>${item.label || ''}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <button class="can-shell can-shell--front can" aria-expanded="false" aria-label="Toggle navigation">
          <img src="assets/can/can_front.png" alt="" class="can-image can-image--front" />
          <img src="assets/can/can_top.png" alt="" class="can-image can-image--top" />
        </button>
      </div>
    `;

    menuContainer.innerHTML = menuHTML;
    const menuRoot = menuContainer.querySelector('.worm-can-menu');

    // initialize menu logic
    initializeMenuLogic(menuRoot);
  }

  function initializeMenuLogic(menuRoot) {
    const can = menuRoot.querySelector('.can-shell--front');
    const worm = menuRoot.querySelector('.worm');
    const track = menuRoot.querySelector('.worm-track');
    const buildStamp = document.querySelector('.build-stamp');

    if (buildStamp) {
      buildStamp.textContent = `menu loaded: ${SCRIPT_BUILD}`;
    }

    menuRoot.classList.toggle('is-mirrored', MIRRORED_LAYOUT);

    function normalizePath(value) {
      if (!value) return '/';
      const raw = String(value).split(/[?#]/, 1)[0].trim().toLowerCase();
      if (!raw || raw === '/') return '/';
      const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`;
      return withLeadingSlash.endsWith('/')
        ? withLeadingSlash.slice(0, -1)
        : withLeadingSlash;
    }

    function updateEndpointClasses() {
      const segments = Array.from(worm.querySelectorAll('.worm-segment'));

      segments.forEach((segment) => {
        segment.classList.remove('head', 'tail');
      });

      if (segments.length === 0) return;

      segments[0].classList.add('head');
      segments[segments.length - 1].classList.add('tail');
    }

    function removeCurrentPageSegment() {
      const currentPath = normalizePath(window.location.pathname);
      const currentUrl = window.location.href.toLowerCase();

      worm.querySelectorAll('.worm-segment').forEach((segment) => {
        const targetPath = normalizePath(segment.dataset.url);
        const label = (segment.textContent || '').trim().toLowerCase();

        const routeMatches = targetPath === '/'
          ? currentPath === '/'
          : currentPath === targetPath || currentUrl.includes(targetPath);

        const labelMatches = label && currentUrl.includes(label);

        if (routeMatches || labelMatches) {
          segment.remove();
        }
      });

      updateEndpointClasses();
    }

    removeCurrentPageSegment();

    let isOpen = false;
    let isDragging = false;
    let didDrag = false;
    let dragStartX = 0;
    let wormStartX = 0;
    let currentOffsetX = 0;
    let suppressTapUntil = 0;
    const DRAG_THRESHOLD = 12;

    function shouldSuppressTap() {
      return performance.now() < suppressTapUntil;
    }

    function setWormState(visible) {
      worm.dataset.state = visible ? 'visible' : 'hidden';
      track.dataset.wormVisible = visible ? 'true' : 'false';

      if (!visible) {
        isDragging = false;
        currentOffsetX = 0;
        worm.classList.remove('dragging');
        worm.classList.remove('exiting');
        worm.style.transform = '';
        worm.style.animation = '';
      }
    }

    function playWormExitAndHide() {
      if (worm.dataset.state !== 'visible') {
        setWormState(false);
        return;
      }

      worm.style.animation = '';
      worm.classList.add('exiting');

      let fallbackTimer = null;

      const handleAnimationEnd = (e) => {
        if (e.animationName !== 'worm-exit') return;
        if (fallbackTimer) clearTimeout(fallbackTimer);
        worm.removeEventListener('animationend', handleAnimationEnd);
        setWormState(false);
      };

      worm.addEventListener('animationend', handleAnimationEnd);
      fallbackTimer = setTimeout(() => {
        worm.removeEventListener('animationend', handleAnimationEnd);
        setWormState(false);
      }, 800);
    }

    function toggleMenu() {
      const nextOpen = !isOpen;
      isOpen = nextOpen;
      menuRoot.classList.toggle('is-open', nextOpen);
      can.setAttribute('aria-expanded', String(nextOpen));

      if (!nextOpen) {
        playWormExitAndHide();
      }
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function getBounds() {
      const trackRect = track.getBoundingClientRect();
      const wormRect = worm.getBoundingClientRect();
      const canRect = can.getBoundingClientRect();

      const extraIntoCan = canRect.width;
      const overflowSpan = Math.max(0, wormRect.width - trackRect.width + 8 + extraIntoCan);

      if (!MIRRORED_LAYOUT) {
        const revealMinOffset = -overflowSpan;
        const canLeftCullOffset = canRect.left - trackRect.left;
        const minOffset = Math.max(revealMinOffset, canLeftCullOffset);
        return { min: minOffset, max: 0 };
      }

      const revealMaxOffset = overflowSpan;
      const canRightCullOffset = canRect.right - (trackRect.left + wormRect.width);
      const maxOffset = Math.min(revealMaxOffset, canRightCullOffset);
      return { min: 0, max: maxOffset };
    }

    let isPotentialDrag = false;
    let activePointerId = null;

    function onDragStart(clientX) {
      if (!isOpen || isDragging) return;
      isPotentialDrag = true;
      didDrag = false;
      dragStartX = clientX;
      wormStartX = currentOffsetX;
    }

    function onDragMove(clientX) {
      if (!isPotentialDrag) return;
      const delta = clientX - dragStartX;
      if (!isDragging) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;
        isDragging = true;
        didDrag = true;
        worm.style.animation = 'none';
        worm.classList.add('dragging');
      }
      const { min, max } = getBounds();
      currentOffsetX = clamp(wormStartX + delta, min, max);
      worm.style.transform = `translateX(${currentOffsetX}px)`;
    }

    function onDragEnd() {
      isPotentialDrag = false;
      if (!isDragging) return;
      isDragging = false;
      suppressTapUntil = performance.now() + 300;
      didDrag = true;
      window.setTimeout(() => {
        didDrag = false;
      }, 320);
      worm.style.animation = 'none';
      worm.classList.remove('dragging');
    }

    function handleSegmentClick(segment) {
      const url = segment.dataset.url;
      if (!url) return;
      if (url.startsWith('#')) {
        const id = url.slice(1);
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = url;
      }
    }

    worm.querySelectorAll('.worm-segment').forEach((segment) => {
      segment.addEventListener('pointerup', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (didDrag || shouldSuppressTap()) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        handleSegmentClick(segment);
      });

      segment.addEventListener('touchend', (e) => {
        if (didDrag || shouldSuppressTap()) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        handleSegmentClick(segment);
      }, { passive: false });

      segment.addEventListener('click', (e) => {
        if (didDrag || shouldSuppressTap()) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        handleSegmentClick(segment);
      });
    });

    can.addEventListener('click', toggleMenu);

    can.addEventListener('transitionend', (e) => {
      if (e.propertyName !== 'transform') return;
      if (isOpen) {
        setWormState(true);
      }
    });

    worm.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      activePointerId = e.pointerId;
      onDragStart(e.clientX);
    });

    window.addEventListener('pointermove', (e) => {
      if (activePointerId === null || e.pointerId !== activePointerId) return;
      if (!isPotentialDrag) return;
      onDragMove(e.clientX);
    });

    window.addEventListener('pointerup', (e) => {
      if (activePointerId === null || e.pointerId !== activePointerId) return;
      activePointerId = null;
      onDragEnd();
    });

    window.addEventListener('pointercancel', (e) => {
      if (activePointerId === null || e.pointerId !== activePointerId) return;
      activePointerId = null;
      onDragEnd();
    });

    if (!window.PointerEvent) {
      worm.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        const touch = e.touches[0];
        onDragStart(touch.clientX);
      }, { passive: true });

      worm.addEventListener('touchmove', (e) => {
        if (!isPotentialDrag || e.touches.length !== 1) return;
        const touch = e.touches[0];
        e.preventDefault();
        onDragMove(touch.clientX);
      }, { passive: false });

      worm.addEventListener('touchend', () => {
        onDragEnd();
      });

      worm.addEventListener('touchcancel', () => {
        onDragEnd();
      });
    }

    worm.addEventListener('click', (e) => {
      if (didDrag || shouldSuppressTap()) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    menuRoot.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        setWormState(false);
      }
    });
  }

  // auto-initialise when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWormMenu);
  } else {
    initWormMenu();
  }
})();
