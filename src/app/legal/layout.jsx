import styles from "./legal.module.css";

export const metadata = {
  title: "Información legal | DGR Professional",
};

export default function LegalLayout({ children }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.paper} ${styles.legal}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
