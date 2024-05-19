function activateDomain() {
    const allowedDomains = ["bloggingforge.blogspot.com", "www.bloggersol.com"];
    const currentDomain = window.location.hostname;

    if (allowedDomains.includes(currentDomain)) {
        let base64Code = ""; // Base64 encoded code yahan set karenge

        if (currentDomain === "bloggingforge.blogspot.com") {
            base64Code = "YmxvZ2dpbmdmb3JnZS5ibG9nc3BvdC5jb20="; // Blogspot domain ke liye code
        } else if (currentDomain === "www.bloggersol.com") {
            base64Code = "d3d3LmJsb2dnZXJzb2wuY29t"; // Bloggersol domain ke liye code
        }

        // Base64 code ko decode karein aur div ke attribute 'license' mein set karein
        const decodedCode = atob(base64Code);
        const div = document.getElementById("activate");
        div.setAttribute("license", decodedCode);
    } else {
        // Domain mismatch, show popup or take action
        alert("Unauthorized use detected!");
        // Aap alert ko kisi aur popup ya action se replace kar sakte hain
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
