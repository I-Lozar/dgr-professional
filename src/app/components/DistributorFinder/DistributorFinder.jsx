"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./distributorFinder.module.css";
import distributorsData from "@/data/distributors.json";

function safe(v) {
  return typeof v === "string" ? v.trim() : "";
}

const DEFAULT_PIN_PROVINCE_ID = "ES-B"; // Barcelona (fallback)

function SvgMapMock({
  markerTitle = "Sublime Beauty",
  pinProvinceId = DEFAULT_PIN_PROVINCE_ID,
  pinLabel = "Barcelona",
  highlightAll = false,
  highlightProvinceIds = [],
  excludeProvinceIds = [],
}) {
  const hostRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState("");

  // 1) Cargar SVG desde /public
  useEffect(() => {
    let alive = true;

    fetch("/maps/spain-provinces.svg")
      .then((r) => r.text())
      .then((txt) => {
        if (!alive) return;
        setSvgMarkup(txt);
      })
      .catch(() => {
        if (!alive) return;
        setSvgMarkup("");
      });

    return () => {
      alive = false;
    };
  }, []);

  // 2) Aplicar estilos, highlights y pin
  useEffect(() => {
    if (!svgMarkup || !hostRef.current) return;

    const svg = hostRef.current.querySelector("svg");
    if (!svg) return;

    // Clase base para aplicar estilos del módulo
    svg.classList.add(styles.spainSvg);

    // Forzar "contain" y evitar tamaños hardcodeados
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Limpieza highlights previos (por si se re-renderiza)
    svg.querySelectorAll(`.${styles.provinceHighlight}`).forEach((n) =>
      n.classList.remove(styles.provinceHighlight)
    );

    // Highlight
    if (highlightAll) {
      const nodes = svg.querySelectorAll('[id^="ES-"]');
      nodes.forEach((node) => {
        const id = node.getAttribute("id") || "";
        if (!excludeProvinceIds.includes(id)) node.classList.add(styles.provinceHighlight);
      });
    } else if (Array.isArray(highlightProvinceIds) && highlightProvinceIds.length) {
      for (const id of highlightProvinceIds) {
        const node = svg.querySelector(`#${CSS.escape(id)}`);
        if (node) node.classList.add(styles.provinceHighlight);
      }
    }

    // Pin
    const pinNode = svg.querySelector(`#${CSS.escape(pinProvinceId)}`);
    if (!pinNode || typeof pinNode.getBBox !== "function") return;

    const bbox = pinNode.getBBox();
    const x = bbox.x + bbox.width * 0.62;
    const y = bbox.y + bbox.height * 0.45;

    let pin = svg.querySelector("#dgr-pin");
    if (!pin) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("id", "dgr-pin");
      g.setAttribute("class", styles.pinGroup);

      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulse.setAttribute("class", styles.pinPulse);
      pulse.setAttribute("cx", "0");
      pulse.setAttribute("cy", "0");
      pulse.setAttribute("r", "22");

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("class", styles.pinDot);
      dot.setAttribute("cx", "0");
      dot.setAttribute("cy", "0");
      dot.setAttribute("r", "7");

      const stem = document.createElementNS("http://www.w3.org/2000/svg", "path");
      stem.setAttribute("class", styles.pinStem);
      stem.setAttribute("d", "M0 8 L0 34");

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("class", styles.pinLabel);
      label.setAttribute("x", "16");
      label.setAttribute("y", "5");
      label.textContent = pinLabel;

      g.appendChild(pulse);
      g.appendChild(dot);
      g.appendChild(stem);
      g.appendChild(label);

      svg.appendChild(g);
      pin = g;
    } else {
      const t = pin.querySelector("text");
      if (t) t.textContent = pinLabel;
    }

    pin.setAttribute("transform", `translate(${x} ${y})`);
  }, [svgMarkup, highlightAll, highlightProvinceIds, excludeProvinceIds, pinProvinceId, pinLabel]);

  return (
    <div className={styles.mapMockWrap} aria-label="Mapa (SVG simulado)">
      {/* IMPORTANTE: sin aspectRatio inline (lo controla el CSS) */}
      <div className={styles.mapFrame}>
        <div
          ref={hostRef}
          className={styles.svgHost}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>

      <div className={styles.mapLegend}>
        <span className={styles.legendSwatch} />
        <span>{markerTitle}</span>
      </div>
    </div>
  );
}

