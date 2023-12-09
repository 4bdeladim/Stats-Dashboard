import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/signin',
    error: '/404',
  },
	secret: process.env.NEXT_AUTH_SECRET
})
export const config = { matcher: ["/"] }