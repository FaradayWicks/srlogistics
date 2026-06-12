export default function SectionDivider() {
  return (
    <div aria-hidden="true" style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, #0891B2 50%, transparent 100%)',
      opacity: 0.5,
    }} />
  );
}
