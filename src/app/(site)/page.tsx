'use client';

// import { useRouter } from "next/navigation";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Testimonials } from "./components/Testimonials";
// import { useEffect } from "react";
// import { getSession } from "next-auth/react";

function Page() {

  //   const router = useRouter();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     // Replace with your session-checking logic
  //     const session = await getSession(); // Example session-checking function
  //     if (session) {
  //       router.replace('/articles'); // Redirect to /articles if session exists
  //     }
  //   };

  //   checkSession();
  // }, [router]);


  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
       <Hero />
     <Features />
      <Testimonials />
      <FAQ />
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Container from '@/components/container';
// import { buttonVariants } from '@/components/ui/button';
// import { ArrowRight, Check } from 'lucide-react';
// import Link from 'next/link';
// import { getSession } from 'next-auth/react';

// function Page() {
//   const router = useRouter();

//   useEffect(() => {
//     const checkSession = async () => {
//       // Replace with your session-checking logic
//       const session = await getSession(); // Example session-checking function
//       if (session) {
//         router.replace('/articles'); // Redirect to /articles if session exists
//       }
//     };

//     checkSession();
//   }, [router]);

//   return (
//     <div>
//       <section>
//         <Container className='grid place-items-center py-12 md:py-16 lg:py-32'>
//           <div>
//             <div className='relative mx-auto flex flex-col items-center text-center lg:items-start'>
//               <div className='mt-4 md:mt-6 lg:mt-8 xl:mt-10'>
//                 <h1 className='relative text-balance text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl'>
//                   Write, Share, Discover
//                 </h1>
//               </div>
//               <p className='lg:text-lef mx-auto mt-8 max-w-prose text-balance text-center text-lg text-foreground-500 md:text-wrap'>
//                 Join our vibrant community of writers and readers. Express your
//                 ideas, connect with like-minded individuals, and explore a world
//                 of diverse content.
//               </p>
//             </div>
//             <div className='mt-8 flex w-full items-center justify-center'>
//               <div className='grid gap-4 md:grid-cols-2'>
//                 <Link
//                   href='/login'
//                   className={buttonVariants({
//                     variant: 'outline',
//                     size: 'lg',
//                     className: 'mx-auto mt-8',
//                   })}
//                 >
//                   Get started <ArrowRight className='ml-1' />
//                 </Link>
//                 <Link
//                   href='/playground'
//                   className={buttonVariants({
//                     size: 'lg',
//                     className: 'mx-auto mt-8',
//                   })}
//                 >
//                   Try for free <ArrowRight className='ml-1' />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </section>
//       <section>
//         <Container className='py-24'>
//           <div className='mb-12 px-6 lg:px-8'>
//             <div className='mx-auto max-w-2xl sm:text-center'>
//               <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
//                 Upload your photo and get{' '}
//                 <span className='relative px-2 text-blue-600'>
//                   your own case{' '}
//                 </span>{' '}
//                 now
//               </h2>
//             </div>
//           </div>

//           <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
//             <li className='w-fit'>
//               <Check className='w-5 h-5 text-blue-600 inline mr-1.5' />
//               High-quality silicone material
//             </li>
//             <li className='w-fit'>
//               <Check className='w-5 h-5 text-blue-600 inline mr-1.5' />
//               Scratch and fingerprint resistant coating
//             </li>
//             <li className='w-fit'>
//               <Check className='w-5 h-5 text-blue-600 inline mr-1.5' />
//               Wireless charging compatible
//             </li>
//             <li className='w-fit'>
//               <Check className='w-5 h-5 text-blue-600 inline mr-1.5' />5 year
//               print warranty
//             </li>

//             <li className='flex justify-center'>
//               <Link
//                 href='/playground'
//                 className={buttonVariants({
//                   size: 'lg',
//                   className: 'mx-auto mt-8',
//                 })}
//               >
//                 Try for free <ArrowRight className='ml-1' />
//               </Link>
//             </li>
//           </ul>
//         </Container>
//       </section>
//     </div>
//   );
// }

// export default Page;


