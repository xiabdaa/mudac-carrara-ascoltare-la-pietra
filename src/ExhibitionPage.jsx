import { useEffect, useMemo, useRef, useState } from "react";

const floors = {
  ground: {
    tab: "Piano terra",
    title: "Piano terra",
    icon: "ground",
    intro:
      "Entrance, temporary exhibitions and conference rooms. The route begins with clay, dust and the first signs of the mountain entering the museum.",
    labels: [
      { text: "Mostre temporanee", x: 12, y: 35, align: "right" },
      { text: "Reception", x: 14, y: 67, align: "right" },
      { text: "Bar", x: 54, y: 73, align: "center" },
      { text: "WC", x: 80, y: 18, align: "center" },
      { text: "Sala conferenze", x: 88, y: 47, align: "left" }
    ],
    works: [
      {
        id: "g1",
        number: "1",
        artist: "Chiara Camoni",
        title: "Colonna (Bifronte)",
        year: "2025",
        material: "Terracotta galestro",
        room: "Spazio Mostre Temporanee",
        x: 45,
        y: 73,
        shape: "58% 42% 61% 39% / 43% 57% 38% 62%",
        tone: "#3b1a12",
        thumb: "terracotta"
      },
      {
        id: "g2",
        number: "2",
        artist: "Giulio Paolini",
        title: "Disegnare il marmo",
        year: "1978",
        material: "Marmo e disegno su carta",
        room: "Sala Conferenze",
        x: 74,
        y: 73,
        shape: "46% 54% 45% 55% / 52% 41% 59% 48%",
        tone: "#261009",
        thumb: "white"
      },
      {
        id: "g3",
        number: "3",
        artist: "Luca Trevisani",
        title: "Senza titolo",
        year: "2019",
        material: "Installazione",
        room: "Sala Conferenze",
        x: 82,
        y: 50,
        shape: "53% 47% 64% 36% / 44% 58% 42% 56%",
        tone: "#24100a",
        thumb: "light"
      },
      {
        id: "g4",
        number: "4",
        artist: "Stazione d'ascolto",
        title: "Ravaneto field audio",
        year: "2026",
        material: "Audio ambientale",
        room: "Mostre Temporanee",
        x: 24,
        y: 42,
        shape: "48% 52% 40% 60% / 61% 35% 65% 39%",
        tone: "#32160f",
        thumb: "sound"
      },
      {
        id: "g5",
        number: "5",
        artist: "Archivio della polvere",
        title: "Campioni di cava",
        year: "2026",
        material: "Marmo, carta, polvere",
        room: "Mostre Temporanee",
        x: 31,
        y: 57,
        shape: "41% 59% 55% 45% / 49% 61% 39% 51%",
        tone: "#4a2217",
        thumb: "dust"
      },
      {
        id: "g6",
        number: "6",
        artist: "Tavolo civico",
        title: "Carta delle cave",
        year: "2026",
        material: "Mappe, note, testimonianze",
        room: "Reception",
        x: 37,
        y: 65,
        shape: "61% 39% 47% 53% / 42% 53% 47% 58%",
        tone: "#28120b",
        thumb: "map"
      }
    ]
  },
  first: {
    tab: "Piano primo",
    title: "Piano primo",
    icon: "stairs",
    intro:
      "Historical collection, residencies and contemporary rooms. Upstairs, the route turns from extraction toward memory, repair and civic imagination.",
    labels: [
      { text: "Collezione storica", x: 16, y: 42, align: "right" },
      { text: "Project room", x: 16, y: 68, align: "right" },
      { text: "Residenze d'artista", x: 88, y: 31, align: "left" },
      { text: "Opere eccezionali", x: 88, y: 52, align: "left" },
      { text: "Disegnare il marmo", x: 88, y: 66, align: "left" },
      { text: "Collezione contemporanea", x: 55, y: 88, align: "center" }
    ],
    works: [
      {
        id: "f7",
        number: "7",
        artist: "Alighiero Boetti",
        title: "Mappa",
        year: "1969",
        material: "Ricamo su tessuto",
        room: "Collezione Storica",
        x: 31,
        y: 43,
        shape: "49% 51% 42% 58% / 62% 41% 59% 38%",
        tone: "#27100a",
        thumb: "map"
      },
      {
        id: "f8",
        number: "8",
        artist: "Collezione storica",
        title: "Atlante del marmo",
        year: "1957-1973",
        material: "Documenti e sculture",
        room: "Collezione Storica",
        x: 31,
        y: 59,
        shape: "59% 41% 57% 43% / 46% 57% 43% 54%",
        tone: "#32160f",
        thumb: "archive"
      },
      {
        id: "f9",
        number: "9",
        artist: "Elisa Montessori",
        title: "Paesaggio interiore",
        year: "2022",
        material: "Video installazione",
        room: "Residenze d'Artista",
        x: 77,
        y: 36,
        shape: "45% 55% 62% 38% / 45% 51% 49% 55%",
        tone: "#261009",
        thumb: "video"
      },
      {
        id: "f10",
        number: "10",
        artist: "Studio ambientale",
        title: "Water memory",
        year: "2026",
        material: "Suono, luce, acqua",
        room: "Opere Eccezionali",
        x: 77,
        y: 54,
        shape: "54% 46% 39% 61% / 52% 39% 61% 48%",
        tone: "#3c1c13",
        thumb: "water"
      },
      {
        id: "f11",
        number: "11",
        artist: "Archivio Carrara",
        title: "Disegnare il marmo",
        year: "2026",
        material: "Disegni, fotografie, rilievi",
        room: "Disegnare il Marmo",
        x: 77,
        y: 68,
        shape: "42% 58% 50% 50% / 58% 42% 58% 42%",
        tone: "#2b130d",
        thumb: "drawing"
      },
      {
        id: "f12",
        number: "12",
        artist: "Michelangelo Pistoletto",
        title: "Venere degli stracci",
        year: "1967",
        material: "Scultura in marmo",
        room: "Collezione Contemporanea",
        x: 55,
        y: 75,
        shape: "56% 44% 54% 46% / 40% 58% 42% 60%",
        tone: "#230f09",
        thumb: "statue"
      }
    ]
  }
};

