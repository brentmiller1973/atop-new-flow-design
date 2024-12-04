/* global customElements, HTMLElement */
class AtoSessionTimer extends HTMLElement {
  constructor () {
    super() // Always call super first in constructor
    this.attachShadow({ mode: 'open' }) // Attach a shadow DOM tree to the custom element
    this.totalTime = 0 // 10 minutes in seconds
    this.currentTime = this.totalTime
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    text-align: center;
                }

                .flip-clock {
                  /*font-size: 1.15rem;*/
                  display: flex;
                  flex-direction: row;
                  gap: .75rem;
                  /*color: rgb(25 6 78);*/
                }

                .flip-header {
                    font-weight: bold;
                }
                .separator {
                    padding: 0 5px;
                }

                .expired-message {
                    font-size: 1.15rem;
                    color: red;
                    display: none;
                }
            </style>
            <div class="flip-clock pt-3">
                <div class="flip-header">Time remaining:</div>
                <div class="minutes tens"></div>
                <div class="minutes ones"></div>
                <div class="separator">:</div>
                <div class="seconds tens"></div>
                <div class="seconds ones"></div>
            </div>
            <div class="expired-message">Session Expired</div>
        `

    this.updateTimerDisplay()
  }

  updateTimerDisplay () {
    const minutes = Math.floor(this.currentTime / 60)
    const seconds = this.currentTime % 60
    this.shadowRoot.querySelector('.minutes.tens').textContent = Math.floor(
      minutes / 10
    )
    this.shadowRoot.querySelector('.minutes.ones').textContent = minutes % 10
    this.shadowRoot.querySelector('.seconds.tens').textContent = Math.floor(
      seconds / 10
    )
    this.shadowRoot.querySelector('.seconds.ones').textContent = seconds % 10
  }

  startTimer (timeInSeconds) {
    this.totalTime = timeInSeconds
    this.currentTime = this.totalTime
    const timerInterval = setInterval(() => {
      if (this.currentTime <= 0) {
        clearInterval(timerInterval)
        // this.shadowRoot.querySelector(".flip-clock").style.display = "none";
        // this.shadowRoot.querySelector(".expired-message").style.display =
        //     "flex";
        return
      }
      this.currentTime--
      this.updateTimerDisplay()
    }, 1000)
  }
}

customElements.define('ato-session-timer', AtoSessionTimer);
