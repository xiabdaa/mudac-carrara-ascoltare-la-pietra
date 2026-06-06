import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const planImages = {
  ground: `${import.meta.env.BASE_URL}plans/mudac-ground-plan.jpg`,
  first: `${import.meta.env.BASE_URL}plans/mudac-first-plan.jpg`
};

const floors = {
  ground: {
    tab: "Piano terra",
    title: "Piano terra",
    icon: "ground",
    intro:
      "Courtyard, cloisters and ground-floor rooms. The route begins with marble chips, listening fragments and sculptural gestures that connect the museum to Carrara's stone-working landscape.",
    works: [
      {
        id: "g1",
        number: "1",
        artist: "Verena Mayer Tasch",
        title: "Marble leaf",
        year: "2026",
        material: "Marble, white chips, courtyard intervention",
        room: "Courtyard center",
        x: 47.4,
        y: 72.8,
        shape: "58% 42% 61% 39% / 43% 57% 38% 62%",
        tone: "#3b1a12",
        thumb: "white"
      },
      {
        id: "g2",
        number: "2",
        artist: "Silvia Scaringella",
        title: "In dialogue with Il Capo",
        year: "2026",
        material: "Video dialogue and sculptural installation",
        room: "Dark room / projection route",
        x: 69.5,
        y: 73.8,
        shape: "46% 54% 45% 55% / 52% 41% 59% 48%",
        tone: "#261009",
        thumb: "video"
      },
      {
        id: "g3",
        number: "3",
        artist: "Francesca Bernardini",
        title: "Forms from within",
        year: "2026",
        material: "Organic sculptural forms",
        room: "Historical collection dialogue",
        x: 75.1,
        y: 57.6,
        shape: "53% 47% 64% 36% / 44% 58% 42% 56%",
        tone: "#24100a",
        thumb: "drawing"
      },
      {
        id: "g4",
        number: "4",
        artist: "Selena Frosini",
        title: "Listening fragments",
        year: "2026",
        material: "Sculptural fragments in stone and matter",
        room: "Cloister route",
        x: 32.8,
        y: 57,
        shape: "47% 53% 58% 42% / 54% 43% 57% 46%",
        tone: "#2b130d",
        thumb: "dust",
        added: true
      },
      {
        id: "g5",
        number: "5",
        artist: "Resonant Matter",
        title: "White marble chips",
        year: "2026",
        material: "Ground material connecting routes and thresholds",
        room: "Courtyard and cloisters",
        x: 42.3,
        y: 67.5,
        shape: "55% 45% 44% 56% / 48% 59% 41% 52%",
        tone: "#32160f",
        thumb: "archive",
        added: true
      }
    ]
  },
  first: {
    tab: "Piano primo",
    title: "Piano primo",
    icon: "stairs",
    intro:
      "Historical and contemporary collection rooms. Upstairs, the route places sculpture in dialogue with memory, transformation, everyday life and the museum's permanent display.",
    works: [
      {
        id: "f7",
        number: "4",
        artist: "Francesca Bernardini",
        title: "Organic forms",
        year: "2026",
        material: "Shells, cocoons and protective inner spaces",
        room: "Collezione Storica",
        x: 32.8,
        y: 37.8,
        shape: "49% 51% 42% 58% / 62% 41% 59% 38%",
        tone: "#27100a",
        thumb: "map"
      },
      {
        id: "f8",
        number: "5",
        artist: "Selena Frosini",
        title: "Five ways of listening",
        year: "2026",
        material: "Sculpture as attentive encounter",
        room: "Collezione Storica",
        x: 32.8,
        y: 54.1,
        shape: "59% 41% 57% 43% / 46% 57% 43% 54%",
        tone: "#32160f",
        thumb: "archive"
      },
      {
        id: "f9",
        number: "6",
        artist: "Anna Multone",
        title: "Materiality and memory",
        year: "2026",
        material: "Sculpture, transformation and everyday life",
        room: "Residenze d'Artista",
        x: 70.6,
        y: 34.1,
        shape: "45% 55% 62% 38% / 45% 51% 49% 55%",
        tone: "#261009",
        thumb: "video"
      },
      {
        id: "f10",
        number: "7",
        artist: "Verena Mayer Tasch",
        title: "Marble as threshold",
        year: "2026",
        material: "Marble blocks and sculptural intervention",
        room: "Opere Eccezionali",
        x: 70.7,
        y: 51.4,
        shape: "54% 46% 39% 61% / 52% 39% 61% 48%",
        tone: "#3c1c13",
        thumb: "water"
      },
      {
        id: "f11",
        number: "8",
        artist: "Silvia Scaringella",
        title: "Two perspectives on Carrara",
        year: "2026",
        material: "Dialogue between industrial extraction and fragile ecosystems",
        room: "Disegnare il Marmo",
        x: 70.7,
        y: 64.3,
        shape: "42% 58% 50% 50% / 58% 42% 58% 42%",
        tone: "#2b130d",
        thumb: "drawing"
      },
      {
        id: "f12",
        number: "9",
        artist: "Resonant Matter",
        title: "Revealing form",
        year: "2026",
        material: "Shared route through listening, place and material",
        room: "Collezione Contemporanea",
        x: 51.5,
        y: 73.1,
        shape: "56% 44% 54% 46% / 40% 58% 42% 60%",
        tone: "#230f09",
        thumb: "statue"
      }
    ]
  }
};

