# Nested Navigation Dropdown Implementation Plan

**Goal:** Add two-level hierarchy support to `NavigationAPU.astro` for the Admissions → Scholarship → Academic/Non-Academic navigation tree.

**Architecture:** Extend the existing single-level dropdown/accordion into a nested flyout (desktop) + nested accordion (mobile) pattern, reusing all existing timer, accessibility, and styling conventions.

**Design:** [Link to `thoughts/shared/designs/2026-06-11-nested-nav-dropdown-design.md`]

---

## Dependency Graph

```
Batch 1 (single task): 1.1 [only one file to modify]
```

---

## Batch 1: NavigationAPU.astro Extension

### Task 1.1: Extend NavigationAPU.astro with Nested Dropdown Support
**File:** `src/components/NavigationAPU.astro`
**Test:** Manual verification (see Testing Strategy below)
**Depends:** none

---

### Change 1: Type Definition Extension

**Location:** Frontmatter type block (around line 21-43)

**Add `children?: NavItem[]` to the `NavItem` type:**

```typescript
type NavItem = {
  label: string;
  href: string;
  description: string;
  kind: "route" | "anchor" | "external";
  section?: string;
  placeholder?: boolean;
  badge?: string;
  target?: string;
  rel?: string;
  children?: NavItem[];  // NEW: nested children
};
```

**`NavSection` type remains unchanged.**

---

### Change 2: Data Model Update

**Location:** `navSections` array (around line 45-84)

**Replace the Admissions `NavSection` entry with an `items` array containing Scholarship with children:**

```typescript
const navSections: NavSection[] = [
  {
    label: "Home",
    href: HOME_PATH,
    kind: "route",
  },
  {
    label: "Admissions",
    // href removed — becomes a pure trigger when items exist
    items: [
      {
        label: "Scholarship",
        href: `${HOME_PATH}beasiswa`,
        description: "Beasiswa APU — jalur beasiswa akademik dan non-akademik.",
        kind: "route",
        children: [
          {
            label: "Academic",
            href: `${HOME_PATH}beasiswa-akademik`,
            description: "Beasiswa berbasis prestasi akademik.",
            kind: "route",
          },
          {
            label: "Non-Academic",
            href: `${HOME_PATH}beasiswa-non-akademik`,
            description: "Beasiswa berbasis prestasi non-akademik.",
            kind: "route",
          },
        ],
      },
    ],
  },
  // ... rest of navSections unchanged
];
```

**Design decision:** The Admissions section loses its direct `href` and becomes a pure dropdown trigger. This is required because:
- The component already uses `section.items` to decide whether to render a dropdown trigger vs a plain link.
- Adding `items` while keeping `href` would create ambiguous click behavior.
- The existing homepage already has an anchor to `#jalur-masuk` as a separate entry.

---

### Change 3: Desktop Dropdown Template — Nested Item Support

**Location:** Inside the `.nav-dropdown-list` `{section.items.map((item) => ...)}` block (around line 217-255)

**Replace the inner item rendering to support children:**

