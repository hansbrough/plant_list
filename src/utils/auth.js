// import auth0 from "auth0-js"
//
// export const isBrowser = typeof window !== "undefined"
//
// const tokens = {
//   idToken: false,
//   accessToken: false,
// }
//
// let user = {}
//
// export const isAuthenticated = () => {
//   console.log("!! isAuthenticated tokens:",tokens)
//   return tokens.idToken !== false
// }
//
// const auth = isBrowser
//   ? new auth0.WebAuth({
//       domain: process.env.AUTH0_DOMAIN,
//       clientID: process.env.AUTH0_CLIENTID,
//       redirectUri: process.env.AUTH0_CALLBACK,
//       responseType: "token id_token",
//       scope: "openid profile email",
//     })
//   : {}
//
// export const login = () => {
//   console.log("!! login")
//   if (!isBrowser) {
//     return
//   }
//
//   auth.authorize()
// }
//
// export const logout = () => {
//   tokens.accessToken = false
//   tokens.idToken = false
//   user = {}
//   window.localStorage.setItem("isLoggedIn", false)
//
//   auth.logout({
//     returnTo: window.location.origin,
//   })
// }
//
// const setSession = (cb = () => {}) => (err, authResult) => {
//   console.log("...setSession")
//   console.log("....err:",err);
//   console.log("....authResult:",authResult);
//   if (err) {
//     if (err.error === "login_required") {
//       //login()
//     }
//   }
//   if (authResult && authResult.accessToken && authResult.idToken) {
//     tokens.idToken = authResult.idToken
//     tokens.accessToken = authResult.accessToken
//
//     auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
//       user = userProfile
//       window.localStorage.setItem("isLoggedIn", true)
//
//       cb()
//     })
//   }
// }
//
// //Note: tokens never set to true... so login always required.
// export const checkSession = callback => {
//   const isLoggedIn = window.localStorage.getItem("isLoggedIn")
//   if (isLoggedIn === "false" || isLoggedIn === null) {
//     callback()
//   }
//
//   const protectedRoutes = [`/stock`, `/callback`];
//   const isProtectedRoute = protectedRoutes
//     .map(route => window.location.pathname.includes(route))
//     .some(route => route)
//   if (isProtectedRoute) {
//     auth.checkSession({}, setSession(callback))
//   }
// }
//
// export const handleAuthentication = () => {
//   console.log("!! handleAuthentication")
//   auth.parseHash(setSession())
// }
//
// export const getProfile = () => {
//   return user
// }
