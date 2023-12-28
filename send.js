// ==UserScript==
// @name         Crocus Chatbot
// @namespace    http://tampermonkey.net/
// @version      2023-12-08
// @description  try to take over the world!
// @author       Md. Ahanaf Tahmid Islam
// @match        https://www.crocus.co.uk/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crocus.co.uk
// @grant        none
// ==/UserScript==

(function () {
  const html = `
    <div class="chatbot_main">
      <div id="chatbot_start_button">
        <img src="https://i.ibb.co/M2FC3F5/main-logo.png" alt="" />
      </div>
      <div id="chatbot_body">
        <div id="chatbot" class="main-card">
          <div class="main-title">
            <div>
              <img
                id="title_img"
                src="https://i.ibb.co/tHDLpBj/body-logo.png"
                alt=""
              />
            </div>
            <span>EchoLogyx Assistant</span>
  
            <!-- <div class="expand_collapse_button">
              <img
                id="expand_img"
                src="https://i.ibb.co/TPCfvGt/expand-up-down.png"
                alt=""
              />
            </div> -->
            <div class="expand_close_button">
              <img
                id="close_img"
                src="https://i.ibb.co/F408LWY/close-button.png"
                alt=""
              />
            </div>
          </div>
          <div class="chat-area" id="message-box"></div>
          <div class="line"></div>
          <div class="input-div">
            <input
              class="input-message"
              name="message"
              type="text"
              id="message"
              placeholder="Type your message here"
            />
            <button class="input-send" onclick="send()">
              <!-- <svg style="width: 24px; height: 24px">
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg> -->
              <img src="https://i.ibb.co/z7wTBTx/send-button.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>`;
  const botScript = {
    init: function () {
      botScript.mainCss();
      botScript.mainJs();
    },
    mainCss: function () {
      var styles = document.createElement("style");
      styles.setAttribute("type", "text/css");
      document.head.appendChild(styles).textContent = `
        @media (min-width: 450px) {
          .main-card {
            width: 100%;
            max-width: 460px;
            height: calc(100% - 32px) !important;
            border-radius: 16px !important;
            max-height: 550px;
            margin: 16px !important;
          }
        }
        .chatbot_main {
          position: fixed;
          bottom: 0px;
          right: 20px;
          font-family: "Open Sans", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0em;
          text-align: left;
          z-index: 99999;
        }
  
        #chatbot_start_button {
          cursor: pointer;
        }
  
        #chatbot_start_button img {
          width: 72px;
          height: 84px;
        }
        #chatbot_body {display: none;}
        #chatbot {
          position: fixed;
          bottom: 75px;
          right: 10px;
          z-index: 99999;
        }
  
        #chatbot .title {
          margin: auto;
          font-size: large;
          background-color: #fff;
          font-family: "Open Sans", sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 27px;
          letter-spacing: 0em;
          text-align: left;
        }
  
        .main-card {
          background: white;
          color: white;
          width: 100%;
          height: 100%;
          margin: 0px;
          border-radius: 0px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          right: 0;
          bottom: 0;
          position: absolute;
          transition: all 0.5s; box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
        }
  
        #chatbot #chatbot_toggle {
          position: absolute;
          right: 0;
          border: none;
          height: 48px;
          width: 48px;
          color: white;
        }
  
        #chatbot #chatbot_toggle_minus {
          position: absolute;
          right: 48px;
          border: none;
          height: 48px;
          width: 48px;
          padding: 14px;
          color: white;
        }
  
        #chatbot .line {
          height: 1px;
          background-color: #374325;
          width: 100%;
          opacity: 0.2;
        }
        #chatbot .main-title {
          color: black;
          font-size: large;
          font-weight: bold;
          display: flex;
          height: 48px;
          box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
        }
        #chatbot .main-title > div {
          height: 48px;
          width: 38px;
          display: flex;
          margin-left: 0px;
        }
  
        #title_img {
          height: 24px;
          margin: auto;
        }
  
        #expand_img {
          height: 10.48px;
          width: 10.5px;
          margin: auto;
        }
        #close_img {
          height: 24px;
          width: 24px;
          margin: auto;
        }
        #chatbot .main-title > span {
          margin: auto auto auto 8px;
        }
        #chatbot .chat-area {
          flex-grow: 1;
          overflow: auto;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        #chatbot .input-message {
          flex-grow: 1;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 12px 20px;
          border-radius: 100px;
          margin: 12px 20px;
        }
        #chatbot .input-message:focus {
          outline: none;
        }
        input::placeholder {
          padding: 2px; /* You can adjust the padding as needed */
        }
        #chatbot .input-div {
          height: 65px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #chatbot .input-send {
          background: transparent;
          width: 60px;
          height: 48px;
          right: 0%;
          border: none;
          cursor: pointer;
        }
  
        #chatbot .input-send svg {
          fill: #374325;
          margin: 11px 8px;
        }
  
        #chatbot .chat-message-div {
          display: flex;
        }
  
        #chatbot .chat-message-sent {
          margin: 8px 16px 8px 64px;
          padding: 8px 16px;
          animation-name: fadeIn;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 100ms;
          border-radius: 8px;
          background-color: rgba(55, 67, 37, 1);
        }
  
        #chatbot .message_received_main {
          display: flex;
        }
  
        #chatbot #body_img {
          height: 26px;
          margin: 2px 9px 0px -8px;
        }
  
        #chatbot .chat-message-received {
          margin: 0px 64px 3px 0px;
          padding: 8px 6px;
          animation-name: fadeIn;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 100ms;
          border-radius: 8px 8px 8px 8px;
          background-color: rgba(245, 246, 244, 1);
          color: black;
          max-width: 340px;
        }
  
        #chatbot .chat-message-received_product{
            margin: 7px 5px 7px 0px;
            padding: 9px 10px;
        }
  
        #chatbot .chat-message-loader {
          margin: 0px 64px 3px 0px;
          padding: 8px 6px;
          animation-name: fadeIn;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 100ms;
          border-radius: 8px 8px 8px 8px;
          background-color: rgba(245, 246, 244, 1);
          color: black;
        }
  
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        #chatbot ::-webkit-scrollbar {
          width: 10px;
          display: none;
        }
        #chatbot ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        #chatbot ::-webkit-scrollbar-thumb {
          background: #888;
        }
        #chatbot ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        #chatbot .container {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: "Open Sans", sans-serif;
        }
        #chatbot .dot-loader {
          position: relative;
          width: 50px;
          height: 30px;
          border-radius: 30px;
        }
        @keyframes anim {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-5px);
          }
        }
        #chatbot .dot-loader div:nth-child(1) {
          position: absolute;
          top: 16px;
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: lavender;
          animation: anim 0.5s ease alternate infinite;
          left: 10px;
        }
        #chatbot .dot-loader div:nth-child(2) {
          position: absolute;
          top: 16px;
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: lavender;
          animation: anim 0.5s ease alternate infinite;
          left: 22px;
          animation-delay: 0.2s;
        }
        #chatbot .dot-loader div:nth-child(3) {
          position: absolute;
          top: 16px;
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: lavender;
          animation: anim 0.5s ease alternate infinite;
          left: 34px;
          animation-delay: 0.3s;
        }
  
        //chatbot new card start
        #chatbot .card-container {
          width: 100%;
          height: 100%;
          padding: 8px;
          background: #F5F6F4;
          border-radius: 8px;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 5px;
          display: inline-flex;
        }
  
        .name-label {
          align-self: stretch;
          color: #373F47;
          font-size: 14px;
          font-family: Open Sans;
          font-weight: 700;
          line-height: 24px;
          word-wrap: break-word;
        }
  
        .button {
          text-decoration: none;
        }
  
        .card {
          align-self: stretch;
          height: auto;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          overflow: hidden;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          display: flex;
        }
  
        .image-container {
          align-self: stretch;
          flex: 1 1 0;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 10px;
          display: inline-flex;
        }
  
        .Image {
          flex: 1 1 0;
          align-self: stretch;
        }
  
        .card-details {
          align-self: stretch;
          height: auto;
          padding: 12px;
          background: white;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 10px;
          display: flex;
        }
  
        .details-row {
          align-self: stretch;
          height: auto;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 6px;
          display: flex;
        }
  
        .productName {
          justify-content: flex-start;
          align-items: flex-start;
          gap: 8px;
          display: inline-flex;
          color: #374325;
          font-size: 12px;
          font-family: Open Sans;
          font-weight: 600;
          letter-spacing: 0.13px;
          word-wrap: break-word;
        }
  
        .price {
          justify-content: flex-start;
          align-items: flex-start;
          gap: 8px;
          display: inline-flex;
          color: #656568;
          font-size: 12px;
          font-family: Open Sans;
          font-weight: 400;
          letter-spacing: 0.14px;
          word-wrap: break-word;
        }
  
        .availability {
          padding-left: 8px;
          padding-right: 8px;
          padding-top: 6px;
          padding-bottom: 6px;
          border-radius: 2px;
          overflow: hidden;
          border: 1px #DFE0DC solid;
          justify-content: center;
          align-items: center;
          gap: 10px;
          display: inline-flex;
        }
  
        .availability_inside {
          text-align: center;
          color: #313131;
          font-size: 10px;
          font-family: Open Sans;
          font-weight: 400;
          line-height: 6.49px;
          letter-spacing: 0.11px;
          word-wrap: break-word;
        }
  
        .description-text {
          align-self: stretch;
          color: #373F47;
          font-size: 14px;
          font-family: Open Sans;
          font-weight: 400;
          line-height: 24px;
          word-wrap: break-word;
        }
        //chatbot new card end
        `;
    },
    mainJs: function () {
      /* eslint-disable no-constant-condition */
      /* eslint-disable no-undef */
      /* eslint-disable no-unused-expressions */
      /* eslint-disable no-unused-vars */
      /* eslint-disable camelcase */
      /* eslint-disable no-plusplus */
      /* eslint-disable vars-on-top */
      var url = "http://127.0.0.1:5000";
      console.log("Main js running");
      document.querySelector("body").insertAdjacentHTML("afterbegin", html);
      var running = false;
      var preQuery = "";
      const isConversation = true;
      var agentResp = "";
      var loader = false;
      var sessionId = null;
      let sessionTime = 20; // in minutes

      function addLoader() {
        const messageBox = document.getElementById("message-box");
        const div = document.createElement("div");
        div.className = "chat-message-div";
        div.innerHTML = `
      <div class='chat-message-loader'>
        <div class='dot-loader'> <div></div><div></div><div></div></div>
      </div>
    `;
        messageBox.appendChild(div);
        messageBox.scrollTop = messageBox.scrollHeight;
        running = false;
      }

      function startConv() {
        !localStorage.getItem("userId")
          ? fetch(url + "/startConv", { method: "GET" })
              .then((response) => {
                if (response.ok) {
                  return response.json(); // Parse the response data as JSON
                }
                throw new Error("API request failed");
              })
              .then((data) => {
                // Process the response data here
                console.log(data); // Example: Logging the data to the console
                sessionId = data.res.id;
                localStorage.setItem("userId", sessionId);
                // setTimeout(function () {
                //   endConv();
                // }, 120000);
              })
              .catch((error) => {
                // console.error(error);
              })
          : console.log("User_id", localStorage.getItem("userId"));
      }

      document.getElementById("chatbot_start_button").onclick = () => {
        document
          .getElementsByClassName("input-send")[0]
          .removeAttribute("disabled");
        document
          .getElementsByClassName("input-message")[0]
          .removeAttribute("disabled");
        var chatbotBody = document.getElementById("chatbot_body");
        chatbotBody.style.display =
          "none" || ""
            ? (chatbotBody.style.display = "block")
            : (chatbotBody.style.display = "none");

        // eslint-disable-next-line eqeqeq
        if (!localStorage.getItem("userId")) {
          setTimeout(() => {
            document.getElementById("message").focus();
          }, 0);
          startConv();
          addLoader();
          setTimeout(addResponseMsg, 800, "Hello! How can I help you?");
        }
      };

      document
        .getElementById("message")
        .addEventListener("keyup", function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            send();
          }
        });

      document.getElementsByClassName("input-send")[0].onclick = () => {
        send();
      };

      document.getElementById("close_img").onclick = () => {
        document.getElementById("chatbot_body").style.display = "none";
      };

      function endConv() {
        const formData = new FormData();
        formData.append("id", localStorage.getItem("userId"));
        fetch(url + "/stopConv", { method: "POST", body: formData })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("API request failed");
          })
          .then((data) => {
            // console.log(data);
            preQuery = "";
            agentResp = "";
            loader = false;
            localStorage.removeItem("userId");
            // Get all elements with the class 'chat-message-div'
            const chatMessageDivs = document.getElementById("message-box");
            // Set the inner HTML for the last element
            innerHTML =
              '<div class="chat-message-div"><div class="message_received_main"><div><img id="body_img" src="https://i.ibb.co/tHDLpBj/body-logo.png" alt=""></div><div class="chat-message-received" style="background-color: #ffcccc;">Your chat session has expired. Kindly close and reopen the chat box to initiate a new session.</div></div></div>';
            chatMessageDivs.insertAdjacentHTML("beforeend", innerHTML);

            document
              .getElementsByClassName("input-send")[0]
              .setAttribute("disabled", "True");
            document
              .getElementsByClassName("input-message")[0]
              .setAttribute("disabled", "True");
          })
          .catch((error) => {
            // console.error(error);
          });
      }

      // Function to get the remaining time
      function getRemainingTime() {
        const currentTime = new Date().getTime();
        const timerEndTime = currentTime + 5 * 60 * 1000; // 5 minutes in milliseconds
        return timerEndTime - currentTime;
      }

      function conversation(msg) {
        document.getElementById("message").disabled = true;
        loader = true;
        let timer;
        addLoader();
        window.setTimeout(addResponseMsg, 1000, msg);
        const formData = new FormData();
        formData.append("query", msg);
        formData.append("preQuery", preQuery);
        formData.append("is_conversation", isConversation);
        formData.append("agentResp", agentResp);
        formData.append("id", localStorage.getItem("userId"));

        fetch(url + "/conversation", { method: "POST", body: formData })
          .then((response) => {
            if (response.ok) {
              document.getElementById("message").disabled = false;
              clearTimeout(timer);
              timer = setTimeout(() => {
                // Call the second function after 5 minutes
                endConv();
              }, sessionTime * 60 * 1000); // 5 minutes in milliseconds
              return response.json();
            }
            loader = false;
            throw new Error("API request failed");
          })
          .then((data) => {
            var preparedData = removeJsonPrefixAndSuffix(data);
            var jsonData = JSON.parse(preparedData);
            agentResp = data;
            preQuery = msg;
            loader = false;

            if (
              jsonData.product_Name &&
              jsonData.product_Image_URL.length > 0 &&
              jsonData.product_Name.length > 0
            ) {
              console.log(jsonData.product_Name.length);
              productConversation(jsonData);
            } else if (jsonData.ai_info) {
              addResponseMsg(jsonData.ai_info);
              if (jsonData.ai_helpinfo) {
                addAiHelp(jsonData.ai_helpinfo);
              }
            } else {
              addResponseMsg(jsonData);
            }
          })
          .catch((error) => {
            loader = false;
            console.error(error);
          });
      }

      function productConversation(data) {
        if (data.ai_info && data.ai_info.length > 0) {
          addResponseMsg(data.ai_info);
        }
        addProducts(data);
        if (data.ai_helpinfo && data.ai_helpinfo.length > 0) {
          addAiHelp(data.ai_helpinfo);
        }
      }

      function removeJsonPrefixAndSuffix(jsonString) {
        try {
          const startIndex = jsonString.indexOf("{");
          const endIndex = jsonString.lastIndexOf("}");
          if (startIndex !== -1 && endIndex !== -1) {
            return jsonString.substring(startIndex, endIndex + 1);
          }
        } catch (e) {
          console.error(e);
        }
        return jsonString;
      }

      function send() {
        if (running === true) return;
        // eslint-disable-next-line vars-on-top
        var msg = document.getElementById("message").value;
        if (msg === "") return;
        running = true;
        addMsg(msg);
        conversation(msg);
      }

      function addMsg(msg) {
        var div = document.createElement("div");
        div.innerHTML = `<span style='flex-grow:1'></span><div class='chat-message-sent'>
      ${msg} </div>`;
        div.className = "chat-message-div";
        document.getElementById("message-box").appendChild(div);
        // SEND MESSAGE TO API
        document.getElementById("message").value = "";
        document.getElementById("message-box").scrollTop =
          document.getElementById("message-box").scrollHeight;
      }

      function addResponseMsg(msg) {
        var msgBox = document.getElementById("message-box");
        if (!loader) {
          msgBox.lastChild.innerHTML = "";
          msgBox.lastChild.innerHTML = `<div class='message_received_main'><div><img id='body_img' src='https://i.ibb.co/tHDLpBj/body-logo.png' alt=''></div><div class='chat-message-received'>${msg}</div></div>`;
        }
        document.getElementById("message-box").scrollTop =
          document.getElementById("message-box").scrollHeight;
        running = false;
      }

      function addAiHelp(data) {
        var div = document.createElement("div");
        div.innerHTML = `<div class='message_received_main'><div><img id='body_img' src='https://i.ibb.co/tHDLpBj/body-logo.png' alt=''></div><div class='chat-message-received'>${data}</div></div>`;
        div.className = "chat-message-div";
        document.getElementById("message-box").appendChild(div);
        document.getElementById("message-box").scrollTop =
          document.getElementById("message-box").scrollHeight;
        running = false;
      }

      function addProducts(data) {
        const messageBox = document.getElementById("message-box");
        let html = "";

        for (let i = 0; i < data.product_Name.length; i++) {
          const {
            product_Image_URL,
            product_Name,
            product_description,
            product_url,
          } = data;
          html += productCard(
            product_Image_URL[i],
            product_Name[i],
            product_description[i],
            product_url[i]
          );
        }

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("product_row");
        rowDiv.innerHTML = html;

        messageBox.appendChild(rowDiv);
        messageBox.scrollTop = messageBox.scrollHeight;
        running = false;
      }

      function productCard(image, name, description, product) {
        return product
          ? `
        <div class='chat-message-div'>
          <div class='message_received_main'>
              <div>
                  <img id='body_img' src='https://i.ibb.co/tHDLpBj/body-logo.png' alt=''>
              </div>
              <div class='chat-message-received chat-message-received_product'>
                  <div class="card-container">
                      <div class="name-label">${name}:</div>
                      <a href="${product}" target="_blank" style="text-decoration: none; class="button">
                          <div class="card">
                              <div class="image-container">
                                  <img class="Image" src=${
                                    image ||
                                    "https://demofree.sirv.com/nope-not-here.jpg"
                                  } />
                              </div>
                              <div class="card-details">
                                  <div class="details-row">
                                      <div class="productName">${
                                        name || ""
                                      }</div>
                                  </div>
                                  <div class="details-row">
                                      <div class="price">${
                                        name ? "£18.50" : ""
                                      }</div>
                                  </div>
                                  <div class="availability">
                                      <div class="availability_inside">${
                                        name ? "Available: 30" : ""
                                      }</div>
                                  </div>
                              </div>
                          </div>
                      </a>
      
                      <div class="description-text">${description || ""}</div>
                  </div>
              </div>
          </div>
      </div>
        `
          : "";
      }
    },
  };
  botScript.init();
})();
