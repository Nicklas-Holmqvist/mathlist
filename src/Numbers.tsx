import React, { useEffect, useState } from 'react'

const Numbers = () => {
    const [randomNumbers, setRandomNumbers] = useState<number[]>([])
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [userNumber, setUserNumber] = useState<number>(5)
    const [answers, setAnswers] = useState<boolean>(false)

    useEffect(()=> {
        
    },[userAnswers])

    function tenNumbers() {
        setRandomNumbers([])
        for(let i = 0; i < 9; i++) {
            setRandomNumbers(randomNumbers => [...randomNumbers, random()])
        }                
    }
    
    function random():number {
        return Math.floor(Math.random() * 10) + 1;
    }

    function onChange(e:any) {
        createCorrectionList(e)        
    }

    function correct(number:number, value:number) {
        if(number === value) return 'Rätt' ; return 'Fel'
    }

    function createCorrectionList(e:any) {
        const value = parseFloat(e.target.value)
        const id = e.target.id
        const number = randomNumbers[id] + userNumber
        const newUserAnswers = [...userAnswers]

        newUserAnswers[id] = correct(number, value)
        setUserAnswers(newUserAnswers)
        console.log()
    }
    

    const viewNumbers = randomNumbers.map((number, i) => (
        <div key={i} className="flex">
            <p>{number}</p>
            <p>+</p>
            <p>{userNumber}</p>
            <input type="text" name="answer" id={i.toString()} onChange={onChange} />
            {answers ? <p>{userAnswers[i]}</p> : ""}
        </div>
    ))

    function viewCorrect() {        
        setAnswers(true)        
    }

    return (
        <div>
            <p onClick={tenNumbers}>Klicka mig!</p>
            {viewNumbers}
            <button onClick={viewCorrect}>Rätta</button>
        </div>    
    )
}

export default Numbers