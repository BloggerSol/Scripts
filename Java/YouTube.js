function activateDomain() {
    const allowedDomains = ["bloggingforge.blogspot.com", "www.bloggersol.com"];
    const currentDomain = window.location.hostname;

    const div = document.getElementById("activate");
    const encodedCode = div.getAttribute("license");

    if (encodedCode) {
        const decodedCode = atob(encodedCode);

        // Check if the decoded code starts with "http://" or "https://" to avoid potential security risks
        if (decodedCode.startsWith("http://") || decodedCode.startsWith("https://")) {
            // Check if the current domain is allowed
            if (allowedDomains.includes(currentDomain)) {
                div.setAttribute("license", decodedCode);
            } else {
                alert("Unauthorized use detected!");
                // You can replace this alert with any other action you prefer
            }
        } else {
            alert("Invalid license code detected!");
            // You can replace this alert with any other action you prefer
        }
    } else {
        alert("No license code found!");
        // You can replace this alert with any other action you prefer
    }
}

// activateDomain function ko page load par ya jahan bhi aapko zarurat ho wahaan call karein
activateDomain();
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
