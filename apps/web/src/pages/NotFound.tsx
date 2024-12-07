import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  // Set translations to not found page
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          404 - Page Not Found
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
