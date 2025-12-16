import styles from "./soporte.module.css";
import SoporteClient from "./SoporteClient";

export const metadata = {
  title: "Soporte técnico | DGR Professional",
  description:
    "Soporte técnico oficial DGR Professional: atención, revisión y apertura de ticket.",
};

export default function SoportePage() {
  return (
    <section className="block-wrap">
      <div className="block-max">
        <header className={styles.header}>
          <h1 className="block-title">Soporte técnico</h1>
          <p className={styles.lead}>
            Nuestro equipo de soporte te ayuda con asesoramiento técnico, mantenimiento y
            gestión de servicio. Si necesitas asistencia, abre un ticket y te responderemos
            con la mayor brevedad posible.
          </p>
        </header>

        <SoporteClient />
      </div>
    </section>
  );
}
