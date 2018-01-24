var storage = {
  get: function(key, bool) {
    var data
    if (bool) {
      data = window.localStorage.getItem(key)
    } else {
      data = window.sessionStorage.getItem(key)
    }

    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  },

  set: function(key, data, bool) {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    if (bool) {
      window.localStorage.setItem(key, data)
    } else {
      window.sessionStorage.setItem(key, data)
    }
  },

  remove: function(key, bool) {
    if (bool) {
      window.localStorage.removeItem(key)
    } else {
      window.sessionStorage.removeItem(key)
    }
  },

  clear: function(bool) {
    if (bool) {
      window.localStorage.clear()
    } else {
      window.sessionStorage.clear()
    }
  }
}
