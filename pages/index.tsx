import { useState } from 'react';
import { useUserStore } from '../components/store/user';
import { Button } from '../components/Button';
import classes from './auth.module.scss';
import { useRouter } from 'next/router';

export const Auth = () => {
    const [name, setName] = useState('');
    const setUserName = useUserStore((state) => state.setName);
    const router = useRouter();

    const handleStart = (path: string) => {
        setUserName(name);
        router.push(path);
    };

    return (
        <div className={classes.Auth}>
            <div className={`${classes.content} content`}>
                <div className={classes.container}>
                    <div className={classes.column_content}>
                        <h1>Начать</h1>
                        <p>Ваше имя</p>
                        <input
                            placeholder="Как вас зовут?"
                            className={classes.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={classes.row_content}>
                        <Button href="#" type="white" onClick={() => handleStart('/Calculator')}>
                            Открыть калькулятор
                        </Button>
                        <Button href="#" type="white" onClick={() => handleStart('/Generator')}>
                            Открыть генератор
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