```astro
{section.items.map((item) => {
  const routePath = item.kind === "route" ? routePathFromHref(item.href) : undefined;
  const isCurrentRoute =
    item.kind === "route" && !item.placeholder && routePath === currentPath;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return item.placeholder ? (
    <li role="none">
      <button
        type="button"
        class="nav-dropdown-item nav-dropdown-item--placeholder"
        data-placeholder-item
        data-placeholder-label={item.label}
        data-placeholder-path={routePath}
        role="menuitem"
      >
        <span class="nav-dropdown-label">{item.label}</span>
        {item.badge && <span class="nav-dropdown-badge">{item.badge}</span>}
      </button>
    </li>
  ) : (
    <li role="none" class={hasChildren ? "nav-dropdown-item-wrapper" : undefined}>
      {hasChildren ? (
        <div
          class="nav-dropdown-item nav-dropdown-item--has-children"
          data-has-children="true"
        >
          <a
            href={item.href}
            target={item.target}
            rel={item.rel}
            class:list={["nav-dropdown-item-main", isCurrentRoute && "is-current-route"]}
            data-menu-link
            data-nav-kind={item.kind}
            data-section={item.section}
            data-route-path={routePath}
            aria-current={isCurrentRoute ? "page" : undefined}
            role="menuitem"
          >
            <span class="nav-dropdown-label">{item.label}</span>
            {item.badge && <span class="nav-dropdown-badge nav-dropdown-badge--live">{item.badge}</span>}
          </a>
          <button
            type="button"
            class="nav-dropdown-subtrigger"
            aria-expanded="false"
            aria-haspopup="true"
            aria-label={`Expand ${item.label} submenu`}
          >
            <svg
              class="nav-dropdown-chevron"
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4.5 2.5L8 6L4.5 9.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="nav-dropdown-subpanel" role="menu">
            <ul class="nav-dropdown-sublist">
              {item.children!.map((child) => {
                const childRoutePath = child.kind === "route" ? routePathFromHref(child.href) : undefined;
                const isChildCurrent =
                  child.kind === "route" && !child.placeholder && childRoutePath === currentPath;

                return (
                  <li role="none">
                    <a
                      href={child.href}
                      target={child.target}
                      rel={child.rel}
                      class:list={["nav-dropdown-subitem", isChildCurrent && "is-current-route"]}
                      data-menu-link
                      data-nav-kind={child.kind}
                      data-section={child.section}
                      data-route-path={childRoutePath}
                      aria-current={isChildCurrent ? "page" : undefined}
                      role="menuitem"
                    >
                      <span class="nav-dropdown-label">{child.label}</span>
                      {child.badge && <span class="nav-dropdown-badge nav-dropdown-badge--live">{child.badge}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <a
          href={item.href}
          target={item.target}
          rel={item.rel}
          class:list={["nav-dropdown-item", isCurrentRoute && "is-current-route"]}
          data-menu-link
          data-nav-kind={item.kind}
          data-section={item.section}
          data-route-path={routePath}
          aria-current={isCurrentRoute ? "page" : undefined}
          role="menuitem"
        >
          <span class="nav-dropdown-label">{item.label}</span>
          {item.badge && <span class="nav-dropdown-badge nav-dropdown-badge--live">{item.badge}</span>}
        </a>
      )}
    </li>
  );
})}
```

**Key template changes:**
- Added `hasChildren` check using `Array.isArray(item.children) && item.children.length > 0`
- When `hasChildren` is true, render a wrapper `.nav-dropdown-item--has-children` containing:
  1. The main link (`.nav-dropdown-item-main`) — still clickable to navigate to the parent page
  2. A sub-trigger button with a right-pointing chevron
  3. The `.nav-dropdown-subpanel` flyout containing child links
- When `hasChildren` is false, render the original flat link unchanged

---

### Change 4: Mobile Submenu Template — Nested Accordion Support

**Location:** Inside the `.mobile-nav-submenu` `{section.items.map((item) => ...)}` block (around line 356-391)

**Replace the inner item rendering to support children:**

```astro
{section.items.map((item) => {
  const routePath = item.kind === "route" ? routePathFromHref(item.href) : undefined;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return item.placeholder ? (
    <li role="none">
      <button
        type="button"
        class="mobile-nav-submenu-item mobile-nav-submenu-item--placeholder"
        data-placeholder-item
        data-placeholder-label={item.label}
        data-placeholder-path={routePath}
        role="menuitem"
      >
        <span>{item.label}</span>
        {item.badge && <span class="mobile-nav-badge">{item.badge}</span>}
      </button>
    </li>
  ) : (
    <li role="none">
      {hasChildren ? (
        <div class="mobile-nav-subgroup">
          <a
            href={item.href}
            target={item.target}
            rel={item.rel}
            class="mobile-nav-submenu-item"
            data-menu-link
            data-nav-kind={item.kind}
            data-section={item.section}
            data-route-path={routePath}
            role="menuitem"
          >
            <span>{item.label}</span>
            {item.badge && <span class="mobile-nav-badge mobile-nav-badge--live">{item.badge}</span>}
          </a>
          <button
            type="button"
            class="mobile-nav-subtrigger"
            aria-expanded="false"
            aria-haspopup="true"
            aria-label={`Expand ${item.label} submenu`}
          >
            <svg
              class="mobile-nav-chevron"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <ul class="mobile-nav-subsubmenu" role="menu">
            {item.children!.map((child) => {
              const childRoutePath = child.kind === "route" ? routePathFromHref(child.href) : undefined;

              return (
                <li role="none">
                  <a
                    href={child.href}
                    target={child.target}
                    rel={child.rel}
                    class="mobile-nav-submenu-item mobile-nav-submenu-item--nested"
                    data-menu-link
                    data-nav-kind={child.kind}
                    data-section={child.section}
                    data-route-path={childRoutePath}
                    role="menuitem"
                  >
                    <span>{child.label}</span>
                    {child.badge && <span class="mobile-nav-badge mobile-nav-badge--live">{child.badge}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <a
          href={item.href}
          target={item.target}
          rel={item.rel}
          class="mobile-nav-submenu-item"
          data-menu-link
          data-nav-kind={item.kind}
          data-section={item.section}
          data-route-path={routePath}
          role="menuitem"
        >
          <span>{item.label}</span>
          {item.badge && <span class="mobile-nav-badge mobile-nav-badge--live">{item.badge}</span>}
        </a>
      )}
    </li>
  );
})}
```

