export default class OnLeaveIntent {
  constructor(callback, delay) {
    this.callback = callback
    this.delay = delay
    this.init()
  }

  init = () => {
    this.timer = setTimeout(this.handleMouseOut, this.delay)
  }

  destroy = () => {
    clearTimeout(this.timer)
    document.removeEventListener('mouseout', this.checkOutOfBouds)
  }

  checkOutOfBouds = e => {
    if (e.relatedTarget === null) {
      this.callback()
      this.destroy()
    }
  }

  handleMouseOut = () => {
    document.addEventListener('mouseout', this.checkOutOfBouds)
  }
}
