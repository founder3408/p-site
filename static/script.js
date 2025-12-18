let selectedPlatform = null

// Selecionar plataforma
document.querySelectorAll(".platform-btn").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active de todos os botões
    document.querySelectorAll(".platform-btn").forEach((btn) => {
      btn.classList.remove("active")
    })

    // Adiciona active ao botão clicado
    this.classList.add("active")

    // Armazena a plataforma selecionada
    selectedPlatform = this.dataset.platform

    // Atualiza o texto de plataforma selecionada
    document.getElementById("selectedPlatform").textContent = `✅ Plataforma selecionada: ${selectedPlatform}`

    // Atualiza o input hidden
    document.getElementById("plataformaInput").value = selectedPlatform

    console.log("Plataforma selecionada:", selectedPlatform)
  })
})

// Submit do formulário
document.getElementById("accessForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Verifica se uma plataforma foi selecionada
  if (!selectedPlatform) {
    alert("⚠️ Por favor, selecione uma plataforma primeiro!")
    return
  }

  // Coleta os dados do formulário
  const formData = new FormData(this)

  // Exibe loading no botão
  const submitBtn = this.querySelector(".submit-btn")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "⏳ Verificando..."
  submitBtn.disabled = true

  // Envia os dados para o servidor
  fetch("/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dados armazenados:", data)

      // Exibe mensagem de sucesso
      alert(
        `✅ ${data.message}\n\n` +
          `Plataforma: ${data.dados.plataforma}\n` +
          `Nome: ${data.dados.nome_stream}\n` +
          `Email: ${data.dados.email}\n` +
          `Telefone: ${data.dados.telefone}`,
      )

      // Reseta o botão
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
    .catch((error) => {
      console.error("Erro:", error)
      alert("❌ Erro ao processar solicitação. Tente novamente.")

      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
})

// Log para debug - armazena dados no console
console.log("Sistema de captura de dados inicializado")
console.log("Acesse /dados para ver os dados armazenados na sessão")
