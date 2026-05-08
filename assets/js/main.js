(function () {
    pagination(true);

    function initPostTools() {
        if (!document.body.classList.contains('post-template') && !document.body.classList.contains('page-template')) {
            return;
        }

        const article = document.querySelector('.gh-article');

        if (!article) {
            return;
        }

        const headings = Array.from(article.querySelectorAll('h1, h2, h3'))
            .filter((heading) => heading.textContent.trim());

        if (headings.length >= 2) {
            const toc = document.createElement('nav');
            toc.className = 'post-toc';

            const tocTitle = document.createElement('div');
            tocTitle.className = 'post-toc-title';
            tocTitle.textContent = '\u76ee\u5f55';
            toc.appendChild(tocTitle);

            headings.forEach((heading, index) => {
                const id = heading.id || `toc-heading-${index}`;

                heading.id = id;

                const link = document.createElement('a');
                link.href = `#${id}`;
                link.textContent = heading.textContent.trim();
                link.className = `toc-${heading.tagName.toLowerCase()}`;

                toc.appendChild(link);
            });

            document.body.appendChild(toc);

            const tocButton = document.createElement('button');
            tocButton.className = 'toc-toggle';
            tocButton.type = 'button';
            tocButton.textContent = '\u2630';
            tocButton.setAttribute('aria-label', '\u6253\u5f00\u76ee\u5f55');
            document.body.appendChild(tocButton);

            tocButton.addEventListener('click', function () {
                toc.classList.toggle('show');
            });

            toc.addEventListener('click', function (event) {
                if (event.target.closest('a')) {
                    toc.classList.remove('show');
                }
            });

            const links = Array.from(toc.querySelectorAll('a'));

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!entry.isIntersecting) {
                                return;
                            }

                            links.forEach((link) => link.classList.remove('active'));

                            const activeLink = links.find((link) => link.getAttribute('href') === `#${entry.target.id}`);

                            if (activeLink) {
                                activeLink.classList.add('active');
                            }
                        });
                    },
                    {
                        rootMargin: '-20% 0px -70% 0px',
                        threshold: 0
                    }
                );

                headings.forEach((heading) => observer.observe(heading));
            }
        }

        const backButton = document.createElement('button');
        backButton.className = 'back-to-top';
        backButton.type = 'button';
        backButton.textContent = '\u2191';
        backButton.setAttribute('aria-label', '\u8fd4\u56de\u9876\u90e8');
        document.body.appendChild(backButton);

        function toggleBackButton() {
            backButton.style.display = window.scrollY > 400 ? 'flex' : 'none';
        }

        window.addEventListener('scroll', toggleBackButton);

        backButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        toggleBackButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPostTools);
    } else {
        initPostTools();
    }
})();
