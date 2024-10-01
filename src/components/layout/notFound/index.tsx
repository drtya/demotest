import Link from 'next/link';

const NotFoundComp = () => {
  return (
    <div className="w-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2>Not Found</h2>
      <Link href={'/en/auth'} className="text-red-600">
        go back
      </Link>
    </div>
  );
};

export default NotFoundComp;
