import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="bg-background flex items-center flex-col justify-center h-screen max-h-250 md:p-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">
          No Books Here!
        </p>
        <Link to="/" className="btn-primary">
          Main Page
        </Link>
      </div>
    </div>
  );
}