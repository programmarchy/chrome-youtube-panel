var params = (new URL(location)).searchParams

document.addEventListener('DOMContentLoaded', function (e) {
  document.title = getTitle(params)
  document.getElementById('embed').src = getEmbedUrl(params)
})

function getTitle (params) {
  if (params.has('title')) {
    return params.get('title')
  } else {
    return null
  }
}

function getEmbedUrl (params) {
  if (params.has('code')) {
    var code = params.get('code')
    return 'https://www.youtube.com/embed/' + code
  } else {
    return null
  }
}
