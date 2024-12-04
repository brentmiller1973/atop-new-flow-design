/* global customElements, HTMLElement */
class HorizontalRiskMeter extends HTMLElement {
  constructor () {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
                    <style>
                        .meter-container {
                            width: auto;
                            border: none;
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-start;
                            align-items: center;
                            /*gap: 1rem;*/
                        
                            font-size: 16px;
                            font-weight: 600;
                            color: #484550;
                            margin-top: -12px;
                        }
                        
                        .meter-inner {
                            width: 300px;
                            height: auto;
                        }
                        
                        @media (max-width: 800px) {
                            .meter-inner {
                                width: 115px;
                                height: auto;
                            }
                        }
                        
                        .needle-unit {
                            transition: transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) .5s;
                        }
                    </style>
                    <section class="meter-container">
                        <div class="meter-inner">
                            <svg class="risk-meter" viewBox="0 0 640 100" xmlns="http://www.w3.org/2000/svg">
                                <!-- Background for the gauge -->
                                <rect x="20" y="40" width="600" height="20" fill="#e0e0e0"></rect>
                                <!-- Sections for the gauge -->
                                <rect x="20" y="40" width="200" height="20" fill="#6DAD81"></rect>
                                <!-- Green for low risk -->
                                <rect x="220" y="40" width="200" height="20" fill="#E3C342"></rect>
                                <!-- Yellow for medium risk -->
                                <rect x="420" y="40" width="200" height="20" fill="#D1535C"></rect>
                                <!-- Red for high risk -->
                                <!-- Needle and Decorative Base as a single unit -->
                                <g class="needle-unit" transform="translate(40,50)">
                                    <!-- Vertical Needle (adjust the y1, y2 values if needed) -->
                                    <line style="visibility: hidden" x1="0" y1="22" x2="0" y2="-35" stroke="#7B46D1" stroke-width="4" stroke-linecap="round"></line>
                                    <!-- Decorative Base -->
                                    <g transform="translate(-400,-345) scale(4)">
                                        <circle cx="100.5" cy="85" r="5" fill="white"></circle>
                                        <!-- Your decorative base paths here, adjusted as needed -->
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M 96.563 83.844 L 104.249 83.844 L 104.249 83.299 L 95.986 83.299 C 95.986 83.567 96.206 83.844 96.563 83.844 Z" fill="#7B46D1"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M 100.41 89.547 L 100.98 89.547 L 100.98 84.386 L 100.41 84.386 L 100.41 89.547 Z" fill="#7B46D1"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M 99.269 89.005 C 99.269 89.344 99.568 89.548 99.839 89.548 L 99.839 84.386 L 99.269 84.386 L 99.269 89.005 Z" fill="#7B46D1"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M 104.826 84.387 L 101.551 84.387 L 101.551 90.09 L 99.84 90.09 C 99.231 90.09 98.698 89.63 98.698 89.005 L 98.698 84.387 L 96.563 84.387 C 95.914 84.387 95.422 83.886 95.422 83.302 L 95.422 81.675 L 103.685 81.675 C 104.313 81.675 104.826 82.163 104.826 82.759 L 104.826 84.387 Z M 100.124 78.619 C 96.213 78.619 93.042 81.633 93.042 85.351 C 93.042 89.069 96.213 92.083 100.124 92.083 C 104.035 92.083 107.206 89.069 107.206 85.351 C 107.206 81.633 104.035 78.619 100.124 78.619 Z" fill="#7B46D1"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M 103.685 82.217 L 95.992 82.217 L 95.992 82.759 L 104.255 82.759 C 104.255 82.469 104.01 82.217 103.685 82.217 Z" fill="#7B46D1"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </section>
                `
  }

  setMeterByNumericValue (value) {
    const needleUnit = this.shadowRoot.querySelector('.needle-unit')
    const percentValue = value / 100
    const newPositionX = (percentValue * 600) + 20
    needleUnit.setAttribute('transform', `translate(${newPositionX},50)`)
  }

  setMeterByLevel (value) {
    let newPositionX = 20
    if (value === 'NONE' || value === 'NO') {
      newPositionX = 30
    } else if (value === 'LOW') {
      newPositionX = 320
    } else {
      newPositionX = 518
    }

    const needleUnit = this.shadowRoot.querySelector('.needle-unit')
    needleUnit.setAttribute('transform', `translate(${newPositionX},50)`)
  }
}

customElements.define('horizontal-risk-meter', HorizontalRiskMeter);
