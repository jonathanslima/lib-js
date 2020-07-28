import OnLeaveIntent from './index'

describe('OnLeaveIntent', () => {
  let callback
  let onLeaveIntent
  const delay = 1000
  jest.useFakeTimers()

  beforeEach(() => {
    callback = jest.fn()
    onLeaveIntent = new OnLeaveIntent(callback, delay)
  })

  it('should run callback function if the mouse goes out of the screen', () => {
    jest.advanceTimersByTime(delay) // advance 1s

    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null // user leaves the page
    }))
    expect(callback).toHaveBeenCalled()
  })

  it('should NOT run callback function if the mouse goes out of the screen', () => {
    jest.advanceTimersByTime(delay) // advance 1s
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: new EventTarget()
    }))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should NOT run callback function before the delay', () => {
    jest.advanceTimersByTime(delay / 2) // advance .5s

    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should run callback function only once', () => {
    jest.advanceTimersByTime(delay) // advance 1s
    /* user leaves the page */
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
