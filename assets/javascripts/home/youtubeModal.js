const youtubeModal = () =>
  $('.youtube-modal').on('shown.bs.modal', (e) => {
    const $iframe = $(e.target).find('.youtube-modal-iframe')
    $iframe.attr('src', $iframe.data('src'))
  }).on('hidden.bs.modal', (e) => {
    const $iframe = $(e.target).find('.youtube-modal-iframe')
    $iframe.removeAttr('src')
  })

export default youtubeModal