function PlanDrawing({ floor }) {
  return (
    <img className="floor-plan-image" src={planImages[floor]} alt="" draggable="false" />
  );
}

function Thumb({ type }) {
  return <span className={`work-thumb work-thumb--${type}`} aria-hidden="true" />;
}

function FloorMap({ floor, selectedId, onSelect }) {
  const planFloor = floor.icon === "stairs" ? "first" : "ground";

  return (
    <div className="map-shell" key={floor.title}>
      <div className={`map-board map-board--${planFloor}`}>
        <div className={`floor-plan-layer floor-plan-layer--${planFloor}`}>
          <PlanDrawing floor={planFloor} />

          {floor.works.map((work) => (
            <button
              className={`map-marker${work.added ? " map-marker--added" : ""}`}
              type="button"
              aria-pressed={selectedId === work.id}
              aria-label={`${work.number}. ${work.artist}, ${work.title}, ${work.room}`}
              key={work.id}
              onClick={() => onSelect(work.id, true)}
              style={{
                "--x": `${work.x}%`,
                "--y": `${work.y}%`,
                "--blob": work.shape,
                "--tone": work.tone
              }}
            >
              <span>{work.number}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

function WorkRow({ work, isActive, onSelect, register }) {
  return (
    <article
      className="work-row"
      aria-current={isActive ? "true" : undefined}
      ref={(node) => register(work.id, node)}
    >
      <button type="button" onClick={() => onSelect(work.id)}>
        <span className="work-number">{work.number}</span>
        <Thumb type={work.thumb} />
        <span className="work-copy">
          <strong>{work.artist}</strong>
          <em>{work.title}</em>
          <span>{work.year}</span>
          <small>{work.material}</small>
          <small>{work.room}</small>
        </span>
      </button>
    </article>
  );
}

const menuPanels = {
  story: {
    label: "Story",
    kicker: "Curatorial Concept",
    title: "The stone is already in conversation",
    body:
      "Resonant Matter treats marble not as inert matter but as geological memory: mineral flesh formed through pressure, darkness, heat and transformation. Visitors move through sculpture as a dialogue between body, material, landscape and history."
  },
  artists: {
    label: "Artists",
    kicker: "Five Women Sculptors",
    title: "Five ways of listening",
    body:
      "Verena Mayer Tasch, Selena Frosini, Francesca Bernardini, Silvia Scaringella and Anna Multone each approach sculpture as a form of listening: to marble, to resistance, to density, to history and to the memories embedded in matter."
  },
  team: {
    label: "Team",
    kicker: "Curatorial Proposal",
    title: "MUDAC Carrara, September 2026",
    body:
      "Conceived and developed by Taissiya Shaidarova, Lingjia Zhang, Gianfranco Di Vassi, Shuhe Wang, Kechen Zheng and Zijian Xiao, the proposal frames the museum map as a guide through listening, form and environmental attention."
  }
};

function MenuOverlay({ open, activePanel, onPanelChange, onClose }) {
  const overlayRef = useRef(null);
  const fanRefs = useRef([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const fans = fanRefs.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (open) {
      gsap
        .timeline()
        .set(overlay, { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo(
          fans,
          { scale: 0, rotate: -24, transformOrigin: "100% 0%" },
          { scale: 1, rotate: 0, duration: 0.62, stagger: 0.06, ease: "power3.out" }
        )
        .fromTo(content, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.36 }, "-=0.18");
    } else {
      gsap
        .timeline()
        .to(content, { y: 16, autoAlpha: 0, duration: 0.18 })
        .to(fans, { scale: 0, rotate: 18, duration: 0.34, stagger: 0.03, ease: "power2.in" }, 0)
        .set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    }
  }, [open]);

  useEffect(() => {
    const copy = contentRef.current?.querySelector(".menu-panel-copy");
    if (!open || !copy) return;

    gsap.fromTo(
      copy,
      { y: 16, autoAlpha: 0, clipPath: "circle(35% at 100% 0%)" },
      { y: 0, autoAlpha: 1, clipPath: "circle(145% at 50% 50%)", duration: 0.42, ease: "power2.out" }
    );
  }, [activePanel, open]);

  const panel = menuPanels[activePanel];

  return (
    <aside className="menu-overlay" aria-hidden={!open} ref={overlayRef}>
      <div className="menu-fan" aria-hidden="true">
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            ref={(node) => {
              fanRefs.current[item] = node;
            }}
          />
        ))}
      </div>
      <div className="menu-panel" ref={contentRef}>
        <button className="menu-close" type="button" onClick={onClose} aria-label="Close menu">
          Close
        </button>
        <nav className="menu-panel-tabs" aria-label="Menu sections">
          {Object.entries(menuPanels).map(([key, item]) => (
            <button
              key={key}
              type="button"
              aria-selected={activePanel === key}
              onClick={() => onPanelChange(key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <section className="menu-panel-copy" aria-live="polite">
          <p className="section-kicker">{panel.kicker}</p>
          <h2>{panel.title}</h2>
          <p>{panel.body}</p>
        </section>
      </div>
    </aside>
  );
}

export default function ExhibitionPage() {
  const [activeFloor, setActiveFloor] = useState("ground");
  const [selectedId, setSelectedId] = useState(floors.ground.works[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("story");
  const rowRefs = useRef(new Map());
  const worksListRef = useRef(null);
  const floorFanRef = useRef(null);

  const floor = floors[activeFloor];
  const selectedWork = useMemo(
    () => floor.works.find((work) => work.id === selectedId) ?? floor.works[0],
    [floor, selectedId]
  );

  useEffect(() => {
    setSelectedId(floors[activeFloor].works[0].id);
    worksListRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [activeFloor]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  function registerRow(id, node) {
    if (node) {
      rowRefs.current.set(id, node);
    } else {
      rowRefs.current.delete(id);
    }
  }

  function selectWork(id, shouldScroll = false) {
    setSelectedId(id);
    if (shouldScroll) {
      requestAnimationFrame(() => {
        const row = rowRefs.current.get(id);
        if (!row) return;

        const list = worksListRef.current;
        if (!list) return;

        list.scrollTo({ top: Math.max(row.offsetTop - 8, 0), behavior: "smooth" });
      });
    }
  }

  function changeFloor(key) {
    if (key === activeFloor) return;

    const fan = floorFanRef.current;
    if (!fan) {
      setActiveFloor(key);
      return;
    }

    gsap.killTweensOf(fan);
    gsap
      .timeline()
      .set(fan, { autoAlpha: 1, clipPath: "circle(0% at 50% 0%)" })
      .to(fan, { clipPath: "circle(145% at 50% 0%)", duration: 0.32, ease: "power2.in" })
      .add(() => setActiveFloor(key))
      .to(fan, { clipPath: "circle(0% at 50% 0%)", duration: 0.42, ease: "power2.out" })
      .set(fan, { autoAlpha: 0 });
  }

  return (
    <main className="exhibition-page">
      <header className="map-header">
        <div className="utility-row" aria-label="Site tools">
          <span>Italiano</span>
          <span>Accessibilità</span>
          <a href="/" aria-label="Return to the marble intro">
            Intro
          </a>
        </div>

        <div className="brand-row">
          <a className="brand" href="/" aria-label="Return to landing page">
            <span>Museo delle Arti Carrara</span>
            <strong>mudaC</strong>
          </a>
          <button className="menu-button" type="button" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <span>Menu</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <section className="map-intro" aria-labelledby="route-title">
        <p className="section-kicker">Interactive route</p>
        <h1 id="route-title">RESONANT MATTER</h1>
        <p>
          Listening and dialogue revealing form. Find each intervention by floor
          and room while following marble as memory, pressure and transformation.
        </p>
      </section>

      <section className="route-module" aria-label="Interactive exhibition map and works">
        <div className="route-sticky-panel">
          <nav className="floor-tabs" aria-label="Floor selection">
            {Object.entries(floors).map(([key, item]) => (
              <button
                type="button"
                key={key}
                aria-selected={activeFloor === key}
                onClick={() => changeFloor(key)}
              >
                {item.tab}
              </button>
            ))}
          </nav>

          <section className="route-visualizer" aria-label="Interactive exhibition map">
            <div className="floor-fan-transition" ref={floorFanRef} aria-hidden="true" />
            <FloorMap floor={floor} selectedId={selectedWork.id} onSelect={selectWork} />
          </section>
        </div>

        <section className="works-section" aria-label="Featured works">
          <div className="works-section-head">
            <p className="section-kicker">Opere in evidenza</p>
          </div>
          <div className="works-list" ref={worksListRef}>
            {floor.works.map((work) => (
              <WorkRow
                key={work.id}
                work={work}
                isActive={selectedWork.id === work.id}
                onSelect={selectWork}
                register={registerRow}
              />
            ))}
          </div>
        </section>
      </section>

      <footer className="visit-footer">
        <span>Piazza Alberica, 1 - 54033 Carrara (MS)</span>
        <a href="#route-title">Top</a>
        <span>Orari</span>
        <span>Contatti</span>
      </footer>
      <MenuOverlay
        open={menuOpen}
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onClose={() => setMenuOpen(false)}
      />
    </main>
  );
}
