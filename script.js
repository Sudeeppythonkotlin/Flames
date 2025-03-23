document.addEventListener("DOMContentLoaded", function () {
    const generatedLink = document.getElementById("generatedLink");
    const hostDisplay = document.getElementById("hostDisplay");
    const instagramShare = document.getElementById("instagramShare");

    // Generate FLAMES Link
    window.generateLink = function () {
        const hostName = document.getElementById("hostName").value.trim();
        if (!hostName) {
            alert("Please enter your name!");
            return;
        }
        const link = `${window.location.origin}/play.html?host=${encodeURIComponent(hostName)}`;
        generatedLink.value = link;
        instagramShare.href = `https://www.instagram.com/stories/create/?url=${encodeURIComponent(link)}`;
        document.getElementById("shareSection").classList.remove("hidden");
    };

    // Copy Link to Clipboard
    window.copyLink = function () {
        generatedLink.select();
        navigator.clipboard.writeText(generatedLink.value)
            .then(() => alert("Link copied!"))
            .catch(err => console.error("Error copying:", err));
    };

    // Play FLAMES Game
    window.playFlames = function () {
        const playerName = document.getElementById("playerName").value.trim();
        if (!playerName) {
            alert("Enter your name to play!");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const hostName = urlParams.get("host");

        if (!hostName) {
            alert("Invalid link or missing host name.");
            return;
        }

        const flamesResult = calculateFlames(hostName, playerName);
        document.getElementById("flamesResult").textContent = `🔥 ${flamesResult}!`;
        confetti();  // Trigger confetti animation
    };

    // FLAMES Calculation Logic
    function calculateFlames(name1, name2) {
        if (!name1 || !name2) return "Unknown";

        let name1Arr = name1.toLowerCase().replace(/\s/g, "").split("");
        let name2Arr = name2.toLowerCase().replace(/\s/g, "").split("");

        // Remove common letters
        const commonLetters = name1Arr.filter(char => name2Arr.includes(char));
        name1Arr = name1Arr.filter(char => !commonLetters.includes(char));
        name2Arr = name2Arr.filter(char => !commonLetters.includes(char));

        let remainingCount = name1Arr.length + name2Arr.length;
        if (remainingCount === 0) return "Best Friends ❤️";

        const flames = ["Friends", "Lovers", "Affection", "Marriage", "Enemies", "Siblings"];
        let index = (remainingCount % flames.length) - 1;
        if (index < 0) index = flames.length - 1;

        return flames[index];
    }

    // If on play.html, show the host name
    if (hostDisplay) {
        const urlParams = new URLSearchParams(window.location.search);
        const hostName = urlParams.get("host");
        if (hostName) {
            hostDisplay.textContent = hostName;
        } else {
            hostDisplay.textContent = "Unknown";
        }
    }
});
