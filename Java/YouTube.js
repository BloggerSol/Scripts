        (function() {
            var allowedDomain = "bloggingforge.blogspot.com"; // Apne domain ka naam yahan likhein
            var redirectURL = "https://www.gtamodplace.com/"; // Redirect URL yahan likhein

            function decodeBase64(base64) {
                try {
                    return atob(base64);
                } catch (e) {
                    return null;
                }
            }

            function checkDomain() {
                var currentDomain = window.location.hostname;
                if (currentDomain !== allowedDomain) {
                    window.location.href = redirectURL;
                }
            }

            var encodedScript = "dmFyIGFsbG93ZWREb21haW4gPSAiYmxvZ2dpbmdmb3JnZS5ibG9nc3BvdC5jb20iOyAvLyBBcG5lIGRvbWFpbiBrYSBuYWFtIHlhaGFuIGxpa2hlaW4KdmFyIHJlZGlyZWN0VVJMID0gImh0dHBzOi8vd3d3Lmd0YW1vZHBsYWNlLmNvbS8iOyAvLyBSZWRpcmVjdCBVUkwgeWFoYW4gbGlraGVpbgoKZnVuY3Rpb24gZGVjb2RlQmFzZTY0KGJhc2U2NCkgewogICAgdHJ5IHsKICAgICAgICByZXR1cm4gYXRvYihiYXNlNjQpOwogICAgfSBjYXRjaCAoZSkgewogICAgICAgIHJldHVybiBudWxsOwogICAgfQp9CgpmdW5jdGlvbiBjaGVja0RvbWFpbigpIHsKICAgIHZhciBjdXJyZW50RG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lOwogICAgaWYgKGN1cnJlbnREb21haW4gIT09IGFsbG93ZWREb21haW4pewogICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7CiAgICB9Cn0KCmNoZWNrRG9tYWluKCk7=";

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
