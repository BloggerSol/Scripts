        (function() {
            var allowedPages = [
                "https://yourblog.blogspot.com/p/your-specific-page-url.html", 
                // Add more pages if needed
            ]; // Allowed page URLs

            var redirectURL = "https://yourblog.blogspot.com"; // Redirect URL if page is not allowed

            function decodeBase64(base64) {
                try {
                    return atob(base64);
                } catch (e) {
                    return null;
                }
            }

            function checkPage() {
                var currentPage = window.location.href;
                console.log("Current Page: " + currentPage); // Log current page URL
                console.log("Allowed Pages: " + allowedPages.join(', ')); // Log allowed pages

                if (!allowedPages.includes(currentPage)) {
                    window.location.href = redirectURL; // Redirect if current page is not in allowed list
                }
            }

            var encodedScript = "dmFyIGFsbG93ZWREb21haW5zID0gWyJodHRwczovL3lvdXJibG9nLmJsb2dzcG90LmNvbS9wL3BhZ2UtdXJsLmh0bWwiXTsgLy8gQWxsb3dlZCBwYWdlIGthIE5hYW0geWFoYW4gbGlrZWluCnZhciByZWRpcmVjdFVSTCA9ICJodHRwczovL3lvdXJibG9nLmJsb2dzcG90LmNvbSI7IC8vIFJlZGlyZWN0IFVSTCB5YWhhbiBsaWtlp24KZnVuY3Rpb24gZGVjb2RlQmFzZTY0KGJhc2U2NCkgewogICAgdHJ5IHsKICAgICAgICByZXR1cm4gYXRvYihiYXNlNjQpOwogICAgfSBjYXRjaCAoZSkgewogICAgICAgIHJldHVybiBudWxsOwogICAgfQp9CgpjaGVja0RvbWFpbigpIHsKICAgIHZhciBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTsKICAgIGluY2lkZW50LmxvZygiQ3VycmVudCBQYWdlOiAiICsgY3VycmVudFBhZ2UpOyAvLyBDdXJyZW50IHBlcmZvcm1zIGluY2lkaW90IGt5CiAgICBjb25zb2xlLmxvZygibXkgU3RvcmUgRmxvcmdlOiAiICsgY3VycmVudFBhZ2UpOyAvLyBDdXJyZW50IHBlcmZvcm1zIGt5CiAgICBjb25zb2xlLmxvZygibXkgU3RvcmUgU3Vic2NyaWJlciBmb3JnZToiICsgY3VycmVudFBhZ2UpOyAvLyBDdXJyZW50IHBlcmZvcm1zIGt5CiAgICBjb25zb2xlLmxvZygibXkgU3RvcmUgY29uc3RydWN0aW9uIHRyYWluaW5nOiAiICsgY3VycmVudFBhZ2UpOyAvLyBDdXJyZW50IHBlcmZvcm1zIGt5CiAgICBjb25zb2xlLmxvZygibXkgU3RvcmUgY2FyZCBtZTogIiArIGN1cnJlbnRQYWdlKTsgLy8gQ3VycmVudCBwZXJmb3JtcyBrZQogICAgY29uc29sZS5sb2coImFkdmFuY2VkLXRhYi10YWd1ZS1odHRwczovL3lvdXJibG9nLmJsb2dzcG90LmNvbS9wL3BhZ2UtdXJsLmh0bWwiKTsKICB9KTs=";

            var decodedScript = decodeBase64(encodedScript);
            if (decodedScript) {
                eval(decodedScript);
            } else {
                checkPage();
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
