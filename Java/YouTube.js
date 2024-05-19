        (function() {
            var allowedDomains = ["bloggingforge.blogspot.com", "https://www.bloggersol.com/"];
            var redirectURL = "https://www.bloggersol.com/";

            function decodeBase64(base64) {
                try {
                    return atob(base64);
                } catch (e) {
                    return null;
                }
            }

            function checkDomain() {
                var currentDomain = window.location.hostname;
                if (!allowedDomains.includes(currentDomain)) {
                    window.location.href = redirectURL;
                }
            }

            var encodedScript = "dmFyIGFsbG93ZWREb21haW5zID0gWyJodHRwczovL2Jsb2dnaW5nZm9yZ2UuYmxvZ3Nwb3QuY29tLyIsICJodHRwczovL3d3dy5ibG9nZ2Vyc29sLmNvbS8iXTsKdmFyIHJlZGlyZWN0VVJMID0gImh0dHBzOi8vd3d3LmJsb2dnZXJzb2wuY29tLyI7CmZ1bmN0aW9uIGRlY29kZUJhc2U2NChiYXNlNjQpIHsKICAgIHRyeSB7CiAgICAgICAgcmV0dXJuIGF0b2IoYmFzZTY0KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICByZXR1cm4gbnVsbDsKICAgIH0KfQoKZnVuY3Rpb24gY2hlY2tEb21haW4oKSB7CiAgICB2YXIgY3VycmVudERvbWFpbiA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTsKICAgIGlmICghYWxsb3dlZERvbWFpbnMuaW5jbHVkZXMoY3VycmVudERvbWFpbikpIHsKICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VVJMOwogICAgfQp9CgpjaGVja0RvbWFpbigpOw==";

            var decodedScript = decodeBase64(encodedScript);
            if (decodedScript) {
                eval(decodedScript);
            } else {
                checkDomain();
            }
        })();

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
