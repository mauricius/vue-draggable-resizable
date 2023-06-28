export default function div () {
  const div = document.createElement('div')
  div.id = 'root'
  document.body.appendChild(div)

  return div
}
