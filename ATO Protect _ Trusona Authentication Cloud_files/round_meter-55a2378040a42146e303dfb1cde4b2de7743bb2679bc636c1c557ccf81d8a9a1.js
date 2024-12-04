/* global customElements, HTMLElement */
class RoundRiskMeter extends HTMLElement {
  constructor () {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        .meter-round-container {
          width: auto;
          border: none;
          border-radius: 8px;
          /*padding: 1rem;*/
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        .meter-round-inner {
          width: 200px;
          height: auto;
        }
        @media (max-width: 600px) {
          .meter-round-inner {
            width: 125px;
            height: auto;
          }
        }
        .meter-round-container h1 {
          font-size: 20px;
          font-weight: 600;
          color: #484550;
          padding: 0;
          margin: 0;
        }
        .meter-round-container.safari #meter-section-one {
          stroke: #6DAD81 !important;
        }
        .meter-round-container.safari #meter-section-two {
          stroke: #E3C342 !important;
        }
        .meter-round-container .needle {
          transform-origin: 100px 100px;
          transform: rotate(-90deg);
          transition: transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) .5s;
        }
      </style>
      <section class="meter-round-container">
        <div class="meter-round-inner">
          <svg class="risk-meter" viewBox="44.747 44.604 110.631 55.254" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="gauge-center-shadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>
                <feOffset dx="0" dy="-4" result="offsetblur"></feOffset>
                <feFlood flood-color="rgba(0,0,0,0.28)" result="color"></feFlood>
                <feComposite in="color" in2="offsetblur" operator="in" result="shadow"></feComposite>
                <feBlend in="SourceGraphic" in2="shadow" mode="normal"></feBlend>
              </filter>
            </defs>
            <circle id="meter-section-one" cx="100" cy="100" r="45" fill="none" stroke="#E3C342" stroke-width="20" stroke-dasharray="141.3" stroke-dashoffset="141.3"></circle>
            <circle id="meter-section-two" cx="100" cy="100" r="45" fill="none" stroke="#6DAD81" stroke-width="20" stroke-dasharray="141.3" stroke-dashoffset="-47.1"></circle>
            <circle id="meter-section-three" cx="100" cy="100" r="45" fill="none" stroke="#D1535C" stroke-width="20" stroke-dasharray="141.3" stroke-dashoffset="47.1"></circle>
            <circle cx="100" cy="100" r="35" fill="#EDEDED" filter="url(#gauge-center-shadow)"></circle>
            <line class="needle" x1="100" y1="100" x2="100" y2="50" stroke="#EDEDED" stroke-width="2"
              stroke-linecap="round"></line>
          </svg>
        </div>
      </section>
    `
    this.detectSafari()
  }

  detectSafari () {
    if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      this.shadowRoot.querySelector('.meter-round-container').classList.add('safari')
    }
  }

  setRoundMeterByNumericValue (value) {
    const needle = this.shadowRoot.querySelector('.needle')

    const offset = 90
    const angle = ((value * 180) / 100) - offset
    needle.style.transform = `rotate(${angle}deg)`
    needle.style.transformOrigin = '100px 100px'
  }

  setRoundMeterByLevel (value) {
    let numVal = 0
    if (value === 'NONE' || value === 'NO') {
      numVal = 1
    } else if (value === 'LOW') {
      numVal = 50
    } else {
      numVal = 84
    }

    const needle = this.shadowRoot.querySelector('.needle')
    const offset = 90
    const angle = ((numVal * 180) / 100) - offset
    needle.style.transform = `rotate(${angle}deg)`
    needle.style.transformOrigin = '100px 100px'
  }
}

customElements.define('round-risk-meter', RoundRiskMeter);
