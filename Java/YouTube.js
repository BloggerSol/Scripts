function activateDomain() {
    const allowedDomains = ["bloggingforge.blogspot.com", "www.bloggersol.com"];
    const currentDomain = window.location.hostname;

    if (!allowedDomains.includes(currentDomain)) {
        alert("Unauthorized use detected!");
    }
}

  function get() {
    const url = document.getElementById('Url').value;
    if (!url) {
      displayError('Please enter a YouTube URL.');
      return;
    }

    const recaptchaResponse = grecaptcha.getResponse();
    const videoId = extractVideoId(url);

    if (!recaptchaResponse) {
      displayError('Please complete the reCAPTCHA.');
    } else if (!videoId) {
      displayError('Invalid YouTube URL');
    } else {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      const thumbnailHtml = `
        <p>Thumbnail Preview:</p>
        <img src="${thumbnailUrl}" alt="YouTube Thumbnail"/>
      `;
      document.getElementById('thumbnailDisplay').innerHTML = thumbnailHtml;
      document.getElementById('download').onclick = function() {
        openInNewTab(thumbnailUrl);
      };
      document.getElementById('download').innerText = 'Download Thumbnail';
      clearError();
    }
  }

  function displayError(message) {
    document.getElementById('notification').innerText = message;
  }

  function clearError() {
    document.getElementById('notification').innerText = '';
  }

  function openInNewTab(url) {
    window.open(url, '_blank');
  }

  function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
  }
