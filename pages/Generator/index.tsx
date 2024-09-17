import React, { useState } from 'react';
import { Nav } from "../../components/Nav";
import classes from "./generator.module.scss";

const usePasswordGenerator = () => {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '%*)?@#$~';

    const generatePassword = (
        length: number,
        useUpperCase: boolean,
        useLowerCase: boolean,
        useNumbers: boolean,
        useSymbols: boolean,
        avoidRepeats: boolean
    ): string => {
        let availableCharacters = '';
        if (useUpperCase) availableCharacters += upperCaseLetters;
        if (useLowerCase) availableCharacters += lowerCaseLetters;
        if (useNumbers) availableCharacters += numbers;
        if (useSymbols) availableCharacters += symbols;

        let password = '';
        const usedChars = new Set();

        while (password.length < length) {
            const randomIndex = Math.floor(Math.random() * availableCharacters.length);
            const randomChar = availableCharacters[randomIndex];

            if (avoidRepeats && usedChars.has(randomChar)) {
                continue; // Пропускаем повторяющиеся символы
            }

            password += randomChar;
            usedChars.add(randomChar);
        }

        return password;
    };

    return { generatePassword };
};

const PasswordGenerator = () => {
    const [passwords, setPasswords] = useState<string[]>([]);
    const [length, setLength] = useState<number | ''>();
    const [useUpperCase, setUseUpperCase] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [avoidRepeats, setAvoidRepeats] = useState(false); // Новое состояние для избегания повторений

    const { generatePassword } = usePasswordGenerator();

    const handleGeneratePasswords = () => {
        const newPasswords = Array(4).fill(null).map(() =>
            generatePassword(
                typeof length === 'number' ? length : 12,
                useUpperCase,
                useLowerCase,
                useNumbers,
                useSymbols,
                avoidRepeats // Добавлено новое условие для избегания повторений
            )
        );
        setPasswords(newPasswords);
    };

    const handleCopyToClipboard = (password: string) => {
        navigator.clipboard.writeText(password);
    };

    return (
        <div className={classes.Generator}>
            <Nav />
            <div className={`${classes.content} content`}>
                <h1>Генератор паролей</h1>

                <div className={classes.row_content}>
                    <div className={classes.column_content}>
                        <div className={classes.container}>

                            <div className={classes.length}>
                                <span>Длина пароля</span>
                                <input
                                    className={classes.input}
                                    type="number"
                                    placeholder='Введите число'
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                    min={1}
                                    max={50}
                                />
                            </div>
                            <div className={classes.checkbox}>
                                <input className={classes.checkbox_input}
                                    type="checkbox"
                                    checked={useUpperCase}
                                    onChange={(e) => setUseUpperCase(e.target.checked)}
                                />
                                Использовать прописные буквы
                            </div>
                            <div className={classes.checkbox}>
                                <input className={classes.checkbox_input}
                                    type="checkbox"
                                    checked={useLowerCase}
                                    onChange={(e) => setUseLowerCase(e.target.checked)}
                                />
                                Использовать строчные буквы
                            </div>
                            <div className={classes.checkbox}>
                                <input className={classes.checkbox_input}
                                    type="checkbox"
                                    checked={useNumbers}
                                    onChange={(e) => setUseNumbers(e.target.checked)}
                                />
                                Использовать цифры
                            </div>
                            <div className={classes.checkbox}>
                                <input className={classes.checkbox_input}
                                    type="checkbox"
                                    checked={useSymbols}
                                    onChange={(e) => setUseSymbols(e.target.checked)}
                                />
                                Использовать символы: %, *, ), ?, @, #, $, ~
                            </div>
                            <div className={classes.checkbox}>
                                <input className={classes.checkbox_input}
                                    type="checkbox"
                                    checked={avoidRepeats}
                                    onChange={(e) => setAvoidRepeats(e.target.checked)}
                                />
                                Избегать повторения символов
                            </div>
                        </div>

                        <div className={classes.generate}>
                            <button className={classes.button} onClick={handleGeneratePasswords}>Сгенерировать пароли</button>


                        </div>

                    </div>

                    {passwords.length > 0 && (
                        <div className={classes.results}>
                            <h3>Результаты</h3>
                            {passwords.map((password, index) => (
                                <div className={classes.password} key={index} >
                                    <p>{password}</p>
                                    <button className={classes.copy} onClick={() => handleCopyToClipboard(password)}>

                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="content_copy">
                                                <path id="Vector" d="M12.5 0.833336H3.33335C2.41669 0.833336 1.66669 1.58334 1.66669 2.5V13.3333C1.66669 13.7917 2.04169 14.1667 2.50002 14.1667C2.95835 14.1667 3.33335 13.7917 3.33335 13.3333V3.33334C3.33335 2.875 3.70835 2.5 4.16669 2.5H12.5C12.9584 2.5 13.3334 2.125 13.3334 1.66667C13.3334 1.20834 12.9584 0.833336 12.5 0.833336ZM15.8334 4.16667H6.66669C5.75002 4.16667 5.00002 4.91667 5.00002 5.83334V17.5C5.00002 18.4167 5.75002 19.1667 6.66669 19.1667H15.8334C16.75 19.1667 17.5 18.4167 17.5 17.5V5.83334C17.5 4.91667 16.75 4.16667 15.8334 4.16667ZM15 17.5H7.50002C7.04169 17.5 6.66669 17.125 6.66669 16.6667V6.66667C6.66669 6.20834 7.04169 5.83334 7.50002 5.83334H15C15.4584 5.83334 15.8334 6.20834 15.8334 6.66667V16.6667C15.8334 17.125 15.4584 17.5 15 17.5Z" fill="#9B9BA1" />
                                            </g>
                                        </svg>

                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
