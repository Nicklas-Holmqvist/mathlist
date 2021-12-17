import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export interface IUser {
    input?:string,
    boolean?:boolean
}

const Numbers = () => {
    const defaultMathType:number = 0
    const defaultTable:number = 1
    const defaultRandomNumbers:number = 10
    const [isDivision, setIsDivision] = useState<boolean>(false)

    const [randomNumbers, setRandomNumbers] = useState<number[]>([])
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [userBoolean, setUserBoolean] = useState<boolean[]>([])
    const [mathType, setMathType] = useState<number>(defaultMathType)
    const [numberTable, setNumberTable] = useState<number>(defaultTable)
    const [correctAnswers, setCorrectAnswers] = useState<boolean>(false)
    
    const mathTypeList:string[] = ["+", "-", "x", "/"]
    const numberList:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const corrected:{right:string, wrong:string} = {right:'Rätt', wrong:'X'}
     
    useEffect(()=> {
        createNumbers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mathType, numberTable])

    /**
     * Creates numbers to be setMathNumberd
     */
    function createNumbers() {
        setRandomNumbers([])  
        for(let i = 0; i < defaultRandomNumbers; i++) {
            setRandomNumbers(randomNumbers => [...randomNumbers, setMathNumber(mathType)])
        }          
    }
    
    /** Returns a random value from 1-10 */
    function random(id?:number):number {
        if(id === 1) return Math.floor(Math.random() * numberTable) + 1;
        return Math.floor(Math.random() * 10) + 1;
    }

    function setMathNumber(id:number):any {
        switch(id) {
            case 0:
                setIsDivision(false)
                return random()
            case 1:
                setIsDivision(false)
                return random(id)
            case 2:
                setIsDivision(false)
                return random()
            case 3:
                setIsDivision(true)
                return random() * numberTable
        }
    }

    function correctNumber(number:number, input:number):any {
       switch(mathType) {
            case 0:
                return (number + numberTable) === Number(input)
            case 1:                   
                return (numberTable - number) === Number(input) 
            case 2:   
                return (number * numberTable) === Number(input)
            case 3:     
                return (number / numberTable) === Number(input)
        }
    }

    /**
     * Change the styling of onClick button to active
     * @param id of the math table
     * @returns either contained or outlined
     */
    function activeType(id:any) {
        if(mathType === (id)) return "contained"; else return "outlined"
    }

    /**
     * Change the styling of onClick button to active
     * @param id of the math table
     * @returns either contained or outlined
     */
    function activeTable(id:number) {
        if(numberTable === (id+1)) return "contained"; else return "outlined"
    }
    
    /**
     * Sets the table value of choice and reset inputs and the rights/wrongs
     * @param e values from onclick the math tables
     */
    function typeChoice(e:any) {
        setMathType(e)
        setUserAnswers([])
        setUserBoolean([])
        setCorrectAnswers(false)
    }    
    
    /**
     * Sets the table value of choice and reset inputs and the rights/wrongs
     * @param e values from onclick the math tables
     */
    function choice(e:any) {
        const value = parseInt(e.target.innerText)
        setMathNumber(value)
        setNumberTable(value) 
        setUserAnswers([])
        setUserBoolean([])
        setCorrectAnswers(false)
    }    
    
    /**
     * 
     * @param e values from input field when onChange
     */
    function onChange(e:any) {        
        correctAnswer(e)      
    }
    
    /**
     * Creates an object with the users input value and a boolean if it is right or wrong.
     * The object is then pushed into userAnswers, if index already exist it will overwrite it.
     * @param e values from input field when onChange
     */
    function correctAnswer(e:any) {
        const value = e.target.value
        const id = e.target.id 
        
        if(correctAnswers) {
            setCorrectAnswers(false)
        } 
        correctNumber(randomNumbers[id], value)
        // const answer = {input: value, boolean: correctNumber(randomNumbers[id], value)}
        
        const newUserAnswers:any = [...userAnswers]
        newUserAnswers[id] = value
        setUserAnswers(newUserAnswers)
        
        const newUserBoolean:any = [...userBoolean]
        newUserBoolean[id] = correctNumber(randomNumbers[id], value)
        setUserBoolean(newUserBoolean)
    }        
            
    /**
     * Component that maps out the different math types
     */
    const mathTypeChoice = mathTypeList.map((type, i) => (
        <div key={i}>
            <Button 
                variant={activeType(i)} 
                id={i.toString()} 
                color='primary'
                size='medium' 
                onClick={(e) => typeChoice(i)}>{type}
            </Button>
        </div>
    ))
    
    /**
     * Component that maps out the math tables choices
     */
    const numberChoice = numberList.map((number, i) => (
        <div key={i}>
            <Button 
                variant={activeTable(i)} 
                id={number.toString()} 
                color='primary'
                size='medium' 
                onClick={(e) => choice(e)}>{number+1}
            </Button>
        </div>
    ))
        
    /**
     * Component that maps out the numbers
     */
    const viewNumbers = randomNumbers.map((number, i) => (
        <div key={i} className="flex w-30 center">
            <div className="flex w-15 number between">
                <p>{isDivision ? number : numberTable}</p>
                <p>{mathTypeList[mathType]}</p>
                <p>{isDivision ? numberTable : number}</p>
                <p className="mr-2">=</p>
            </div>            
            <div className="bottom">
                <TextField
                    className="w-5 ml-1 left" 
                    type="number" 
                    value={userAnswers[i] || ""}
                    id={i.toString()} 
                    onChange={onChange} 
                />
            </div>                     
            <p className={`w-5 ${userBoolean[i] ? "right" : "wrong"}`}>
                { correctAnswers ? (userBoolean[i] ? corrected.right : corrected.wrong) : ""}
            </p>
        </div>
    ))

    /**
     * Display the right or wrong when onClick "Rätta"
     * @returns true or false for the answer
     */
    function viewCorrect() {     
        if(!correctAnswers) return setCorrectAnswers(true)
    }

    return (
        <div className="flex center column">
            <h1>Drilla matte!</h1>
            <div className="flex mb-2 w-20 center">
                {mathTypeChoice}
            </div>
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
            >Rätta
            </Button>
        </div>    
    )
}

export default Numbers