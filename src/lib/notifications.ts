export async function sendNotification(
  title: string,
  body: string,
  icon: string,
  tag: string
) {
  const perm = await Notification.requestPermission()
  if (perm === 'granted') {
    new Notification(title, {
      body,
      icon,
      tag
    })
  }
}
