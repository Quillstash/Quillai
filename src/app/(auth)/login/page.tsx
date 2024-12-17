import { PageContent } from './page-content';

function Page() {
  return (
    <div className='grid place-content-center h-screen'>
      <div className='space-y-8'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <PageContent />
      </div>
    </div>
  );
}

export default Page;
