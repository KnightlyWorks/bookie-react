import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="bg-background flex h-screen max-h-250 flex-col items-center justify-center md:p-16">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
        <p className="text-text-secondary mb-8 text-xl">No Books Here!</p>
        <Link to="/" className="btn-primary">
          Main Page
        </Link>
      </div>
    </div>
  );
}
