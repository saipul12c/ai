document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    fetch('db_1.json')
        .then(response => response.json())
        .then(data => {
            const response = generateResponse(userInput, data);
            document.getElementById('responseContainer').innerText = response;
        });
});

function generateResponse(input, data) {
    const keywords = Object.keys(data);
    for (let keyword of keywords) {
        if (input.toLowerCase().includes(keyword.toLowerCase())) {
            const responses = data[keyword];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    return "Maaf, saya tidak mengerti pertanyaan Anda.";
}
