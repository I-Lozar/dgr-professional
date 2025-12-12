"use client";
import { useState } from "react";
import styles from "@/app/styles/components/Contacto/contacto.module.css";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Contacto</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} required placeholder="Nombre" />
        <input type="email" className={styles.input} required placeholder="Email" />
        <textarea className={styles.textarea} required placeholder="Mensaje"></textarea>

        <button className={styles.btn}>Enviar</button>
      </form>

      {sent && <p className={styles.ok}>¡Mensaje enviado correctamente!</p>}
    </section>
  );
}
