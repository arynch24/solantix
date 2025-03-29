// // app/middleware.js
// import { NextResponse } from 'next/server';

// export function middleware(req) {
//   const user = req.cookies.get('user');

//   if (!user && !req.nextUrl.pathname.startsWith('/signin')) {
//     return NextResponse.redirect(new URL('/signin', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard', '/credentials', '/profile'],
// };
