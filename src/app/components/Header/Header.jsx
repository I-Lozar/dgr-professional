"use client";

import { useState } from "react";
import styles from "@/app/styles/components/Header/header.module.css";
import menuItems from "./menuItems";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* BURGER MOBILE */}
        <button className={styles.burger} onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
        </button>

        {/* LOGO */}
        <Link href="/" className={styles.logo}>DGR</Link>

        {/* MENÚ DESKTOP */}
        <nav className={styles.desktopNav}>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navItem}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* MENÚ MOBILE */}
      <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
        <button className={styles.close} onClick={() => setOpen(false)}>×</button>

        <nav className={styles.mobileNav}>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileItem}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