/**
 * Provider intercambiable.
 * Hoy: SVG local. Mañana: GoogleMap con misma firma (props compatibles).
 */
function MapProvider(props) {
  return <SvgMapMock {...props} />;
}

/**
 * Normaliza cobertura:
 * - HOY (1 distribuidor): "Toda España"
 * - MAÑANA (multi): cada distribuidor define su cobertura (include/exclude)
 *
 * Esquema recomendado (por distribuidor):
 * coverage: {
 *   type: "all" | "only",
 *   includeProvinceIds?: ["ES-M", ...],
 *   excludeProvinceIds?: ["ES-M", ...]
 * }
 */
function computeCoverage({ distributorsCount, distributor }) {
  const coverage = distributor?.coverage && typeof distributor.coverage === "object" ? distributor.coverage : null;

  const coverageAll =
    coverage?.type === "all" ||
    distributor?.coverageAll === true ||
    distributorsCount === 1;

  const excludeProvinceIds =
    (Array.isArray(coverage?.excludeProvinceIds) && coverage.excludeProvinceIds) ||
    (Array.isArray(distributor?.excludeProvinceIds) && distributor.excludeProvinceIds) ||
    [];

  const includeProvinceIds =
    (Array.isArray(coverage?.includeProvinceIds) && coverage.includeProvinceIds) ||
    (Array.isArray(distributor?.includeProvinceIds) && distributor.includeProvinceIds) ||
    [];

  if (coverageAll) {
    const base = "Toda España";
    const hasExclusions = excludeProvinceIds.length > 0;
    return {
      label: hasExclusions ? `${base} (excepto zonas asignadas)` : base,
      highlightAll: true,
      highlightProvinceIds: [],
      excludeProvinceIds,
    };
  }

  if (includeProvinceIds.length) {
    return {
      label: "Cobertura por zonas",
      highlightAll: false,
      highlightProvinceIds: includeProvinceIds,
      excludeProvinceIds: [],
    };
  }

  return {
    label: "Cobertura local",
    highlightAll: false,
    highlightProvinceIds: [],
    excludeProvinceIds: [],
  };
}

