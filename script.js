function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');

  const toggleButton = document.querySelector('.menu-toggle');
  const expanded = nav.classList.contains('show');
  toggleButton.setAttribute('aria-expanded', expanded);
}

function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');

  const toggleButton = document.querySelector('.menu-toggle');
  const expanded = nav.classList.contains('show');
  toggleButton.setAttribute('aria-expanded', expanded);
}

// NEW: Function to simulate real-time server data
document.addEventListener('DOMContentLoaded', () => {
    const serverMonitorCard = document.querySelector('.server-monitor-card');

    if (serverMonitorCard) { // Only run if the server monitor card exists on the page
        const cpuLoadValue = serverMonitorCard.querySelector('.stat-item:nth-child(3) .stat-value');
        const memoryValue = serverMonitorCard.querySelector('.stat-item:nth-child(4) .stat-value');
        const diskValue = serverMonitorCard.querySelector('.stat-item:nth-child(5) .stat-value');
        const networkInValue = serverMonitorCard.querySelector('.stat-item:nth-child(6) .stat-value');
        const networkOutValue = serverMonitorCard.querySelector('.stat-item:nth-child(7) .stat-value');

        const cpuGraphArea = serverMonitorCard.querySelector('.graph-placeholder:nth-child(1) .graph-area');
        const memoryGraphArea = serverMonitorCard.querySelector('.graph-placeholder:nth-child(2) .graph-area');
        const networkGraphArea = serverMonitorCard.querySelector('.graph-placeholder:nth-child(3) .graph-area');

        let uptimeSeconds = 0; // Start uptime counter from 0

        function updateServerStats() {
            // Simulate CPU Load (0-100%)
            const currentCpu = (Math.random() * 100).toFixed(2);
            cpuLoadValue.textContent = `${currentCpu}%`;
            cpuLoadValue.classList.toggle('status-offline', parseFloat(currentCpu) === 0); // Remove offline if not 0

            // Simulate Memory (e.g., 2GB total, current use 0-2048MiB)
            const totalMemoryMiB = 2048; // Assume 2GB total for simulation
            const currentMemoryMiB = (Math.random() * totalMemoryMiB).toFixed(0);
            memoryValue.textContent = `${currentMemoryMiB} MiB / ${totalMemoryMiB} MiB`;
            memoryValue.classList.toggle('status-offline', parseFloat(currentMemoryMiB) === 0);

            // Simulate Disk (initial disk remains mostly constant, but we can show usage changing)
            // For simplicity, we'll keep the total disk fixed as it usually is,
            // but you could change the used amount if needed.
            const totalDiskGiB = 5.96;
            const currentDiskMiB = (Math.random() * 1024 * 0.5).toFixed(2); // Simulate usage up to 0.5GB
            diskValue.textContent = `${currentDiskMiB} MiB / ${totalDiskGiB} GiB`;

            // Simulate Network (random Bytes/s)
            const inBytes = (Math.random() * 1000).toFixed(0); // up to 1KB/s
            const outBytes = (Math.random() * 1000).toFixed(0); // up to 1KB/s
            networkInValue.textContent = `${inBytes} B/s`;
            networkInValue.classList.toggle('status-offline', parseFloat(inBytes) === 0);
            networkOutValue.textContent = `${outBytes} B/s`;
            networkOutValue.classList.toggle('status-offline', parseFloat(outBytes) === 0);

            // Update Uptime
            uptimeSeconds += 5; // Assuming update every 5 seconds
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
            uptimeDisplay.classList.remove('status-offline'); // Always show uptime if running
        }

        // Simulate graph changes (simple color fill for visual effect)
        function updateGraphVisuals() {
            // CPU Graph: fill based on currentCpu value
            const cpuFill = parseFloat(cpuLoadValue.textContent) + '%';
            cpuGraphArea.innerHTML = `<div style="width: ${cpuFill}; height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); border-radius: 5px;"></div>`;
            cpuGraphArea.style.justifyContent = 'flex-start'; // Align content to start

            // Memory Graph: fill based on currentMemoryMiB
            const currentMem = parseFloat(memoryValue.textContent);
            const totalMem = parseFloat(memoryValue.textContent.split('/')[1]);
            const memFill = (currentMem / totalMem * 100) + '%';
            memoryGraphArea.innerHTML = `<div style="width: ${memFill}; height: 100%; background: linear-gradient(90deg, #2196F3, #03A9F4); border-radius: 5px;"></div>`;
            memoryGraphArea.style.justifyContent = 'flex-start'; // Align content to start

            // Network Graph: combined simple fill (e.g., higher activity means fuller bar)
            const inBytes = parseFloat(networkInValue.textContent);
            const outBytes = parseFloat(networkOutValue.textContent);
            const networkActivity = (inBytes + outBytes) / 2000 * 100; // Normalize to 100% based on max 2000B/s
            networkGraphArea.innerHTML = `<div style="width: ${networkActivity}%; height: 100%; background: linear-gradient(90deg, #FFC107, #FFEB3B); border-radius: 5px;"></div>`;
            networkGraphArea.style.justifyContent = 'flex-start'; // Align content to start
        }

        // Initial update
        updateServerStats();
        updateGraphVisuals();

        // Update every 5 seconds (5000 milliseconds)
        setInterval(() => {
            updateServerStats();
            updateGraphVisuals();
        }, 5000);
    }
});