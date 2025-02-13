let score = 0;
const missionText = document.getElementById("missionText");
const scoreText = document.getElementById("scoreText");

export function startMission() {
    let missions = ["Samla 5 stenar", "Hitta ett dolt föremål", "Bygg en bro"];
    let mission = missions[Math.floor(Math.random() * missions.length)];

    missionText.innerText = `Uppdrag: ${mission}`;
    
    // Ge poäng för att starta uppdrag
    score += 10;
    scoreText.innerText = `Poäng: ${score}`;
}
