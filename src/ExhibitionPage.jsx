import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

const planImages = {
  ground: assetUrl("plans/mudac-ground-plan-simple.jpg"),
  first: assetUrl("plans/mudac-first-plan-simple.jpg")
};

const planPreloadCache = new Map();

function preloadPlanImage(src) {
  if (planPreloadCache.has(src)) return planPreloadCache.get(src);

  const promise = new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().catch(() => undefined).finally(() => resolve(true));
      } else {
        resolve(true);
      }
    };

    image.onerror = () => {
      planPreloadCache.delete(src);
      resolve(false);
    };

    image.src = src;
  });

  planPreloadCache.set(src, promise);
  return promise;
}

const artworkImage = (floor, number) =>
  assetUrl(`artworks/${floor}-${String(number).padStart(2, "0")}.png`);

const floors = {
  ground: {
    tab: "Piano terra",
    title: "Piano terra",
    icon: "ground",
    intro:
      "Eleven works trace the west, north and east galleries before arriving at the courtyard. The route moves between carved surfaces, apertures, organic forms and geological memory.",
    works: [
      {
        id: "g1",
        number: "1",
        artist: "Selene Frosini",
        title: "Listening Fragment I",
        material: "Carved stone study",
        room: "West gallery",
        x: 20.9,
        y: 57.5,
        images: [artworkImage("ground", 1)]
      },
      {
        id: "g2",
        number: "2",
        artist: "Selene Frosini",
        title: "Listening Fragment II",
        material: "Stone, aperture and dark matter",
        room: "West gallery",
        x: 20.6,
        y: 40.1,
        images: [artworkImage("ground", 2)]
      },
      {
        id: "g3",
        number: "3",
        artist: "Selene Frosini",
        title: "Listening Fragment III",
        material: "Perforated stone form",
        room: "West gallery",
        x: 20.5,
        y: 18.5,
        images: [artworkImage("ground", 3)]
      },
      {
        id: "g4",
        number: "4",
        artist: "Francesca Bernardini",
        title: "Forms from Within II",
        material: "Abstract organic sculpture",
        room: "North gallery",
        x: 30.6,
        y: 10.5,
        images: [artworkImage("ground", 4)]
      },
      {
        id: "g5",
        number: "5",
        artist: "Francesca Bernardini",
        title: "Material Memory",
        material: "Stone form and sculptural fragments",
        room: "North gallery",
        x: 41.9,
        y: 10.5,
        images: [artworkImage("ground", 5)]
      },
      {
        id: "g6",
        number: "6",
        artist: "Francesca Bernardini",
        title: "Relational Form",
        material: "Sculptural form and domestic structure",
        room: "North gallery",
        x: 54,
        y: 10.5,
        images: [artworkImage("ground", 6)]
      },
      {
        id: "g7",
        number: "7",
        artist: "Francesca Bernardini",
        title: "Stone Body",
        material: "Dark stone study",
        room: "North gallery",
        x: 63.5,
        y: 10.5,
        images: [artworkImage("ground", 7)]
      },
      {
        id: "g8",
        number: "8",
        artist: "Selene Frosini",
        title: "Listening Fragment IV",
        material: "Split marble form and apertures",
        room: "East gallery",
        x: 72.4,
        y: 20.4,
        images: [artworkImage("ground", 8)]
      },
      {
        id: "g9",
        number: "9",
        artist: "Selene Frosini",
        title: "Listening Fragment V",
        material: "Marble surface and void",
        room: "East gallery",
        x: 72.1,
        y: 37.2,
        images: [artworkImage("ground", 9)]
      },
      {
        id: "g10",
        number: "10",
        artist: "Selene Frosini",
        title: "Listening Fragment VI",
        material: "Extraction, landscape and fragile ecosystems",
        room: "East gallery",
        x: 71.4,
        y: 53.6,
        images: [artworkImage("ground", 10)]
      },
      {
        id: "g11",
        number: "11",
        artist: "Anna Multone",
        title: "Materiality and Memory I",
        material: "Sculpture, memory and everyday form",
        room: "Courtyard center",
        x: 44.9,
        y: 57.6,
        images: [artworkImage("ground", 11)]
      }
    ]
  },
  first: {
    tab: "Piano primo",
    title: "Piano primo",
    icon: "stairs",
    intro:
      "Seven works extend the exhibition upstairs through monumental forms, domestic structures and suspended fragments. The route connects the historical and contemporary collection rooms.",
    works: [
      {
        id: "f1",
        number: "1",
        artist: "Francesca Bernardini",
        title: "Monumental Form I",
        material: "Monumental sculptural form",
        room: "West gallery / dark room",
        x: 9,
        y: 26.8,
        images: [artworkImage("first", 1)]
      },
      {
        id: "f2",
        number: "2",
        artist: "Francesca Bernardini",
        title: "Monumental Form II",
        material: "Monumental marble sculpture",
        room: "West gallery",
        x: 9.1,
        y: 12.4,
        images: [artworkImage("first", 2)]
      },
      {
        id: "f3",
        number: "3",
        artist: "Anna Multone",
        title: "Materiality and Memory II",
        material: "Sculpture, transformation and everyday life",
        room: "South gallery",
        x: 38,
        y: 85.6,
        images: [artworkImage("first", 3)]
      },
      {
        id: "f4",
        number: "4",
        artist: "Verena Mayer Tasch",
        title: "Marble Leaf",
        material: "Marble, organic form and protective inner space",
        room: "South gallery",
        x: 56,
        y: 85.6,
        images: [artworkImage("first", 4)]
      },
      {
        id: "f5",
        number: "5",
        artist: "Anna Multone",
        title: "Materiality and Memory III",
        material: "Sculpture, archive and everyday structure",
        room: "South gallery",
        x: 74,
        y: 85.6,
        images: [artworkImage("first", 5)]
      },
      {
        id: "f6",
        number: "6",
        artist: "Verena Mayer Tasch",
        title: "Marble Leaves",
        material: "Suspended marble intervention",
        room: "South gallery",
        x: 92,
        y: 85.4,
        images: [
          artworkImage("first", 6),
          assetUrl("artworks/first-06-detail.png")
        ]
      },
      {
        id: "f7",
        number: "7",
        artist: "Silvia Scaringella",
        title: "In Dialogue with Il Capo",
        material: "Installation, landscape and fragile ecosystems",
        room: "South gallery",
        x: 50,
        y: 64.5,
        images: [artworkImage("first", 7)]
      }
    ]
  }
};