**Key template changes:**
- Added `hasChildren` check
- When `hasChildren` is true, render `.mobile-nav-subgroup` containing:
  1. The main link (still navigable)
  2. A `.mobile-nav-subtrigger` toggle button
  3. `.mobile-nav-subsubmenu` with nested items using `.mobile-nav-submenu-item--nested` for extra left padding
- When `hasChildren` is false, render the original flat link unchanged

---

### Change 5: CSS Additions — Desktop Secondary Flyout

**Location:** Append after the existing `.nav-dropdown-badge--live` block (around line 995), before `/* ===== ACTIONS ===== */`

```css
/* ===== DESKTOP SECONDARY FLYOUT ===== */
#apu-nav .nav-dropdown-item-wrapper {
  position: relative;
}

#apu-nav .nav-dropdown-item--has-children {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  padding: 0;
  background: transparent;
  border-radius: 10px;
  overflow: visible;
}

#apu-nav .nav-dropdown-item--has-children:hover {
  background: rgb(var(--color-apu-accent) / 0.08);
}

#apu-nav .nav-dropdown-item-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex: 1;
  padding: 0.7rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgb(var(--color-apu-navy));
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 150ms ease;
}

#apu-nav .nav-dropdown-item-main:hover {
  background: rgb(var(--color-apu-accent) / 0.1);
}

#apu-nav .nav-dropdown-subtrigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  margin-right: 0.35rem;
  color: rgb(var(--color-apu-navy));
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 150ms ease;
}

#apu-nav .nav-dropdown-subtrigger:hover {
  background: rgb(var(--color-apu-accent) / 0.15);
}

#apu-nav .nav-dropdown-chevron {
  transition: transform 200ms ease;
  opacity: 0.5;
}

#apu-nav .nav-dropdown-item--has-children[data-open="true"] .nav-dropdown-chevron {
  transform: rotate(90deg);
}

#apu-nav .nav-dropdown-subpanel {
  position: absolute;
  top: 0;
  left: calc(100% + 0.4rem);
  min-width: 180px;
  padding: 0.5rem;
  background: rgb(var(--color-brand-surface) / 0.98);
  border: 1px solid rgb(var(--color-apu-navy) / 0.1);
  border-radius: 14px;
  box-shadow: 0 16px 40px rgb(var(--color-apu-navy) / 0.12);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 200ms ease, transform 200ms ease, visibility 200ms ease;
  transform: translateX(-4px);
  z-index: 101;
}

#apu-nav .nav-dropdown-subpanel[data-open="true"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
}

#apu-nav .nav-dropdown-sublist {
  list-style: none;
  margin: 0;
  padding: 0;
}

#apu-nav .nav-dropdown-subitem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgb(var(--color-apu-navy));
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 150ms ease;
  text-align: left;
}

#apu-nav .nav-dropdown-subitem:hover {
  background: rgb(var(--color-apu-accent) / 0.1);
}

#apu-nav .nav-dropdown-subitem.is-current-route,
#apu-nav .nav-dropdown-subitem[data-active="true"] {
  background: rgb(var(--color-apu-accent) / 0.15);
}
```

**Design decisions:**
- `.nav-dropdown-subpanel` uses the same glassmorphism tokens as `.nav-dropdown` (background, border, shadow, radius)
- No arrow tip on the secondary panel — it's clearly connected to its parent item
- Positioned absolutely to the right with `left: calc(100% + 0.4rem)`
- Slightly smaller padding/font on subitems to create visual hierarchy
- The sub-trigger button is a separate clickable element so the parent link remains navigable

---

### Change 6: CSS Additions — Mobile Nested Accordion

**Location:** Append after the existing `.mobile-nav-badge--live` block (around line 1266), before `/* ===== MOBILE FOOTER ===== */`

