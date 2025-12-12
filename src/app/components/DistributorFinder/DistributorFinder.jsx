"use client";

import styles from "./distributorFinder.module.css";
import distributorsData from "@/data/distributors.json";
import { useEffect, useRef } from "react";

export default function DistributorFinder() {

  const distributor = distributorsData.distributors[0];
  const mapRef = useRef(null);

  /* === GOOGLE MAPS INIT === */
  useEffect(() => {
    if (!window.google) return;

    const center = { lat: 41.4305, lng: 2.2187 }; // Coordenadas de Sublime Beauty

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      mapId: "dgr-map-style"
    });

    new window.google.maps.Marker({
      position: center,
      map,
      title: distributor.name,
    });

  }, [distributor]);

  return (
    <div className={styles.layout}>
      
      {/* LEFT PANEL */}
      <section className={styles.leftPanel}>

        {/* SEARCH BAR */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar distribuidor..."
            className={styles.searchInput}
          />
        </div>

        {/* RESULTS COUNT */}
        <p className={styles.count}>1 Distribuidor en tu zona</p>

        {/* CARD DISTRIBUIDOR */}
        <div className={styles.card}>
          <h2>{distributor.name}</h2>
          <p className={styles.address}>{distributor.address}</p>

          <div className={styles.block}>
            <h3>Atención al cliente</h3>
            <p>{distributor.customerHours}</p>
          </div>

          <div className={styles.block}>
            <h3>Horario de tienda</h3>
            <p>{distributor.storeHours}</p>
          </div>

          <div className={styles.contactButtons}>
            <a href={`tel:${distributor.phone1}`} className={styles.btn}>📞 {distributor.phone1}</a>
            <a href={`tel:${distributor.phone2}`} className={styles.btn}>📞 {distributor.phone2}</a>
            <a href={`mailto:${distributor.email}`} className={styles.btn}>✉️ Email</a>
            <a href={distributor.website} target="_blank" className={styles.btn}>🌐 Web oficial</a>
            <a href={distributor.mapsLink} target="_blank" className={styles.btn}>📍 Cómo llegar</a>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL — GOOLGE MAPS */}
      <section className={styles.mapPanel}>
        <div className={styles.map} ref={mapRef}></div>
      </section>
    </div>
  );
}
