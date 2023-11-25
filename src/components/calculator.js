import { Container, Stack, Row, Col, Badge} from "react-bootstrap/esm";
import './calculator.css';
import { useState } from "react";


const Calculator = () => {
    const numbers = ["AC", "+/-", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="]
    const [displayValue, setDisplayValue] = useState(0);
    const [displayValue2, setDisplayValue2] = useState(null);
    const [operatorClick, setOperatorClick] = useState(false)
    const [operator, setOperator] = useState(null)
    const [result, setResult] = useState(null)
    // const [sign, setSign] = useState(true)
    


    const equate = (equate) => {
        setOperatorClick(false)
        if(displayValue2 === null) return
        let answer = 0
        if (result === null){
            if(operator === '+'){
                answer = displayValue + displayValue2
            }else if(operator === '-'){
                answer = displayValue - displayValue2
                
            }else if(operator === '*'){
                answer = displayValue * displayValue2
            }else if(operator === '/'){
                answer = displayValue / displayValue2
            }
            setResult(answer)
        }
        else{
            if(operator === '+'){
                answer = result + displayValue2;
            }
            else if(operator === '-'){
                answer = result - displayValue2;
            }else if(operator === '*'){
                answer = result * displayValue2;
            }else if(operator === '/'){
                answer = result / displayValue2;
            }
            setResult(answer)

        }
    
    }
    
    const clear = (ac) => {
        if(result !== null){
            setResult(null)
            setDisplayValue2(null)
            setDisplayValue(0)
            setOperator(null)
            setOperatorClick(false)
        }else if(displayValue2 === 0){
            setDisplayValue2(null)
            setDisplayValue(0)
            setOperator(null)
            setOperatorClick(false)
        }else if(displayValue2 !== null){
            setDisplayValue2(0)
        }else{
            setDisplayValue(0)
        }
    }
    const appendSign = (sign) => {
        if(result !== null){
            let temp = result;
            setDisplayValue(temp)
            setDisplayValue2(null)
            setResult(null)
        }
        setOperator(sign)
        if(operatorClick  === false){
            setOperatorClick(true)
        }else if(displayValue2 !== null){
        if(operator === '+' ){
                let result = displayValue + displayValue2;
                setDisplayValue(result)
                setDisplayValue2(null)
        }else if(operator === '-'){
            let result = displayValue - displayValue2;
            setDisplayValue(result)
            setDisplayValue2(null)
        }else if(operator === '*'){
            let result = displayValue * displayValue2;
            setDisplayValue(result)
            setDisplayValue2(null)
        }else if(operator === '/'){
            let result = displayValue / displayValue2;
            setDisplayValue(result)
            setDisplayValue2(null)
    }}
    }
    const onNumberClick = (num) => {

        if(operatorClick === false && displayValue2 === null){
            if(displayValue === 0 && num === 0){
                setDisplayValue(0)
            }else{
                let newDisplayValue = displayValue.toString() + num.toString();
                newDisplayValue = parseFloat(newDisplayValue)
                setDisplayValue(newDisplayValue)
            }
        }
        if(operatorClick === true){
            if(displayValue2 === null){
                setDisplayValue2(num)
            }else if(num === 0 && displayValue2 === 0){
                setDisplayValue2(0)
            }else {
                let newDisplayValue = displayValue2.toString() + num.toString();
                setDisplayValue2(parseFloat(newDisplayValue))
            }
            
        }
    }
    const addSign = (num) => {
        if(result !== null){
                let temp = result;
                temp = -temp;
                setResult(temp)
        }else if(displayValue2 !== null){
            let temp = displayValue2;
                temp = -temp;
                setDisplayValue2(temp)
        }else{
                let temp = displayValue;
                temp = -temp;
                setDisplayValue(temp)
        }
    }

    const onPercentageClick = (num) => {
        if(result !== null){
            let temp = result
            temp = result / 100
            setResult(temp)
        }else if(displayValue2 !== null){
            let temp = 0
            if(operator === '+'){
                temp = displayValue + displayValue2;
            }else if(operator === '-'){
                temp = displayValue - displayValue2;
            }else if(operator === '/'){
                temp = displayValue / displayValue2;
            }else if(operator === '*'){
                temp = displayValue * displayValue2;
            }
            setResult(temp/100)
        }else {
            let temp = displayValue
            temp = temp /100
            setDisplayValue(temp)
        }
    }

    const onDotClick = (num) => {
        if(result !== null){
            let temp = result.toString().split('')
            for(let i = 0; i < temp.length; i++){
            if(temp[i] === '.') return
        }
        temp.push('.')
        temp = temp.join('')

        setResult(temp)
        }else if(displayValue2 !== null){
            let temp = displayValue2.toString().split('')
            for(let i = 0; i < temp.length; i++){
            if(temp[i] === '.') return
        }
        temp.push('.')
        temp = temp.join('')

        setDisplayValue2(temp)
        }else{

            let temp = displayValue.toString().split('')
            for(let i = 0; i < temp.length; i++){
                if(temp[i] === '.') return
            }
            temp.push('.')
            temp = temp.join('')
    
            setDisplayValue(temp)
        }
    }

    return (  <Container fluid className='bg-dark calc p-5 rounded text-white '>
        <Stack>
            <h1 className="text-end border border-0">{ result !== null ? result : displayValue2 !== null ? displayValue2 : displayValue}</h1>
            <Container>
                <Row xs={4}>
                    {numbers.map( num => num === 0 ? <Col xs={6} key={num}><Badge pill bg="secondary" className="w-100 p-3 mb-2 " onClick={() => onNumberClick(num)} >{num}</Badge></Col> : 
                    num === "AC"|| num === "+/-" || num === "%" ?  <Col key={num}><Badge  bg="light" text="dark" className="rounded-circle p-3 mb-2" onClick={num === 'AC' ? () => clear(num) : num === '+/-' ? () => addSign(num) : () => onPercentageClick(num)}>{num}</Badge></Col> : 
                    num === "/" || num === "*"  ||num === "-" || num === "+" ||num === "=" ? <Col key={num}><Badge  bg="warning" className="rounded-circle p-3 mb-2" onClick={num === '=' ? ()=>equate(num) : ()=> appendSign(num)}>{num}</Badge></Col>: 
                    <Col key={num}><Badge  bg="secondary" className="rounded-circle p-3 mb-2" onClick={ num === '.' ? () => onDotClick(num) : () => onNumberClick(num)}>{num}</Badge></Col> )}
                </Row>
            </Container>
        </Stack>
    </Container> );
}
 
export default Calculator;