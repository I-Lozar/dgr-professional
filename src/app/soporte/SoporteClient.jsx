"use client";

import { useMemo, useState } from "react";
import styles from "./soporte.module.css";
import Link from "next/link";

function makeTicketId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DGR-${t}-${r}`;
}

export default function SoporteClient() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    serial: "",
    purchaseDate: "",
    distributor: "",
    message: "",
    privacy: false,
  });

  const isReady = useMemo(() => {
    return Boolean(form.name && form.email && form.message && form.privacy);
  }, [form]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!isReady) return;

    // Placeholder: aquí luego conectamos a /api/soporte o a tu sistema de helpdesk/email.
    const id = makeTicketId();
    setTicketId(id);
    setSubmitted(true);
  }

  function reset() {
    setSubmitted(false);
    setTicketId("");
    setForm({
      name: "",
      email: "",
      phone: "",
      model: "",
      serial: "",
      purchaseDate: "",
      distributor: "",
      message: "",
      privacy: false,
    });
  }

  return (
    <div className={styles.grid}>
      {/* Información de soporte (orientado a confianza) */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.h2}>Atención y asistencia técnica</h2>
          <p className={styles.muted}>
            Este canal está pensado para ayudarte a resolver dudas técnicas, mantenimiento,
            compatibilidades y gestión de servicio.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h3 className={styles.h3}>Qué podemos ayudarte a gestionar</h3>
            <ul className={styles.list}>
              <li>Recomendaciones de uso y mantenimiento preventivo.</li>
              <li>Compatibilidad de accesorios y consumibles.</li>
              <li>Revisión de funcionamiento y diagnóstico guiado.</li>
              <li>Gestión de servicio técnico y seguimiento de caso.</li>
              <li>Orientación sobre garantía (según compra en distribuidor autorizado).</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.h3}>Antes de abrir un ticket</h3>
            <p className={styles.p}>
              Para que podamos ayudarte de forma más rápida, prepara si es posible:
              <strong> modelo</strong>, <strong>nº de serie</strong>, <strong>fecha de compra</strong> y
              <strong> distribuidor</strong>. Si necesitas revisar las condiciones, consulta{" "}
              <Link href="/garantia" className={styles.inlineLink}>Garantía</Link>.
            </p>
          </div>

          <div className={styles.note}>
            Si tu consulta es comercial o general, también puedes escribirnos desde{" "}
            <Link href="/contacto" className={styles.inlineLink}>Contacto</Link>.
          </div>
        </div>
      </section>

      {/* Ticket */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.h2}>Abrir ticket</h2>
          <p className={styles.muted}>
            Describe tu solicitud con el máximo detalle para que el equipo técnico pueda
            responderte con precisión.
          </p>
        </div>

        {!submitted ? (
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Nombre y apellidos *</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className={styles.input}
                  placeholder="Tu nombre"
                />
              </label>

              <label className={styles.field}>
                <span>Email *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className={styles.input}
                  placeholder="tu@email.com"
                />
              </label>

              <label className={styles.field}>
                <span>Teléfono (opcional)</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className={styles.input}
                  placeholder="+34…"
                />
              </label>

              <label className={styles.field}>
                <span>Modelo (opcional)</span>
                <input
                  name="model"
                  value={form.model}
                  onChange={onChange}
                  className={styles.input}
                  placeholder="Ej.: SPARK X / PRO 2…"
                />
              </label>

              <label className={styles.field}>
                <span>Nº de serie (opcional)</span>
                <input
                  name="serial"
                  value={form.serial}
                  onChange={onChange}
                  className={styles.input}
                  placeholder="Si lo tienes a mano"
                />
              </label>

              <label className={styles.field}>
                <span>Fecha de compra (opcional)</span>
                <input
                  type="date"
                  name="purchaseDate"
                  value={form.purchaseDate}
                  onChange={onChange}
                  className={styles.input}
                />
              </label>

              <label className={styles.field}>
                <span>Distribuidor (opcional)</span>
                <input
                  name="distributor"
                  value={form.distributor}
                  onChange={onChange}
                  className={styles.input}
                  placeholder="Nombre del distribuidor / tienda"
                />
              </label>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <span>Mensaje *</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  className={styles.textarea}
                  placeholder="Explícanos tu consulta. Si aplica, indica contexto de uso (profesional), frecuencia y cualquier detalle relevante."
                />
              </label>
            </div>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="privacy"
                checked={form.privacy}
                onChange={onChange}
                required
              />
              <span>
                He leído y acepto la política de privacidad (requerido para gestionar el ticket).
              </span>
            </label>

            <div className={styles.actions}>
              <button className={styles.btn} type="submit" disabled={!isReady}>
                Enviar ticket
              </button>
              <p className={styles.disclaimer}>
                En casos de garantía, puede ser necesario aportar comprobante de compra.
              </p>
            </div>
          </form>
        ) : (
          <div className={styles.success}>
            <h3 className={styles.successTitle}>Ticket registrado</h3>
            <p className={styles.successText}>
              Hemos registrado tu solicitud con el número <strong>{ticketId}</strong>.
              Te contactaremos por email con el seguimiento.
            </p>
            <div className={styles.successActions}>
              <button className={styles.btnGhost} onClick={reset} type="button">
                Abrir otro ticket
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
