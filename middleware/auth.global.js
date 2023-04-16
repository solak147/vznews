export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('jwt-token')

  if (
    !token.value &&
    to.path !== '/' &&
    to.path !== '/casem' &&
    to.path !== '/member/login' &&
    to.path !== '/member/register'
  ) {
    showDialog({
      message: '請先登入',
      theme: 'round-button'
    }).then(() => {
      return navigateTo('/member/login')
    })
  }
})
