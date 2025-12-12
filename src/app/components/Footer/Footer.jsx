import styles from "@/app/styles/components/Footer/footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>DGR Professional © ${new Date().getFullYear()}</p>

        <nav className={styles.nav}>
          <Link href="/garantia">Garantía</Link>
          <Link href="/soporte">Soporte</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
}
