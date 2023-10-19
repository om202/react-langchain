export const NotAllowed = () => {
  return (
    <div style={{ marginTop: "100px", justifyContent: "center" }}>
      <span style={{ color: "var(--danger-color)", textAlign: 'center' }}>
        <h1>⚠️</h1>
        <h2>You are not authorized to access this page!</h2>
        🏠 <a href="/">Go to homepage</a>
      </span>
    </div>
  );
};
