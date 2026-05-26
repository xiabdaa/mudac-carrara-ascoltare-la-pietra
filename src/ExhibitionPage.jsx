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
    <svg className="route-plan-svg" viewBox="0 0 1000 420" aria-hidden="true">
      {isGround ? (
        <>
          <g className="plan-drawing">
            <path className="plan-wall" d="M245 55H720V295H245Z" />
            <path className="plan-wall" d="M365 95H600V230H365Z" />
            <path className="plan-wall" d="M720 55H852V295H720" />
            <path className="plan-wall" d="M245 295H365V355H245Z" />
            <path className="plan-wall" d="M365 295H600V355H365" />
            <path className="plan-wall" d="M600 295H852V355H600Z" />
            <path className="plan-thin" d="M278 82V270" />
            <path className="plan-thin" d="M704 76V280" />
            <path className="plan-thin" d="M760 55V295" />
            <path className="plan-thin" d="M760 112H852M760 170H852M760 232H852" />
            <path className="plan-thin" d="M305 295v60M330 295v60" />
            <path className="plan-step" d="M292 307h48M292 319h48M292 331h48M292 343h48" />
            <path className="plan-break" d="M245 126V190M245 248V284M720 155V218M720 252V285" />
            <rect className="plan-square" x="274" y="45" width="12" height="12" />
            <rect className="plan-square" x="752" y="158" width="12" height="12" />
            <path className="plan-entry" d="M220 280l18 10-18 10z" />
          </g>
          <text className="plan-title" x="500" y="24" textAnchor="middle">PIANO TERRA</text>
          <text className="plan-label" x="150" y="160" textAnchor="end">
            <tspan x="150" dy="0">MOSTRE</tspan>
            <tspan x="150" dy="16">TEMPORANEE</tspan>
          </text>
          <path className="plan-label-line" d="M166 165H245" />
          <text className="plan-label" x="155" y="290" textAnchor="end">RECEPTION</text>
          <path className="plan-label-line" d="M172 290H245" />
          <text className="plan-room" x="505" y="325" textAnchor="middle">BAR</text>
          <text className="plan-room" x="807" y="88" textAnchor="middle">WC</text>
          <text className="plan-label" x="885" y="192" textAnchor="start">
            <tspan x="885" dy="0">SALA</tspan>
            <tspan x="885" dy="16">CONFERENZE</tspan>
          </text>
          <path className="plan-label-line" d="M852 198H878" />
          <text className="entry-arrow" x="315" y="405" textAnchor="middle">↑</text>
        </>
      ) : (
        <>
          <g className="plan-drawing">
            <path className="plan-wall" d="M235 60H720V300H235Z" />
            <path className="plan-wall" d="M355 108H590V238H355Z" />
            <path className="plan-wall" d="M720 60H855V300H720" />
            <path className="plan-wall" d="M235 300H372V360H235Z" />
            <path className="plan-wall" d="M372 300H855V360H372Z" />
            <path className="plan-thin" d="M290 92V278" />
            <path className="plan-thin" d="M700 92V282" />
            <path className="plan-thin" d="M760 60V300" />
            <path className="plan-thin" d="M760 116H855M760 185H855M760 247H855" />
            <path className="plan-thin" d="M312 300v60M340 300v60" />
            <path className="plan-step" d="M296 312h58M296 325h58M296 338h58M296 351h58" />
            <path className="plan-break" d="M290 112V190M290 235V284M700 118V174M700 220V286" />
            <path className="plan-thin" d="M820 32h48M820 46h48" />
          </g>
          <text className="plan-title" x="500" y="28" textAnchor="middle">PIANO PRIMO</text>
          <text className="plan-label" x="170" y="126" textAnchor="end">
            <tspan x="170" dy="0">DISEGNARE</tspan>
            <tspan x="170" dy="16">IL MARMO</tspan>
          </text>
          <path className="plan-label-line" d="M185 126H290" />
          <text className="plan-label" x="170" y="190" textAnchor="end">
            <tspan x="170" dy="0">COLLEZIONE</tspan>
            <tspan x="170" dy="16">STORICA</tspan>
            <tspan x="170" dy="16">(1957-1973)</tspan>
          </text>
          <path className="plan-label-line" d="M185 197H290" />
          <text className="plan-label" x="170" y="298" textAnchor="end">
            <tspan x="170" dy="0">PROJECT</tspan>
            <tspan x="170" dy="16">ROOM</tspan>
          </text>
          <path className="plan-label-line" d="M185 300H235" />
          <text className="plan-label" x="885" y="118" textAnchor="start">
            <tspan x="885" dy="0">RESIDENZE</tspan>
            <tspan x="885" dy="16">D'ARTISTA</tspan>
          </text>
          <path className="plan-label-line" d="M855 120H878" />
          <text className="plan-label" x="885" y="204" textAnchor="start">
            <tspan x="885" dy="0">OPERE</tspan>
            <tspan x="885" dy="16">ECCEZIONALI</tspan>
          </text>
          <path className="plan-label-line" d="M855 206H878" />
          <text className="plan-label" x="885" y="272" textAnchor="start">
            <tspan x="885" dy="0">DISEGNARE</tspan>
            <tspan x="885" dy="16">IL MARMO</tspan>
          </text>
          <path className="plan-label-line" d="M855 274H878" />
          <text className="plan-label" x="560" y="405" textAnchor="middle">
            <tspan x="560" dy="0">COLLEZIONE</tspan>
            <tspan x="560" dy="16">CONTEMPORANEA</tspan>
          </text>
          <path className="plan-label-line" d="M560 360V388" />
          <text className="entry-arrow" x="315" y="410" textAnchor="middle">↑</text>
        </>
      )}
    </svg>
  );
}

function Thumb({ type }) {
  return <span className={`work-thumb work-thumb--${type}`} aria-hidden="true" />;
}

function FloorMap({ floor, selectedId, onSelect }) {
  const planFloor = floor.icon === "stairs" ? "first" : "ground";

  return (
    <div className="map-shell" key={floor.title}>
      <div className="map-board">
        <PlanDrawing floor={planFloor} />

        {floor.works.map((work) => (
          <button
            className="map-marker"
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
        rowRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
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

      <footer className="visit-footer">
        <span>Piazza Alberica, 1 - 54033 Carrara (MS)</span>
        <a href="#route-title">Top</a>
        <span>Orari</span>
        <span>Contatti</span>
      </footer>
    </main>
  );
}
