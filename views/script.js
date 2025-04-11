async function getTimestamp() {
    const dateInputValue = document.getElementById('dateInput').value;
    const resultElement = document.getElementById('result');

    if (!resultElement) {
        console.error("Elemento #result não encontrado!");
        return;
    }

    try {
        const response = await fetch(`/api/${dateInputValue}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        resultElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Erro ao obter o timestamp:", error);
        resultElement.textContent = `Erro: ${error.message}`;
    }
}

async function getDateDiff() {
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;
    const diffResultElement = document.getElementById('diffResult');

    if (!diffResultElement) {
        console.error("Elemento #diffResult não encontrado!");
        return;
    }

    try {
        const response = await fetch(`/api/diff/${date1}/${date2}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        diffResultElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Erro ao calcular a diferença:", error);
        diffResultElement.textContent = `Erro: ${error.message}`;
    }
}
