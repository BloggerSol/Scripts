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

            var encodedScript = "dmFyIGFsbG93ZWREb21haW4gPSAieW91cmRvbWFpbi5jb20iOyAvLyBBcG5lIGRvbWFpbiBrYSBuYWFtIHlhaGFuIGxpa2hlaW4KdmFyIHJlZGlyZWN0VVJMID0gImh0dHBzOi8veW91cmRvbWFpbi5jb20iOyAvLyBSZWRpcmVjdCBVUkwgeWFoYW4gbGlrZWluCgpmdW5jdGlvbiBkZWNvZGVCYXNlNjQoYmFzZTY0KSB7CiAgICB0cnkgewogICAgICAgIHJldHVybiBhdG9iKGJhc2U2NCk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgcmV0dXJuIG51bGw7CiAgICB9Cn0KCmZ1bmN0aW9uIGNoZWNrRG9tYWluKCkgewogICAgdmFyIGN1cnJlbnREb21haW4gPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7CiAgICBpZiAoY3VycmVudERvbWFpbiAhPT0gYWxsb3dlZERvbWFpbil7CiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVSTDsKICAgIH0KfQoKY2hlY2tEb21haW4oKTs=";

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
