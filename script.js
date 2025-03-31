const BACKEND_URL = "https://positive-wandering-homegrown.glitch.me";

document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quiz-form");
    const resultDisplay = document.getElementById("result");

    quizForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const discordId = document.getElementById("discordId").value.trim();
        const applicantDetails = document.getElementById("applicantDetails").value.trim();
        const declaration = document.getElementById("declaration").checked;

        if (!discordId || !applicantDetails || !declaration) {
            resultDisplay.textContent = "All fields and declaration are mandatory!";
            resultDisplay.style.color = "red";
            return;
        }

        let userResponses = {};
        document.querySelectorAll("input[type=checkbox]:checked").forEach(input => {
            if (!userResponses[input.name]) userResponses[input.name] = [];
            userResponses[input.name].push(input.value);
        });

        // Ensure all questions are answered
        const totalQuestions = 12;
        if (Object.keys(userResponses).length < totalQuestions) {
            resultDisplay.textContent = "You must answer all questions!";
            resultDisplay.style.color = "red";
            return;
        }

        const response = await fetch(`${https://positive-wandering-homegrown.glitch.me}/submit-quiz`, {
            method: "POST",
            headers: {
        "Content-Type": "application/json",
    },
            body: JSON.stringify({ userResponses, discordId })
        });

        const result = await response.json();
        resultDisplay.textContent = `Result: ${result.result} (${result.correctCount}/12)`;
        resultDisplay.style.color = result.result === "Pass" ? "green" : "red";
    });
});
