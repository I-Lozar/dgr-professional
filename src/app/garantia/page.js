import styles from "./garantia.module.css";
import Link from "next/link";

export const metadata = {
  title: "Garantía | DGR Professional",
  description:
    "Información sobre la garantía de productos DGR Professional adquiridos a través de distribuidores oficiales.",
};

export default function GarantiaPage() {
  return (
    <section className="block-wrap">
      <div className="block-max">
        <header className={styles.header}>
          <h1 className="block-title">Garantía</h1>
          <p className={styles.lead}>
            Aquí encontrarás las condiciones generales de garantía para productos
            DGR Professional.
          </p>
        </header>

        <div className={styles.paper}>
          <h2 className={styles.h2}>¿Cuál es mi garantía?</h2>
          <p className={styles.p}>
            En productos adquiridos a través de distribuidores oficiales, es
            totalmente indispensable presentar una copia del comprobante de la
            compra para poder disfrutar de tu garantía. Si no cuentas con el
            comprobante de compra, independientemente de la fecha de compra, el
            servicio será sin garantía.
          </p>

          <div className={styles.divider} />

          <h2 className={styles.h2}>¿Cuánto tiempo tengo de garantía?</h2>
          <p className={styles.p}>
            Todos nuestros productos se fabrican según los más altos estándares
            de calidad y se someten a rigurosas revisiones antes de ser lanzados
            al mercado. La duración de la garantía para nuestros productos es la
            siguiente:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Para salones de belleza y uso profesional:</strong> 2 años
              a partir de la fecha de la factura para todos los aparatos
              eléctricos.
            </li>
          </ul>

          <div className={styles.divider} />

          <h2 className={styles.h2}>¿Hay excepciones con la garantía?</h2>
          <p className={styles.p}>
            Sí, hay excepciones en las que la garantía podría quedar invalidada:
          </p>
          <ul className={styles.list}>
            <li>
              No quedan cubiertos los daños accidentales y especialmente daños
              en las placas (arañazos o desconchones).
            </li>
            <li>
              Si el producto ha sido manipulado dentro del periodo de garantía
              por un tercero.
            </li>
            <li>
              Tampoco podemos ofrecer garantía en caso de que el producto haya
              sido adquirido a través de un distribuidor no autorizado, ya que
              podría tratarse de un producto falso. En este caso, los derechos
              del consumidor se aplican en el punto de venta.
            </li>
          </ul>

          <div className={styles.note}>
            Para cualquier gestión, ten preparado el comprobante de compra y los
            datos del producto. Si lo deseas, puedes continuar en{" "}
            <Link href="/soporte">Soporte</Link> o escribirnos desde{" "}
            <Link href="/contacto">Contacto</Link>.
          </div>
        </div>
      </div>
    </section>
  );
}
