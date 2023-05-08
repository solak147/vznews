export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('jwt-token')
  const caseCrtPtn = /^\/casem\/(\d*)$/

  if (
    !token.value &&
    to.path !== '/' &&
    to.path !== '/casem' &&
    to.path !== '/member/login' &&
    to.path !== '/member/register' &&
    !to.path.match(caseCrtPtn)
  ) {
    showDialog({
      message: '請先登入',
      theme: 'round-button'
    })
    return navigateTo('/member/login')
  }
})
