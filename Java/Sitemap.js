        function generate() {
            var BSURL = document.getElementById("URL").value.trim();

            // Check Website URL
            if (BSURL === "") {
                document.getElementById("notification").innerHTML = "Please enter the URL of your website.";
                document.getElementById("notification").style.display = "block";
                document.getElementById("notification").style.color = "red";
                return;
            }

            // Check HTTPS
            if (!BSURL.startsWith("https://")) {
                document.getElementById("notification").innerHTML = "Please make sure the URL starts with 'https://'.";
                document.getElementById("notification").style.display = "block";
                document.getElementById("notification").style.color = "red";
                return;
            }

            // Check URL Slash
            if (!BSURL.endsWith("/")) {
                BSURL += "/";
            }

            // Verify reCAPTCHA
            var recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                document.getElementById("notification").innerHTML = "Please complete the CAPTCHA challenge.";
                document.getElementById("notification").style.display = "block";
                document.getElementById("notification").style.color = "red";
                return;
            }

            // Generated Textarea
            var Text = `XML Sitemap

${BSURL}sitemap.xml

ATOM Sitemap

${BSURL}atom.xml?redirect=false&start-index=1&max-results=500
${BSURL}atom.xml?redirect=false&start-index=501&max-results=500
${BSURL}atom.xml?redirect=false&start-index=1001&max-results=500
${BSURL}atom.xml?redirect=false&start-index=1501&max-results=500
${BSURL}atom.xml?redirect=false&start-index=2001&max-results=500
${BSURL}atom.xml?redirect=false&start-index=2501&max-results=500
${BSURL}atom.xml?redirect=false&start-index=3001&max-results=500`;
            document.getElementById("Rytr").value = Text;
            document.getElementById("textarea").style.display = "block";
            document.getElementById("notification").innerHTML = `The XML sitemap for your blog ${BSURL} is ready.`;
            document.getElementById("notification").style.display = "block";
            document.getElementById("notification").style.color = "green";
            var generateButton = document.getElementById("generateButton");
            generateButton.innerText = "Click Me to Copy Sitemap";
            generateButton.onclick = copy;
        }

        // Copy To Clipboard
        function copy() {
            var Textarea = document.getElementById("Rytr");
            Textarea.select();
            document.execCommand("copy");
            alert("Sitemap copied to clipboard!");
        }
