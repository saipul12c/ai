let temporaryMemory = {};

document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === "") {
        document.getElementById('responseContainer').innerText = "Silakan masukkan pertanyaan Anda.";
        return;
    }

    // Simpan input pengguna ke dalam ingatan sementara
    saveToMemory(userInput);

    fetch('db_1.json')
        .then(response => response.json())
        .then(data => {
            const response = generateResponse(userInput, data);
            document.getElementById('responseContainer').innerText = response;
        });
});

function saveToMemory(input) {
    const words = input.split(' ');
    words.forEach(word => {
        if (temporaryMemory[word]) {
            temporaryMemory[word] += 1; // Tingkatkan frekuensi kata
        } else {
            temporaryMemory[word] = 1; // Tambahkan kata baru
        }
    });
}

function generateResponse(input, data) {
    const keywords = Object.keys(data);
    let matchedKeyword = null;

    // Mencari kata kunci yang paling cocok
    for (let keyword of keywords) {
        if (input.toLowerCase().includes(keyword.toLowerCase())) {
            matchedKeyword = keyword;
            break; // Hentikan pencarian setelah menemukan yang pertama
        }
    }

    // Menghasilkan respon berdasarkan kata kunci yang cocok
    if (matchedKeyword) {
        const responses = data[matchedKeyword];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return addEmoji(randomResponse);
    }

    return addEmoji("Maaf, saya tidak mengerti pertanyaan Anda. 🤔");
}

// Fungsi untuk menambahkan emoji ke respon
function addEmoji(response) {
    const emojiMap = {
        "hai": "👋",
        "apa kabar": "😊",
        "siapa kamu": "🤖",
        "terima kasih": "🙏"
    };

    // Menambahkan emoji yang sesuai ke respon
    for (let key in emojiMap) {
        if (response.toLowerCase().includes(key)) {
            return response + " " + emojiMap[key];
        }
    }

    return response; // Jika tidak ada emoji yang sesuai
}

// Fungsi untuk menggabungkan kata dan membuat respon lebih ramah
function createFriendlyResponse() {
    const memoryKeys = Object.keys(temporaryMemory);
    if (memoryKeys.length > 0) {
        const mostFrequentWord = memoryKeys.reduce((a, b) => temporaryMemory[a] > temporaryMemory[b] ? a : b);
        return `Saya ingat Anda sering menyebut "${mostFrequentWord}". Apakah Anda ingin membahas lebih lanjut tentang itu? 😊`;
    }
    return "Saya senang bisa membantu Anda! Apa lagi yang bisa saya bantu? 🤗";
}
