import Link from 'next/link';
import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

type HeaderProps = {

}

export default function Header(params: HeaderProps) {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    });
    
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <img src="/logo.svg" />
            </Link>

            <p>O melhor para você ouvir sempre</p>

            <span>{currentDate}</span>
        </header>
    );

}