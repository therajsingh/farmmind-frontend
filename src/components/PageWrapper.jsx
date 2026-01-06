export default function PageWrapper({ title, subtitle, children }) {
  return (
    <section style={styles.wrapper}>
      <div style={styles.header}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div style={styles.content}>{children}</div>
    </section>
  );
}

const styles = {
  wrapper: {
    padding: "32px 40px",
    width: "100%",
  },
  header: {
    marginBottom: "28px",
  },
  content: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "24px",
    border: "1px solid #e5e7eb",
    minHeight: "220px",
  },
};