function PlanDrawing({ floor }) {
  const [loadState, setLoadState] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);
  const source =
    retryCount === 0
      ? planImages[floor]
      : `${planImages[floor]}?plan-retry=${retryCount}`;

  function handleError() {
    if (retryCount < 2) {
      setLoadState("loading");
      setRetryCount((count) => count + 1);
      return;
    }

    setLoadState("error");
  }

  return (
    <>
      {loadState !== "ready" && (
        <div className="floor-plan-status" role="status">
          {loadState === "error" ? (
            <button
              type="button"
              onClick={() => {
                setLoadState("loading");
                setRetryCount((count) => count + 1);
              }}
            >
              Reload floor plan
            </button>
          ) : (
            <span>Loading floor plan</span>
          )}
        </div>
      )}
      <img
        className={`floor-plan-image floor-plan-image--${floor}${
          loadState === "ready" ? " floor-plan-image--ready" : ""
        }`}
        src={source}
        alt=""
        width="1080"
        height="1080"
        decoding="async"
        fetchPriority="high"
        draggable="false"
        onLoad={() => setLoadState("ready")}
        onError={handleError}
      />
    </>
  );
}

function Thumb({ work }) {
  return (
    <span className="work-thumb" aria-hidden="true">
      {work.images.map((image, index) => (
        <img
          className={index > 0 ? "work-thumb-detail" : undefined}
          src={image}
          alt=""
          loading="lazy"
          key={image}
        />
      ))}
      {work.images.length > 1 && <small className="work-view-count">{work.images.length} views</small>}
    </span>
  );
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
                "--y": `${work.y}%`
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

function WorkRow({ work, isActive, onSelect, onOpen, register }) {
  return (
    <article
      className="work-row"
      aria-current={isActive ? "true" : undefined}
      ref={(node) => register(work.id, node)}
    >
      <button
        type="button"
        onClick={() => {
          onSelect(work.id);
          onOpen(work);
        }}
      >
        <span className="work-number">{work.number}</span>
        <Thumb work={work} />
        <span className="work-copy">
          <strong>{work.artist}</strong>
          <em>{work.title}</em>
          <small>{work.material}</small>
          <small>{work.room}</small>
        </span>
      </button>
    </article>
  );
}

function WorkDetailModal({ work, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!work) return undefined;

    setImageIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      panelRef.current,
      { y: 24, scale: 0.985, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.38, ease: "power3.out" }
    );

    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [work, onClose]);

  if (!work) return null;

  return (
    <div
      className="work-detail-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="work-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-detail-title"
        ref={panelRef}
      >
        <button
          className="work-detail-close"
          type="button"
          onClick={onClose}
          aria-label="Close artwork details"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="work-detail-media">
          <img src={work.images[imageIndex]} alt={`${work.title} by ${work.artist}`} />
          {work.images.length > 1 && (
            <div className="work-detail-thumbnails" aria-label="Artwork views">
              {work.images.map((image, index) => (
                <button
                  type="button"
                  aria-pressed={imageIndex === index}
                  aria-label={`View ${index + 1}`}
                  onClick={() => setImageIndex(index)}
                  key={image}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="work-detail-copy">
          <p className="section-kicker">
            {work.number} / {work.room}
          </p>
          <h2 id="work-detail-title">{work.title}</h2>
          <p className="work-detail-artist">{work.artist}</p>
          <dl>
            <div>
              <dt>Material / approach</dt>
              <dd>{work.material}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{work.room}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

const menuPanels = {
  story: {
    label: "Story",
    kicker: "Exhibition Title",
    title: "RESONANT MATTER",
    body: [
      "Listening and dialogue revealing form.",
      "Marble is not inert matter. It is compressed geological memory: mineral flesh formed through pressure, darkness, heat and transformation over millions of years.",
      "In Carrara, stone is not simply extracted. It is revealed. The mountains surrounding the city contain layers of geological, cultural and human history, and the act of carving becomes a negotiation between matter and memory.",
      "The mountain is not a resource. It is a body of time. The stone is not passive. It is already in conversation."
    ]
  },
  route: {
    label: "Route",
    kicker: "Exhibition Narrative",
    title: "From courtyard to collection",
    body: [
      "The courtyard is imagined as a brighter, unified environment covered with white marble chips, directly connecting the visitor to Carrara's stone-working traditions.",
      "Verena Mayer Tasch's monumental marble leaf becomes a central point of encounter, while selected sculptures by Selene Frosini and Francesca Bernardini create a layered dialogue between the courtyard, cloisters and museum rooms.",
      "Silvia Scaringella's installation is presented in dialogue with Yuri Ancarani's Il Capo, bringing two perspectives on Carrara into contact: industrial extraction and fragile ecosystems.",
      "Anna Multone's works extend the collection's ongoing reflections on materiality, memory, transformation and everyday life."
    ]
  },
  artists: {
    label: "Artists",
    kicker: "Five Women Sculptors",
    title: "Five women sculptors",
    body: [
      "The exhibition brings together five women sculptors whose practices differ in language, technique, scale and aesthetic approach.",
      "Verena Mayer Tasch works with marble as threshold and encounter. Selene Frosini develops a way of listening to fragment, surface and resistance.",
      "Francesca Bernardini explores abstraction and organic form, extending shells, cocoons and protective inner spaces into contemporary sculpture.",
      "Silvia Scaringella opens a dialogue between landscape, material and human intervention. Anna Multone connects sculpture with memory, transformation and everyday life.",
      "Five ways of listening, five ways of revealing form."
    ]
  },
  team: {
    label: "Team",
    kicker: "Curatorial Team",
    title: "MUDAC Carrara, September 2026",
    body: [
      "Curatorial exhibition proposal conceived and developed for MUDAC, Museo delle Arti Carrara.",
      "The website frames the museum map as an interactive route through listening, form, geological memory and environmental attention."
    ]
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
          <div className="menu-panel-body">
            {panel.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
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
  const [detailWork, setDetailWork] = useState(null);
  const rowRefs = useRef(new Map());
  const worksListRef = useRef(null);
  const floorFanRef = useRef(null);
  const floorRequestRef = useRef(0);

  const floor = floors[activeFloor];
  const selectedWork = useMemo(
    () => floor.works.find((work) => work.id === selectedId) ?? floor.works[0],
    [floor, selectedId]
  );

  useEffect(() => {
    setSelectedId(floors[activeFloor].works[0].id);
    setDetailWork(null);
    worksListRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [activeFloor]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    preloadPlanImage(planImages.ground);
    preloadPlanImage(planImages.first);
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

  async function changeFloor(key) {
    if (key === activeFloor) return;

    const requestId = floorRequestRef.current + 1;
    floorRequestRef.current = requestId;
    await preloadPlanImage(planImages[key]);

    if (requestId !== floorRequestRef.current || key === activeFloor) return;

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
                onOpen={setDetailWork}
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
      <WorkDetailModal work={detailWork} onClose={() => setDetailWork(null)} />
      <MenuOverlay
        open={menuOpen}
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onClose={() => setMenuOpen(false)}
      />
    </main>
  );
}
