import { useEffect, useState } from "react";
import Scene from "./Scene.jsx";
import EnterTransition from "./EnterTransition.jsx";
import ExhibitionPage from "./ExhibitionPage.jsx";

function getRoute() {
  return window.location.pathname === "/exhibition" || window.location.hash === "#exhibition" ? "/exhibition" : "/";
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function beginEnter() {
    if (isEntering) return;
    setIsEntering(true);
  }

  function finishEnter() {
    window.history.pushState({}, "", "#exhibition");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setRoute("/exhibition");
    setIsEntering(false);
  }

  if (route === "/exhibition") {
    return <ExhibitionPage />;
  }

  return (
    <main className="landing-page" aria-label="MUDAC Carrara landing page">
      <Scene isEntering={isEntering} onEnter={beginEnter} />
      <EnterTransition active={isEntering} onComplete={finishEnter} />
    </main>
  );
}
