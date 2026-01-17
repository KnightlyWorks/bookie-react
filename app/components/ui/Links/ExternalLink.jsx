export default function ExternalLink({ src, alt, href, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
      aria-label={`Visit ${text}`}
    >
      <img className="h-5 w-5" src={src} alt={alt} />
      <span className="font-medium">{text}</span>
    </a>
  );
}
