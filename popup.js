document.getElementById("toggle-dark-mode").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleDarkMode
        });
    });
});

function toggleDarkMode() {
    const darkModeStyles = `
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header, hgroup,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
            border-color: #333 !important;
        }
        a {
            color: #bb86fc !important;
        }
        img, video {
            opacity: 0.8 !important;
        }
        `;

        const styleElement = document.createElement("style");
        styleElement.textContent = darkModeStyles;
        
        const existingStyleElement = document.querySelector("style[data-dark-mode]");
        if (existingStyleElement) {
            existingStyleElement.remove();
        } else {
            styleElement.setAttribute("data-dark-mode", "true");
            document.head.appendChild(styleElement);
        }
    }