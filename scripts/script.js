class DateTime{
    constructor(...date){
        this.event = new Date(...date)
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

    setTimeView(){
        const set = (query,val) => document.querySelectorAll(query).forEach(item => {
            item.innerHTML = val
        });
    
        set('.data-dias', this.getDifference().days)
        set('.data-horas', this.getDifference().hours)
        set('.data-minutos', this.getDifference().minutes)
        set('.data-segundos', this.getDifference().seconds)
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
    const dataEvento = new DateTime(2020,4,18)

    dataEvento.setTimeView()
    setInterval(() => {
        dataEvento.setTimeView()
    },1000)
})()

