function set(query, val) {
    try {
        document.querySelectorAll(query).forEach(item => {
            item.innerHTML = val
        });
    } catch{

    }
}

class CountDown {
    constructor(...date) {
        this.event = new Date(...date)
        this.startView()
    }

    getDifference() {
        const diff = this.convertMillisecs(
            this.event.getTime() - new Date().getTime()
        )

        const rounded = (val, qtd) => Math.floor(val % qtd)

        const seconds = rounded(diff.seconds, 60)
        const minutes = rounded(diff.minutes, 60)
        const hours = rounded(diff.hours, 24)
        const days = Math.floor(diff.days)

        return {
            seconds,
            minutes,
            hours,
            days,
        }
    }

    startView(){
        set('.cadastros', 0)
        this.getCadastros()
            .then(res => set('.cadastros', res))
        const formatted = num => ('0' + num).slice(-2)

        set('.evento-mes', formatted(this.event.getMonth()))
        set('.evento-dia', formatted(this.event.getDate()))
        set('.evento-horas', formatted(this.event.getHours()))
        set('.evento-minutos', formatted(this.event.getMinutes()))
        this.updateView()

        setInterval(() => {
            this.updateView()
        }, 1000)
    }

    updateView() {
        set('.count-dias', ` ${this.getDifference().days}`)
        set('.count-horas', ` : ${this.getDifference().hours} `)
        set('.count-minutos', ` : ${this.getDifference().minutes} `)
        set('.count-segundos', ` : ${this.getDifference().seconds} `)

        const ifEvent = $('.if-event')
        const elseEvent = $('.else-event')
        const eventOn = this.getDifference().seconds > -1

        if(eventOn){
            elseEvent.hide()
            ifEvent.show()
        }else{
            ifEvent.hide()
            elseEvent.show()
        }
    }

    async getCadastros(){
        let result = 0
        await $.getJSON("https://api.countapi.xyz/get/lifeoneline.com.br/cadastros", function(response) {
            result = response.value
        });
        return result
    }

    convertMillisecs(mili) {
        let seconds = mili / 1000
        let minutes = seconds / 60
        let hours = minutes / 60
        let days = hours / 24

        return {
            seconds,
            minutes,
            hours,
            days,
        }
    }
}

class Email{
    constructor(query){
        const form = document.querySelector(query)
        const name = form.querySelector('[name=name]')
        const email = form.querySelector('[name=email]')
        const countUrl = 'https://api.countapi.xyz/hit/lifeoneline.com.br/cadastros'
        const mailUrl = 'https://lifeoneline.us18.list-manage.com/subscribe/post'

        const counterUp = () => $.ajax({
            type: 'POST',
            url: countUrl,
            data: form.serialize(), // serializes the form's elements.  
            dataType: "jsonp",
            success: function(data)
            {    
               alert(data); // show response from the php script.
            }
        })
        
        form.onsubmit = (e) => {
            e.preventDefault()
            $("#modalSucesso").modal('show')

            $.ajax({
                url: mailUrl,
                method: 'POST',
                data: {
                    u: '67dbf3aef57c87307dc7a7ae1', 
                    id: 'e074a62f47', 
                    EMAIL: email.value, 
                    NAME: name.value
                },
                dataType: 'jsonp',
                success: function(data)
                {    
                   counterUp()
                }
            });
        }
    }
}

class Popup{
    constructor(query){
        this.popup = false

        let popup = () => {
            if(!this.popup){
                // popup mais elaborado aqui
                this.popup = true
                $(query).modal('show')
            }
        }

        setTimeout(() => popup(),150000)

        $(document).mouseleave(function () {
            popup()
        });
    }
}

(function Main(){
    const dataEvento = new CountDown(2020,4,21,15,0,0)
    const popUp = new Popup('#popup')
    const email1 = new Email('#emailForm')
    const email2 = new Email('#formFooter')
})()

