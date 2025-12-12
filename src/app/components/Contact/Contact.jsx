import styles from "./contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section}>
      <h1>Contacto</h1>
      <p>Rellena el formulario para ponerte en contacto con nosotros.</p>

      <form className={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          placeholder="Email"
          required
        />
        <textarea
          placeholder="Mensaje"
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
