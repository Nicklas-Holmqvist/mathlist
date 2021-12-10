import React, { useEffect, useState } from 'react'

const Numbers = () => {
    const [randomNumbers, setRandomNumbers] = useState<number[]>([])
    const [userAnswers, setUserAnswers] = useState<boolean[]>([])
    const [userNumber, setUserNumber] = useState<number>(5)

    useEffect(() => {
        console.log(userAnswers)
    }, [userAnswers])

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
        if(number === value) return true ; return false
    }

    function createCorrectionList(e:any) {
        const value = parseFloat(e.target.value)
        const id = e.target.id
        const number = randomNumbers[id] + userNumber
        const newUserAnswers = [...userAnswers]

        newUserAnswers[id] = correct(number, value)
        setUserAnswers(newUserAnswers)
    }

    const viewNumbers = randomNumbers.map((number, i) => (
        <div key={i} className="flex">
            <p>{number}</p>
            <p>+</p>
            <p>{userNumber}</p>
            <input type="text" name="answer" id={i.toString()} onChange={onChange} />
        </div>
    ))

    function viewCorrect():any {
        console.log(userAnswers)
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