```css
/* ===== MOBILE NESTED ACCORDION ===== */
#apu-nav .mobile-nav-subgroup {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid rgb(var(--color-apu-navy) / 0.04);
}

#apu-nav .mobile-nav-subgroup > .mobile-nav-submenu-item {
  flex: 1;
  min-width: 0;
  padding-right: 0.5rem;
}

#apu-nav .mobile-nav-subtrigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 0.75rem;
  padding: 0;
  color: rgb(var(--color-apu-navy));
  background: transparent;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 150ms ease;
  flex-shrink: 0;
}

#apu-nav .mobile-nav-subtrigger:hover {
  background: rgb(var(--color-apu-accent) / 0.08);
}

#apu-nav .mobile-nav-subtrigger[aria-expanded="true"] {
  background: rgb(var(--color-apu-accent) / 0.1);
}

#apu-nav .mobile-nav-subtrigger .mobile-nav-chevron {
  transition: transform 200ms ease;
}

#apu-nav .mobile-nav-subtrigger[aria-expanded="true"] .mobile-nav-chevron {
  transform: rotate(180deg);
}

#apu-nav .mobile-nav-subsubmenu {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 280ms ease;
  background: rgb(var(--color-brand-surface-soft) / 0.4);
}

#apu-nav .mobile-nav-subsubmenu[data-open="true"] {
  max-height: 200px;
}

#apu-nav .mobile-nav-submenu-item--nested {
  padding-left: 3.5rem;
  font-size: 0.85rem;
}
```

**Design decisions:**
- `.mobile-nav-subgroup` uses `flex-wrap` so the nested submenu can drop below
- `.mobile-nav-subsubmenu` uses the same `max-height` transition pattern as `.mobile-nav-submenu`
- `.mobile-nav-submenu-item--nested` gets extra left padding (`3.5rem`) to show hierarchy
- Background uses `surface-soft` for a subtle depth cue

---

### Change 7: JS Additions — Desktop Secondary Flyout Wiring

**Location:** Inside the IIFE, after the existing `// Desktop hover dropdowns` block (around line 684)

**Add a new loop that wires up sub-panel hover behavior:**

```javascript
// Desktop secondary flyouts
const desktopSubTriggers = navEl.querySelectorAll('.nav-dropdown-item--has-children');

desktopSubTriggers.forEach((wrapper) => {
  const subtrigger = wrapper.querySelector('.nav-dropdown-subtrigger');
  const subpanel = wrapper.querySelector('.nav-dropdown-subpanel');
  if (!subtrigger || !subpanel) return;

  /** @type {number | null} */
  let subEnterTimer = null;
  /** @type {number | null} */
  let subLeaveTimer = null;

  function openSubpanel() {
    window.clearTimeout(subLeaveTimer);
    subLeaveTimer = null;
    window.clearTimeout(subEnterTimer);
    subEnterTimer = window.setTimeout(() => {
      subtrigger.setAttribute('aria-expanded', 'true');
      wrapper.setAttribute('data-open', 'true');
      subpanel.setAttribute('data-open', 'true');
    }, 150);
  }

  function closeSubpanel() {
    window.clearTimeout(subEnterTimer);
    subEnterTimer = null;
    window.clearTimeout(subLeaveTimer);
    subLeaveTimer = window.setTimeout(() => {
      subtrigger.setAttribute('aria-expanded', 'false');
      wrapper.removeAttribute('data-open');
      subpanel.setAttribute('data-open', 'false');
    }, 400);
  }

  wrapper.addEventListener('mouseenter', openSubpanel);
  subpanel.addEventListener('mouseenter', openSubpanel);
  wrapper.addEventListener('mouseleave', closeSubpanel);
  subpanel.addEventListener('mouseleave', closeSubpanel);

  subtrigger.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = subtrigger.getAttribute('aria-expanded') === 'true';
    subtrigger.setAttribute('aria-expanded', String(!isExpanded));
    wrapper.setAttribute('data-open', String(!isExpanded));
    subpanel.setAttribute('data-open', String(!isExpanded));
  });

  subtrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isExpanded = subtrigger.getAttribute('aria-expanded') === 'true';
      subtrigger.setAttribute('aria-expanded', String(!isExpanded));
      wrapper.setAttribute('data-open', String(!isExpanded));
      subpanel.setAttribute('data-open', String(!isExpanded));
    }
    if (e.key === 'Escape') {
      subtrigger.setAttribute('aria-expanded', 'false');
      wrapper.removeAttribute('data-open');
      subpanel.setAttribute('data-open', 'false');
      subtrigger.focus();
    }
  });
});
```

**Key behavior decisions:**
- Same timer delays as primary dropdown (150ms open / 400ms close)
- Hovering either the wrapper OR the subpanel keeps it open
- Click/Enter/Space toggles the subpanel
- Escape closes the subpanel and returns focus to the sub-trigger
- `data-open` is set on both the wrapper (for chevron rotation) and the subpanel

