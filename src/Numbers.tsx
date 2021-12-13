import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export interface IUser {
    input?:string,
    boolean?:boolean
}
    

const Numbers = () => {
    const defaultTable:number = 1

    const [randomNumbers, setRandomNumbers] = useState<number[]>([])
    const [userAnswers, setUserAnswers] = useState<boolean[]>([])
    const [userInput, setUserInput] = useState<[IUser]>([{
        input: "",
        boolean: false
    }])
    const [numberTable, setNumberTable] = useState<number>(defaultTable)
    const [answers, setAnswers] = useState<boolean>(false)
    const [resetInput, setResetInput] = useState<boolean>(false)
    const numberList:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    useEffect(()=> {
        tenNumbers()        
    },[numberTable])

    // useEffect(() => {
    //     setResetInput(false)
    // }, [resetInput])
    
    function tenNumbers() {
        setRandomNumbers([])  
        for(let i = 0; i < 10; i++) {
            setRandomNumbers(randomNumbers => [...randomNumbers, division()])
        }          
    }
    
    function random():number {
        return Math.floor(Math.random() * 10) + 1;
    }

    function division() {
       return random() * numberTable
    }

    const numberChoice = numberList.map((number, i) => (
        <div key={i}>
            <Button variant="outlined" id={number.toString()} onClick={(e) => choice(e)}>{number}</Button>
        </div>
    ))
    
    function choice(e:any) {
        const value = parseInt(e.target.innerText)          
        setResetInput(true)   
        setNumberTable(value) 
        setUserAnswers([])
        setAnswers(false)
        setUserInput([{}])
    }    
    
    function onChange(e:any) {        
        correctAnswer(e)      
    }
    
    function correctAnswer(e:any) {
        const value = parseFloat(e.target.value)
        const id = e.target.id        
        const number = randomNumbers[id] / numberTable    
        
        const answer = {input: value, boolean: correct(number, value)}
        
        const newUserInput:any = [...userInput]
        newUserInput[id] = answer
        setUserInput(newUserInput)

        const newUserAnswers = [...userAnswers]        
        newUserAnswers[id] = correct(number, value)        
        setUserAnswers(newUserAnswers)
    }        
        
    function correct(number:number, value:number) {        
        if(number === value) return true ; return false
    }
        
    const viewNumbers = randomNumbers.map((number, i) => (
        <div key={i} className="flex w-20 between">
            <div className="flex w-10 number">
                <p>{number}</p>
                <p>/</p>
                <p>{numberTable}</p>
                <p>=</p>
            </div>            
            <div className="bottom">
                <TextField
                    className="w-5 ml-1 left" 
                    type="text" 
                    value={userInput[i]?.input || ""}
                    id={i.toString()} 
                    onChange={onChange} 
                />
            </div>                     
            <p 
               className={`w-5 ${userAnswers[i] ? "right" : "wrong"}`}>{ answers ? (userAnswers[i] ? 'RÄTT' : 'X') : ""}
            </p>
        </div>
    ))

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
            <p className="mb-1">Välj tabell</p>
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