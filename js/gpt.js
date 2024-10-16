const k1= "7XNqiin3";
const k2= "NO3BLyEzatCvT3BlbkF";
const k3= "Jrp2wlGfvy";
const historychat = [{"gpt":'hi', 'user':"hello"}];
const k4= "JmRd8pJ";
const k5= "W2qp";

async function getChatCompletion(question) {
    k ="sk-"+ k1+k2+k3+k4+k5;

    let question_tmp = "You are a helpful education asistant, please kindly help a student answer her question. If the question is simple or greeting, you should reply quickly while try to answer STEP-BY-STEP as comprehensive as possible if the question ask information or knowledge or an explanation. Then always return informat main points, subpoints. Please separate parapgrahp or list by `\\n`. \n You can read the chat history to identify her concern. \n\n"
    question_tmp += "=========CHAT HISTORY=====\n"

    historychat.forEach(entry => {
        question_tmp += `-- question : ${entry.user}\n   answer   : ${entry.gpt}\n\n`;
    });

    question_tmp += `======> CURRENT USER'S QUESTION : ${question} \n`;

    console.log("MAI ====>" + question_tmp);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${k}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: question_tmp }],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data['choices'][0]['message']['content']
}




document.getElementById('chatForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const chatMessage = document.getElementById('chatMessage').value;
    const chatOutput = document.getElementById('chatOutput');

    // Display the user's message
    const userMessage = document.createElement('div');
    userMessage.textContent = `MAI-chan 🐇: ${chatMessage}` ;
    chatOutput.appendChild(userMessage);
    document.getElementById('chatMessage').value = '';
    
    const tmpMessage = document.createElement('div');
    tmpMessage.textContent = "\n....please wait Duc Anh for few seconds....";
    chatOutput.appendChild(tmpMessage);
    // Genequestion:
    answer = await getChatCompletion(chatMessage).catch(error => console.error('Error:', error));
    answers = answer.split("\n");
    // Simulate a response from ChatGPT
    const botMessage = document.createElement('div');
    botMessage.textContent = `DANK-Kun 🦆: `+answers[0];
    chatOutput.appendChild(botMessage);
    for (let i = 1; i < answers.length; i++) {
        console.log("Element at index " + i + " is " + answers[i]);
        const botxMessage = document.createElement('div');
        botxMessage.textContent = answers[i];
        chatOutput.appendChild(botxMessage);
    
    }
    
    let x_ = Math.random() + 0.1;
    if (x_ >= 0.85){
        const endMessage = document.createElement('div');
        endMessage.textContent = "\n\n NOTE THAT: ĐỨC ANH YÊU MAI NHẤT 💓💓💓";
        chatOutput.appendChild(endMessage);
    }
    const endMessage = document.createElement('div');
    endMessage.textContent = "--------\n\n";
    chatOutput.appendChild(endMessage);
    // Clear the input field
    // document.getElementById('chatMessage').value = '';
});
