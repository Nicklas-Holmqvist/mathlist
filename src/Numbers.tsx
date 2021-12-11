import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const Numbers = () => {
    const [randomNumbers, setRandomNumbers] = useState<number[]>([])
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [userNumber, setUserNumber] = useState<number>(7)
    const [answers, setAnswers] = useState<boolean>(false)
    const numberList:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    useEffect(()=> {
        tenNumbers()
    },[userNumber])
    
    function tenNumbers() {
        setRandomNumbers([])
        // for(let i = 0; i < 10; i++) {
        //     setRandomNumbers(randomNumbers => [...randomNumbers, random()])
        // }            
        for(let i = 0; i < 10; i++) {
            setRandomNumbers(randomNumbers => [...randomNumbers, division()])
        }            

    }
    
    function random():number {
        return Math.floor(Math.random() * 10) + 1;
    }

    function division() {
       return random() * userNumber
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

        const number = randomNumbers[id] / userNumber
        const newUserAnswers = [...userAnswers]

        newUserAnswers[id] = correct(number, value)
        setUserAnswers(newUserAnswers)
        console.log()
    }
    

    const viewNumbers = randomNumbers.map((number, i) => (
        <div key={i} className="flex w-20 between">
            <div className="flex w-10 number">
                <p>{number}</p>
                <p>/</p>
                <p>{userNumber}</p>
                <p>=</p>
            </div>
            <div className="bottom">
                <TextField className="w-5 ml-1 left" type="text" name="answer" id={i.toString()} onChange={onChange} />
            </div>
            <p className="w-5">{ answers ? userAnswers[i] : ""}</p>
        </div>
    ))

    const numberChoice = numberList.map((number, i) => (
        <div key={i}>
            <Button variant="outlined" id={number.toString()} onClick={(e) => choice(e)}>{number}</Button>
        </div>
    ))

    function choice(e:any) {
        const value = parseInt(e.target.innerText)
        setUserNumber(value)
    }

    function viewCorrect() {            
        const answers = userAnswers.length
        const numbers = randomNumbers.length

        if(answers !== numbers) {
            return
        }
        setAnswers(true)        
    }

    return (
        <div className="flex center column">
            <h1>Drilla matte!</h1>
            <div className="flex mb-2">
                {numberChoice}
            </div>
            <div className="mb-2">
                {viewNumbers}   
            </div>
            <Button variant="contained" size="large" color="primary" onClick={viewCorrect}>Rätta</Button>
        </div>    
    )
}

export default Numbers