'use client'
import EventForm from '@/components/component/UploadGallery'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authenticate } from '@/components/lib/auth';


const page = () => {


  return (
    <>
    <EventForm/>
    </>
  )
}


// export async function getServerSideProps(context) {
//   const user = await authenticate();

//   if (!user) {
//     // If not authenticated, redirect to the login page
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // If authenticated, continue rendering the page
//   return {
//     props: {},
//   };
// }


export default page











