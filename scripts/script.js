function set(query, val){
    try{
        document.querySelectorAll(query).forEach(item => {
            item.innerHTML = val
        });
    }catch{

    }
}

class CountDown{
    constructor(...date){
        this.event = new Date(...date)
        this.startView()
    }

    getDifference(){
        const diff = this.convertMillisecs(
            this.event.getTime() - new Date().getTime()
        )

        const rounded = (val,qtd) => Math.floor(val % qtd)

        const seconds = rounded(diff.seconds,60)
        const minutes = rounded(diff.minutes, 60)
        const hours   = rounded(diff.hours,24)
        const days    = rounded(diff.days, diff.days)

        return {
            seconds,
            minutes,
            hours,
            days,
        }
    }

    startView(){
        const formatted = num => ('0'+num).slice(-2)

        set('.evento-mes', formatted(this.event.getMonth()))
        set('.evento-dia', formatted(this.event.getDate()))
        set('.evento-horas', formatted(this.event.getHours()))
        set('.evento-minutos', formatted(this.event.getMinutes()))

        this.countAcesses(res => {
            set('.acessos', res.value)
        })

        this.updateView()

        setInterval(() => {
            this.updateView()
        },1000)
    }

    updateView(){
        set('.count-dias', `${this.getDifference().days} : `)
        set('.count-horas', `${this.getDifference().hours} : `)
        set('.count-minutos', `${this.getDifference().minutes} : `)
        set('.count-segundos', `${this.getDifference().seconds}`)
    }

    countAcesses(action){
        $.getJSON("https://api.countapi.xyz/hit/lifeoneline.com.br/visits", function(response) {
            action(response)
        });
    }

    convertMillisecs(mili){
        let seconds = mili / 1000
        let minutes = seconds / 60
        let hours = minutes / 60
        let days = hours / 24

        return{
            seconds,
            minutes,
            hours,
            days,
        }
    }
}

(function Main(){
    const dataEvento = new CountDown(2020,4,18)
    popup = false
    window.data = dataEvento

    //dataEvento.setTimeView()

    $(document).mouseleave(function () {
        if(!popup){
            // popup mais elaborado aqui
            popup = true
            $('#popup').modal('show')
        }
    });
})()

