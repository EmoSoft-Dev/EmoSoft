document.addEventListener('DOMContentLoaded', () => {
    // --- FUNGSI GLOBAL DARI config.js ---
    if (typeof AppConfig !== 'undefined') {
        // Update Header Logo/Site Name
        const siteLogo = document.getElementById('site-logo');
        if (siteLogo) {
            siteLogo.textContent = AppConfig.siteName;
        }

        // Update Footer
        const footerCopyright = document.getElementById('footer-copyright');
        if (footerCopyright) {
            footerCopyright.textContent = `© 2025 ${AppConfig.siteName}. All rights reserved.`;
        }
        const socialFacebook = document.getElementById('social-facebook');
        if (socialFacebook) {
            socialFacebook.href = AppConfig.socialLinks.facebook;
        }
        const socialTwitter = document.getElementById('social-twitter');
        if (socialTwitter) {
            socialTwitter.href = AppConfig.socialLinks.twitter;
        }
        const socialInstagram = document.getElementById('social-instagram');
        if (socialInstagram) {
            socialInstagram.href = AppConfig.socialLinks.instagram;
        }

        // Update Kontak Page
        const contactEmailLink = document.getElementById('contact-email-link');
        if (contactEmailLink) {
            contactEmailLink.href = `mailto:${AppConfig.contactEmail}`;
            contactEmailLink.textContent = AppConfig.contactEmail;
        }
        const contactPhoneLink = document.getElementById('contact-phone-link');
        if (contactPhoneLink) {
            contactPhoneLink.href = `tel:${AppConfig.contactPhone}`;
            contactPhoneLink.textContent = AppConfig.contactPhone;
        }
        const contactAddress = document.getElementById('contact-address');
        if (contactAddress) {
            contactAddress.textContent = `Alamat: ${AppConfig.address}`;
        }

        // Load Panel Prices on shop-panel.html and set WhatsApp links
        const panelCards = document.querySelectorAll('.panel-card');
        panelCards.forEach(card => {
            const packageName = card.querySelector('h3').dataset.packageName;
            if (AppConfig.panelPrices[packageName]) {
                const priceElement = card.querySelector('.panel-price');
                priceElement.textContent = AppConfig.panelPrices[packageName].display;

                // Set WhatsApp link for Panel cards
                const buyButton = card.querySelector('.buy-now-btn');
                if (buyButton) {
                    const whatsappText = encodeURIComponent(AppConfig.panelPrices[packageName].whatsappText);
                    buyButton.href = `https://wa.me/${AppConfig.contactPhone}?text=${whatsappText}`;
                }
            }
        });

        // Load Script Prices and WhatsApp links on shop-script.html
        const scriptCards = document.querySelectorAll('.script-card');
        scriptCards.forEach(card => {
            const scriptName = card.querySelector('h3').dataset.scriptName;
            if (AppConfig.scriptPrices[scriptName]) {
                const priceElement = card.querySelector('.script-price');
                priceElement.textContent = AppConfig.scriptPrices[scriptName].display;

                const buyButton = card.querySelector('.buy-now-btn');
                if (buyButton) {
                    const whatsappText = encodeURIComponent(AppConfig.scriptPrices[scriptName].whatsappText);
                    buyButton.href = `https://wa.me/${AppConfig.contactPhone}?text=${whatsappText}`;
                }
            }
        });
    }

    // --- FUNGSI UNTUK MENU TOGGLE (TETAP) ---
    window.toggleMenu = function() {
        const nav = document.querySelector('.nav-links');
        nav.classList.toggle('show');

        const toggleButton = document.querySelector('.menu-toggle');
        const expanded = nav.classList.contains('show');
        toggleButton.setAttribute('aria-expanded', expanded);
    }

    // --- FUNGSI UNTUK SIMULASI STATUS SERVER (TETAP) ---
    const serverMonitorCard = document.querySelector('.server-monitor-card');

    if (serverMonitorCard) {
        const cpuLoadValue = serverMonitorCard.querySelector('.stat-item:nth-child(3) .stat-value');
        const memoryValue = serverMonitorCard.querySelector('.stat-item:nth-child(4) .stat-value');
        const diskValue = serverMonitorCard.querySelector('.stat-item:nth-child(5) .stat-value');
        const networkInValue = serverMonitorCard.querySelector('.stat-item:nth-child(6) .stat-value');
        const networkOutValue = serverMonitorCard.querySelector('.stat-item:nth-child(7) .stat-value');

        const cpuGraphArea = serverMonitorCard.querySelector('.graph-placeholder:nth-child(1) .graph-area');
        const memoryGraphArea = serverMonitorCard.querySelector('.graph-placeholder:nth-child(2) .graph-area');
        const networkGraphArea = serverMonitorCard.querySelector('.graph-placeholder:nth-child(3) .graph-area');

        let uptimeSeconds = 0;

        function updateServerStats() {
            const currentCpu = (Math.random() * 100).toFixed(2);
            cpuLoadValue.textContent = `${currentCpu}%`;
            cpuLoadValue.classList.toggle('status-offline', parseFloat(currentCpu) === 0);

            const totalMemoryMiB = 2048;
            const currentMemoryMiB = (Math.random() * totalMemoryMiB).toFixed(0);
            memoryValue.textContent = `${currentMemoryMiB} MiB / ${totalMemoryMiB} MiB`;
            memoryValue.classList.toggle('status-offline', parseFloat(currentMemoryMiB) === 0);

            const totalDiskGiB = 5.96;
            const currentDiskMiB = (Math.random() * 1024 * 0.5).toFixed(2);
            diskValue.textContent = `${currentDiskMiB} MiB / ${totalDiskGiB} GiB`;

            const inBytes = (Math.random() * 1000).toFixed(0);
            const outBytes = (Math.random() * 1000).toFixed(0);
            networkInValue.textContent = `${inBytes} B/s`;
            networkInValue.classList.toggle('status-offline', parseFloat(inBytes) === 0);
            networkOutValue.textContent = `${outBytes} B/s`;
            networkOutValue.classList.toggle('status-offline', parseFloat(outBytes) === 0);

            uptimeSeconds += 1;
            const days = Math.floor(uptimeSeconds / (3600 * 24));
            const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = uptimeSeconds % 60;

            const uptimeDisplay = serverMonitorCard.querySelector('.stat-item:nth-child(2) .stat-value');
            if (days > 0) {
                uptimeDisplay.textContent = `${days}d ${hours}h`;
            } else if (hours > 0) {
                uptimeDisplay.textContent = `${hours}h ${minutes}m`;
            } else if (minutes > 0) {
                uptimeDisplay.textContent = `${minutes}m ${seconds}s`;
            } else {
                uptimeDisplay.textContent = `${seconds}s`;
            }
            uptimeDisplay.classList.remove('status-offline');
        }

        function updateGraphVisuals() {
            const cpuFill = parseFloat(cpuLoadValue.textContent) + '%';
            const cpuBar = cpuGraphArea.querySelector('div');
            if (!cpuBar) {
                cpuGraphArea.innerHTML = `<div style="width: ${cpuFill}; height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); border-radius: 5px;"></div>`;
            } else {
                cpuBar.style.width = cpuFill;
            }
            cpuGraphArea.style.justifyContent = 'flex-start';

            const currentMem = parseFloat(memoryValue.textContent);
            const totalMem = parseFloat(memoryValue.textContent.split('/')[1]);
            const memFill = (currentMem / totalMem * 100) + '%';
            const memBar = memoryGraphArea.querySelector('div');
            if (!memBar) {
                memoryGraphArea.innerHTML = `<div style="width: ${memFill}; height: 100%; background: linear-gradient(90deg, #2196F3, #03A9F4); border-radius: 5px;"></div>`;
            } else {
                memBar.style.width = memFill;
            }
            memoryGraphArea.style.justifyContent = 'flex-start';

            const inBytes = parseFloat(networkInValue.textContent);
            const outBytes = parseFloat(networkOutValue.textContent);
            const networkActivity = (inBytes + outBytes) / 2000 * 100;
            const networkBar = networkGraphArea.querySelector('div');
            if (!networkBar) {
                networkGraphArea.innerHTML = `<div style="width: ${networkActivity}%; height: 100%; background: linear-gradient(90deg, #FFC107, #FFEB3B); border-radius: 5px;"></div>`;
            } else {
                networkBar.style.width = `${networkActivity}%`;
            }
            networkGraphArea.style.justifyContent = 'flex-start';
        }

        updateServerStats();
        updateGraphVisuals();
        setInterval(() => {
            updateServerStats();
            updateGraphVisuals();
        }, 1000);
    }
});