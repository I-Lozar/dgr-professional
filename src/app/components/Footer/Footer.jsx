import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.brandHeader}>
              <span className={styles.brandName}>DGR Professional</span>
              <span className={styles.brandTag}>Distribución & Beauty Pro</span>
            </div>

            <p className={styles.brandDesc}>
              Productos profesionales para salones y distribuidores. Calidad, soporte y
              formación orientada a resultados.
            </p>

            <div className={styles.social} aria-label="Redes sociales">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>

          {/* Desktop columns */}
          <div className={styles.columnsDesktop}>
            <div className={styles.col}>
              <h4 className={styles.title}>Navegación</h4>
              <ul className={styles.list}>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/spark/dash">Gama Spark</Link></li>
                <li><Link href="/salon-finder">Distribuidor Finder</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.title}>Soporte</h4>
              <ul className={styles.list}>
                <li><Link href="/soporte">Centro de soporte</Link></li>
                <li><Link href="/garantia">Garantía</Link></li>
                <li><Link href="/contacto">Abrir consulta</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.title}>Legal</h4>
              <ul className={styles.list}>
                <li><Link href="/legal/aviso-legal">Aviso legal</Link></li>
                <li><Link href="/legal/privacidad">Privacidad</Link></li>
                <li><Link href="/legal/cookies">Cookies</Link></li>
                <li><Link href="/legal/terminos">Términos</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.title}>Contacto</h4>
              <address className={styles.address}>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Email</span>
                  <a href="mailto:info@dgrprofessional.com">info@dgrprofessional.com</a>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Tel.</span>
                  <a href="tel:+34900000000">+34 900 000 000</a>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Horario</span>
                  <span>L–V 9:00–18:00</span>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Ubicación</span>
                  <span>España</span>
                </div>
              </address>
            </div>
          </div>

          {/* Mobile accordion */}
          <div className={styles.columnsMobile} aria-label="Secciones del pie de página">
            <details className={styles.details}>
              <summary className={styles.summary}>Navegación</summary>
              <ul className={styles.list}>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/spark/dash">Gama Spark</Link></li>
                <li><Link href="/salon-finder">Distribuidor Finder</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </details>

            <details className={styles.details}>
              <summary className={styles.summary}>Soporte</summary>
              <ul className={styles.list}>
                <li><Link href="/soporte">Centro de soporte</Link></li>
                <li><Link href="/garantia">Garantía</Link></li>
                <li><Link href="/contacto">Abrir consulta</Link></li>
              </ul>
            </details>

            <details className={styles.details}>
              <summary className={styles.summary}>Legal</summary>
              <ul className={styles.list}>
                <li><Link href="/legal/aviso-legal">Aviso legal</Link></li>
                <li><Link href="/legal/privacidad">Privacidad</Link></li>
                <li><Link href="/legal/cookies">Cookies</Link></li>
                <li><Link href="/legal/terminos">Términos</Link></li>
              </ul>
            </details>

            <details className={styles.details}>
              <summary className={styles.summary}>Contacto</summary>
              <address className={styles.address}>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Email</span>
                  <a href="mailto:info@dgrprofessional.com">info@dgrprofessional.com</a>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Tel.</span>
                  <a href="tel:+34900000000">+34 900 000 000</a>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Horario</span>
                  <span>L–V 9:00–18:00</span>
                </div>
                <div className={styles.addressLine}>
                  <span className={styles.addressLabel}>Ubicación</span>
                  <span>España</span>
                </div>
              </address>
            </details>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            DGR Professional © {year}. Todos los derechos reservados.
          </p>

          <nav className={styles.bottomNav} aria-label="Enlaces legales rápidos">
            <Link href="/privacidad">Privacidad</Link>
            <span className={styles.sep} aria-hidden="true">·</span>
            <Link href="/cookies">Cookies</Link>
            <span className={styles.sep} aria-hidden="true">·</span>
            <Link href="/aviso-legal">Aviso legal</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
