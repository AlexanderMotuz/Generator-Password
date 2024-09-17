import { useState } from 'react';
import classes from './calculator.module.scss'; 
import { Nav } from "../../components/Nav";

const Calculator = () => {
    const [input, setInput] = useState<string>(''); 
    const [result, setResult] = useState<number | string>(''); 

    const handleClick = (value: string) => {
        if (value === '%') {
            const lastNumberMatch = input.match(/(\d+)(?!.*\d)/);
            if (lastNumberMatch) {
                const lastNumber = parseFloat(lastNumberMatch[0]);
                const percentageValue = (lastNumber / 100).toString();
                setInput((prevInput) =>
                    prevInput.replace(/\d+$/, percentageValue)
                );
            }
        } else {
            setInput((prevInput) => prevInput + value);
        }
    };

    const clearInput = () => {
        setInput('');
        setResult('');
    };

    const toggleSign = () => {
        if (input) {
            const currentNumber = parseFloat(input);
            setInput((currentNumber * -1).toString());
        }
    };

    const calculateResult = () => {
        try {
            const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/');
            let calculatedResult = eval(sanitizedInput);
            
            if (calculatedResult % 1 !== 0) {
                calculatedResult = calculatedResult.toString().replace('.', ',');
            }
            setResult(calculatedResult);
        } catch (error) {
            setResult('Ошибка');
        }
    };

    const renderInput = () => {
        const coloredInput = input.replace(/(\+|\-|\×|\/)/g, (match) => {
            return `<span class="${classes.operator}">${match}</span>`;
        });
        return { __html: coloredInput };
    };

    return (
        <div className={classes.Calculator}>
            <Nav />
            <div className={`${classes.content} content`}>
                <div className={classes.row_content}>
                    <div className={classes.description}>
                        <h1>Калькулятор</h1>
                        <p>Очень Простой калькулятор обычный - только стандартные функции калькулятора: сложение, вычитание, умножение и деление. Простой калькулятор работает на смартфонах и ПК даже без интернета, не <br /> требует установки, быстро загружается и работает онлайн.</p>
                    </div>
                    <div className={classes.container}>
                        <h1 className={classes.resultText}>{result}</h1>
                        <h1 className={classes.inputText} dangerouslySetInnerHTML={renderInput()} />

                        <div className={classes.grid}>
                            <button className={classes.grayButton} onClick={clearInput}>C</button>
                            <button className={classes.grayButton} onClick={toggleSign}>+/-</button>
                            <button className={classes.grayButton} onClick={() => handleClick('%')}>%</button>
                            <button className={classes.orangeButton} onClick={() => handleClick('/')}>÷</button>

                            <button className={classes.darkButton} onClick={() => handleClick('7')}>7</button>
                            <button className={classes.darkButton} onClick={() => handleClick('8')}>8</button>
                            <button className={classes.darkButton} onClick={() => handleClick('9')}>9</button>
                            <button className={classes.orangeButton} onClick={() => handleClick('×')}>×</button> 

                            <button className={classes.darkButton} onClick={() => handleClick('4')}>4</button>
                            <button className={classes.darkButton} onClick={() => handleClick('5')}>5</button>
                            <button className={classes.darkButton} onClick={() => handleClick('6')}>6</button>
                            <button className={classes.orangeButton} onClick={() => handleClick('-')}>−</button>

                            <button className={classes.darkButton} onClick={() => handleClick('1')}>1</button>
                            <button className={classes.darkButton} onClick={() => handleClick('2')}>2</button>
                            <button className={classes.darkButton} onClick={() => handleClick('3')}>3</button>
                            <button className={classes.orangeButton} onClick={() => handleClick('+')}>+</button>

                            <button className={classes.darkButton} onClick={() => handleClick('0')} style={{ gridColumn: 'span 2', textAlign: 'start' }}>0</button>
                            <button className={classes.darkButton} onClick={() => handleClick('.')}>.</button>
                            <button className={classes.orangeButton} onClick={calculateResult}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
