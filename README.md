# Monitoramento de Sites

## Objetivo:

Este aplicativo JavaScript permite monitorar a disponibilidade de sites.

Link: https://santanarael.github.io/web-health/

![image](https://github.com/SantanaRael/web-health/assets/73674173/a2a76c9b-4f96-4e7c-ba93-a3ba755430e0)


## Pré-requisitos:

- Node.js instalado em seu computador.
- Editor de código (Visual Studio Code, Sublime Text, etc.).

## Executando o código localmente:

1. Clone o repositório GitHub:
   ```bash
   git clone https://github.com/santanarael/web-health.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd web-health
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   node app.js
   ```
5. Acesse o aplicativo no navegador:
   - Abra seu navegador e digite `http://localhost:3000` na barra de endereço.

## Utilizando o aplicativo:

- **Adicione a URL do site que deseja monitorar:** Na página inicial do aplicativo, digite a URL do site no campo de texto e clique no botão "Adicionar".

- **Verifique o status do site:** O status do site será exibido em tempo real na página inicial. O aplicativo verifica o status a cada 5 segundos.

## Observações:

- O aplicativo só pode monitorar sites dentro da mesma rede local.
- Você pode adicionar quantos sites quiser ao monitoramento.
- O aplicativo salva as URLs monitoradas em seu navegador, mesmo após fechar e reabrir o aplicativo.

## Recursos Adicionais:

- [Documentação do Node.js](https://nodejs.org/en/)
- [Documentação do Express](https://expressjs.com/)

## Limitações:


- O aplicativo não possui recursos avançados de monitoramento, como alertas por e-mail ou notificações.

## Melhorias Futuras:

- Adicionar recursos avançados de monitoramento, como alertas por e-mail ou notificações.
- Permitir a personalização do intervalo de tempo entre as verificações de status.

## Agradecimentos:

Obrigado por utilizar este aplicativo! Se você tiver alguma sugestão de melhoria, por favor, abra um issue no repositório GitHub.
