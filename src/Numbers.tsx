import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export interface IUser {
    input?:string,
    boolean?:boolean
}
    

const Numbers = () => {
    const defaultTable:number = 1

    const [randomNumbers, setRandomNumbers] = useState<number[]>([])
    const [userAnswers, setUserAnswers] = useState<[IUser]>([{
        input: "",
        boolean: false
    }])
    const [numberTable, setNumberTable] = useState<number>(defaultTable)
    const [correctAnswers, setCorrectAnswers] = useState<boolean>(false)
    const numberList:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const corrected:{right:string, wrong:string} = {right:'Rätt', wrong:'X'}

    useEffect(()=> {
        tenNumbers()        
    },[numberTable])
    
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

    function activeBtn(id:number) {
        if(numberTable === (id+1)) return "contained"; else return "outlined"
    }

    const numberChoice = numberList.map((number, i) => (
        <div key={i}>
            <Button 
                variant={activeBtn(i)} 
                id={number.toString()} 
                color='primary'
                size='medium' 
                onClick={(e) => choice(e)}>{number+1}
            </Button>
        </div>
    ))
    
    function choice(e:any) {
        console.log(e)
        const value = parseInt(e.target.innerText)
        setNumberTable(value) 
        setUserAnswers([{}])
        setCorrectAnswers(false)
    }    
    
    function onChange(e:any) {        
        correctAnswer(e)      
    }
    
    function correctAnswer(e:any) {
        const value = parseFloat(e.target.value)
        const id = e.target.id        
        const number = randomNumbers[id] / numberTable    
        
        const answer = {input: value, boolean: correct(number, value)}
        
        const newUserAnswers:any = [...userAnswers]
        newUserAnswers[id] = answer
        setUserAnswers(newUserAnswers)
    }        
        
    function correct(number:number, value:number) {        
        if(number === value) return true ; return false
    }
        
    const viewNumbers = randomNumbers.map((number, i) => (
        <div key={i} className="flex w-30 center">
            <div className="flex w-15 number between">
                <p>{number}</p>
                <p>/</p>
                <p>{numberTable}</p>
                <p className="mr-2">=</p>
            </div>            
            <div className="bottom">
                <TextField
                    className="w-5 ml-1 left" 
                    type="text" 
                    value={userAnswers[i]?.input || ""}
                    id={i.toString()} 
                    onChange={onChange} 
                />
            </div>                     
            <p className={`w-5 ${userAnswers[i]?.boolean ? "right" : "wrong"}`}>
                { correctAnswers ? (userAnswers[i].boolean ? corrected.right : corrected.wrong) : ""}
            </p>
        </div>
    ))

    function viewCorrect() {
        const answers = userAnswers.length
        const numbers = randomNumbers.length

        if(answers !== numbers) {
            return
        }
        setCorrectAnswers(true)
    }

    return (
        <div className="flex center column">
            <h1>Drilla matte!</h1>
            <p className="mb-1">Välj tabell</p>
            <div className="flex wrap mb-2 w-20">
                {numberChoice}
            </div>
            <div className="mb-2">
                {viewNumbers}   
            </div>
            <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                onClick={viewCorrect}
                >
                Rätta
            </Button>
        </div>    
    )
}

export default Numbers