---

### Change 8: JS Additions — Mobile Nested Accordion Wiring

**Location:** Inside the IIFE, after the existing `// Mobile accordion` block (around line 697)

**Add a new loop that wires up nested sub-trigger clicks:**

```javascript
// Mobile nested accordion
const mobileSubTriggers = mobileMenuEl.querySelectorAll('.mobile-nav-subtrigger');

mobileSubTriggers.forEach((trigger) => {
  const subgroup = trigger.closest('.mobile-nav-subgroup');
  const subsubmenu = subgroup?.querySelector('.mobile-nav-subsubmenu');
  if (!subsubmenu) return;

  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isExpanded));
    subsubmenu.setAttribute('data-open', String(!isExpanded));
  });
});
```

**Key behavior decisions:**
- Uses the same `aria-expanded` + `data-open` toggle pattern as the primary mobile accordion
- Only click — no hover on mobile
- The parent link remains separately clickable for navigation

---

### Change 9: CSS Focus State Extension

**Location:** Inside the existing focus-visible block (around line 1304-1315)

**Add new selectors to the focus-visible rule:**

```css
#apu-nav .nav-link:focus-visible,
#apu-nav .nav-trigger:focus-visible,
#apu-nav .nav-dropdown-item:focus-visible,
#apu-nav .nav-dropdown-item-main:focus-visible,
#apu-nav .nav-dropdown-subtrigger:focus-visible,
#apu-nav .nav-dropdown-subitem:focus-visible,
#apu-nav .mobile-nav-link:focus-visible,
#apu-nav .mobile-nav-trigger:focus-visible,
#apu-nav .mobile-nav-submenu-item:focus-visible,
#apu-nav .mobile-nav-subtrigger:focus-visible,
#apu-nav .menu-toggle:focus-visible,
#apu-nav .mobile-menu-close:focus-visible,
#apu-nav .nav-cta:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgb(var(--color-brand-surface)), 0 0 0 4px rgb(var(--color-apu-accent) / 0.92);
}
```

---

## Testing Strategy

| Test | Step | Expected |
|------|------|----------|
| **Desktop flyout appears** | Hover over "Admissions" → hover over "Scholarship" | Secondary panel appears to the right with "Academic" and "Non-Academic" |
| **Hover timer (open)** | Quickly move mouse over "Scholarship" | Panel opens after ~150ms delay |
| **Hover timer (close)** | Move mouse away from Scholarship area | Panel closes after ~400ms delay |
| **Hover persistence** | Hover Scholarship, then move into subpanel | Panel stays open while inside subpanel |
| **Parent link still works** | Click "Scholarship" text (not chevron) | Navigates to `/beasiswa` |
| **Sub-trigger toggle** | Click the right chevron next to Scholarship | Toggles subpanel open/closed |
| **Keyboard sub-trigger** | Focus chevron, press Enter or Space | Toggles subpanel |
| **Keyboard Escape** | With subpanel open, press Escape | Subpanel closes, focus returns to chevron |
| **Mobile nested expand** | Open mobile menu, tap "Admissions", tap Scholarship chevron | Nested "Academic"/"Non-Academic" items expand with max-height transition |
| **Mobile nested collapse** | Tap Scholarship chevron again | Nested items collapse |
| **Mobile parent link** | Tap "Scholarship" text (not chevron) on mobile | Navigates to `/beasiswa` and closes menu |
| **Route highlighting** | Visit `/beasiswa-akademik` | "Academic" item in the subpanel gets `.is-current-route` styling |
| **No regression** | Hover over existing single-level dropdowns (e.g., if any other section had items) | Behavior unchanged |
| **Accessibility** | Inspect ARIA | `aria-expanded="true/false"` on sub-triggers, `role="menu"` on subpanel, `role="menuitem"` on subitems |
| **Menu close resets nested** | Open mobile menu, expand nested accordion, close menu, reopen | All nested accordions should be collapsed |

---

## Commit Message

```
feat(nav): add nested dropdown support for Scholarship → Academic/Non-Academic

- Extend NavItem type with optional children array
- Add Scholarship with Academic & Non-Academic children under Admissions
- Desktop: secondary flyout panel on hover with 150ms/400ms timers
- Mobile: nested accordion with max-height CSS transition
- Maintain all existing accessibility contracts (ARIA, focus, keyboard)
- No regression on existing single-level dropdowns
```