const routeFacts = [
  { label: "Two floors", value: "12", unit: "points" },
  { label: "Museum path", value: "2", unit: "levels" },
  { label: "Mountain focus", value: "1", unit: "shared question" }
];

function FloorIcon({ type }) {
  if (type === "stairs") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M5 24h7v-6h7v-6h8" />
        <path d="M5 28h22" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M6 10h20v12H6z" />
      <path d="M13 10v12" />
      <path d="M19 10v12" />
    </svg>
  );
}

function PlanDrawing({ floor }) {
  const isGround = floor === "ground";

  return (
    <svg className="floor-svg" viewBox="0 0 1000 520" aria-hidden="true">
      <defs>
        <pattern id={`stone-grid-${floor}`} width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0H0V80" fill="none" stroke="rgba(31, 23, 18, 0.035)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1000" height="520" fill={`url(#stone-grid-${floor})`} />
      {isGround ? (
        <>
          <path className="plan-wall" d="M245 72H720V372H245Z" />
          <path className="plan-wall" d="M365 118H600V288H365Z" />
          <path className="plan-wall" d="M720 72H852V372H720" />
          <path className="plan-wall" d="M245 372H365V438H245Z" />
          <path className="plan-wall" d="M365 372H600V438H365" />
          <path className="plan-wall" d="M600 372H852V438H600Z" />
          <path className="plan-thin" d="M278 95V343" />
          <path className="plan-thin" d="M704 92V352" />
          <path className="plan-thin" d="M760 72V372" />
          <path className="plan-thin" d="M760 145H852M760 210H852M760 285H852" />
          <path className="plan-thin" d="M305 372v66M330 372v66" />
          <path className="plan-step" d="M292 385h48M292 398h48M292 411h48M292 424h48" />
          <path className="plan-break" d="M245 160V230M245 310V350M720 198V264M720 320V360" />
          <path className="plan-entry" d="M220 338l18 10-18 10z" />
        </>
      ) : (
        <>
          <path className="plan-wall" d="M235 86H720V374H235Z" />
          <path className="plan-wall" d="M355 142H590V292H355Z" />
          <path className="plan-wall" d="M720 86H855V374H720" />
          <path className="plan-wall" d="M235 374H372V444H235Z" />
          <path className="plan-wall" d="M372 374H855V444H372Z" />
          <path className="plan-thin" d="M290 118V348" />
          <path className="plan-thin" d="M700 116V352" />
          <path className="plan-thin" d="M760 86V374" />
          <path className="plan-thin" d="M760 154H855M760 240H855M760 312H855" />
          <path className="plan-thin" d="M312 374v70M340 374v70" />
          <path className="plan-step" d="M296 389h58M296 403h58M296 417h58M296 431h58" />
          <path className="plan-break" d="M290 172V244M290 300V350M700 165V225M700 276V352" />
          <path className="plan-thin" d="M820 58h48M820 72h48" />
        </>
      )}
    </svg>
  );
}

function Thumb({ type }) {
  return <span className={`work-thumb work-thumb--${type}`} aria-hidden="true" />;
}

