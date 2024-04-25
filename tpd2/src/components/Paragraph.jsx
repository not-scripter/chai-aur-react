export default function Paragraph({children, className}) {
  return (
    <p className={`${className} text-secondary/80 text-xl font-semibold`}>{children}</p>
  )
}