export default function DistributorFinder() {
  const distributors = Array.isArray(distributorsData?.distributors) ? distributorsData.distributors : [];
  const distributor = distributors[0] || {};

  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const hint = useMemo(() => {
    if (!normalizedQuery) return "Introduce ciudad, provincia o código postal (opcional).";
    return "Mostrando el distribuidor disponible actualmente.";
  }, [normalizedQuery]);

  const name = safe(distributor.name) || "Distribuidor oficial";
  const address = safe(distributor.address);

  const phone1 = safe(distributor.phone1);
  const phone2 = safe(distributor.phone2);

  const email = safe(distributor.email);
  const website = safe(distributor.website);
  const mapsLink = safe(distributor.mapsLink);

  const customerHours = safe(distributor.customerHours);
  const storeHours = safe(distributor.storeHours);

  const notes = safe(distributor.notes);

  // Pin y meta
  const city = safe(distributor.city);
  const province = safe(distributor.province);

  const pinLabel = city || "Barcelona";
  const pinProvinceId = safe(distributor.provinceId) || DEFAULT_PIN_PROVINCE_ID;

  const metaText = city ? `${city}${province ? `, ${province}` : ""}` : "España";

  const coverage = useMemo(
    () => computeCoverage({ distributorsCount: distributors.length, distributor }),
    [distributors.length, distributor]
  );

  return (
    <section className={styles.page}>
      <div className={styles.max}>
        <header className={styles.head}>
          <h1 className={styles.title}>Distribuidor Finder</h1>
          <p className={styles.subtitle}>Encuentra tu distribuidor oficial de DGR Professional.</p>
        </header>

        <div className={styles.grid}>
          {/* BLOQUE 1: Buscador + ficha */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Buscar distribuidor</h2>
              <p className={styles.cardHelp}>{hint}</p>
            </div>

            <div className={styles.searchRow}>
              <label className={styles.label} htmlFor="finderQuery">
                Ubicación
              </label>
              <input
                id="finderQuery"
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej. Barcelona, Madrid, 08001…"
                inputMode="search"
                autoComplete="off"
              />
            </div>

            <div className={styles.divider} />

            <div className={styles.distributor}>
              <div className={styles.distributorTop}>
                <div>
                  <p className={styles.kicker}>Distribuidor</p>
                  <h3 className={styles.distributorName}>{name}</h3>
                  <p className={styles.meta}>{metaText}</p>
                </div>

                <span className={styles.badge}>Disponible</span>
              </div>

              <p className={styles.line}>
                <span className={styles.lineLabel}>Cobertura</span>
                <span className={styles.lineValue}>{coverage.label}</span>
              </p>

              {address && (
                <p className={styles.line}>
                  <span className={styles.lineLabel}>Dirección</span>
                  <span className={styles.lineValue}>{address}</span>
                </p>
              )}

              <div className={styles.twoCols}>
                {phone1 && (
                  <p className={styles.line}>
                    <span className={styles.lineLabel}>Teléfono</span>
                    <a className={styles.link} href={`tel:${phone1.replace(/\s+/g, "")}`}>
                      {phone1}
                    </a>
                  </p>
                )}

                {phone2 && (
                  <p className={styles.line}>
                    <span className={styles.lineLabel}>Teléfono 2</span>
                    <a className={styles.link} href={`tel:${phone2.replace(/\s+/g, "")}`}>
                      {phone2}
                    </a>
                  </p>
                )}

                {email && (
                  <p className={styles.line}>
                    <span className={styles.lineLabel}>Email</span>
                    <a className={styles.link} href={`mailto:${email}`}>
                      {email}
                    </a>
                  </p>
                )}
              </div>

              {website && (
                <p className={styles.line}>
                  <span className={styles.lineLabel}>Web</span>
                  <a className={styles.link} href={website} target="_blank" rel="noreferrer">
                    Visitar sitio
                  </a>
                </p>
              )}

              {mapsLink && (
                <p className={styles.line}>
                  <span className={styles.lineLabel}>Maps</span>
                  <a className={styles.link} href={mapsLink} target="_blank" rel="noreferrer">
                    Ver ubicación
                  </a>
                </p>
              )}

              {customerHours && (
                <p className={styles.line}>
                  <span className={styles.lineLabel}>Horario atención</span>
                  <span className={styles.lineValue}>{customerHours}</span>
                </p>
              )}

              {storeHours && (
                <p className={styles.line}>
                  <span className={styles.lineLabel}>Horario tienda</span>
                  <span className={styles.lineValue}>{storeHours}</span>
                </p>
              )}

              {notes && <p className={styles.note}>{notes}</p>}
            </div>
          </div>

          {/* BLOQUE 2: Mapa */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Mapa</h2>
              <p className={styles.cardHelp}>Vista general distribución: {coverage.label}.</p>
            </div>

            <MapProvider
              markerTitle={`${name} (${pinLabel})`}
              pinProvinceId={pinProvinceId}
              pinLabel={pinLabel}
              highlightAll={coverage.highlightAll}
              highlightProvinceIds={coverage.highlightProvinceIds}
              excludeProvinceIds={coverage.excludeProvinceIds}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