function FloorMap({ floor, selectedId, onSelect }) {
  return (
    <div className="map-shell" key={floor.title}>
      <div className="map-head">
        <span className="floor-icon">
          <FloorIcon type={floor.icon} />
        </span>
        <div>
          <p className="section-kicker">Mappa interattiva</p>
          <h2>{floor.title}</h2>
        </div>
      </div>

      <div className="map-board">
        <PlanDrawing floor={floor.icon === "stairs" ? "first" : "ground"} />

        {floor.labels.map((label) => (
          <span
            className={`map-label map-label--${label.align}`}
            key={label.text}
            style={{ "--x": `${label.x}%`, "--y": `${label.y}%` }}
          >
            {label.text}
          </span>
        ))}

        {floor.works.map((work) => (
          <button
            className="map-marker"
            type="button"
            aria-pressed={selectedId === work.id}
            aria-label={`${work.number}. ${work.artist}, ${work.title}, ${work.room}`}
            key={work.id}
            onClick={() => onSelect(work.id)}
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

        <span className="entry-arrow" aria-hidden="true">
          ↑
        </span>
      </div>
    </div>
  );
}

function SelectedWork({ work, floor }) {
  return (
    <aside className="selected-work" aria-live="polite">
      <div className="selected-index">{work.number}</div>
      <Thumb type={work.thumb} />
      <p className="section-kicker">{floor.tab}</p>
      <h3>
        {work.artist}
        <em>{work.title}</em>
      </h3>
      <dl>
        <div>
          <dt>Year</dt>
          <dd>{work.year}</dd>
        </div>
        <div>
          <dt>Material</dt>
          <dd>{work.material}</dd>
        </div>
        <div>
          <dt>Position</dt>
          <dd>{work.room}</dd>
        </div>
      </dl>
    </aside>
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

export default function ExhibitionPage() {
  const [activeFloor, setActiveFloor] = useState("ground");
  const [selectedId, setSelectedId] = useState(floors.ground.works[0].id);
  const rowRefs = useRef(new Map());

  const floor = floors[activeFloor];
  const selectedWork = useMemo(
    () => floor.works.find((work) => work.id === selectedId) ?? floor.works[0],
    [floor, selectedId]
  );

  useEffect(() => {
    setSelectedId(floors[activeFloor].works[0].id);
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
        rowRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
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
          <button className="menu-button" type="button" aria-label="Menu">
            <span>Menu</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <section className="map-intro" aria-labelledby="route-title">
        <p className="section-kicker">Interactive route</p>
        <h1 id="route-title">ASCOLTARE LA PIETRA</h1>
        <p>
          Find each work by floor and room while connecting Carrara's
          marble culture to the environmental pressure of over-extraction.
        </p>
      </section>

      <nav className="floor-tabs" aria-label="Floor selection">
        {Object.entries(floors).map(([key, item]) => (
          <button
            type="button"
            key={key}
            aria-selected={activeFloor === key}
            onClick={() => setActiveFloor(key)}
          >
            {item.tab}
          </button>
        ))}
      </nav>

      <section className="route-visualizer" aria-label="Interactive exhibition map">
        <FloorMap floor={floor} selectedId={selectedWork.id} onSelect={selectWork} />
        <SelectedWork work={selectedWork} floor={floor} />
      </section>

      <section className="mountain-strip" aria-label="Environmental reading">
        <div>
          <p className="section-kicker">Carrara / Apuan Alps</p>
          <h2>Stone is not neutral material.</h2>
          <p>
            Every point on the route pairs a museum position with a trace of quarrying: cut
            surfaces, dust, water use, civic memory and the need to protect the mountain that
            supports the city.
          </p>
        </div>
        <ol className="process-line" aria-label="Material journey">
          <li>Quarry</li>
          <li>Cut</li>
          <li>City</li>
          <li>Museum</li>
          <li>Repair</li>
        </ol>
      </section>

      <section className="fact-row" aria-label="Route facts">
        {routeFacts.map((fact) => (
          <article key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.unit}</span>
            <p>{fact.label}</p>
          </article>
        ))}
      </section>

      <section className="works-section" aria-label="Featured works">
        <div className="works-section-head">
          <p className="section-kicker">Opere in evidenza</p>
          <p>{floor.intro}</p>
        </div>
        <div className="works-list">
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

      <footer className="visit-footer">
        <span>Piazza Alberica, 1 - 54033 Carrara (MS)</span>
        <a href="#route-title">Top</a>
        <span>Orari</span>
        <span>Contatti</span>
      </footer>
    </main>
  );
}
