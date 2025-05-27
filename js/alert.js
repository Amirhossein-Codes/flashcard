class Alert{
    // first get already showing alerts and set a alert template for creating subsequence alerts
    constructor(){
        this.alert_text = ""
        this.alert_container = document.querySelector('.alerts')
        this.alerts = document.querySelectorAll('.alert')
        this.dissmiss_btns = document.querySelectorAll('.alert button')
    }

    show(alert_text){
        // if number of alerts are bigger than two then don't proceed
        if (this.alerts.length > 2) return
        // otherwise create another alert and place on screen with animations
        this.alert_text = alert_text
        this.alert_template = 
        `<div class="alert">
        <span>&#33;</span>
        <p>${this.alert_text}</p>
        <button>&#10006</button>
        </div>`
        this.alert_container.insertAdjacentHTML('beforeend', this.alert_template)
        this.alerts = document.querySelectorAll('.alert')
        this.dissmiss_btns = document.querySelectorAll('.alert button')
        for (const dissmiss_btn of this.dissmiss_btns){
            dissmiss_btn.addEventListener('click',()=>{
                dissmiss_btn.parentElement.classList.add('removing')
                setTimeout(()=>{
                    dissmiss_btn.parentElement.remove()
                },250)
            })
        }
        // get all alerts again and make them disappear after 5 seconds of their creation
        this.alerts = document.querySelectorAll('.alert')
        setTimeout(()=>{
            this.alerts[this.alerts.length - 1].remove()
        },5250)
    }
}


