import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-myprimary-gray font-main">
      <div className="text-center space-y-8">
        <h1 className="text-8xl font-bold text-myaccent drop-shadow-lg">
          REPUTE
        </h1>
        <Link
          href="/auth/signin"
          className="inline-block px-8 py-4 bg-mysecondary text-myprimary rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
