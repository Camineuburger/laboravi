
const utils = {

  /**
   * @brief Verifica se é um valor válido.
   * @param {*} value 
   * @returns True caso for undefined, vazio ou null.
   */
  isEmptyOrNullOrUndefined: (value) => {

    let list_invalid_value = ["", null, undefined]

    if (list_invalid_value.includes(value))
      return true

    return false

  },

  /**
   * @brief Transforma os segundos para tempo.
   * @param {int} seconds 
   * @returns Objeto com a hora, minutos e segundos.
   */
   secondsToTime: (seconds) => {

    let minutes = 0
    let hours = 0

    while (seconds > 59) {

      minutes ++
      seconds -= 60

    }

    while (minutes > 59) {

      hours ++
      minutes -= 60

    }

    let time = {
      hour: hours,
      minute: minutes,
      second: seconds,
    }

    return time

  },

    /**
     * Converte tempo para segundos
     * @param {int} hour 
     * @param {int} minute 
     * @param {int} second 
     * @returns Segundos
     */
  timeToSeconds(hour, minute, second = 0) {

    hour = parseInt(hour)
    minute = parseInt(minute)
    second = parseInt(second)

    minute += (hour * 60)
    second += (minute * 60)

    return second

  },

  /**
   * @brief Formata um tempo.
   * @param {Object} time 
   * @returns Frase formatada ##:##:##
   */
  timePhrase: (time) => {

    if (parseInt(time.hour) < 10)
      time.hour = "0" + String(time.hour)
    if (parseInt(time.minute) < 10)
      time.minute = "0" + String(time.minute)
    if (parseInt(time.second) < 10)
      time.second = "0" + String(time.second)

    return time.hour + ":" + time.minute + ":" + time.second
  }

}

export default utils