import Link from 'next/link';

const NotFoundComp = () => {
  return (
    <div className="fixed text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className='font-bold text-size32 text-black border-b p-4'>Not Found</h2>
      <Link href={'/'} className="inline-block text-black-60 m-3 text-size16">
        go back
      </Link>
    </div>
  );
};

export default NotFoundComp;
